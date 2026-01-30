const { pool } = require('../db');

// Admin API Handler
exports.handler = async (event, context) => {
    // Only allow GET method
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Check authentication
        const authHeader = event.headers.authorization || event.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'WWW-Authenticate': 'Basic realm="Admin Panel"'
                },
                body: JSON.stringify({ error: 'Authentication required' })
            };
        }

        // Decode and validate credentials
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        // Validate against environment variables
        const adminUser = process.env.ADMIN_USER || 'admin@admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

        if (username !== adminUser || password !== adminPassword) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'WWW-Authenticate': 'Basic realm="Admin Panel"'
                },
                body: JSON.stringify({ error: 'Invalid credentials' })
            };
        }

        // Fetch all diagnostics from database
        const result = await pool.query(`
            SELECT 
                session_id,
                created_at,
                updated_at,
                status,
                current_section,
                responses,
                scores,
                metadata
            FROM diagnostics
            ORDER BY created_at DESC
        `);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            body: JSON.stringify(result.rows)
        };

    } catch (error) {
        console.error('Admin API Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to fetch diagnostics',
                message: error.message
            })
        };
    }
};
