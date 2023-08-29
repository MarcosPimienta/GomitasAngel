import mysql from "mysql2/promise";

// Create a connection pool (recommended for production use)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'baloo',
    database: 'GummyStore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export { pool };