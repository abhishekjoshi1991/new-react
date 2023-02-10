import React , {useState}from 'react'

import NoAccess from '../NoAccess';
import Header from './Header';
import Sidenav from './Sidenav';
import StorageHelper from '../helpers/StorageHelper';
import PieChart from './charts/PieChart';
import 'chart.js/auto'; // ADD THIS


export default function Home() {

  const token = StorageHelper.getToken()
  
  const incomeData = [
    {
      id:1,
      month: 'Jan',
      income_category: 'Salary',
      amount: 60000
    },
    {
      id:2,
      month: 'Jan',
      income_category: 'Other',
      amount: 8000
    },
  ]

  const expenseData = [
    {
      id:1,
      month: 'Jan',
      expense_category: 'Food',
      amount: 400
    },
    
    {
      id:2,
      month: 'Jan',
      expense_category: 'Travel',
      amount: 3000
    },
    {
      id:3,
      month: 'Jan',
      expense_category: 'Medical',
      amount: 3000
    },
  ]
  const [chartDataExpense, setChartDataExpense] = useState({
    labels: expenseData.map((data) => data.expense_category), 
    datasets: [
      {
        label: "Expense ",
        data: expenseData.map((data) => data.amount),
        backgroundColor: [
          //"rgba(75,192,192,1)",
          "#DD5140",
          "#AF4D41",
          "#FD978A",
          "#E93821"
        ],
        //borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const [chartDataIncome, setChartDataIncome] = useState({
    labels: incomeData.map((data) => data.income_category), 
    datasets: [
      {
        label: "Income ",
        data: incomeData.map((data) => data.amount),
        backgroundColor: [
          //"rgba(75,192,192,1)",
          "#74BE75",
          "#60A261",
          "#446A45",
          "#61CB64"
        ],
        //borderColor: "black",
        //borderWidth: 2
      }
    ]
  });
  
  //console.log(token)
  
  if(token){
    return (
    
      <>
        <Header/>
          <div id="layoutSidenav">
            <Sidenav/>
              <div id="layoutSidenav_content">
                <main>
                <div className="card mb-4">
                  <div className="card-body">
                    <PieChart incomeData={chartDataIncome} expenseData={chartDataExpense}/>
                  </div>
                  </div>
                </main>
            </div>
        </div>
      </>
      
    )
  }
  else
  {
    return (
      <>
        <NoAccess/>      
      </>
    )
  }
  
}
