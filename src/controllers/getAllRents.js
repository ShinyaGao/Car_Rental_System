const database = require ('../db').getDb();

const getAllRents = async (req, res, next) => {
    let query = 'SELECT * FROM rents';

    // prepare query: filtering based on fromDate
    if (req.query.fromDate)
        query += ` WHERE fromDate = STR_TO_DATE("${req.query.fromDate}", "%Y-%m-%d")`;

    // prepare query: sorting (everything except isReturned)
    // sort isReturned at bottom because isReturned is not a attribute in rents relation
    if (req.query._sort && req.query._order && req.query._sort !== 'isReturned') {
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
    let rents = results[0];
    rents = rents.map(rent => {
        rent.id = rent.rentId;
        return rent;
    });

    // send response
    res.status(200).json(rents);
};

module.exports = getAllRents;