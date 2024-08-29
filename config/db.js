require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
    const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);


    const connectDB = async () => {
        try {
            await sql`SELECT version();`;
            console.log('Connected to PostgreSQL');
            return sql;
        } catch (error) {
            console.error('Failed to connect to PostgreSQL:', error);
            throw error;
        }
    };
    
module.exports = connectDB;

