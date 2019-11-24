const database = require ('../db').getDb();

const deleteReservation = async(res, req, next) => {
    const confNo = req.params.id;
    await database.query(`
    DELETE FROM reservations WHERE confNo = '${confNo}';
    `);

    res.status(201).json(confNo);
};

module.exports = deleteReservation;