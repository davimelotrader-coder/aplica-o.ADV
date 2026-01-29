// Legal Operations Diagnosis - Application Logic

class DiagnosisApp {
    constructor() {
        this.currentSection = 0;
        this.responses = {};
        this.questionnaire = questionnaire;
        this.storageKey = 'legalOpsDiagnosis_session';
        this.sessionId = null;
        this.autoSaveInterval = null;
        this.apiBaseUrl = '';

        this.init();
    }

    init() {
        this.loadSession();
        this.bindEvents();
        this.checkResumeAvailability();
        this.startAutoSave();
    }

    // Session Management
    loadSession() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currentSection = data.currentSection || 0;
                this.responses = data.responses || {};
                this.sessionId = data.sessionId || null;
            } catch (e) {
                console.error('Error loading session:', e);
            }
        }
    }

    async saveSession() {
        const data = {
            sessionId: this.sessionId,
            currentSection: this.currentSection,
            responses: this.responses,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage as fallback
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        // Save to backend if session ID exists
        if (this.sessionId) {
            try {
                await fetch(`${this.apiBaseUrl}/api/diagnostics/${this.sessionId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        currentSection: this.currentSection,
                        responses: this.responses
                    })
                });
            } catch (error) {
                console.error('Error saving to backend:', error);
                // Fallback to localStorage only
            }
        }
    }

    clearSession() {
        localStorage.removeItem(this.storageKey);
        this.currentSection = 0;
        this.responses = {};
        this.sessionId = null;
    }

    startAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            if (this.currentSection > 0 && this.currentSection <= this.questionnaire.sections.length) {
                this.saveCurrentSection();
                console.log('Auto-saved at', new Date().toLocaleTimeString());
            }
        }, 30000);
    }

    // Event Binding
    bindEvents() {
        // Welcome screen
        document.getElementById('start-btn').addEventListener('click', () => this.startAssessment());
        document.getElementById('resume-btn').addEventListener('click', () => this.resumeAssessment());

        // Navigation
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSection());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSection());
        document.getElementById('save-exit-btn').addEventListener('click', () => this.saveAndExit());

        // Review screen
        document.getElementById('back-to-questionnaire-btn').addEventListener('click', () => this.backToQuestionnaire());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitAssessment());

        // Completion screen
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }

    checkResumeAvailability() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            document.getElementById('resume-btn').style.display = 'inline-block';
        }
    }

    // Screen Navigation
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    async startAssessment() {
        this.currentSection = 0;
        this.responses = {};
        this.clearSession();

        // Create new session with backend
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            this.sessionId = data.sessionId;
            console.log('Session created:', this.sessionId);
        } catch (error) {
            console.error('Error creating session:', error);
            // Continue without backend session
        }

        this.renderSection(0);
        this.showScreen('questionnaire-screen');
    }

    resumeAssessment() {
        this.renderSection(this.currentSection);
        this.showScreen('questionnaire-screen');
    }

    saveAndExit() {
        this.saveCurrentSection();
        alert('Progresso salvo! Você pode retornar a qualquer momento clicando em "Continuar de onde parei".');
        this.showScreen('welcome-screen');
    }

    backToQuestionnaire() {
        this.renderSection(this.currentSection);
        this.showScreen('questionnaire-screen');
    }

    restart() {
        if (confirm('Tem certeza que deseja iniciar um novo diagnóstico? Isso apagará suas respostas anteriores.')) {
            this.clearSession();
            location.reload();
        }
    }

    // Section Rendering
    renderSection(sectionIndex) {
        const section = this.questionnaire.sections[sectionIndex];
        const content = document.getElementById('section-content');

        let html = `
            <div class="section-header">
                <h2 class="section-title">${section.title}</h2>
                <p class="section-description">${section.description}</p>
                <span class="section-time">⏱️ ${section.estimatedTime}</span>
            </div>
        `;

        section.questions.forEach(question => {
            html += this.renderQuestion(question, section.id);
        });

        content.innerHTML = html;
        this.updateProgress();
        this.updateNavigation();
        this.restoreResponses(section.id);
    }

    renderQuestion(question, sectionId) {
        const required = question.required ? '<span class="required">*</span>' : '';
        const helpText = question.helpText ? `<span class="question-help">${question.helpText}</span>` : '';

        let inputHtml = '';

        switch (question.type) {
            case 'multiple-choice':
                inputHtml = question.options.map(option => `
                    <div class="option">
                        <input type="radio" 
                               id="${question.id}_${this.slugify(option)}" 
                               name="${question.id}" 
                               value="${option}">
                        <label for="${question.id}_${this.slugify(option)}">${option}</label>
                    </div>
                `).join('');
                break;

            case 'multiple-choice-multiple':
                inputHtml = question.options.map(option => `
                    <div class="option">
                        <input type="checkbox" 
                               id="${question.id}_${this.slugify(option)}" 
                               name="${question.id}" 
                               value="${option}">
                        <label for="${question.id}_${this.slugify(option)}">${option}</label>
                    </div>
                `).join('');
                break;

            case 'numeric':
                const unit = question.unit ? `<span class="input-unit">${question.unit}</span>` : '';
                inputHtml = `
                    <div class="input-with-unit">
                        <input type="number" 
                               id="${question.id}" 
                               name="${question.id}" 
                               min="${question.min || 0}" 
                               max="${question.max || 999999}"
                               ${question.required ? 'required' : ''}>
                        ${unit}
                    </div>
                `;
                break;

            case 'text':
                inputHtml = `
                    <textarea id="${question.id}" 
                              name="${question.id}" 
                              maxlength="${question.maxLength || 500}"
                              ${question.required ? 'required' : ''}></textarea>
                `;
                break;

            case 'likert':
                inputHtml = '<div class="likert-scale">';
                for (let i = 1; i <= question.scale; i++) {
                    inputHtml += `
                        <div class="likert-option">
                            <input type="radio" 
                                   id="${question.id}_${i}" 
                                   name="${question.id}" 
                                   value="${i}">
                            <label for="${question.id}_${i}">
                                ${i}<br>
                                <small>${question.labels[i]}</small>
                            </label>
                        </div>
                    `;
                }
                inputHtml += '</div>';
                break;
        }

        return `
            <div class="question" data-question-id="${question.id}">
                <label class="question-label">
                    ${question.text}${required}
                </label>
                ${inputHtml}
                ${helpText}
            </div>
        `;
    }

    restoreResponses(sectionId) {
        const sectionResponses = this.responses[sectionId] || {};

        Object.keys(sectionResponses).forEach(questionId => {
            const value = sectionResponses[questionId];
            const input = document.querySelector(`[name="${questionId}"]`);

            if (!input) return;

            if (input.type === 'radio') {
                const radio = document.querySelector(`[name="${questionId}"][value="${value}"]`);
                if (radio) radio.checked = true;
            } else if (input.type === 'checkbox') {
                if (Array.isArray(value)) {
                    value.forEach(v => {
                        const checkbox = document.querySelector(`[name="${questionId}"][value="${v}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }
            } else {
                input.value = value;
            }
        });
    }

    saveCurrentSection() {
        const section = this.questionnaire.sections[this.currentSection];
        if (!section) return;

        const sectionResponses = {};

        section.questions.forEach(question => {
            const input = document.querySelector(`[name="${question.id}"]`);
            if (!input) return;

            if (input.type === 'radio') {
                const checked = document.querySelector(`[name="${question.id}"]:checked`);
                if (checked) sectionResponses[question.id] = checked.value;
            } else if (input.type === 'checkbox') {
                const checked = document.querySelectorAll(`[name="${question.id}"]:checked`);
                if (checked.length > 0) {
                    sectionResponses[question.id] = Array.from(checked).map(c => c.value);
                }
            } else {
                if (input.value) sectionResponses[question.id] = input.value;
            }
        });

        this.responses[section.id] = sectionResponses;
        this.saveSession();
    }

    validateCurrentSection() {
        const section = this.questionnaire.sections[this.currentSection];
        const requiredQuestions = section.questions.filter(q => q.required);

        for (let question of requiredQuestions) {
            const input = document.querySelector(`[name="${question.id}"]`);
            if (!input) continue;

            let hasValue = false;

            if (input.type === 'radio') {
                hasValue = document.querySelector(`[name="${question.id}"]:checked`) !== null;
            } else if (input.type === 'checkbox') {
                hasValue = document.querySelectorAll(`[name="${question.id}"]:checked`).length > 0;
            } else {
                hasValue = input.value.trim() !== '';
            }

            if (!hasValue) {
                this.showError('Por favor, responda todas as perguntas obrigatórias (marcadas com *).');
                return false;
            }
        }

        return true;
    }

    showError(message) {
        // Remove existing error
        const existing = document.querySelector('.error-message');
        if (existing) existing.remove();

        // Add new error
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;

        const content = document.getElementById('section-content');
        content.insertBefore(error, content.firstChild);

        // Scroll to top
        content.scrollIntoView({ behavior: 'smooth' });
    }

    // Navigation
    previousSection() {
        this.saveCurrentSection();
        this.currentSection--;
        this.renderSection(this.currentSection);
    }

    nextSection() {
        if (!this.validateCurrentSection()) return;

        this.saveCurrentSection();
        this.currentSection++;

        if (this.currentSection >= this.questionnaire.sections.length) {
            this.showReview();
        } else {
            this.renderSection(this.currentSection);
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentSection === 0;
        nextBtn.textContent = this.currentSection === this.questionnaire.sections.length - 1
            ? 'Revisar Respostas →'
            : 'Próxima →';
    }

    updateProgress() {
        const total = this.questionnaire.sections.length;
        const current = this.currentSection + 1;
        const percent = Math.round((current / total) * 100);

        document.getElementById('progress-text').textContent = `Seção ${current} de ${total}`;
        document.getElementById('progress-percent').textContent = `${percent}%`;
        document.getElementById('progress-fill').style.width = `${percent}%`;
    }

    // Review Screen
    showReview() {
        const content = document.getElementById('review-content');
        let html = '';

        this.questionnaire.sections.forEach(section => {
            const sectionResponses = this.responses[section.id] || {};

            html += `
                <div class="review-section">
                    <h3 class="review-section-title" data-section="${section.id}">
                        ${section.title}
                        <span style="font-size: 0.875rem; color: var(--text-secondary);">✏️ Editar</span>
                    </h3>
            `;

            section.questions.forEach(question => {
                const response = sectionResponses[question.id];
                if (!response) return;

                const displayResponse = Array.isArray(response) ? response.join(', ') : response;

                html += `
                    <div class="review-answer">
                        <div class="review-question">${question.text}</div>
                        <div class="review-response">${displayResponse}</div>
                    </div>
                `;
            });

            html += '</div>';
        });

        content.innerHTML = html;

        // Add click handlers for editing
        document.querySelectorAll('.review-section-title').forEach(title => {
            title.addEventListener('click', (e) => {
                const sectionId = parseInt(e.currentTarget.dataset.section);
                this.currentSection = sectionId - 1;
                this.renderSection(this.currentSection);
                this.showScreen('questionnaire-screen');
            });
        });

        this.showScreen('review-screen');
    }

    // Submission
    async submitAssessment() {
        if (!confirm('Tem certeza que deseja enviar o diagnóstico? Você não poderá mais editar suas respostas.')) {
            return;
        }

        // Submit to backend
        if (this.sessionId) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/api/diagnostics/${this.sessionId}/submit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        responses: this.responses
                    })
                });

                const data = await response.json();
                console.log('Diagnostic submitted:', data);

                // Clear session and redirect to results
                this.clearSession();
                window.location.href = `/resultado/${this.sessionId}`;
                return;
            } catch (error) {
                console.error('Error submitting diagnostic:', error);
                alert('Erro ao enviar diagnóstico. Por favor, tente novamente.');
                return;
            }
        }

        // Fallback if no backend session
        console.log('Assessment submitted (no backend):', {
            timestamp: new Date().toISOString(),
            responses: this.responses
        });

        this.clearSession();
        this.showScreen('completion-screen');
    }

    // Utilities
    slugify(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '_')
            .replace(/^-+|-+$/g, '');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DiagnosisApp();
});
