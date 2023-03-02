import React from "react";
import { Pie } from "react-chartjs-2";
import { Card} from '@mui/material';

function PieChartExp({  expenseData }) {
  //console.log('here',incomeData)
  return (
    <div className="chart-container">
      <Card  className='mt-5'>

        <h3 style={{ textAlign: "center" }}>Expense Visuals</h3>
          <Pie
            data={expenseData}
            options={{
              plugins: {
                title: {
                  display: true,
                  //text: "Income"
                },
                datalabels: {
                    display: true,
                    formatter: (value, ctx) => {
                      let sum = 0;
                      let dataArr = ctx.chart.data.datasets[0].data;
                      dataArr.map(data => {
                          sum += data;
                      });
                      let percentage = (value*100 / sum).toFixed(2)+"%";
                      return percentage;
                  },
      
                  },
              }
            }}
          />
       </Card>
      
    </div>
  );
}
export default PieChartExp;
