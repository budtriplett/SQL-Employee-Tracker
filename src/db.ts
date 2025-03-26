import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employee_tracker_db',
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const connectDB = async (): Promise<void> => {
    try {
        await db.connect();
        console.log('Welcome to the Employee Tracker Database!');
        
        const res = await db.query('SELECT NOW()');
        console.log('Database connected at:', res.rows[0]);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
};
