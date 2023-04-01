import React,{useState,  useEffect} from 'react'
import{useLocation} from 'react-router-dom'
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';


export default function Estimation(props) {
    const location = useLocation();
    const temperature = location.state.temperature;
    const season = location.state.season;
    const holiday = location.state.holiday;
    const [estimate, setEstimate] = useState("");
    const [seasonAverage, setSeasonAverage] = useState("");
    const [allRentalHours, setAllRentalHours] = useState({});
    const [data, setData] = useState([]);
    const[estimateHoliday, setEstimateHoliday] = useState("");

  

    useEffect(() =>{
        async function onGetEstimate(){
           console.log(`making api call: ${temperature}, ${holiday}, ${season} `)
            let response =  await fetch(`https://localhost:8080/api/getEstimate`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    temperature: temperature,
                    season: season,
                    holiday: holiday
                  }),
              }).then(res=> res.json())
              .then(json => {
                if(json.success){
                  setEstimate(Math.round(json.estimation * 100) / 100)
                  setSeasonAverage(Math.round(json.average * 100) / 100)
                  setAllRentalHours(json.allHours)
                }                
            })
            let opposite_holiday = 1
            if(holiday === 1){
              opposite_holiday = 0;
            }
            let opposite_response =  await fetch(`https://localhost:8080/api/getEstimate`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    temperature: temperature,
                    season: season,
                    holiday: opposite_holiday
                  }),
              }).then(res=> res.json())
              .then(json => {
                if(json.success){
                  setEstimateHoliday(Math.round(json.estimation * 100) / 100)    
                }
                
                
            })
          }
          onGetEstimate()
      }, [holiday, season, temperature])
      console.log(`Estimate: ${estimate} non-holiday estimat: ${estimateHoliday}`)
    return (
      <div className="container bg-light App">
      
        <div className="container text primary">
            <h1 className="display-2 text-info">
               Estimated Rental Hours: <b>{estimate} </b>
                </h1>
        <div className ="row container">
        <div className="col-8">
        <BarChartComponent estimate={estimate} seasonAverage={seasonAverage}/>
        </div>
        <div className ="col-4">
        <h1 className="display-6 text-success mt-5">Your Rental Hours Would've been:</h1>
        <h1 className="display-4 text-success ">{Math.round(Math.abs(estimate - estimateHoliday)*100)/100} hours {(estimate > estimateHoliday ? "less" : "more")}</h1>
        <h1 className="display-6 text-success">on a {holiday == 1 ? "non-" : ""}holiday</h1>
        </div>
        </div>
        <div className="col-6">
          <LineChartComponent allRentalHours={allRentalHours}/>
        </div>
        <div className="col-6">
          
        </div>
        </div>
        </div>
    )
    
}