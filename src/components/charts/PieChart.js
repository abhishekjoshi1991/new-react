import React from "react";
import { Pie } from "react-chartjs-2";
import { Card, TextField, CardContent , CardHeader, Button, Alert} from '@mui/material';

function PieChart({ incomeData, expenseData }) {
  return (
    <div className="chart-container">
      <Card  className='mt-5'>

      <div className="row">
      <div className="col-md-1"></div>

        <div className="col-md-4">
        <h3 style={{ textAlign: "center" }}>Income Pie Chart</h3>
          <Pie
            data={incomeData}
            options={{
              plugins: {
                title: {
                  display: true,
                  //text: "Income"
                }
              }
            }}
          />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4">
        <h3 style={{ textAlign: "center" }}>Expense Pie Chart</h3>
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
        </div>
      
      
      </div>
      </Card>
      
    </div>
  );
}
export default PieChart;
