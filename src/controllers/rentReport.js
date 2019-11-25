const database = require ('../db').getDb();

const rentReport = async(req, res, next) => {
    const date = req.params.id;
    // obtain 4 pieces of information:
    // all vehicles sorted
    // number of rentals per vehicle
    // number of rentals per branch
    // total number of rentals
    let allVehicles = await database.query(`
    SELECT *
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d"))
    ORDER BY city, vehicleTypeName NO ASC
    `);
    allVehicles = JSON.parse(JSON.stringify(allVehicles));
    const vehicles = allVehicles[0][0];

    let rentalsPerVehicles = await database.query(`
    SELECT COUNT(*), vehicleTypeName
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d"))
    GROUP BY vehicleTypeName
    `);
    rentalsPerVehicles = JSON.parse(JSON.stringify(rentalsPerVehicles));
    const perVehicles = rentalsPerVehicles[0][0];

    let rentalsPerBranch = await database.query(`
    SELECT COUNT(*), city
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d"))
    GROUP BY city
    `);
    rentalsPerBranch = JSON.parse(JSON.stringify(rentalsPerBranch));
    const perBranch = rentalsPerBranch[0][0];

    let totalRentals = await database.query(`
    SELECT COUNT(*)
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d"))
    `);
    totalRentals = JSON.parse(JSON.stringify(totalRentals));
    const total = totalRentals[0][0]['COUNT(*)'];

    const data = {
        'list': vehicles,
        'byType': perVehicles,
        'byBranch': perBranch,
        'total': total
    };
    res.status(200).json(data);
};
module.exports = rentReport;