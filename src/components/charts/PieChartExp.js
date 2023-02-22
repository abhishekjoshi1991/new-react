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
                }
              }
            }}
          />
       </Card>
      
    </div>
  );
}
export default PieChartExp;
