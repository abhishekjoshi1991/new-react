import React, { useState, useEffect } from 'react'
import Header from './Header';
import Sidenav from './Sidenav';
import StorageHelper from '../helpers/StorageHelper';
import NoAccess from '../NoAccess';
import { Card, TextField, CardContent , CardHeader, Button, Alert, Divider} from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

export default function UserIncome() {
  const token = StorageHelper.getToken()
  const [income, setIncome] = useState([])
  async function fetchData()
  {
    const response = await fetch('http://65.0.132.5:8000/userinfo/',{
        method: 'GET',
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
      console.log(result.data.income);
      setIncome(result.data.income)
    }
    if(result.data.status_code===400)
    {
      //setError(result.data.message);
    }
  }
  


  useEffect(() => {
    fetchData();
  }, [""]);

  const columns2 = [
    {
     name: "id",
     label: "ID",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "income_categ_id",
     label: "Income Category",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
        name: "amount",
        label: "Amount",
        options: {
         filter: true,
         sort: true,
        }
    },
    {
        name: "transaction_date",
        label: "Transaction Date",
        options: {
         filter: true,
         sort: true,
        }
    },
    {
        name: "description",
        label: "Description",
        options: {
         filter: true,
         sort: false,
        }
    },

    
   ];

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
                    <div className="row ">
                        <Fab color="primary" aria-label="add" style={{marginBottom: "10px"}}>
                        <Link className="nav-link" to="/add_income" style={{color:"white"}}><AddIcon /></Link>
                        </Fab>
                        <br></br>
                        <MUIDataTable
                        title={"My Income"}
                        data={income}
                        columns={columns2}
                        //options={options}
                        />
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
