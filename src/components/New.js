import React, { useEffect, useState } from 'react'
import 'chart.js/auto';
import PieChart from './charts/PieChart';
import StorageHelper from '../helpers/StorageHelper';
import NoAccess from '../NoAccess';
import Header from './Header';
import Sidenav from './Sidenav';


export default function New() {
    const [proddata, setProddata] = useState([])
    // const [qtydata, setQtydata] = useState([])
    const [chartData, setChartData] = useState({})
  const token = StorageHelper.getToken()


    async function api_call() {
        const res = await fetch('http://65.0.132.5:8000/income_chart/',{
            method: 'GET',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': token
            }
        })
        const result = await res.json()
        console.log(result)
        if (result) {
            setProddata(result.data.income)
            

            setChartData({
                labels: result.data.income.map((data) => data.income_category), 
                datasets: [
                  {
                    label: "Product Qunatity Data ",
                    data: result.data.income.map((data) => data.amount),
                    backgroundColor: [
                        "#74BE75",
                        "#60A261",
                        "#446A45",
                        "#61CB64"
                    ],
                  }
                ]
              })
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    if(token){
        //console.log(chartDataIncome)
        return (
        
          <>
            <Header/>
              <div id="layoutSidenav">
                <Sidenav/>
                  <div id="layoutSidenav_content">
                    <main>
                    <div className="card mb-4">
                      <div className="card-body">
                      {proddata.length > 0 ? (<PieChart chartData={chartData} />) : 'No data to display!!'}
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

    return (
        <div>
            ProductsQty
            {proddata.length > 0 ? (<PieChart chartData={chartData} />) : 'No data to display!!'}
            
        </div>
    )
}