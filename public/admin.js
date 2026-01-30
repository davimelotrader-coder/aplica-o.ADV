// Admin Panel JavaScript
const API_BASE = '/api';

// Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const exportBtn = document.getElementById('exportBtn');
const tableContainer = document.getElementById('tableContainer');

// Stats elements
const totalDiagnosticsEl = document.getElementById('totalDiagnostics');
const completedDiagnosticsEl = document.getElementById('completedDiagnostics');
const avgScoreEl = document.getElementById('avgScore');

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '🔒';
});

// Check if already logged in
if (sessionStorage.getItem('adminAuth')) {
    showDashboard();
}

// Login form handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loginError.style.display = 'none';

    try {
        // Encode credentials
        const auth = btoa(`${username}:${password}`);
        sessionStorage.setItem('adminAuth', auth);

        // Try to fetch diagnostics to validate credentials
        const response = await fetch(`${API_BASE}/admin/diagnostics`, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }

        showDashboard();
    } catch (error) {
        loginError.textContent = error.message || 'Erro ao fazer login. Verifique suas credenciais.';
        loginError.style.display = 'block';
        sessionStorage.removeItem('adminAuth');
    }
});

// Logout handler
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('adminAuth');
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

// Show dashboard
async function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    await loadDiagnostics();
}

// Load diagnostics
async function loadDiagnostics() {
    try {
        const auth = sessionStorage.getItem('adminAuth');
        const response = await fetch(`${API_BASE}/admin/diagnostics`, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar diagnósticos');
        }

        const data = await response.json();
        displayDiagnostics(data);
    } catch (error) {
        tableContainer.innerHTML = `<div class="error" style="display: block;">Erro: ${error.message}</div>`;
    }
}

// Display diagnostics
function displayDiagnostics(diagnostics) {
    // Update stats
    const completed = diagnostics.filter(d => d.status === 'completed');
    const avgScore = completed.length > 0
        ? Math.round(completed.reduce((sum, d) => sum + (d.scores?.overall || 0), 0) / completed.length)
        : 0;

    totalDiagnosticsEl.textContent = diagnostics.length;
    completedDiagnosticsEl.textContent = completed.length;
    avgScoreEl.textContent = avgScore;

    // Create table
    if (diagnostics.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: #666;">Nenhum diagnóstico encontrado.</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Session ID</th>
                <th>Status</th>
                <th>Pontuação Geral</th>
                <th>Eficiência</th>
                <th>Receita</th>
                <th>Cliente</th>
                <th>Risco</th>
                <th>Estratégico</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            ${diagnostics.map(d => createRow(d)).join('')}
        </tbody>
    `;

    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Create table row
function createRow(diagnostic) {
    const date = new Date(diagnostic.created_at).toLocaleDateString('pt-BR');
    const sessionId = diagnostic.session_id.substring(0, 8) + '...';
    const status = diagnostic.status === 'completed' ? '✅ Completo' : '⏳ Em Progresso';
    const overall = diagnostic.scores?.overall || '-';
    const dimensions = diagnostic.scores?.dimensions || {};

    const scoreClass = overall >= 80 ? 'score-high' : overall >= 60 ? 'score-medium' : overall >= 40 ? 'score-medium' : 'score-low';

    return `
        <tr>
            <td>${date}</td>
            <td title="${diagnostic.session_id}">${sessionId}</td>
            <td>${status}</td>
            <td><span class="score ${scoreClass}">${overall}</span></td>
            <td>${dimensions.efficiency || '-'}</td>
            <td>${dimensions.revenue || '-'}</td>
            <td>${dimensions.client || '-'}</td>
            <td>${dimensions.risk || '-'}</td>
            <td>${dimensions.strategic || '-'}</td>
            <td>
                <button class="view-btn" onclick="viewResults('${diagnostic.session_id}')">
                    👁️ Ver
                </button>
            </td>
        </tr>
    `;
}

// View results
function viewResults(sessionId) {
    window.open(`/resultado/${sessionId}`, '_blank');
}

// Export to CSV
exportBtn.addEventListener('click', async () => {
    try {
        const auth = sessionStorage.getItem('adminAuth');
        const response = await fetch(`${API_BASE}/admin/diagnostics`, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao exportar dados');
        }

        const diagnostics = await response.json();
        const csv = convertToCSV(diagnostics);
        downloadCSV(csv, `diagnosticos_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
        alert('Erro ao exportar: ' + error.message);
    }
});

// Convert to CSV
function convertToCSV(diagnostics) {
    const headers = [
        'Data de Criação',
        'Session ID',
        'Status',
        'Data de Conclusão',
        'Pontuação Geral',
        'Eficiência Operacional',
        'Proteção de Receita',
        'Experiência do Cliente',
        'Gestão de Riscos',
        'Visibilidade Estratégica'
    ];

    const rows = diagnostics.map(d => {
        const createdDate = new Date(d.created_at).toLocaleString('pt-BR');
        const completedDate = d.metadata?.completedAt
            ? new Date(d.metadata.completedAt).toLocaleString('pt-BR')
            : '-';

        return [
            createdDate,
            d.session_id,
            d.status === 'completed' ? 'Completo' : 'Em Progresso',
            completedDate,
            d.scores?.overall || '-',
            d.scores?.dimensions?.efficiency || '-',
            d.scores?.dimensions?.revenue || '-',
            d.scores?.dimensions?.client || '-',
            d.scores?.dimensions?.risk || '-',
            d.scores?.dimensions?.strategic || '-'
        ];
    });

    const csvContent = [
        headers.join(';'),
        ...rows.map(row => row.join(';'))
    ].join('\n');

    // Add BOM for Excel UTF-8 support
    return '\uFEFF' + csvContent;
}

// Download CSV
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
