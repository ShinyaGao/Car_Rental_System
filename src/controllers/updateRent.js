const database = require ('../db').getDb();

const updateRent = async (req, res, next) => {
    // prepare query
    const rentId = req.params.id;
    const { vehicleLicense, driverLicense } = req.body;
    const fromDate = req.body.fromDate.split('T')[0];
    const toDate = req.body.toDate.split('T')[0];
    const confNum = req.body.confNum;
    const query = confNum
        ? `
            UPDATE rents
            SET vehicleLicense = "${vehicleLicense}", 
                driverLicense = "${driverLicense}",
                fromDate = STR_TO_DATE("${fromDate}", "%Y-%m-%d"),
                toDate = STR_TO_DATE("${toDate}", "%Y-%m-%d"),
                confNum = "${confNum}"
                WHERE rentId = '${rentId}';
        `
        : `
            UPDATE rents
            SET vehicleLicense = "${vehicleLicense}", 
                driverLicense = "${driverLicense}",
                fromDate = STR_TO_DATE("${fromDate}", "%Y-%m-%d"),
                toDate = STR_TO_DATE("${toDate}", "%Y-%m-%d"),
                confNum = NULL
                WHERE rentId = '${rentId}';
        `;

    // send query
    await database.query(query);
    // let results = await database.query(`SELECT * FROM rents WHERE rentId = '${rentId}';`);
    //
    // // prepare response
    // results = JSON.parse(JSON.stringify(results));
    // const updatedRent = results[0][0];
    // updatedRent.id = updatedRent.rentId;

    // send response
    res.status(200).json({rentId, vehicleLicense, driverLicense, fromDate, toDate, confNum});
};

module.exports = updateRent;