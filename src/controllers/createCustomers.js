const database = require ('../../db').getDb();

const createCustomer = async function(req, res, next) {
    await database.query(`CREATE TABLE customers(
        name VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        driverLicense VARCHAR(20) PRIMARY KEY
    )`)
}

module.exports = createCustomer;