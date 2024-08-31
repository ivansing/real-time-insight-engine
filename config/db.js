import 'dotenv/config'
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

const sql = neon(DATABASE_URL)

export default class Database {
    constructor() {
        this.sql = sql;
    }

    async connect() {
        if (!this.sql) {
            throw new Error('Database connection is not initialized.');
        }

        try {
            const result = await this.sql`SELECT version();`;
            console.log('Connected to PostgreSQL', result);
            return this.sql;
        } catch (error) {
            console.error('Failed to connect to PostgreSQL:', error);
            throw error;
        }
    }
}






