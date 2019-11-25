const database = require ('../db').getDb();

const getAllVehicles = async (req, res, next) => {
    // prepare query
    let query =
        'SELECT * FROM vehicles as V INNER JOIN vehicleTypes USING (vehicleTypeName)';

    // prepare query: sorting
    if (req.query._sort && req.query._order) {
        const sort = req.query._sort === 'id' ? 'vehicleLicense' : req.query._sort;
        const order = req.query._order;
        query += ` ORDER BY ${sort} ${order}`;
    }

    // send query
    let results = await database.query(query);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    let vehicles = results[0];


    // pagination
    if (req.query._start && req.query._end) {
        const start = req.query._start;
        const end = req.query._end;
        vehicles = vehicles.slice(start, end);
    }

    vehicles = vehicles.map(vehicle => {
        vehicle.id = vehicle.vehicleLicense;
        return vehicle;
    });


    // send response
    res.status(200).json(vehicles);
};

module.exports = getAllVehicles;