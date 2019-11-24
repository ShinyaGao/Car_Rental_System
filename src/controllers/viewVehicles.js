const database = require ('../db').getDb();
// view vehicles
const viewVehicles = async(req, res, next) => {
    const {type, location, fromDate, toDate} = req.params.id;

    // prepare and send query?
    let results = await database.query(`
    SELECT * FROM vehicles AS V1
    WHERE NOT EXISTS (SELECT * FROM reservations A
                      WHERE (TIME '${fromDate}' ,TIME '${toDate}')
                      OVERLAPS (TIME A.fromDate, TIME A.toDate)
                      AND A.vid == V1.vid
                      AND V1.location == '${location}'
                      AND V1.type == '${type}')
    INTERSECT
    SELECT * FROM vehicles AS V2
    WHERE NOT EXISTS (SELECT * FROM rents B
                      WHERE (TIME '${fromDate}' ,TIME '${toDate}')
                      OVERLAPS (TIME B.fromDate, TIME B.toDate)
                      AND B.vid == V2.vid
                      AND V2.location == '${location}'
                      AND V2.type == '${type}')
    `);

    // prepare results
    results = JSON.parse(JSON.stringify(results));
    const vehicleData = results[0][0];

    let count = await dababase

    res.status(200).json(vehicleData);
};

module.exports = viewVehicles;