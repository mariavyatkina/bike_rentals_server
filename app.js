const express = require('express');
const RentalRecord = require("./models/RentalRecord");
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const csvtojson = require("csvtojson")
const routes = require('./routes/api');
const calculations = require('./machine_learning/calculations');


const MONGODB_URI = "mongodb+srv://root:x2GLMnkxXPumBPDB@cluster0.kzidlzx.mongodb.net/?retryWrites=true&w=majority";
require('dotenv').config();
const IP_ADDRESS = '127.0.0.1' ;
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log("Connected to the DB now")
})
.catch(err => {
    console.log(`Error connecting to the DB: ${err}`)
})

const SERVER_PORT = process.env.PORT || 8080;


console.log('starting express');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    return res.send({
        success: true,
        message: "Hello world!"
    })
})

app.use('/', routes);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(SERVER_PORT,  () => {
    console.log(`App listening at ${SERVER_PORT}`)
})

// this is important for the initial data set up 
calculations.updateMLEstimations();
calculations.getRentalHoursEstimation(21.3, 2, 0)




// This is a one-time use function to populate the DB with the records from data.csv file. 
function populateDB(){
    csvtojson()
  .fromFile("data.csv")
  .then(csvData => {
    console.log("inside csv to json")
    for(i = 0; i < csvData.length; i++){
        const newRentalRecord = new RentalRecord();
        newRentalRecord.datetime = csvData[i].datetime;
        newRentalRecord.season = csvData[i].season;
        newRentalRecord.holiday = csvData[i].holiday;
        newRentalRecord.workingday = csvData[i].workingday;
        newRentalRecord.weather = csvData[i].weather;
        newRentalRecord.temp = csvData[i].temp;
        newRentalRecord.atemp = csvData[i].atemp;
        newRentalRecord.humidity = csvData[i].humidity;
        newRentalRecord.windspeed = csvData[i].windspeed;
        newRentalRecord.casual = csvData[i].casual;
        newRentalRecord.registered = csvData[i].registered;
        newRentalRecord.count = csvData[i].count;

        console.log("Attempting to save.. " + newRentalRecord)

        newRentalRecord.save((err, rentalRecord) => {
            console.log("Inside save")
            if(err){
                console.log("Error saving to DB: " + err)
            }
            else{
                console.log("Rental record successfully saved!")
            }
        })
    }
  })
}