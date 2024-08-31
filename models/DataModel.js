import Database from "../config/db.js";
import ErrorHandling from "../utils/ErrorHandling.js";

export default class DataModel {
    constructor() {
        this.database = new Database();
        this.sql = this.database.sql;
    }
    async createRecord(key, value) {
        try {
            console.log("Key from datamodel", key, " and value ", value)

            const normalizeKey = key.toLowerCase();
            const normalizeValue = value.toLowerCase();
            // Check if a record with the same key already
            const existingRecord = await this.sql`
                SELECT *
                FROM real_time_data
                WHERE LOWER(key) = ${normalizeKey} AND LOWER(value) = ${normalizeValue}
                LIMIT 1;
            `;

            if (existingRecord.length > 0) {
                throw new Error('This record already exists')
            }

            const result = await this.sql`
            INSERT INTO real_time_data (key, value)
            VALUES (${key}, ${value})
            RETURNING *;
        `;

            return result[0];
        } catch (error) {
            console.error('Error creating record from model:', error);
            throw error;
        }

    }

    async getRecordByKey(key) {
        try {
            const result = await this.sql`
                SELECT * FROM real_time_data
                WHERE key = ${key}
            `;
            return result[0]
        } catch (error) {
            console.error('Error retrieving record by key:', error)
            throw error;
        }
    }

    async getAllRecords() {
        try {
            const result = await this.sql`
            SELECT * FROM real_time_data;
        `
            return result
        } catch (error) {
            console.error('Error in getAllRecords:', error)
            throw error;
        }

    }

    async getRecordById(id) {
        try {
            const result = await this.sql`
            SELECT * FROM real_time_data
            WHERE id = ${id};
        
        `;
            return result[0]
        } catch (error) {
            console.error('Failed to retrieve record from model', error)
            throw error;
        }

    }

    async updateRecord(id, key, value) {
        const result = await this.sql`
            UPDATE real_time_data
            SET key = ${key}, value = ${value}
            WHERE id = ${id}
            RETURNING *;
        `;
        return result;
    }

    async deleteRecord(id) {
        const result = await this.sql`
            DELETE FROM real_time_data
            WHERE id = ${id}
            RETURNING *;
        `;
        return result;
    }
}
// async function testConnection() {
//     try {
//         const result = await sql`SELECT version();`;
//         console.log('Connected to PostgreSQL', result);
//     } catch (error) {
//         console.error('Failed to connect:', error);
//     }
// }

// testConnection();

// (async () => {
//     const data = new BaseModel();
//     try {
//         const records = await data.getAllRecords();
//         console.log('All records', records);
//     } catch (error) {
//         console.error('Error fetching all records:', error);
//     }
// })();
