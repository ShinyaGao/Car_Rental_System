const database = require ('../db').getDb();

const validateRent = async (req, res, next) => {
    const vehicleLicense = req.body.vehicleLicense;
    const confNum = req.body.confNum;
    let results;

    if (req.method === 'PUT') {
        const rentId = req.params.id;
        results = await database.query(`SELECT * from rents where rentId = "${rentId}"`);
        results = JSON.parse(JSON.stringify(results));
        const prevVehicleLicense = results[0][0].vehicleLicense;
        const prevConfNum = results[0][0].confNum;
        if (vehicleLicense !== prevVehicleLicense)
            await validateVehicleLicense(vehicleLicense);
        if (confNum !== prevConfNum) await validateConfNum(confNum);
        return next();
    } else if (req.method === 'POST') {
        await validateVehicleLicense(vehicleLicense);
        await validateConfNum(confNum);
        return next();
    }
};

const validateVehicleLicense = async vehicleLicense => {

    await database.query(
        `SELECT status from vehicles where vehicleLicense = "${vehicleLicense}";`
    );

};

const validateConfNum = async confNum => {

    await database.query(
        `SELECT COUNT(*) FROM rents where confNum = "${confNum}"`
    );


};

module.exports = validateRent;