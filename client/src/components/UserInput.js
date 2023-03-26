import React, {useState,  useEffect} from 'react'
import Estimation from './Estimation';
import {Link, useNavigate} from 'react-router-dom'
import 'whatwg-fetch';

export default function UserInput(props) {
    const [inputTemperature, setInputTemperature] = useState("");
    const [inputHoliday, setInputHoliday] = useState("");
    const [inputSeason, setInputSeason] = useState("");
    const [holiday, setHoliday] = useState("1");
    const [season, setSeason] = useState("1");
    const[estimate, setEstimate] = useState()
 

    const navigate = useNavigate();
    const  onGetEstimate = () => {
       navigate("/estimation", {
        state:{
            temperature: inputTemperature,
            holiday: holiday,
            season: season
        }
       });
  }
    
     function onTextboxChangeInputTemperature (event) {
        setInputTemperature(event.target.value);
      }
     function onTextboxChangeInputSeason(event){
        setInputSeason(event.target.value);
        setSeason(convertSeason(inputSeason))
      }
      function onTextboxChangeInputHoliday(event){
        setInputHoliday(event.target.value);
        setHoliday(convertHoliday(inputHoliday))

      }
      function convertSeason(season){
        switch(season){
            case "Winter":
                return 1;
            case "Spring":
                return 2;
            case "Summer":
                return 3;
            case "Fall":
                return 4;
            default:
                return 1;
    }}
    function convertHoliday(holiday){
        console.log(`Holiday: ${holiday}, !holiday: ${holiday}`)
        switch(holiday){
            case "Yes":
                return 1;
            default:
                return 0;
    }}
    return(
    <div>
    <div className="container bg-light App">
      <div className="container main-block">
      <div className="container">
        <h1> We are going to provide estimation of your rental hours based on the weather</h1>
        <form>
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="inputCity">Temperature in Celcius</label>
                    <input type="text" className="form-control" placeholder="Enter the weather in Celcius" onChange={onTextboxChangeInputTemperature} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputState">Season</label>
                    <select id="inputState" className="form-control"  onChange={onTextboxChangeInputSeason}>
                        <option selected>Winter</option>
                        <option>Spring</option>
                        <option>Summer</option>
                        <option>Fall</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                <label htmlFor="inputState">Is it a holiday?</label>
                    <select id="inputState" className="form-control"  onChange={onTextboxChangeInputHoliday}>
                        <option selected>Yes</option>
                        <option>No</option>
                    </select>
                </div>
            </div>
            <div className="row">
            <div className="form-group col-md-5">
                    
            </div>
            <div className="form-group col-md-2">
                     <div className="buttons-account mt-3">
                    <button className="btn btn-danger  btn-lg"onClick={onGetEstimate}>Get Estimate</button>
                  </div>
                </div>
            </div>
         </form>
        </div>
        </div>
         </div>
        </div>

    )
}