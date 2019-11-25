const database = require ('../db').getDb();
const uuid = require('uuid/v4');

const rentVehicle = async(req, res, next) => {
    const {type, loc, fromDate, toDate, name, phone, dLicense, confNo, reserved} = req.params.id;
    if (reserved) {
        var results;
        if (confNo != null) {
            results = await database.query(`
            SELECT dLicense, fromDate, toDate, confNo
            FROM reservations R
            WHERE confNo == '${confNo}'`);

        } else {
            results = await database.query(`
            SELECT dLicense, fromDate, toDate, confNo
            FROM reservations R
            WHERE dLicense == '${dLicense}'`);
        }
        // create rent based on this information
        results = JSON.parse(JSON.stringify(results));
        const newLicense = results[0].driverLicense;
        const newStart = results[0].fromDate;
        const newEnd = results[0].toDate;
        const newConfNo = results[0].confNo;
        const newType = results[0].type;
        const newLocation = results[0].location;
        let newResults = await database.query(`
          SELECT * FROM vehicles AS V
          WHERE type == '${newType}' AND
                location == '${newLocation}'
          INTERSECT
          SELECT * FROM vehicles AS V
          WHERE NOT EXISTS (SELECT * FROM reservations A
                            WHERE (TIME STR_TO_DATE('${newStart}', "%y-%m-%d"),TIME STR_TO_DATE('${newEnd}', "%y-%m-%d"))
                                    OVERLAPS
                                    (TIME A.fromDate ,TIME A.toDate))
          INTERSECT
          SELECT * FROM vehicles AS V
          WHERE NOT EXISTS (SELECT * FROM rents B)
                            WHERE (TIME STR_TO_DATE('${newStart}', "%y-%m-%d"),TIME STR_TO_DATE('${newEnd}', "%y-%m-%d"))
                                    OVERLAPS
                                    (TIME B.fromDate ,TIME B.toDate))
    `);
        newResults = JSON.parse(JSON.stringify(newResults));
        const vid = newResults[0].vehicleLicense;
        await database.query(`
            UPDATE vehicles
            SET    status = "rented"
            WHERE  vehicleLicense == '${vid}'
            `);
        const rentId = uuid();
        await database.query(`
            INSERT INTO rents VALUES ('${rentId}', '${vid}', '${newLicense}', STR_TO_DATE('${newStart}', "%y-%m-%d"), 
                                      STR_TO_DATE('${newEnd}', "%y-%m-%d"), '${newConfNo}')
            `);
        res.status(200).json({newType, newLocation, newStart, newEnd, newConfNo});

    } else {
        let results = await database.query(`
          SELECT * FROM vehicles AS V
          WHERE type == '${type}' AND
                location == '${loc}'
          INTERSECT
          SELECT * FROM vehicles AS V
          WHERE NOT EXISTS (SELECT * FROM reservations A
                            WHERE (TIME STR_TO_DATE('${fromDate}', "%y-%m-%d"),TIME STR_TO_DATE('${toDate}', "%y-%m-%d"))
                                    OVERLAPS
                                    (TIME A.fromDate ,TIME A.toDate))
          INTERSECT
          SELECT * FROM vehicles AS V
          WHERE NOT EXISTS (SELECT * FROM rents B)
                            WHERE (TIME STR_TO_DATE('${fromDate}', "%y-%m-%d"),TIME STR_TO_DATE('${toDate}', "%y-%m-%d"))
                                    OVERLAPS
                                    (TIME B.fromDate ,TIME B.toDate))
    `);
        results = JSON.parse(JSON.stringify(results));
        if (results[0].length !== 0) {
            const vid = results[0][0].vehicleLicense;
            await database.query(`
            UPDATE vehicles
            SET    status = "rented"
            WHERE  vehicleLicense == '${vid}'
            `);
            const rentId = uuid();
            await database.query(`
            INSERT INTO rents VALUES ('${rentId}', '${vid}', '${dLicense}', STR_TO_DATE('${fromDate}', "%y-%m-%d"), 
                                      STR_TO_DATE('${toDate}', "%y-%m-%d"), NULL)
            `);
            res.status(200).json({type, loc, fromDate, toDate, null});
        } else {
            res.status(200).json("Desired vehicle not available");
        }
    }
};
module.exports = rentVehicle;