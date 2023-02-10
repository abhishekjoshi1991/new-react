import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import RouteNew from './RouteNew';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <React.StrictMode>
    {/* <Header></Header>
          <Sidenav></Sidenav>
         */}
            <RouteNew/>

    {/* <Router>
      <Routes>
        
        <Route index element={<App />} />
          <Route exact path='/register' element={< Register />}></Route>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/income_category' element={< IncomeCategory />}></Route>
          <Route exact path='/expense_category' element={< ExpenseCategory />}></Route>
      </Routes>
    </Router> */}
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
