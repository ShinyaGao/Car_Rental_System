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
    let cityInput;
    if (city !== null) {
        cityInput = `AND V.city = "${city}"`;
    } else {
        cityInput = '';
    }
    console.log(`cityinput is null? ${cityInput === null}`);
    console.log(`cityinput is undfined? ${cityInput === undefined}`);
    console.log(`cityinput is empty string? ${cityInput === ''}`);

    let statusInput = '';
    if (status !== null && status !== 'all') {
        statusInput = ` AND V.status = "${status}"`;
    }
    let vehicleTypeNameInput;
    if (vehicleTypeName !== null) {
        vehicleTypeNameInput = ` AND V.vehicleTypeName = "${vehicleTypeName}"`;
    } else {
        vehicleTypeNameInput = '';
    }
    let dateInput;
    if (fromDate !== null && toDate !== null) {
        dateInput = ` AND V.status <> "maintenance"
                AND V.vehicleLicense NOT IN 
                (SELECT R.vehicleLicense from rents as R WHERE "${fromDate}" < R.toDate AND "${toDate}" > R.fromDate)`;
    } else {
        dateInput = '';
    }

    query += 'WHERE V.city <> "wtf"';
    console.log(`will concat cityinput to query, cityinput is ${cityInput}`);
    query += cityInput;
    console.log(`will concat statusInput to query, statusInput is ${statusInput}`);
    query += statusInput;
    console.log(`will concat vehicleTypeNameInput to query, vehicleTypeNameInput is ${vehicleTypeNameInput}`);
    query += vehicleTypeNameInput;
    console.log(`will concat dateInput to query, dateInput is ${dateInput}`);
    query += dateInput;
    console.log(query);



    // send query
    let results = await database.query(query);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    let vehicles = results[0];




    vehicles = vehicles.map(vehicle => {
        vehicle.id = vehicle.vehicleLicense;
        return vehicle;
    });


    // send response
    res.status(200).json(vehicles);
};

module.exports = getAllVehicles;