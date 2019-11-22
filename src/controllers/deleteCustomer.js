const database = require ('../db').getDb();

const deleteCustomer = async (req, res, next) => {
    // prepare & send query
    const driverLicense = req.params.id;
    await database.query(
        `DELETE FROM customers WHERE driverLicense ='${driverLicense}'`
    );

    // send response
    res.status(204).json(null);
};

module.exports = deleteCustomer;