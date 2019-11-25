const database = require ('../db').getDb();

const returnBranchReport = async(res, req, next) => {
    const {date, branch} = req.params.id;

    let allVehicles = await database.query(`
    SELECT * FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM returns R1, rents R2
                  WHERE R1.rentId == R2.rendId
                  AND   V.vehicleLicense == R2.vehicleLicense
                  AND   STR_TO_DATE("${date}", %y-%m-%d) == R1.date
                  AND   V.city == "${branch}")
    ORDER BY vehicleTypeName
    `);
    allVehicles = JSON.parse(JSON.stringify(allVehicles));
    const vehicles = allVehicles[0][0];

    let perCategory = await database.query(`
    SELECT COUNT(*), vehicleTypeName FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM returns R1, rents R2
                  WHERE R1.rentId == R2.rendId
                  AND   V.vehicleLicense == R2.vehicleLicense
                  AND   STR_TO_DATE("${date}", %y-%m-%d) == R1.date
                  AND   V.city == "${branch}")
    GROUP BY vehicleTypeName
    `);
    perCategory = JSON.parse(JSON.stringify(perCategory));
    const categorize = perCategory[0][0];

    let revenue = await database.query(`
    SELECT vehicleTypeName, (SELECT SUM(R1.price)
                             FROM   returns R1, rents R2
                             WHERE  R1.rentId == R2.rendId
                             AND    R2.vehicleLicense == V.vehicleLicense
                             AND    STR_TO_DATE("${date}", "%y-%m-%d") == R1.date
                             AND    V.city == "${branch}") AS revenue
    FROM vehicles AS V
    GROUP BY vehicleTypeName
    `);
    revenue = JSON.parse(JSON.stringify(revenue));
    const rev = revenue[0][0];

    let vehicleInBranch = await database.query(`
    SELECT COUNT(*)
    FROM vehicles AS V
    WHERE EXISTS (SELECT *
                  FROM returns R1, rents R2
                  WHERE R1.rentId == R2.rendId
                  AND   V.vehicleLicense == R2.vehicleLicense
                  AND   STR_TO_DATE("${date}", "%y-%m-%d") == R1.date
                  AND   V.city == "${branch}")
    `);
    vehicleInBranch = JSON.parse(JSON.stringify(vehicleInBranch));
    const branchCar = vehicleInBranch[0][0]['COUNT(*)'];

    let total = await database.query(`
    SELECT (SELECT SUM(R1.price)
                  FROM   returns R1, rents R2
                  HERE   R1.rentId == R2.rendId
                  AND    R2.vehicleLicense == V.vehicleLicense
                  AND    STR_TO_DATE("${date}", "%y-%m-%d") == R1.date
                  AND    V.city == "${branch}") AS total
    FROM vehicles AS V
    `);
    total = JSON.parse(JSON.stringify(total));
    const sum = total[0][0]['SUM(*)'];

    let data = {
        'vehicles': vehicles,
        'perCategory': categorize,
        'revenue': rev,
        'perBranch': branchCar,
        'total': sum
    };
    res.status(200).json(data);
};
module.exports = returnBranchReport;