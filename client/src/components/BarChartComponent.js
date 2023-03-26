import React from 'react';
import BarChart from 'react-bar-chart';
 
 
 export default function BarChartComponent (props) {

  const data = [
    {text: 'Estimate', value: props.estimate}, 
    {text: 'Season Average', value: props.seasonAverage} 
  ];
   
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
 
 
    return (
        <div>
          <h1 className="display-6 text-success"> Estimation vs. Season Average</h1>
            <div style={{width: '80%'}}> 
                <BarChart ylabel='Rental Hours'
                  width={500}
                  height={300}
                  margin={margin}
                  data={data}
                  />
             <b><div className="p-2 text-success">
              {(props.estimate > props.seasonAverage 
                ? " Congrats our estimate is greater than the season's average!" 
                : "Unfortunately, today's rental hours are estimated to be lower than season's average")}
              
            </div></b>
            </div>
        </div>
    );
  }
