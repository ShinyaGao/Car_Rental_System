const database = require ('../db').getDb();

const getVehicle = async (req, res, next) => {
    // prepare & send query
    const vehicleLicense = req.params.id;
    let results = await database.query(
        `SELECT * FROM (vehicles INNER JOIN vehicleTypes USING (vehicleTypeName)) WHERE vehicleLicense = "${vehicleLicense}";`
    );

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const vehicle = results[0][0];
    vehicle.id = vehicle.vehicleLicense;

    // send response
    res.status(200).json(vehicle);
};

module.exports = getVehicle;