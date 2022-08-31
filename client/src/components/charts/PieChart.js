import React, { useEffect } from 'react'
import {Pie} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

const PieChart = ({chartData}) => {
    useEffect(()=>{
        console.log("disp chartdata")
        console.log(chartData.datasets[0].data)
    },[])
  return (
    <div style={{width: 500}}>
        <Pie data={chartData} />
    </div>
    // <div>hhh</div>
    )
}

export default PieChart