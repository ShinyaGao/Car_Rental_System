const database = require ('../db').getDb();

const deleteVehicle = async (req, res, next) => {
    // prepare & send query
    const vehicleLicense = req.params.id;
    await database.query(`DELETE FROM vehicles WHERE vehicleLicense ='${vehicleLicense}'`);

    // send response
    res.status(204).json(null);
};

module.exports = deleteVehicle;