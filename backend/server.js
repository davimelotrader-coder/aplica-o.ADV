// Legal Operations Diagnosis - Backend Server (PostgreSQL Version)
// Individual Assessment Model - No Data Mixing

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { pool, initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// API ROUTES
// ============================================

// 1. Create New Session
app.post('/api/session', async (req, res) => {
    try {
        const sessionId = uuidv4();
        const userAgent = req.headers['user-agent'];

        await pool.query(`
            INSERT INTO diagnostics (
                session_id, 
                status, 
                current_section, 
                responses, 
                metadata
            ) VALUES ($1, $2, $3, $4, $5)
        `, [
            sessionId,
            'in_progress',
            0,
            JSON.stringify({}),
            JSON.stringify({
                userAgent,
                startedAt: new Date().toISOString(),
                completedAt: null
            })
        ]);

        res.json({ sessionId });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
});

// 2. Save Progress
app.post('/api/diagnostics/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { currentSection, responses } = req.body;

        // Validate session ID (UUID format)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(sessionId)) {
            return res.status(400).json({ error: 'Invalid session ID' });
        }

        // Update diagnostic
        const result = await pool.query(`
            UPDATE diagnostics 
            SET current_section = $1,
                responses = $2,
                updated_at = NOW()
            WHERE session_id = $3
            RETURNING session_id
        `, [currentSection, JSON.stringify(responses), sessionId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving progress:', error);
        res.status(500).json({ error: 'Failed to save progress' });
    }
});

// 3. Get Diagnostic Data
app.get('/api/diagnostics/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Validate session ID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(sessionId)) {
            return res.status(400).json({ error: 'Invalid session ID' });
        }

        const result = await pool.query(`
            SELECT 
                session_id as "sessionId",
                created_at as "createdAt",
                updated_at as "lastUpdatedAt",
                status,
                current_section as "currentSection",
                responses,
                metadata
            FROM diagnostics
            WHERE session_id = $1
        `, [sessionId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving diagnostic:', error);
        res.status(500).json({ error: 'Failed to retrieve diagnostic' });
    }
});

// 4. Submit Final Diagnostic
app.post('/api/diagnostics/:sessionId/submit', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { responses } = req.body;

        // Validate session ID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(sessionId)) {
            return res.status(400).json({ error: 'Invalid session ID' });
        }

        // Calculate scores
        const scores = calculateScores(responses);

        // Update diagnostic to completed
        const result = await pool.query(`
            UPDATE diagnostics 
            SET status = 'completed',
                responses = $1,
                scores = $2,
                metadata = jsonb_set(metadata, '{completedAt}', to_jsonb($3::text)),
                updated_at = NOW()
            WHERE session_id = $4
            RETURNING session_id
        `, [
            JSON.stringify(responses),
            JSON.stringify(scores),
            new Date().toISOString(),
            sessionId
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.json({
            success: true,
            diagnosticId: sessionId,
            scores
        });
    } catch (error) {
        console.error('Error submitting diagnostic:', error);
        res.status(500).json({ error: 'Failed to submit diagnostic' });
    }
});

// 5. Get Results (for results page)
app.get('/api/results/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Validate session ID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(sessionId)) {
            return res.status(400).json({ error: 'Invalid session ID' });
        }

        const result = await pool.query(`
            SELECT 
                session_id as "sessionId",
                metadata->>'completedAt' as "completedAt",
                scores,
                responses
            FROM diagnostics
            WHERE session_id = $1 AND status = 'completed'
        `, [sessionId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Diagnostic not found or not completed' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving results:', error);
        res.status(500).json({ error: 'Failed to retrieve results' });
    }
});

// ============================================
// SCORING ENGINE
// ============================================

function calculateScores(responses) {
    const dimensions = {
        efficiency: 0,
        revenue: 0,
        client: 0,
        risk: 0,
        strategic: 0
    };

    // Count total responses per dimension (simplified mapping)
    let efficiencyCount = 0, revenueCount = 0, clientCount = 0, riskCount = 0, strategicCount = 0;

    // Section 1: Client Acquisition (affects efficiency and client)
    if (responses['1']) {
        efficiencyCount += Object.keys(responses['1']).length;
        clientCount += Object.keys(responses['1']).length;
    }

    // Section 2: Matter Management (affects efficiency)
    if (responses['2']) {
        efficiencyCount += Object.keys(responses['2']).length;
    }

    // Section 3: Time & Billing (affects revenue)
    if (responses['3']) {
        revenueCount += Object.keys(responses['3']).length;
    }

    // Section 4: Document Production (affects efficiency)
    if (responses['4']) {
        efficiencyCount += Object.keys(responses['4']).length;
    }

    // Section 5: Client Communication (affects client)
    if (responses['5']) {
        clientCount += Object.keys(responses['5']).length;
    }

    // Section 6: Financial Operations (affects revenue)
    if (responses['6']) {
        revenueCount += Object.keys(responses['6']).length;
    }

    // Section 7: Team Collaboration (affects efficiency)
    if (responses['7']) {
        efficiencyCount += Object.keys(responses['7']).length;
    }

    // Section 8: Technology (affects efficiency)
    if (responses['8']) {
        efficiencyCount += Object.keys(responses['8']).length;
    }

    // Section 9: Compliance & Risk (affects risk)
    if (responses['9']) {
        riskCount += Object.keys(responses['9']).length;
    }

    // Section 10: Strategic Planning (affects strategic)
    if (responses['10']) {
        strategicCount += Object.keys(responses['10']).length;
    }

    // Calculate scores (0-100) - simplified baseline scoring
    dimensions.efficiency = Math.min(100, (efficiencyCount / 25) * 70 + Math.random() * 20);
    dimensions.revenue = Math.min(100, (revenueCount / 10) * 70 + Math.random() * 20);
    dimensions.client = Math.min(100, (clientCount / 10) * 70 + Math.random() * 20);
    dimensions.risk = Math.min(100, (riskCount / 5) * 70 + Math.random() * 20);
    dimensions.strategic = Math.min(100, (strategicCount / 5) * 70 + Math.random() * 20);

    // Round to integers
    Object.keys(dimensions).forEach(key => {
        dimensions[key] = Math.round(dimensions[key]);
    });

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
        dimensions.revenue * 0.30 +
        dimensions.efficiency * 0.25 +
        dimensions.client * 0.20 +
        dimensions.risk * 0.15 +
        dimensions.strategic * 0.10
    );

    return {
        overall: overallScore,
        dimensions,
        interpretation: getInterpretation(overallScore),
        completedAt: new Date().toISOString()
    };
}

function getInterpretation(score) {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Regular';
    return 'Necessita Atenção';
}

// ============================================
// SERVE FRONTEND
// ============================================

// Results page
app.get('/resultado/:sessionId', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/resultado.html'));
});

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ============================================
// START SERVER
// ============================================

async function startServer() {
    try {
        // Initialize database schema
        await initializeDatabase();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`✅ Legal Ops Diagnosis Server running on http://localhost:${PORT}`);
            console.log(`🗄️  PostgreSQL database connected`);
            console.log(`🔒 Individual assessment model - No data mixing`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
