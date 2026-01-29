const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

// Initialize database schema
async function initializeDatabase() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS diagnostics (
                session_id UUID PRIMARY KEY,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                status VARCHAR(20) DEFAULT 'in_progress',
                current_section INTEGER DEFAULT 0,
                responses JSONB DEFAULT '{}',
                scores JSONB,
                metadata JSONB DEFAULT '{}'
            );
        `);

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_status ON diagnostics(status);
        `);

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_created_at ON diagnostics(created_at);
        `);

        console.log('✅ Database schema initialized');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    pool,
    initializeDatabase
};
