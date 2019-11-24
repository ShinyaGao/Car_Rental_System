const database = require ('../db').getDb();

const deleteReturn = async (req, res, next) => {
    // prepare & send query
    const rentId = req.params.id;
    await database.query(`DELETE FROM rents WHERE rentId ='${rentId}'`);

    // send response
    res.status(204).json(null);
};

module.exports = deleteReturn;