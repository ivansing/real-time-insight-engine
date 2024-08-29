require('dotenv').config();
const {neon} = require('@neondatabase/serverless')

const DATABASE_URL = process.env.DATABASE_URL

const sql = neon(DATABASE_URL)

const DataModel = {
    async createRecord(key, value) {
        try {
            const result = await sql`
            INSERT INTO real_time_data (key, value)
            VALUES (${key}, ${value})
            RETURNING *;
        `;
        console.log(result)
        return result[0];
        } catch (error) {
            console.error('Error creating record from model:', error);
            throw error;
        }
        
    },

    async getAllRecords() {
        const result = await sql`
            SELECT * FROM real_time_data;
        `
        return result
    },

    async getRecordById(id) {
        try {
            const result = await sql`
            SELECT * FROM real_time_data
            WHERE id = ${id};
        
        `;
        console.log('Query result:', result)
        return result[0]
        } catch (error) {
            console.error('Failed to retrieve record from model', error)
            throw error;
        }
        
    },

    async updateRecord(id, key, value) {
        const result = await sql`
            UPDATE real_time_data
            SET key = ${key}, value = ${value}
            WHERE id = ${id}
            RETURNING *;
        `;
        return result;
    },

    async deleteRecord(id) {
        const result = await sql`
            DELETE FROM real_time_data
            WHERE id = ${id}
            RETURNING *;
        `;
        return result;
    }
}
console.log(DataModel.getRecordById(4))
module.exports = DataModel;