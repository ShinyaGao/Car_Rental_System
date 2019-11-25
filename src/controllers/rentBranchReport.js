const database = require ('../db').getDb();

const rentBranchReport = async(req, res, next) => {
    const {date, branch} = req.params.id;

    let allVehicles = await database.query(`
    SELECT *
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d")
                  AND   V.city == "${branch}")
    ORDER BY vehicleTypeName NO ASC
    `);
    allVehicles = JSON.parse(JSON.stringify(allVehicles));
    const vehicles = allVehicles[0][0];

    let rentalsPerVehicles = await database.query(`
    SELECT COUNT(*), vehicleTypeName
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d")
                  AND   V.city == "${branch}")
    GROUP BY vehicleTypeName
    `);
    rentalsPerVehicles = JSON.parse(JSON.stringify(rentalsPerVehicles));
    const perVehicles = rentalsPerVehicles[0][0];

    let totalRentals = await database.query(`
    SELECT COUNT(*)
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM rents R
                  WHERE V.vehicleLicense == R.vehicleLicense
                  AND   R.fromDate == STR_TO_DATE("${date}", "%y-%m-%d")
                  AND   V.city == ${branch})
    `);
    totalRentals = JSON.parse(JSON.stringify(totalRentals));
    const total = totalRentals[0][0]['COUNT(*)'];

    const data = {
        'list': vehicles,
        'byType': perVehicles,
        'total': total
    };
    res.status(200).json(data);
};
module.exports = rentBranchReport;