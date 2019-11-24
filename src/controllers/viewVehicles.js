const database = require ('../db').getDb();
// view vehicles
const viewVehicles = async(req, res, next) => {
    const {type, location, fromDate, toDate} = req.params.id;

    // prepare and send query?
    var tlquery;
    if (type == null && location == null) {
        tlquery = ``;
    }
    else if (type != null && location != null) {
        tlquery = `
        WHERE V.type == '${type}' AND
              V.location == '${location}'
        `
    }
    else if (type != null) {
        tlquery = `WHERE V.type == '${type}'`
    }
    else {
        tlquery = `WHERE V.location == '${location}'`
    }

    var timeA;
    var timeB;
    if (fromDate == null || toDate == null) {
        timeA = "";
        timeB = "";
    }
    else {
        timeA = `
        WHERE NOT EXISTS (SELECT * FROM reservations A
                          WHERE (TIME STR_TO_DATE(${fromDate}, "%y-%m-%d"), 
                                 TIME STR_TO_DATE(${toDate}, "%y-%m-%d"))
                                OVERLAPS
                                (TIME A.fromDate, TIME A.toDate))
        `;
        timeB = `
        WHERE NOT EXISTS (SELECT * FROM rents B
                          WHERE (TIME STR_TO_DATE(${fromDate}, "%y-%m-%d"), 
                                 TIME STR_TO_DATE(${toDate}, "%y-%m-%d"))
                                OVERLAPS
                                (TIME B.fromDate, TIME B.toDate))
        `;
    }


    let results = await database.query(`
    SELECT * FROM vehicles AS V
    ${tlquery}
    INTERSECT
    SELECT * FROM vehicles AS V
    ${timeA}
    SELECT * FROM vehicles AS V
    ${timeB}
    `);

    // prepare results
    results = JSON.parse(JSON.stringify(results));
    const vehicleData = results[0][0];

    let count = await database.query(`
    SELECT COUNT(*)
    FROM (SELECT * FROM vehicles AS V
          ${tlquery}
          INTERSECT
          SELECT * FROM vehicles AS V
          ${timeA}
          SELECT * FROM vehicles AS V
          ${timeB})
    `);
    // what do we do with count?

    res.status(200).json(vehicleData);
};

module.exports = viewVehicles;