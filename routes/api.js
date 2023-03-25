const RentalRecord = require("../models/RentalRecord");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const calculations = require('../machine_learning/calculations');

require('dotenv').config();

const JSON_SERVER_ERR = {
    success: false,
    message: "Error: Server Error"
}
router.get('/status', (req, res) => {
    return res.send({
        success: true,
        message: "Bike Rental API is UP"
    })
})

router.post('/api/getEstimate', (req, res) => { 
    console.log("Call to an API received")
    const {body} = req;
    const{temperature} = body;
    let {season} = body;
    const{holiday} = body;

    if(process.env.REQUEST_NUM === -1 || process.env.REQUEST_NUM > 10){
        process.env.REQUEST_NUM = 0
        console.log("Got a call with errors")
        calculations.updateMLEstimations().catch(err => {
            return res.send({
                success: false,
                message: "Unable to update ML coefficients"
            })
        })
    }

    if(!temperature){
        console.log("Got a call with errors")

        return res.send({
            success: false,
            message: 'Error: Temperature cannot be blank'
        })
    }
    if(!season){
        console.log("Got a call with errors")

        return res.send({
            success: false,
            message: 'Error: Season cannot be blank'
        })
    }
    if(holiday !== 0){
        console.log("Got a call with errors")

        if(!holiday){
            return res.send({
                success: false,
                message: 'Error: Holiday cannot be blank'
            })
        }
    }

    

    console.log("Success!")

   return res.send({
    success: true,
    message: "Esimation is  successful",
    estimation: calculations.getRentalHoursEstimation(temperature, season, holiday),
    average: calculations.getAverageRentalHours(season),
    allHours: calculations.getSeasonRentalHours(),
    data: calculations.getData()
})
})

router.post('/api/updateML', (req, res) => { 

    calculations.updateMLEstimations().catch(err => {
        return res.send({
            success: false,
            message: "Unable to update ML coefficients"
        })
    })

   return res.send({
    success: true,
    message: "ML coefficents are updated"
})
})
module.exports = router;