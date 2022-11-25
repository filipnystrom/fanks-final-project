import React from "react";

import { Line } from "react-chartjs-2";



export const Data = [
    {
      id: 1,
      day: "Su",
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
    day: "M",
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
     day: "Tu",
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      day: "W",
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      day: "Th",
      userGain: 4300,
      userLost: 234
    },
    {
      id: 6,
      day: "F",
      userGain: 4500,
      userLost: 234
    },
    {
      id: 7,
      day: "Sa",
      userGain: 4500,
      userLost: 234
    }
  ];
  
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 >Line Chart</h2> 
      <Line data={chartData} />
    </div>
  );
}
export default LineChart;
