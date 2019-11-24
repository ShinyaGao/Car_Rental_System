const database = require ('../db').getDb();

const getAllRents = async (req, res, next) => {
    let query = 'SELECT * FROM rents';

    // prepare query: sorting
    if (req.query._sort && req.query._order) {
        const sort = req.query._sort === 'id' ? 'rentId' : req.query._sort;
        const order = req.query._order;
        query += ` ORDER BY ${sort} ${order}`;
    }

    // prepare query: pagination
    if (req.query._start && req.query._end) {
        const start = req.query._start;
        const end = req.query._end;
        const numRows = end - start;
        query += ` LIMIT ${start}, ${numRows}`;
    }

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

module.exports = getAllRents;