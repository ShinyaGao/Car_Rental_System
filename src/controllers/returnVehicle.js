const database = require ('../db').getDb();

const returnVehicle = async(req, res, next) => {
    const vid= req.params.id;
    const date = req.params.id.split('T')[0];

    let vehicle = await database.query(`
    SELECT * FROM vehicles WHERE vehicleLicense == "${vid}"
    `);

    vehicle = JSON.parse(JSON.stringify(vehicle));
    const stat = vehicle[0][0].status;
    const rid = vehicle[0][0].rentId;
    if (stat !== "rented") {
        res.status(200).json("Error car already rented");
    } else {
        // calculate price
        let debt = await database.query(`
        SELECT * FROM rent R
        WHERE R.vehicleLicense == "${vid}"
        AND   R.status == "rented"
        `);
        debt = JSON.parse(JSON.stringify(debt));
        const start = debt[0][0].fromDate.split('T')[0];
        const deltaDays = moment(date).diff(moment(start), 'days') + 1;
        const price = deltaDays * 2;
        // send query to change vehicle to available
        await database.query(`
        UPDATE vehicles
        SET status = "available"
        WHERE vehicleLicense == "${vid}"
        `);
        await database.query(`
        INSERT INTO returns VALUES ("${rid}", STR_TO_DATE("${date}", "%y-%m-%d"), "${price}")
        `);

        res.status(200).json({rid, date, price});
    }
};
module.exports = returnVehicle;