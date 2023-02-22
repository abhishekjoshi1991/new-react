import React from "react";
import { Pie } from "react-chartjs-2";
import { Card} from '@mui/material';

function PieChart({ chartData, expenseData }) {
  //console.log('here',incomeData)
  return (
    <div className="chart-container">
      <Card  className='mt-5'>

        <h3 style={{ textAlign: "center" }}>Income Visuals</h3>
          <Pie
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  //text: "Income"
                }
              }
            }}
          />
        </Card>
      
    </div>
  );
}
export default PieChart;
