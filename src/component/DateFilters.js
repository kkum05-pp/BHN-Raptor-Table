import React from "react";
import moment from 'moment'; 

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length }
  }
}) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    //   placeholder={`buscar (${length}) ...`}
    ></input>
  );
};

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Todos</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
 function inputFormatDate (filterValues , i){
   // var dateAndHour = r.values[id].split(" ");
   var valueDate = ''
    var [day, month, year] = filterValues[i]? filterValues[i].split("-") : '';
    if(filterValues[i]){
    let formatDate = [day,month, year].join("/")
    valueDate =  moment(formatDate).format("DD/MM/YYYY");
    }
    return valueDate;
}

export function dateBetweenFilterFn(rows, id, filterValues) {
//   const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
//   const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;

const sd = inputFormatDate(filterValues,0);
const ed = inputFormatDate(filterValues,1);
  if (ed || sd) {
    return rows.filter((r) => {
      // format data
       var dateAndHour = r.values[id].split(" ");
    //   var [day, month, year] = dateAndHour[0].split("/");
    //   var date = [day,month, year].join("-");
    //   var hour = dateAndHour[1];
    //   // var formattedData = date + " " + hour;
    //   //var formattedData = date;
    //   const cellDate = date;
     const cellDate = dateAndHour[0]
    // const cellDate = new Date(formattedData);
     //   const cellDate = moment(formattedData).format("MM/DD/YYYY");

      if (ed && sd) {
        return cellDate >= sd && cellDate <= ed;
      } else if (sd) {
        return cellDate >= sd;
      } else {
        return cellDate <= ed;
      }
    });
  } else {
    return rows;
  }
}

export function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <input
        //min={min.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        type="date"
        value={filterValue[0] || ""}
      />
      {" to "}
      <input
        //max={max.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            // val ? val.concat("T23:59:59.999Z") : undefined
            val ? val : undefined
          ]);
        }}
        type="date"
        value={filterValue[1]?.slice(0, 10) || ""}
       // value={filterValue[1] || ""}
      />
    </div>
  );
}
