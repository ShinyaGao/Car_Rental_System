const database = require ('../db').getDb();

const returnVehicle = async(req, res, next) => {
    const {vid, date} = req.params.id;

    let vehicle = await database.query(`
    SELECT * FROM vehicles WHERE vehicleLicense == "${vid}"
    `);

    vehicle = JSON.parse(JSON.stringify(vehicle));
    const stat = vehicle[0].status;
    const rid = vehicle[0].rentId;
    if (stat !== "rented") {
        res.status(200).json("Error car already rented");
    } else {
        // send query to change vehicle to available
        await database.query(`
        UPDATE vehicles
        SET status = "available"
        WHERE vehicleLicense == "${vid}"
        `);
        // create and insert return variable
        const price = 0; // needs to change!! TODO
        let result = await database.query(`
        INSERT INTO returns VALUES ("${rid}", "${date}", "${price}")
        `);

        res.status(200).json({rid, date, price});
    }
};
module.exports = returnVehicle;