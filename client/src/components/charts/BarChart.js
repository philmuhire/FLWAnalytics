import React, { useEffect } from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

const BarChart = ({chartData}) => {
    useEffect(()=>{
        console.log("disp chartdata")
        console.log(chartData.datasets[0].data)
    },[])
  return (
    <div style={{width: 600}}>
        <Bar data={chartData} />
    </div>
    // <div>hhh</div>
    )
}

export default BarChart