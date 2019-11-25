const database = require ('../db').getDb();

const createReservation = async(req, res, next) => {
    const {confNo, dLicense, fromDate, toDate} = req.body;

    await database.query(`
    CREATE TABLE IF NOT EXISTS reservations(
    confNo VARCHAR(20) NOT NULL,
    vtname VARCHAR(50) NOT NULL,
    dLicense VARCHAR(50) NOT NULL,
    fromDate DATE,
    toDate DATE,
    PRIMARY KEY (confNo),
    FOREIGN KEY (dLicense) REFERENCES customers ON DELETE CASCADE ON UPDATE CASCADE);
    
    INSERT INTO TABLE table_names VALUES ("reservations");
    `);

    await database.query(`
    INSERT INTO reservations VALUES (${confNo}, ${dLicense}, ${fromDate}, ${toDate})
    `);

    return res.status(201).json({confNo, dLicense, fromDate, toDate});
};

module.exports = createReservation;