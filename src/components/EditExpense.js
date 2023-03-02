import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header';
import Sidenav from './Sidenav';
import StorageHelper from '../helpers/StorageHelper';
import NoAccess from '../NoAccess';
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, TextField, CardContent , CardHeader, Button} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Loader from './Loader';


export default function EditExpense() {
    const {expense_id} = useParams()
    const token = StorageHelper.getToken()
    const [incomeCategory, setIncomeCategory] = useState([])
    const [expense, setExpense] = useState([])
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [error, setError]  = useState([]);
    const [categoryError, setCategoryError]  = useState('');
    const [amountError, setAmountError]  = useState('');
    const [dateError, setDateError]  = useState('');
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();



    
    function fetchDataExpense() {
        fetch("http://65.0.132.5:8000/expense_category")
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            setIncomeCategory(data)
          });
      }

    async function submitHandler(e) {
        //e.preventDefault();
    
        console.log(amount);
        console.log(date);
        console.log(category);
        console.log(description);
        if(category==="")
            setCategoryError("Please Select Category")
        else
            setCategoryError('')
        if(amount==="")
            setAmountError("Please Enter Amount")
        else
            setAmountError('')
        if(date==="")
            setDateError("Please Select Date")
        else
            setDateError('')
    
        const data = {
            expense_categ_id: category,
            description: description,
            transaction_date: date,
            amount: amount,
            id: expense_id
        }
    
        const response = await fetch('http://65.0.132.5:8000/expense/',{
              method: 'PUT',
              body: JSON.stringify(data),
              //mode: 'no-cors',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Token': token
              }
          })
          const result =await response.json();
          //console.log(result.data.user_data.token)
          if(result.data.status_code===200)
          {
            console.log("Success");
            
    
            navigate('/user_expense',{replace:true})
          }
          if(result.data.status_code===400)
          {
            setError(result.data.message);
          }
      }
      useEffect(() => {
        async function fetchData()
        {
            setLoader(true)

            const response = await fetch('http://65.0.132.5:8000/expense_details/',{
            method: 'POST',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': token
            },
            body: JSON.stringify({id: expense_id}),

          })
          const result =await response.json();
          //console.log(result.data.user_data.token)
          if(result.data.status_code===200)
          {
            console.log(result.data.expense[0]);
            setExpense(result.data.expense[0])
            setCategory(result.data.expense[0]['expense_categ_id'])
            setAmount(result.data.expense[0]['amount'])
            setDate(result.data.expense[0]['transaction_date'])
            setDescription(result.data.expense[0]['description'])
            setLoader(false)

          }
          if(result.data.status_code===400)
          {
            //setError(result.data.message);
          }
        }
        fetchData();
        fetchDataExpense();
      }, [expense_id,token]);
    
    if(token)
    {
    return (
      <>
        <Header/>
          <div id="layoutSidenav">
            <Sidenav/>
              <div id="layoutSidenav_content">
                <main>
                <div className="card mb-4">
                  <div className="card-body">
                  <div className="row justify-content-center">
                <div className="col-lg-4">
                <center><CardHeader title="Edit Expense"/></center>

                <Card variant="outlined" className='mt-5'>

                    <CardContent>
                    <div className="form-floating mb-3 mr-3">

                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="demo-simple-select-label">Expense Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                        label="Age"
                        >

                            {incomeCategory.map((cat,index)=>(
                                <MenuItem key={index} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        
                        </Select>

                    </FormControl>
                    {<p style={{color:"red"}}>{categoryError}</p>}
                        
                        </div>
                        <div className="form-floating mb-3 mr-3">
                            <TextField id="fullwidth"
                            label="Amount"
                            fullWidth
                            //type="number"
                            variant='standard'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            />
                            {<p style={{color:"red"}}>{amountError}</p>}


                        </div>
                        <div className="form-floating mb-3 mr-3">
                            <TextField
                                label="Description"
                                aria-label="minimum height"
                                fullWidth
                                value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                                variant='standard'
                            />
                        </div>
                        
                        <div className="form-floating mb-3 mr-3">

                        <TextField
                            id="date"
                            label="Transaction Date"
                            type="date"
                            variant='standard'
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            
                        />
                        {<p style={{color:"red"}}>{dateError}</p>}


                        </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0" style={{marginLeft:'150px'}}>
                                    <center>
                                    <Button variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleSubmit(submitHandler)}
                                        >
                                        Submit
                                    </Button>
                                    </center>

                            </div>
                    </CardContent>
                </Card>
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
  else if(loader===true)
  {
    return (
      <>
        <Loader/>      
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
