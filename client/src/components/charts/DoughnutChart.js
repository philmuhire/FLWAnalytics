import React, { useEffect } from 'react'
import {Doughnut} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

const DoughnutChart = ({chartData}) => {
    useEffect(()=>{
        console.log("disp chartdata")
        console.log(chartData.datasets[0].data)
    },[])
  return (
    <div style={{width: 400}}>
        <Doughnut data={chartData} />
    </div>
    // <div>hhh</div>
    )
}

export default DoughnutChart