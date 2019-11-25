const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
let pool;

exports.initDb = async () => {
    //if (process.env.NODE_ENV === 'development')
    console.log(dotenv);
        dotenv.config({ path: '../config.env' });

    console.log(`${process.env.DATABASE_IP}`);

    if (pool) {
        console.log('DB already connected! Do not reconnect!');
        throw new Error('DB already connected! Do not reconnect!');
    } else {
        // eslint-disable-next-line require-atomic-updates
        pool = await mysql.createConnection({
            // host: process.env.DATABASE_IP,
            // database: process.env.DATABASE_NAME,
            // user: process.env.DATABASE_USER,
            // password: process.env.DATABASE_PASSWORD,

            host: '35.185.198.213',
            database: 'car_rental',
            user: 'root',
            password: 'a24572521',
            multipleStatements: true
            //port: 3307
        });

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