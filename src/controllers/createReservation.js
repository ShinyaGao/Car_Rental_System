const database = require('../db').getDb();
const uuid = require('uuid/v4');


const createReservation = async (req, res, next) => {
    const confNum = uuid();
    const { vehicleTypeName, driverLicense } = req.body;
    const fromDate = req.body.fromDate.split('T')[0];
    const toDate = req.body.toDate.split('T')[0];

    await database.query(
        `
           CREATE TABLE IF NOT EXISTS reservations(
                confNum VARCHAR(50) PRIMARY KEY,
                vehicleTypeName VARCHAR(50) NOT NULL,
                driverLicense VARCHAR(50) NOT NULL,
                fromDate DATE NOT NULL,
                toDate DATE NOT NULL,
                CONSTRAINT reservation_vehicleType FOREIGN KEY (vehicleTypeName) REFERENCES vehicleTypes(vehicleTypeName) ON DELETE CASCADE,
                CONSTRAINT reservation_customer FOREIGN KEY (driverLicense) REFERENCES customers (driverLicense) ON DELETE CASCADE
            )
            `
    );

    await database.query(
        `
            INSERT INTO reservations(confNum, vehicleTypeName, driverLicense, fromDate, toDate)
            VALUES("${confNum}", "${vehicleTypeName}", "${driverLicense}", 
                STR_TO_DATE("${fromDate}", "%Y-%m-%d"), STR_TO_DATE("${toDate}", "%Y-%m-%d"));
        `
    );

    // send response
    res.status(201).json({confNum, vehicleTypeName, driverLicense, fromDate, toDate});
};

module.exports = createReservation;