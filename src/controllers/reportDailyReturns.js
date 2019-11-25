const database = require('../db').getDb();
const moment = require('moment');

const reportDailyReturns = async (req, res, next) => {
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
            SELECT * FROM rents as Ren, returns as Ret, vehicles as V 
            WHERE Ren.vehicleLicense = V.vehicleLicense AND
                  Ren.rentId = Ret.rentId AND
                  city = "${branch.city}" AND 
                  location = "${branch.location}" AND 
                  Ret.date = "${date}" 
            ORDER BY V.vehicleTypeName `);
        results = JSON.parse(JSON.stringify(results));
        const dailyReturns = results[0];
        if (dailyReturns.length > 0)
            report.push({ branch, dailyReturns: [...dailyReturns] });
    }
    res.status(200).json(report);
};

module.exports = reportDailyReturns;