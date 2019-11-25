const tryAsync = require('../error_handling/tryAsync');
const getAllCustomers = tryAsync(require('./getAllCustomers'));
const getCustomer = tryAsync(require('./getCustomer'));
const updateCustomer = tryAsync(require('./updateCustomer'));
const deleteCustomer = tryAsync(require('./deleteCustomer'));
const createCustomer = tryAsync(require('./createCustomer'));
const getAllRents = tryAsync(require('./getAllRents'));
const getRent = tryAsync(require('./getRent'));
const updateRent = tryAsync(require('./updateRent'));
const deleteRent = tryAsync(require('./deleteRent'));
const createRent = tryAsync(require('./createRent'));
const getAllReservations = tryAsync(require('./getAllReservations'));
const getReservation = tryAsync(require('./getReservation'));
const updateReservation = tryAsync(require('./updateReservation'));
const deleteReservation = tryAsync(require('./deleteReservation'));
const createReservation = tryAsync(require('./createReservation'));
const getAllReturns = tryAsync(require('./getAllReturns'));
const getReturn = tryAsync(require('./getReturn'));
const deleteReturn = tryAsync(require('./deleteReturn'));
const createReturn = tryAsync(require('./createReturn'));
const getAllVehicles = tryAsync(require('./getAllVehicles'));
const getVehicle = tryAsync(require('./getVehicle'));
const updateVehicle = tryAsync(require('./updateVehicle'));
const deleteVehicle = tryAsync(require('./deleteVehicle'));
const createVehicle = tryAsync(require('./createVehicle'));
const reportDailyRents = tryAsync(require('./reportDailyRents'));
const reportDailyReturns = tryAsync(require('./reportDailyReturns'));





module.exports = {
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    createCustomer,
    getAllRents,
    getRent,
    updateRent,
    deleteRent,
    createRent,
    getAllReservations,
    getReservation,
    updateReservation,
    deleteReservation,
    createReservation,
    getAllReturns,
    getReturn,
    deleteReturn,
    createReturn,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
    createVehicle,
    reportDailyRents,
    reportDailyReturns
};