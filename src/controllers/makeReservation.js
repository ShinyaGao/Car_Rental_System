const database = require ('../db').getDb();
const uuid = require('uuid/v4');

const makeReservation = async(req, res, next) => {
    const {vid, fromDate, toDate, name, dLicense} = req.params.id;
    let results = await database.query(`
    
    `);
    results = JSON.parse(JSON.stringify(results));
    if (results[0].length !== 0) {
        const confNo = uuid();
        await database.query(`
        INSERT INTO reservations VALUES ('${confNo}', '${dLicense}', '${fromDate}')
        `)
    }
    else {
        // throw error message at user
    }
};