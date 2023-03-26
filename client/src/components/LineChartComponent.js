import React, { Component } from 'react';
import LineChart from 'react-linechart';

 
export default function LineChartComponent(props) {
    console.log(props.allRentalHours)
        const data = [
            {									
                color: "steelblue", 
                points: [{x: 1, y: (props.allRentalHours.winter)/1000}, {x: 2, y: (props.allRentalHours.spring)/1000}, {x: 3, y: (props.allRentalHours.summer)/1000}, {x: 4, y: (props.allRentalHours.fall)/1000}] 
            }
        ];
        return (
            <div>
                <div className="lineChart">
                    <h1 className="display-6 text-success">Rental Hours per Season</h1>
                    <LineChart 
                        width={600}
                        height={400}
                        data={data}
                        xLabel="Seasons"
                        yLabel="Rental Hours(in thousands)"
                        yMin={0}
                    />
                <div>
             1 - Winter, 2 - Spring, 3 - Summer, 4 - Fall
                </div>
                </div>				
            </div>
        );

}