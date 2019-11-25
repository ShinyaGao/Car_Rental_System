const database = require ('../db').getDb();

const updateReservation = async (req, res, next) => {
    // prepare query
    const confNum = req.params.id;
    const { vehicleTypeName, driverLicense } = req.body;
    const fromDate = req.body.fromDate.split('T')[0];
    const toDate = req.body.toDate.split('T')[0];

    // send query
    await database.query(
        `
                UPDATE reservations
                SET vehicleTypeName = "${vehicleTypeName}", 
                    driverLicense = "${driverLicense}",
                    fromDate = STR_TO_DATE("${fromDate}", "%Y-%m-%d"),
                    toDate = STR_TO_DATE("${toDate}", "%Y-%m-%d")
                    WHERE confNum = '${confNum}';
            `
    );
    let results = await database.query(
        `SELECT * FROM reservations WHERE confNum = '${confNum}';`
    );

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const updatedReservation = results[0][0];
    updatedReservation.id = updatedReservation.confNum;

    // send response
    res.status(200).json(updatedReservation);
};

module.exports = updateReservation;