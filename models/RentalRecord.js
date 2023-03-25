const mongoose = require('mongoose');

const RentalRecordSchema = new mongoose.Schema({
    datetime:{
        type: String,
        default: ""
    },
    season:{
        type: Number
    },
    holiday: {
        type: Number
    }, 
    workingday: {
        type: Number
    },
    weather: {
        type: Number
    },
    temp: {
      type: Number
    },
    atemp: {
        type: Number
    },
    humidity: {
        type: Number
    },
    windspeed: {
        type: Number
    },
    casual: {
        type: Number
    },
    registered: {
        type: Number
    },
    count: {
        type: Number
    }
});


module.exports = mongoose.model('RentalRecord', RentalRecordSchema);