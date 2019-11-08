const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
let pool;

exports.initDb = () => {
    if (process.env.NODE_ENV === 'development')
        dotenv.config({ path: './config.env' });
    if (pool) {
        console.log('DB already connected! Do not reconnect!');
        throw new Error('DB already connected! Do not reconnect!');
    } else {
        // eslint-disable-next-line require-atomic-updates
        pool = mysql.createPool({
            host: process.env.DATABASE_IP,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            multipleStatements: true
        });
        // await pool.query(`USE superRentDatabase;`);
        console.log('👌 DB connected');
    }
};

exports.getDb = () => {
    if (!pool) {
        console.log('DB not connected! Connect first!');
        throw new Error('DB not connected! Connect first!');
    } else {
        return pool;
    }
};