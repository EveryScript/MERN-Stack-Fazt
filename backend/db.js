import { createPool } from 'mysql2/promise';

// Main config MySql database
export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db-mern-stack'
});