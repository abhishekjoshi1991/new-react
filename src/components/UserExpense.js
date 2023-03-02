import React, { useState, useEffect } from 'react'
import Header from './Header';
import Sidenav from './Sidenav';
import StorageHelper from '../helpers/StorageHelper';
import NoAccess from '../NoAccess';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Loader from './Loader';
import parse from 'html-react-parser';
import {  useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';



export default function UserExpense() {
  const token = StorageHelper.getToken()
  const [expense, setExpense] = useState([])
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();

  function editHandle(e){
    console.log(e.currentTarget.getAttribute("data-value"));
    var id = e.currentTarget.getAttribute("data-value")
    navigate('/user_expense/'+id)
  }

  function deleteHandle(e)
  {
    console.log(e.currentTarget.getAttribute("data-value"));
    var id = e.currentTarget.getAttribute("data-value")
    deleteExpense(id)
  }

  async function deleteExpense(id)
    {
      //console.log(id)
      setLoader(true)
      const data= {
        id: id
      }

      const response = await fetch('http://65.0.132.5:8000/expense/',{
          method: 'DELETE',
          //mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json',
              'Access-Token': token
          },
          body: JSON.stringify(data),

      })
      const result =await response.json();
      //console.log(result.data.user_data.token)
      if(result.data.status_code===200)
      {
        //console.log(result.data.expense);
        navigate(0)
        setLoader(false)
      }
      if(result.data.status_code===400)
      {
        //setError(result.data.message);
      }
    }
  
var newData = expense.map((dt,i)=>{
  let action = parse("<button id="+dt.id+"></button>",{
    replace: ({ attribs }) => {
      if (attribs ) {
        return <><a data-value={attribs.id} onClick={editHandle}><EditIcon color="primary"/></a>&nbsp;&nbsp;&nbsp;<a data-value={attribs.id} onClick={deleteHandle}><DeleteIcon  sx={{ color: pink[500] }}/></a>
        </>;
      }
    }
  })
  return ({ ...dt, action });

})
  useEffect(() => {
    async function fetchData()
    {
      setLoader(true)

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
        //console.log(result.data.expense);
        setExpense(result.data.expense)
        setLoader(false)

      }
      if(result.data.status_code===400)
      {
        //setError(result.data.message);
      }
    }
    
    fetchData();
  }, [token]);

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
     name: "expense_categ_id",
     label: "Expense Category",
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
    {
      name: "action",
      label: "Action",
      options: {
       filter: true,
       sort: false,
      }
  },
  

    
   ];

  if(token && loader===false) 
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
                        <Link className="nav-link" to="/add_expense" style={{color:"white"}}><AddIcon /></Link>
                        </Fab>
                        <br></br>
                        <MUIDataTable
                        title={"My Expense"}
                        data={newData}
                        columns={columns2}
                        options={{
                          selectableRows: false
                        }}
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
