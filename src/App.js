import React from 'react'
import './App.css'
import { RaptorTable } from './component/RaptorDataTable'
import valueData from './data'

import { COLUMNS } from './columns'
import MOCK_DATA from './MOCK_DATA.json'
function App() {
  // const  columns = COLUMNS
  // const data = MOCK_DATA
  
  const  columns = [
    {
      Header: "Card Number",
      accessor: "cardNumber",
      className: "secure-data",
      disableFilters: true,
      type : 'text',
      width: 180,
      sort : 'true'
  },
  {
      Header: "Activation Account Number",
      accessor: "activationAccountNumber",
      className: "secure-data",
      type : 'text',
      width: 180,
      sort : 'true'
      
   },
   {
      Header: "Redemption Account Number",
      accessor: "redemptionAccountNumber",
      className: "secure-data",
      type : 'dropDown',
      width: 180,
      sort : 'true'
   },
   {
    Header: "Date",
    accessor: "date",
    type : 'date',
    width: 180,
    sort : 'false'
    
  }
  ]

  const data = valueData();
  return (
    <div className='App'>
     <RaptorTable
        defaultPageSize={10}
        filterable={true}
        minRows={3}
        data={data}
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
