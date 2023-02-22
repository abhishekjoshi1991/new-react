import React , { useState, useEffect }from 'react'

import NoAccess from '../NoAccess';
import Header from './Header';
import Sidenav from './Sidenav';
import StorageHelper from '../helpers/StorageHelper';
import PieChart from './charts/PieChart';
import 'chart.js/auto'; // ADD THIS
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PieChartExp from './charts/PieChartExp';
import { Line } from 'react-chartjs-2';


export default function Home() {

  const token = StorageHelper.getToken()
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [month, setMonth] = useState("");
  const [chartDataIncome, setChartDataIncome] = useState({})
  const [chartDataExpense, setChartDataExpense] = useState({})

  function handleChange(e)
  {
    //console.log(e.target.value)
    fetchData(e.target.value);
  }
  async function fetchData(data=false)
  {
   let response='';
    if(data)
    {
      data = {month:data}
       response = await fetch('http://65.0.132.5:8000/income_expense_chart/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Token': token
        },
        body: JSON.stringify(data),
    })
    }
    else
    {
       response = await fetch('http://65.0.132.5:8000/income_expense_chart/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Token': token
        },
      })
    }
    const result = await response.json();
    if(result)
    {
      setIncome(result.data.income)
      setChartDataIncome({
        labels: result.data.income.map((data) => data.income_category), 
        datasets: [
          {
            label: "Income ",
            data: result.data.income.map((data) => data.amount),
            backgroundColor: [
              "#74BE75",
              "#60A261",
              "#446A45",
              "#61CB64"
            ],
          }
        ]
      })

      setExpense(result.data.expense)
      setChartDataExpense({
        labels: result.data.expense.map((data) => data.expense_category), 
        datasets: [
          {
            label: "Expense ",
            data: result.data.expense.map((data) => data.amount),
            backgroundColor: [
              "#ff8080",
              "#ffcccc",
              "#ff471a",
              "#b32400"
            ],
          }
        ]
      })
    }
    
  }

  useEffect(() => {
    fetchData();
  },[]);
  
  const lines = [
    
        {
          
          'label':'1997',
          'data':{
            'date1':'60',
            'date2':'90',
            'date3':'50'
          },
          'borderColor': 'rgb(255, 99, 132)',
          'backgroundColor': 'rgba(255, 99, 132, 0.5)',
          'yAxisID': 'y'
          
        },
        {
          'label':'1998',
          'data':{
            'date1':'20',
            'date3':'30'
          },
          'borderColor': 'rgb(255, 99, 132)',
          'backgroundColor': 'rgba(255, 99, 132, 0.5)',
          'yAxisID': 'y'
          
        },
        {
          'label':'1999',
          'data':{
            'date1':'20',
            'date3':'30',
            'date4':'60'
          },
          'borderColor': 'rgb(255, 99, 132)',
          'backgroundColor': 'rgba(255, 99, 132, 0.5)',
          'yAxisID': 'y'
          
        },
        
    
    ]

  

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
                    <div className='row'>
                      <div className='col-md-2'>
                        
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                        <InputLabel id="demo-simple-select-standard-label">Month</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        //value={month}
                        onChange={handleChange}
                        label="Month"
                      >
                       
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>Septeber</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                      </Select>
                      </FormControl>

                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-md-1"></div>

                      <div className="col-md-4">
                          {income.length > 0 ? (<PieChart chartData={chartDataIncome} />) : 'No data to display!!'}
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-4">
                          {expense.length > 0 ? (<PieChartExp expenseData={chartDataExpense} />) : 'No data to display!!'}
                      </div>
                    </div>
                    <div class='row'>
                    </div>
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
