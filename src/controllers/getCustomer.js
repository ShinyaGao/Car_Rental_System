const database = require ('../db').getDb();

const getCustomer = async (req, res, next) => {
    // prepare & send query
    const driverLicense = req.params.id;
    let results = await database.query(
        `SELECT * FROM customers where driverLicense = '${driverLicense}';`
    );

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const customer = results[0][0];
    customer.id = customer.driverLicense;

    // send response
    return res.status(200).json(customer);
};

module.exports = getCustomer;