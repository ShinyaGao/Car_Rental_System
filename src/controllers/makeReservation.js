const database = require ('../db').getDb();
const uuid = require('uuid/v4');

const makeReservation = async(req, res, next) => {
    const {type, fromDate, toDate, location, name, dLicense, phone} = req.params.id;
    var tlquery;
    if (type == null && location == null) {
        tlquery = ``;
    }
    else if (type != null && location != null) {
        tlquery = `
        WHERE V.vtname == '${type}' AND
              V.location == '${location}'
        `
    }
    else if (type != null) {
        tlquery = `WHERE V.vtname == '${type}'`
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
                          WHERE ((TIME STR_TO_DATE(${fromDate}, "%y-%m-%d"), 
                                  TIME STR_TO_DATE(${toDate}, "%y-%m-%d"))
                                  OVERLAPS
                                 (TIME A.fromDate, TIME A.toDate)))
        `;
        timeB = `
        WHERE NOT EXISTS (SELECT * FROM rents B
                          WHERE ((TIME STR_TO_DATE(${fromDate}, "%y-%m-%d"), 
                                  TIME STR_TO_DATE(${toDate}, "%y-%m-%d"))
                                  OVERLAPS
                                 (TIME B.fromDate, TIME B.toDate)))
        `;
    }

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
    count = JSON.parse(JSON.stringify(count));
    const num = count[0][0]['COUNT(*)'];
    if (num) {
        const confNo = uuid();
        await database.query(`
        INSERT INTO reservations VALUES ('${confNo}', '${type}', '${dLicense}', '${fromDate}', '${toDate}')`);
        let result = await database.query(`
        SELECT * FROM customers WHERE dLicense = '${dLicense}'
        `);
        result = JSON.parse(JSON.stringify(result));
        if (result[0][0] === 0) {
            await database.query(`
            INSERT INTO customers VALUES ('${name}', '${phone}', '${dLicense}')
            `);
        }
        res.status(200).json({confNo, type, location, fromDate, toDate, dLicense, name, phone});
    }
    else {
        res.status(200).json("Sorry, but your desired vehicle is not available at the moment.");
    }
};
module.exports = makeReservation;