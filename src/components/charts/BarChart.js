import React from 'react'
import { Bar } from 'react-chartjs-2'



export default function BarChart({data}) {
  return (
    <div>
        <h3 style={{ textAlign: "center" }}>Year-wise Income Expense Visuals</h3>
        <Bar
            data={data}
            options={{
                plugins:{
                    datalabels:
                    {
                        display:false
                    }
                }
            }
                
            }
        
        >
        
        </Bar>
    </div>
    
  )
}
