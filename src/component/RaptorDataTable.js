import React, { useMemo, useState } from 'react'
import { useTable , useFilters , useGlobalFilter, usePagination,useAsyncDebounce, useSortBy} from 'react-table'
import  {matchSorter}  from 'match-sorter'
import './table.css'
import { Checkbox } from './Checkbox'
import { ColumnFilter } from './ColumnFilter'
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";

import {
  SelectColumnFilter,
  DateRangeColumnFilter,
  dateBetweenFilterFn,
  Filter,
   DefaultColumnFilter
} from "./DateFilters"; 




function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);
  
    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0"
          }}
        />
      </span>
    );
  }

export const RaptorTable = (props) => {
  const columns = useMemo(() => props.columns, [])
  const data = useMemo(() => props.data, [])

  const [selectedDate,setSelectedDate] = useState(null)
  columns.forEach((value )=> {
    if(value.type == 'dropDown'){
    value.Filter = SelectColumnFilter
  } 
  if(value.type == 'date'){
    value.Filter =  DateRangeColumnFilter
    value.filter = dateBetweenFilterFn
  }
  })

  // function DateColumnFilter({
  //   column: { filterValue, setFilter, preFilteredRows, id }
  // }) {
  //   // Calculate the options for filtering
  //   // using the preFilteredRows
  //   const options = React.useMemo(() => {
  //     const options = new Set();
  //     preFilteredRows.forEach((row) => {
  //       options.add(row.values[id]);
  //     });
  //     return [...options.values()];
  //   }, [id, preFilteredRows]);
  
  //   // Render a multi-select box
  //   const [startDate, setStartDate] = useState(new Date());  
  //   return (

  //     <DatePicker selected={startDate} 
  //     // calendarIcon = "Calendar"
  //     value={filterValue}
  //     onChange={(date) =>   
  //       setStartDate(date)} 
        
  //      />
  //   );
  // }

  


  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
  
    // Render a multi-select box
    const [startDate, setStartDate] = useState(new Date());  
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      // <DatePicker selected={startDate} 
      // calendarIcon = "Calendar"
      // onChange={(date) =>   
      //   setStartDate(date)} 
        
      //  />
    );
  }

 

  function fuzzyTextFilterFn(data, id, filterValue) {
    return matchSorter(data, filterValue, { keys: [(row) => row.values[id]] });
  }
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: ColumnFilter
  //   }),
  //   []
  // )

  // const filterTypes = React.useMemo(
  //   () => ({
  //     // Add a new fuzzyTextFilterFn filter type.
  //     fuzzyText: fuzzyTextFilterFn,
  //     // Or, override the default text filter to use
  //     // "startWith"
  //     text: (data, id, filterValue) => {
  //       return data.filter((row) => {
  //         const rowValue = data.values[id];
  //         return rowValue !== undefined
  //           ? String(rowValue)
  //               .toLowerCase()
  //               .startsWith(String(filterValue).toLowerCase())
  //           : true;
  //       });
  //     }
  //   }),
  //   []
  // );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data,
  //  defaultColumn,
  defaultColumn: { Filter: DefaultColumnFilter },
    initialState: { pageIndex : 0 }
   // filterTypes
  },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination
  
  )
 
  return (
    <>
      <div>
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* {column.sort && column.sort == true ?  */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                   {/* : ''} */}
                  {column.canFilter ? column.render('Filter') : null}
                  </th>
              ))}
            </tr>
          ))}

        <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
                 <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
         
          {page.map((row,i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> 
    </>
  )
}

