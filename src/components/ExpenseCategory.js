import React, { useState, useEffect } from 'react'
import ExpenseCategoryList from './ExpenseCategoryList'
import Header from './Header';
import Sidenav from './Sidenav';


export default function ExpenseCategory() {

  const [expenseCategory, setExpenseCategory] = useState([])

   function fetchData() {
    fetch("http://65.0.132.5:8000/expense_category/")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setExpenseCategory(data)
      });
  }


  useEffect(() => {
    fetchData();
  }, [""]);

  return (
    <>
      <Header/>
        <div id="layoutSidenav">
          <Sidenav/>
            <div id="layoutSidenav_content">
              <main>
                <ExpenseCategoryList category={expenseCategory}></ExpenseCategoryList>
              </main>
            </div>
        </div>
    </>
  )
}
