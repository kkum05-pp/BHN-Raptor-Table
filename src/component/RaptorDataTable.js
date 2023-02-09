import React, {useState, useEffect} from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
// import _ from 'lodash';

export const RaptorTable = (props) => {
 
  let noDataText = "No data found"
  if(props.noDataText && props.noDataText !== ''){
    noDataText = props.noDataText
  }

  let defaultPageSize = 25
  if(props.defaultPageSize){
    defaultPageSize = props.defaultPageSize
  }

  let minRows = 25
  if(props.minRows){
    minRows = props.minRows
  }
 
   return(<div> 
          <ReactTable
                minRows={minRows}
                defaultPageSize={defaultPageSize}
                data={props.data}
                columns={props.columns}
                noDataText={noDataText}
                className='searchResults -highlight -striped'
            />
   </div>
  )
 }

