const database = require ('../db').getDb();

const createCustomer = async function(req, res, next) {
    const { driverLicense, phone, name } = req.body;


    await database.query(`CREATE TABLE IF NOT EXISTS customers(
        name VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        driverLicense VARCHAR(20) PRIMARY KEY
    )`);

    await database.query(`INSERT INTO customers(name, phone, driverLicense)
    VALUES("${name}", "${phone}", "${driverLicense}")
    `);

    res.status(201)
};

module.exports = createCustomer;