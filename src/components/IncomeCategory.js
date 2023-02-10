import React, { useState, useEffect } from 'react'
import IncomeCategoryList from './IncomeCategoryList'
import Header from './Header';
import Sidenav from './Sidenav';
import StorageHelper from '../helpers/StorageHelper';
import NoAccess from '../NoAccess';


export default function IncomeCategory() {
  let MY_LIST = [];

  const [incomeCategory, setIncomeCategory] = useState([])
  const token = StorageHelper.getToken()


   function fetchData() {
    fetch("http://65.0.132.5:8000/income_category")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setIncomeCategory(data)
      });
  }


  useEffect(() => {
    fetchData();
  }, [""]);

  if(token)
  {
    return (
      <>
        <Header/>
          <div id="layoutSidenav">
            <Sidenav/>
              <div id="layoutSidenav_content">
                <main>
                  <IncomeCategoryList category={incomeCategory}></IncomeCategoryList>
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
