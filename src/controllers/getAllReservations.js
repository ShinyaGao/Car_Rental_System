const database = require ('../db').getDb();

const getAllReservations = async(res, req, next) => {
    let results = await database.query(`
    SELECT * FROM reservations;
    `);

    results = JSON.parse(JSON.stringify(results));
    const allReservations = results[0][0];

    res.status(200).json(allReservations);
};

module.exports = getAllReservations;