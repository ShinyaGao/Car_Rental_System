const database = require ('../db').getDb();

const getRent = async (req, res, next) => {
    // prepare & send query
    const rentId = req.params.id;
    let results = await database.query(`SELECT * FROM rents where rentId = '${rentId}';`);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const rent = results[0][0];
    rent.id = rent.rentId;

    results = await database.query(
        `SELECT rentId from returns WHERE rentId = "${rentId}"`
    );
    results = JSON.parse(JSON.stringify(results));
    rent.isReturned = results[0].length !== 0;

    // send response
    res.status(200).json(rent);
};

module.exports = getRent;