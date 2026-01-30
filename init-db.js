require('dotenv').config({ path: '.env.local' });
const { initializeDatabase, pool } = require('./db');

async function run() {
    try {
        console.log('Connecting to database...');
        await initializeDatabase();
        console.log('✅ Initialization complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to initialize:', error);
        process.exit(1);
    }
}

run();
