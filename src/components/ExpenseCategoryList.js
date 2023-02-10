import React,{useEffect} from 'react'
import MUIDataTable from "mui-datatables";

export default function ExpenseCategoryList(props) {
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
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: false,
     }
    }
    
   ];
   
  const options = {
    filterType: 'checkbox',
  };
  const data2 = props.category
  return (
    <div className="card mb-4">
      
      <div className="card-body">
      <MUIDataTable
          title={"Expense Category"}
          data={data2}
          columns={columns2}
          options={options}
        />
      </div>
  </div>
  )
}
