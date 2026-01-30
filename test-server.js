// Test script to verify admin authentication locally
require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool } = require('./db');

const path = require('path');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'public' directory
// Serve static files from 'public' directory
const publicPath = path.join(__dirname, 'public');
console.log('📂 Serving static files from:', publicPath);
app.use(express.static(publicPath));

// Test endpoint
router.get('/test', (req, res) => {
    res.json({
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        env: {
            hasAdminUser: !!process.env.ADMIN_USER,
            adminUser: process.env.ADMIN_USER,
            hasAdminPassword: !!process.env.ADMIN_PASSWORD,
            adminPassword: process.env.ADMIN_PASSWORD,
            hasDatabaseUrl: !!process.env.DATABASE_URL
        }
    });
});

// Admin route
router.get('/admin/diagnostics', async (req, res) => {
    console.log('Admin route called!');
    console.log('Headers:', req.headers);

    try {
        const authHeader = req.headers.authorization;
        console.log('Auth header:', authHeader);

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            console.log('No auth header or wrong format');
            return res.status(401).json({ error: 'Authentication required' });
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        console.log('Received username:', username);
        console.log('Expected username:', process.env.ADMIN_USER);
        console.log('Received password:', password);
        console.log('Expected password:', process.env.ADMIN_PASSWORD);

        const adminUser = process.env.ADMIN_USER || 'admin@admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

        if (username !== adminUser || password !== adminPassword) {
            console.log('Credentials mismatch!');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log('Authentication successful!');

        const result = await pool.query(`
            SELECT 
                session_id,
                created_at,
                status,
                scores
            FROM diagnostics
            ORDER BY created_at DESC
            LIMIT 5
        `);

        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Simulate Production State (Broken)
// app.use('/', router); 

// Correct State
// app.use('/api', router);

// Let's test the CORRECT state to confirm it works
app.use('/api', router);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🚀 Test server running at http://localhost:${PORT}`);
    console.log(`\nTest with curl:`);
    console.log(`  curl http://localhost:${PORT}/api/test`); // Should work
    console.log(`\nAdmin curl:`);
    console.log(`  curl -u "admin@admin:admin" http://localhost:${PORT}/api/admin/diagnostics`);
});
