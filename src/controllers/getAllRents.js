const database = require ('../db').getDb();

const getAllRents = async (req, res, next) => {
    let query = 'SELECT * FROM rents';

    // prepare query: filtering based on fromDate
    if (req.query.fromDate)
        query += ` WHERE fromDate = STR_TO_DATE("${req.query.fromDate}", "%Y-%m-%d")`;



    // send query
    let results = await database.query(query);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    let rents = results[0];
    rents = rents.map(rent => {
        rent.id = rent.rentId;
        return rent;
    });

    // send response
    res.status(200).json(rents);
};

module.exports = getAllRents;