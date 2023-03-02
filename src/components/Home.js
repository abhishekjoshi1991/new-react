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
import BarChart from './charts/BarChart';
import Loader from './Loader';

 
export default function Home() {

  const token = StorageHelper.getToken()
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [chartDataIncome, setChartDataIncome] = useState({})
  const [chartDataExpense, setChartDataExpense] = useState({})
  const [barData, setBarData] = useState({})
  const [chartBarData, setChartBarData] = useState({})

  function handleChange(e)
  {
    fetchData(e.target.value);
  }

  function handleChangeYear(e)
  {
    //console.log(e.target.value)
    getBarChart(e.target.value);
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
      setMonth(result.data.income[0].month)
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
            datalabels: {
              color: 'white',
              font: {
                weight: 'bold'
              },
             display:false
            },
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
              "#b32400",
              "#D32F25",
              "#A04E49",
              "#F5554C"
            ],
            datalabels: {
              color: 'white',
              font: {
                weight: 'bold'
              },
             display:false
            },
          }
        ]
      })
    }
    
  }

  async function getBarChart(data=false)
  {
    let response='';
    if(data)
    {
      data = {year:data}
       response = await fetch('http://65.0.132.5:8000/income_expense_all_year/',{
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
       response = await fetch('http://65.0.132.5:8000/income_expense_all_year/',{
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
       setBarData(result)
       setYear(result[0]['year'])
       const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
       setChartBarData(
         {
            labels: labels,
            datasets: result
         }
       )
    }
    console.log(barData)
  }

  useEffect(() => {
    fetchData();
    getBarChart();
  },[]);
  
  

  

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
                        value={month}
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
                    </div><br></br><br></br>
                    <div className='row'>
                      <div className='col-md-2'>
                        
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={year}
                        onChange={handleChangeYear}
                        label="Year"
                      >
                       
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                        <MenuItem value={2025}>2025</MenuItem>
                        <MenuItem value={2026}>2026</MenuItem>
                        <MenuItem value={2027}>2027</MenuItem>
                        <MenuItem value={2028}>2028</MenuItem>
                        <MenuItem value={2029}>2029</MenuItem>
                        <MenuItem value={2030}>2030</MenuItem>
                        
                      </Select>
                      </FormControl>

                      </div>
                      
                    </div>
                    <div className='row'>
                      <div className='col-md-10'>
                        {barData.length > 0 ? (<BarChart data={chartBarData} />) : 'No data to display!!'}
                      </div>
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
