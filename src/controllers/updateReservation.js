const database = require ('../db').getDb();

const updateReservations = async(res, req, next) => {
    const {confNo, vtname, dLicense, fromDate, toDate} = req.params.id;

    await database.query(`
    UPDATE reservations
    SET confNo = '${confNo}',
        vtname = '${vtname}',
        dLicense = '${dLicense}',
        fromDate = '${fromDate}',
        toDate = '${toDate}'
    WHERE confNo == '${confNo}'
    `);
    res.status(200).json(confNo, vtname, dLicense, fromDate, toDate);

};
module.exports = updateReservations;