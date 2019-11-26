const database = require ('../db').getDb();

const getAllReturns = async (req, res, next) => {
    // prepare query
    let query = 'SELECT * FROM returns';


    // send query
    let results = await database.query(query);

    // prepare response
    results = JSON.parse(JSON.stringify(results));
    let returns = results[0];
    returns = returns.map(ret => {
        ret.id = ret.rentId;
        return ret;
    });

    // send response
    res.status(200).json(returns);
};

module.exports = getAllReturns;