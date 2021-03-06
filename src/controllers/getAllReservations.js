const database = require ('../db').getDb();

const getAllReservations = async (req, res, next) => {
    // prepare query
    let query = 'SELECT * FROM reservations';

    // filtering based on confNum, vehicleTypeName, driversLicence, fromDate, toDate
    let dateFilter = { fromDate: '1900-01-01', toDate: '2050-01-01' };
    if (req.query.fromDate) dateFilter.fromDate = req.query.fromDate.split('T')[0];
    if (req.query.toDate) dateFilter.toDate = req.query.toDate.split('T')[0];
    query += ` WHERE fromDate >= STR_TO_DATE("${dateFilter.fromDate}", "%Y-%m-%d") AND toDate <= STR_TO_DATE("${dateFilter.toDate}", "%Y-%m-%d")`;
    if (req.query.confNum) query += ` AND confNum = "${req.query.confNum}"`;
    if (req.query.driverLicense)
        query += ` AND driverLicense = "${req.query.driverLicense}"`;
    if (req.query.vehicleTypeName)
        query += ` AND vehicleTypeName = "${req.query.vehicleTypeName}"`;



    // send query
    let results = await database.query(query);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    let reservations = results[0];
    reservations = reservations.map(reservation => {
        reservation.id = reservation.confNum;
        return reservation;
    });

    // send response
    res.status(200).json(reservations);
};

module.exports = getAllReservations;