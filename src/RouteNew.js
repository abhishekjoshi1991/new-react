import React,{useState} from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Router, Route } from 'react-router-dom'
import ExpenseCategory from './components/ExpenseCategory'
import Home from './components/Home'
import Register from './components/Register'
import IncomeCategory from './components/IncomeCategory'
import StorageHelper from './helpers/StorageHelper'
import NoAccess from './NoAccess'
import { Context } from './helpers/Context'
import Login from './components/Login'
import AddIncome from './components/AddIncome'
import UserIncome from './components/UserIncome'
import UserExpense from './components/UserExpense'
import AddExpense from './components/AddExpense'
import New from './components/New'

//const UserContext = createContext();


// const token = StorageHelper.getToken();
// let routeDefination='';
// routeDefination  =  createRoutesFromElements(
//             <Route>
//                 <Route path="/" element={<Home/>} errorElement={<NoAccess/>}></Route>
//                 <Route path="/income_category" element={<IncomeCategory/>}></Route>
//                 <Route path="/expense_category" element={<ExpenseCategory/>}></Route>
//                 <Route path="/register" element={<Register/>}></Route>
    
//             </Route>
//         )
// if(token===null)
// {
//     routeDefination  =  createRoutesFromElements(
//         <Route>
//             <Route path="/register" element={<Register/>}></Route>
//             <Route path="/income_category" element={<NoAccess/>}></Route>
//             <Route path="/expense_category" element={<NoAccess/>}></Route>
//             <Route path="/" element={<NoAccess/>}></Route>

//         </Route>
//     )
// }
// else
// {
//     routeDefination  =  createRoutesFromElements(
//         <Route>
//             <Route path="/" element={<Home/>}></Route>
//             <Route path="/income_category" element={<IncomeCategory/>}></Route>
//             <Route path="/expense_category" element={<ExpenseCategory/>}></Route>
//             <Route path="/register" element={<NoAccess/>}></Route>

//         </Route>
//     )
// }
 

//const router = createBrowserRouter(routeDefination)

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
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>

        </Route>
    )
    const routeDefinationNoAccess =  createRoutesFromElements(
             
        <Route>

            <Route path="/" element={<NoAccess/>}></Route>
            <Route path="/income_category" element={<NoAccess/>}></Route>
            <Route path="/expense_category" element={<NoAccess/>}></Route>
            <Route path="/add_income" element={<NoAccess/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>

        </Route>
    )
    
    const router = createBrowserRouter(routeDefination)
    const routerNoAccess = createBrowserRouter(routeDefinationNoAccess)
    console.log(token)
    return (
        <Context.Provider value={token}>
            <RouterProvider router={router}/>
        </Context.Provider>
    )

    if(token)
    {
        return (
            <Context.Provider value={token}>
                <RouterProvider router={router}/>
            </Context.Provider>
        )
    }
    else
    {
        return (
            <RouterProvider router={routerNoAccess}/>
        )
    }
  
}
