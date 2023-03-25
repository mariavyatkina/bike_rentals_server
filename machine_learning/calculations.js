const mongoose = require('mongoose');
const RentalRecord = require("../models/RentalRecord");
require('dotenv').config();

let temperatureCoefficientAverage= 0;
let hoursOfHolidayRentals = 0;
let holidaysCount = 0;
let nonHolidaysCount = 0;
let hoursOfNonHolidayRentals = 0; 
let dailyRentalAverage = 0;
let summerDailyAverage = 0;
let numberOfSummerDays = 0;
let fallDailyAverage = 0;
let numberOfFallDays = 0;
let winterDailyAverage = 0;
let numberOfWinterDays = 0;
let springDailyAverage = 0; 
let numberOfSpringDays = 0;

let summerCoefficient = 0;
let fallCoefficient = 0;
let winterCoefficient = 0;
let springCoefficient = 0;
let holidayCoefficient = 0;
module.exports = {
    updateMLEstimations: async function (){ 
    const filter = {};
    const allRentalRecords = await RentalRecord.find(filter);
    let allData = [];

    for(let i = 0; i < allRentalRecords.length; i++){
        // collecting data to calculate daily average of rental hours 
        dailyRentalAverage += allRentalRecords[i].count;
    
        // getting the sum of correlation coefficient between temperature and number of rental hours 
        temperatureCoefficientAverage += allRentalRecords[i].count / allRentalRecords[i].temp;
        arr = [allRentalRecords[i].count, allRentalRecords[i].temp];
        allData.push(arr)
       
       // collecting data for holiday vs non-holiday coeffient 
        if(allRentalRecords[i].holiday === 1){
            holidaysCount++;
            hoursOfHolidayRentals += allRentalRecords[i].count;
        }
        else{
            nonHolidaysCount++;
            hoursOfNonHolidayRentals += allRentalRecords[i].count;
        }
    
        // collecting data for averages for each of the seasons
        switch(allRentalRecords[i].season){
            case 1:
                winterDailyAverage += allRentalRecords[i].count;
                numberOfWinterDays++;
                break;
            case 2:
                springDailyAverage += allRentalRecords[i].count;
                numberOfSpringDays++;
                break;
            case 3:
                summerDailyAverage += allRentalRecords[i].count;
                numberOfSummerDays++;
                break;
            case 4: 
                fallDailyAverage += allRentalRecords[i].count;
                numberOfFallDays++;
                break;
            default:
                break;
        }
    
    }
    process.env.DATA = allData.slice(0, 1000)
    dailyRentalAverage /= allRentalRecords.length;
    temperatureCoefficientAverage /= allRentalRecords.length;
    process.env.TEMPERATURE_COEFFICIENT = temperatureCoefficientAverage
    process.env.SUMMER_HOURS = summerDailyAverage;
    summerDailyAverage /= numberOfSummerDays;
    process.env.SUMMER_AVERAGE = summerDailyAverage
    summerCoefficient = (summerDailyAverage/dailyRentalAverage); 
    process.env.SUMMER_COEFFICIENT = summerCoefficient
    process.env.FALL_HOURS = fallDailyAverage;
    fallDailyAverage /= numberOfFallDays;
    process.env.FALL_AVERAGE = fallDailyAverage
    fallCoefficient = (fallDailyAverage/dailyRentalAverage);
    process.env.FALL_COEFFICIENT = fallCoefficient
    process.env.WINTER_HOURS = winterDailyAverage;
    winterDailyAverage /= numberOfWinterDays;
    process.env.WINTER_AVERAGE = winterDailyAverage
    winterCoefficient = (winterDailyAverage/dailyRentalAverage)
    process.env.WINTER_COEFFICIENT = winterCoefficient;
    process.env.SPRING_HOURS = springDailyAverage;
    springDailyAverage /= numberOfSpringDays;
    process.env.SPRING_AVERAGE = springDailyAverage
    springCoefficient = (springDailyAverage/dailyRentalAverage);
    process.env.SPRING_COEFFICIENT = springCoefficient
    hoursOfHolidayRentals /= holidaysCount;
    hoursOfNonHolidayRentals /= nonHolidaysCount;
    holidayCoefficient = (hoursOfHolidayRentals/hoursOfNonHolidayRentals);
    process.env.HOLIDAY_COEFFICIENT = holidayCoefficient
},

getRentalHoursEstimation:  function (temperature, season, holiday){
    let seasonCoefficient = 1; 
    switch(season){
        case 1:
            seasonCoefficient =  process.env.WINTER_COEFFICIENT;
            break;
        case 2:
            seasonCoefficient =  process.env.SPRING_COEFFICIENT;
            break;
        case 3:
            seasonCoefficient =  process.env.SUMMER_COEFFICIENT;
            break;
        case 4:
            seasonCoefficient =  process.env.FALL_COEFFICIENT;
            break;
        default:
            break;
    }
    if(holiday === 1){
        return  process.env.TEMPERATURE_COEFFICIENT  * temperature * seasonCoefficient *  process.env.HOLIDAY_COEFFICIENT ;
    }
    else{
        return  process.env.TEMPERATURE_COEFFICIENT * temperature * seasonCoefficient /  process.env.HOLIDAY_COEFFICIENT ;
    }
},

getAverageRentalHours:  function (season){
    switch(season){
        case 1:
            return process.env.WINTER_AVERAGE;
            break;
        case 2:
            return process.env.SPRING_AVERAGE;
            break;
        case 3:
            return process.env.SUMMER_AVERAGE;
            break;
        case 4:
            return process.env.FALL_AVERAGE;
            break;
        default:
            return process.env.SPRING_AVERAGE;
            break;
    }
},

getSeasonRentalHours:  function (){
    return {"winter": process.env.WINTER_HOURS, "spring": process.env.SPRING_HOURS,"summer": process.env.SUMMER_HOURS, "fall": process.env.FALL_HOURS}
},
getData: function(){
    return process.env.DATA;
}
}