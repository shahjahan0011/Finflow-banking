"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  
  const data = {
    datasets: [
        {
            label: 'Banks',
            data: ['2150','2500','3750'],
            backgroundColor:['#e03252','#2265d8','#32ab32'] 
        }
    ],
    labels:['Bank1','Bank2','Bank3']
  }

  return <Doughnut 
  data={data}
  options={{
    cutout: '55%',
    plugins:{
        legend:{
            display: false
        }
    }
  }} 
  /> 
}

export default DoughnutChart