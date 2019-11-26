const database = require('../db').getDb();
const moment = require('moment');

const reportDailyRents = async (req, res, next) => {
    let results = await database.query(`
        SELECT * FROM (SELECT DISTINCT city from vehicles) AS cities, 
                      (SELECT DISTINCT location from vehicles) AS locations 
                 ORDER BY city, location`);
    results = JSON.parse(JSON.stringify(results));
    let branches = results[0];

    let report = [];
    const date = moment().format('YYYY-MM-DD');
    for (const branch of branches) {
        let results = await database.query(`
            SELECT * FROM rents as R, vehicles as V 
            WHERE R.vehicleLicense = V.vehicleLicense AND 
                  city = "${branch.city}" AND 
                  location = "${branch.location}" AND 
                  fromDate = "${date}" 
            ORDER BY V.vehicleTypeName `);
        results = JSON.parse(JSON.stringify(results));
        const dailyRents = results[0];
        if (dailyRents.length > 0)
            report.push({ branch, dailyRents: [...dailyRents] });
    }
    res.status(200).json(report);
};

module.exports = reportDailyRents;