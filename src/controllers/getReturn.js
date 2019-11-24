const database = require ('../db').getDb();

const getReturn = async (req, res, next) => {
    // prepare & send query
    const rentId = req.params.id;
    let results = await database.query(`SELECT * FROM rents where rentId = '${rentId}';`);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    const retu = results[0][0];
    retu.id = retu.rentId;

    // send response
    res.status(200).json(retu);
};

module.exports = getReturn;