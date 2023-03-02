import React from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import ExpenseCategory from './components/ExpenseCategory'
import Home from './components/Home'
import Register from './components/Register'
import IncomeCategory from './components/IncomeCategory'
import StorageHelper from './helpers/StorageHelper'
import { Context } from './helpers/Context'
import Login from './components/Login'
import AddIncome from './components/AddIncome'
import UserIncome from './components/UserIncome'
import UserExpense from './components/UserExpense'
import AddExpense from './components/AddExpense'
import EditExpense from './components/EditExpense'
import EditIncome from './components/EditIncome'


export default function RouteNew() {
    //const [token,setToken] = useState(StorageHelper.getToken());
    //console.log(token+'****888')
    const token = StorageHelper.getToken()
    const routeDefination =  createRoutesFromElements(
        <Route>

            <Route path="/" element={<Home/>}></Route>
            <Route path="/income_category" element={<IncomeCategory/>}></Route>
            <Route path="/add_income" element={<AddIncome/>}></Route>
            <Route path="/user_income" element={<UserIncome/>}></Route>
            <Route path="/user_expense" element={<UserExpense/>}></Route>
            <Route path="/add_expense" element={<AddExpense/>}></Route>
            <Route path="/expense_category" element={<ExpenseCategory/>}></Route>
            <Route path="/user_expense/:expense_id" element={<EditExpense/>}></Route>
            <Route path="/user_income/:income_id" element={<EditIncome/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>

        </Route>
    )
   
    const router = createBrowserRouter(routeDefination)
    console.log(token)
    return (
        <Context.Provider value={token}>
            <RouterProvider router={router}/>
        </Context.Provider>
    )
}
