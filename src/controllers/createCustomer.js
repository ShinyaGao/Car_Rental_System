const database = require ('../db').getDb();
// create customer, template dfdf
const createCustomer = async function(req, res, next) {
    const {driverLicense, phone, name } = req.body;


    await database.query(`CREATE TABLE IF NOT EXISTS customers(
        name VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        driverLicense VARCHAR(20) PRIMARY KEY
    )`);

    await database.query(`INSERT INTO customers(name, phone, driverLicense)
    VALUES("${name}", "${phone}", "${driverLicense}")
    `);

    return res.status(201).json({driverLicense, phone, name});
};

module.exports = createCustomer;