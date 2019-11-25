const database = require ('../db').getDb();

//const SuperRentError = require('../../util/SuperRentError');

const updateCustomer = async (req, res, next) => {
    // prepare query
   // const prevDriverLicense = req.params.id;
    const { driverLicense, phone, name } = req.body;

    let results;

    // send query
    await database.query(
        `
            UPDATE customers
            SET name = "${name}",
                phone = "${phone}",
                driverLicense = "${driverLicense}"
                WHERE driverLicense = '${req.params.id}';
        `
    );

    results = await database.query(
        `SELECT * FROM customers WHERE driverLicense = '${driverLicense}';`
    );

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const updatedCustomer = results[0][0];
    updatedCustomer.id = updatedCustomer.driverLicense;

    // send response
    res.status(200).json(updatedCustomer);
};

module.exports = updateCustomer;