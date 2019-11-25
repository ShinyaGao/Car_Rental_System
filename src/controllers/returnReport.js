const database = require ('../db').getDb();

const returnReport = async(res, req, next) => {
    const date = req.params.id;

    let allVehicles = await database.query(`
    SELECT * FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM returns R1, rents R2
                  WHERE R1.rentId == R2.rendId
                  AND   V.vehicleLicense == R2.vehicleLicense
                  AND   "${date}" == R1.date)
    ORDER BY city, vehicleTypeName
    `);
    allVehicles = JSON.parse(JSON.stringify(allVehicles));
    const vehicles = allVehicles[0][0];

    let perCategory = await database.query(`
    SELECT COUNT(*), vehicleTypeName FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM returns R1, rents R2
                  WHERE R1.rentId == R2.rendId
                  AND   V.vehicleLicense == R2.vehicleLicense
                  AND   "${date}" == R1.date)
    GROUP BY vehicleTypeName
    `);
    perCategory = JSON.parse(JSON.stringify(perCategory));
    const categorize = perCategory[0][0];

    let revenue = await database.query(`
    SELECT vehicleTypeName, (SELECT SUM(R1.price)
                             FROM   returns R1, rents R2
                             WHERE  R1.rentId == R2.rendId
                             AND    R2.vehicleLicense == V.vehicleLicense
                             AND    "${date}" == R1.date) AS revenue
    FROM vehicles AS V
    GROUP BY vehicleTypeName
    `);
    revenue = JSON.parse(JSON.stringify(revenue));
    const rev = revenue[0][0];

    let vehicleInBranch = await database.query(`
    SELECT COUNT(*), city
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM returns R1, rents R2
                  WHERE R1.rentId == R2.rendId
                  AND   V.vehicleLicense == R2.vehicleLicense
                  AND   "${date}" == R1.date)
    GROUP BY city
    `);
    vehicleInBranch = JSON.parse(JSON.stringify(vehicleInBranch));
    const branchCar = vehicleInBranch[0][0];

    let branchSubtotal = await database.query(`
    SELECT city, (SELECT SUM(R1.price)
                  FROM   returns R1, rents R2
                  HERE   R1.rentId == R2.rendId
                  AND    R2.vehicleLicense == V.vehicleLicense
                  AND    "${date}" == R1.date) AS subRevenue
    FROM vehicles AS V
    GROUP BY city
    `);
    branchSubtotal = JSON.parse(JSON.stringify(branchSubtotal));
    const branchRev = branchSubtotal[0][0];

    let total = await database.query(`
    SELECT SUM(price)
    FROM returns AS R
    WHERE R.date == "${date}"
    `);
    total = JSON.parse(JSON.stringify(total));
    const sum = total[0][0]['SUM(*)'];

    let data = {
        'vehicles': vehicles,
        'perCategory': categorize,
        'revenue': rev,
        'perBranch': branchCar,
        'branchRev': branchRev,
        'total': sum
    };
    res.status(200).json(data);
};
module.exports = returnReport;