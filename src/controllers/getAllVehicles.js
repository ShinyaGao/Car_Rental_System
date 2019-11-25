const database = require ('../db').getDb();

const getAllVehicles = async (req, res, next) => {
    // prepare query
    let query =
        'SELECT * FROM vehicles as V INNER JOIN vehicleTypes USING (vehicleTypeName)';

    // prepare query: filtering based on city, vehicle type, to / from dates
    const city = req.query.city ? req.query.city : null;
    const status = req.query.status ? req.query.status : null;
    const vehicleTypeName = req.query.vehicleTypeName
        ? req.query.vehicleTypeName
        : null;
    const fromDate = req.query.fromDate ? req.query.fromDate : null;
    const toDate = req.query.toDate ? req.query.toDate : null;
    query += ` 
        WHERE V.city <> "just a placeholder"
               ${city !== null ? ` AND V.city = "${city}"` : ''}
               ${
        status !== null && status !== 'all'
            ? ` AND V.status = "${status}"`
            : ''
    }
               ${
        vehicleTypeName !== null
            ? ` AND V.vehicleTypeName = "${vehicleTypeName}"`
            : ''
    }
               ${
        fromDate !== null && toDate !== null
            ? ` AND V.status <> "maintenance"
                AND V.vehicleLicense NOT IN 
                (SELECT R.vehicleLicense from rents as R 
                    WHERE "${fromDate}" < R.toDate 
                    AND "${toDate}" > R.fromDate)`
            : ''
    }
    `;

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