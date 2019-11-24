const database = require ('../db').getDb();
const uuid = require('uuid/v4');
// create Rent
const createRent = async (req, res, next) => {
    const rentId = uuid();
    const {vehicleLicense, driverLicense} = req.body;
    const fromDate = req.body.fromDate.split('T')[0];
    const toDate = req.body.toDate.split('T')[0];
    const confNum = req.body.confNum;


    await database.query(`CREATE TABLE IF NOT EXISTS rents(
            rentId VARCHAR(50) PRIMARY KEY,
            vehicleLicense VARCHAR(50) NOT NULL,
            driverLicense VARCHAR(50) NOT NULL,
            fromDate DATE NOT NULL,
            toDate DATE NOT NULL,
            confNum VARCHAR(255) UNIQUE,
            CONSTRAINT rent_vehicle FOREIGN KEY (vehicleLicense) REFERENCES vehicles(vehicleLicense) ON DELETE CASCADE,
            CONSTRAINT rent_customer FOREIGN KEY (driverLicense) REFERENCES customers(driverLicense) ON DELETE CASCADE
    )`);

    const query = confNum
        ? `
             INSERT INTO rents(rentId, vehicleLicense, driverLicense, fromDate, toDate, confNum)
                VALUES("${rentId}", "${vehicleLicense}", "${driverLicense}",
                        STR_TO_DATE("${fromDate}", "%Y-%m-%d"), STR_TO_DATE("${toDate}", "%Y-%m-%d"),
                        "${confNum}");
           `
        : `
         INSERT INTO rents(rentId, vehicleLicense, driverLicense, fromDate, toDate, confNum)
                VALUES("${rentId}", "${vehicleLicense}", "${driverLicense}",
                        STR_TO_DATE("${fromDate}", "%Y-%m-%d"), STR_TO_DATE("${toDate}", "%Y-%m-%d"),
                        NULL);
        `;

    await database.query(query);
    let results = await database.query(`SELECT * FROM rents WHERE rentId = '${rentId}';`);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const createdRent = results[0][0];
    createdRent.id = createdRent.rentId;

    // send response
    res.status(201).json(createdRent);

};

module.exports = createRent;