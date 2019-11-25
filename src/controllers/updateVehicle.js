const database = require ('../db').getDb();

const updateVehicle = async (req, res, next) => {
    // prepare query
    const prevVehicleLicense = req.params.id;
    const {vehicleLicense, make, model, year, color, status, vehicleTypeName, location, city} = req.body;


    // send query
    await database.query(
        `
            UPDATE vehicles
            SET vehicleLicense = "${vehicleLicense}",
                make = "${make}",
                model = "${model}",
                year = ${year},
                color = "${color}",
                status = "${status}",
                vehicleTypeName = "${vehicleTypeName}",
                location = "${location}",
                city = "${city}"
                WHERE vehicleLicense = '${prevVehicleLicense}';
        `
    );

    let results = await database.query(
        `SELECT * FROM vehicles WHERE vehicleLicense = '${vehicleLicense}';`
    );

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const updatedVehicle = results[0][0];
    updatedVehicle.id = updatedVehicle.database;

    // send response
    res.status(200).json(updatedVehicle);
};

module.exports = updateVehicle;