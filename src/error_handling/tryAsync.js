const SuperRentError = require('./SuperRentError');

/*
    @param asyncFn: is an async function with signature (req, res, next)
*/
const tryAsync = asyncFn => {
    return (req, res, next) =>
        asyncFn(req, res, next).catch(err => {
            if (err instanceof SuperRentError)
                res.status(err.statusCode).send({ message: err.message });
            else {
                // eslint-disable-next-line no-console
                console.log(err);
                res.status(500).send({
                    message: 'Please check your internet connection'
                });
            }
        });
};

module.exports = tryAsync;
