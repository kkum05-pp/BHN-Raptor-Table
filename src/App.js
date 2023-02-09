import React from 'react'
import './App.css'
import { RaptorTable } from './component/RaptorDataTable'
import valueData from './data'

function App() {
  const  columns = [
    {
      Header: "Card Number",
      accessor: "cardNumber",
      className: "secure-data",
      width: 180
  },
  {
      Header: "Activation Account Number",
      accessor: "activationAccountNumber",
      className: "secure-data",
      width: 180,
      
   },
   {
      Header: "Redemption Account Number",
      accessor: "redemptionAccountNumber",
      className: "secure-data",
      width: 180,
   }
  ]

  const Data = valueData();
  return (
    <div className='App'>
     <RaptorTable
        defaultPageSize={10}
        filterable={true}
        minRows={3}
        data={Data}
        noDataText="No data found"
        columns={columns}
        transactionTypeMessage={'React Data'}
        copyRowJSONRequired={true}
        searchType='blast'
      />

    </div>
  )
}

export default App
