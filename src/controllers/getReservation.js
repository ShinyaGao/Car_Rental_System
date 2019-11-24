const database = require ('../db').getDb();

const getReservation = async(req, res, next) => {
    const confNo = req.params.id;

    let results = await database.query(`
    SELECT * FROM reservations WHERE confNo = '${confNo}';
    `);

    results = JSON.parse(JSON.stringify(results));
    const reservation = results[0][0];

    res.status(200).json(reservation);
};
module.exports = getReservation;