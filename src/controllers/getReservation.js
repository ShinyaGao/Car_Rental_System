const database = require ('../db').getDb();

const getReservation = async (req, res, next) => {
    // prepare & send query
    const confNum = req.params.id;
    let results = await database.query(
        `SELECT * FROM reservations where confNum = '${confNum}';`
    );

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const reservation = results[0][0];
    reservation.id = reservation.confNum;

    // send response
    res.status(200).json(reservation);
};

module.exports = getReservation;