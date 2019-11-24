const database = require ('../db').getDb();

const moment = require('moment');

// eslint-disable-next-line no-unused-vars
const updateVehicleAvailability = async (req, res, next) => {
    const today = moment().format('YYYY-MM-DD');
    let results = await database.query(
        `SELECT * FROM rents where "${today}" >= fromDate AND "${today}" <= toDate`
    );
    results = JSON.parse(JSON.stringify(results));
    let rents = results[0];

    results = await database.query(`SELECT rentId from returns`);
    results = JSON.parse(JSON.stringify(results));
    // rentId's of returned rents
    const returnedRents = results[0].map(r => r.rentId);
    rents = rents.filter(rent => !returnedRents.includes(rent.rentId));

    const rentedVehicles = rents.map(rent => rent.vehicleLicense);

    await database.query(
        'UPDATE vehicles SET status = "available" WHERE status <> "maintenance";'
    );
    let updateAvailabilityQuery = '';
    for (const rentedVehicle of rentedVehicles) {
        updateAvailabilityQuery += `UPDATE vehicles SET status = "rented" WHERE vehicleLicense = "${rentedVehicle}";`;
    }
    await database.query(updateAvailabilityQuery);
    return next();
};

module.exports = updateVehicleAvailability;