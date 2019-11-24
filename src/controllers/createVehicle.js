const database = require ('../db').getDb();
const createVehicle = async (req, res, next) => {
    // prepare query
    const {
        vehicleLicense,
        make,
        model,
        year,
        color,
        status,
        vehicleTypeName,
        location,
        city
    } = req.body;

    // send query

    await database.query(
        `CREATE TABLE IF NOT EXISTS vehicles(
                 vehicleLicense VARCHAR(50) PRIMARY KEY,
                 make VARCHAR(50),
                 model VARCHAR(50),
                 year YEAR,
                 color VARCHAR(50),
                 status ENUM("rented", "maintenance", "available") NOT NULL,
                 vehicleTypeName VARCHAR(50) NOT NULL,
                 location VARCHAR(50) NOT NULL,
                 city VARCHAR(50) NOT NULL,
                 CONSTRAINT vehicle_vehicleType FOREIGN KEY (vehicleTypeName) REFERENCES vehicleTypes(vehicleTypeName) ON DELETE CASCADE
         )
        `
    );

    await database.query(
        `
            INSERT INTO vehicles(vehicleLicense, make, model, year, color, status, vehicleTypeName, location, city)
            VALUES("${vehicleLicense}", "${make}", "${model}", "${year}", "${color}", "${status}", "${vehicleTypeName}", "${location}", "${city}");
        `
    );

    // send response
    res.status(201).json({vehicleLicense, make, model, year, color, status, vehicleTypeName, location, city});
};

module.exports = createVehicle;