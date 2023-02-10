import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import IncomeCategory from './components/IncomeCategory';
import ExpenseCategory from './components/ExpenseCategory';
import Home from './components/Home';
// import './css/styles.css';
import './js/scripts.js';
// import NavigationBar from './components/Navigation';


function App() {
  <Routes>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>}></Route>
    {/* <Route path="/income_category" element={<ProtectedRoutes><IncomeCategory/></ProtectedRoutes>}></Route>
    <Route path="/expense_category" element={<ProtectedRoutes><ExpenseCategory/></ProtectedRoutes>}></Route> */}
  </Routes>
  
}

export default App;
