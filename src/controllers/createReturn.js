const database = require('../db').getDb();
const moment = require('moment');
moment().format();


const createReturn = async (req, res, next) => {
    const rentId = req.body.rentId;
    const endDate = req.body.date.split('T')[0];

    await database.query(
        `
                CREATE TABLE IF NOT EXISTS returns(
                    rentId VARCHAR(50) PRIMARY KEY,
                    date DATE NOT NULL,
                    price INT NOT NULL,
                    CONSTRAINT return_rent FOREIGN KEY (rentId) REFERENCES rents(rentId) ON DELETE CASCADE
            )
            `
    );
    // calculate price
    // given rentId, get rent, then get vehicleLicence and fromDate of the rent
    let rent = await database.query(`SELECT * FROM rents WHERE rentId = "${rentId}"`);
    rent = JSON.parse(JSON.stringify(rent));
    const vehicleLicense = rent[0][0].vehicleLicense;
    const fromDate = rent[0][0].fromDate.split('T')[0];
    const diffDays = moment(endDate).diff(moment(fromDate), 'days') + 1;

    // given vehicleLicense, get vehicle, then get vehicleType of the vehicle
    let vehicle = await database.query(
        `SELECT * FROM vehicles WHERE vehicleLicense = "${vehicleLicense}"`
    );
    vehicle = JSON.parse(JSON.stringify(vehicle));
    const vehicleTypeName = vehicle[0][0].vehicleTypeName;
    let vehicleType = await database.query(
        `SELECT * FROM vehicleTypes WHERE vehicleTypeName = "${vehicleTypeName}"`
    );
    vehicleType = JSON.parse(JSON.stringify(vehicleType));

    // given vehicleType, get dayRate of the type, and calculate price of the rent
    const dayRate = vehicleType[0][0].dayRate;
    const price = dayRate * diffDays;

    // send query
    await database.query(
        `
            INSERT INTO returns(rentId, date, price)
            VALUES("${rentId}", STR_TO_DATE("${endDate}", "%Y-%m-%d"), ${price});
        `
    );
    let results = await database.query(`SELECT * FROM returns where rentId = "${rentId}"`);

    results = JSON.parse(JSON.stringify(results));
    const createdReturn = results[0][0];
    createdReturn.id = createdReturn.rentId;

    // send response
    res.status(201).json(createdReturn);
};

module.exports = createReturn;