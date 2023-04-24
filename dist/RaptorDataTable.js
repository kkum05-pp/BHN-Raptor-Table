"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaptorTable = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactTable = require("react-table");
var _matchSorter = require("match-sorter");
require("./table.css");
var _Checkbox = require("./Checkbox");
var _ColumnFilter = require("./ColumnFilter");
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
var _DateFilters = require("./DateFilters");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function GlobalFilter(_ref) {
  let {
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  } = _ref;
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = _react.default.useState(globalFilter);
  const _onChange = (0, _reactTable.useAsyncDebounce)(value => {
    setGlobalFilter(value || undefined);
  }, 200);
  return /*#__PURE__*/_react.default.createElement("span", null, "Search:", " ", /*#__PURE__*/_react.default.createElement("input", {
    value: value || "",
    onChange: e => {
      setValue(e.target.value);
      _onChange(e.target.value);
    },
    placeholder: "".concat(count, " records..."),
    style: {
      fontSize: "1.1rem",
      border: "0"
    }
  }));
}
const RaptorTable = props => {
  const columns = (0, _react.useMemo)(() => props.columns, []);
  const data = (0, _react.useMemo)(() => props.data, []);
  const [selectedDate, setSelectedDate] = (0, _react.useState)(null);
  columns.forEach(value => {
    if (value.type == 'dropDown') {
      value.Filter = SelectColumnFilter;
    }
    if (value.type == 'date') {
      value.Filter = _DateFilters.DateRangeColumnFilter;
      value.filter = _DateFilters.dateBetweenFilterFn;
    }
  });

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

  function SelectColumnFilter(_ref2) {
    let {
      column: {
        filterValue,
        setFilter,
        preFilteredRows,
        id
      }
    } = _ref2;
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = _react.default.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    const [startDate, setStartDate] = (0, _react.useState)(new Date());
    return /*#__PURE__*/_react.default.createElement("select", {
      value: filterValue,
      onChange: e => {
        setFilter(e.target.value || undefined);
      }
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: ""
    }, "All"), options.map((option, i) => /*#__PURE__*/_react.default.createElement("option", {
      key: i,
      value: option
    }, option)))
    // <DatePicker selected={startDate} 
    // calendarIcon = "Calendar"
    // onChange={(date) =>   
    //   setStartDate(date)} 

    //  />
    ;
  }

  function fuzzyTextFilterFn(data, id, filterValue) {
    return (0, _matchSorter.matchSorter)(data, filterValue, {
      keys: [row => row.values[id]]
    });
  }
  fuzzyTextFilterFn.autoRemove = val => !val;

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
    state: {
      pageIndex,
      pageSize
    }
  } = (0, _reactTable.useTable)({
    columns,
    data,
    //  defaultColumn,
    defaultColumn: {
      Filter: _DateFilters.DefaultColumnFilter
    },
    initialState: {
      pageIndex: 0
    }
    // filterTypes
  }, _reactTable.useFilters, _reactTable.useGlobalFilter, _reactTable.useSortBy, _reactTable.usePagination);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, getToggleHideAllColumnsProps()), " Toggle All"), allColumns.map(column => /*#__PURE__*/_react.default.createElement("div", {
    key: column.id
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", _extends({
    type: "checkbox"
  }, column.getToggleHiddenProps())), ' ', column.Header))), /*#__PURE__*/_react.default.createElement("br", null)), /*#__PURE__*/_react.default.createElement("table", getTableProps(), /*#__PURE__*/_react.default.createElement("thead", null, headerGroups.map(headerGroup => /*#__PURE__*/_react.default.createElement("tr", headerGroup.getHeaderGroupProps(), headerGroup.headers.map(column => /*#__PURE__*/_react.default.createElement("th", column.getHeaderProps(column.getSortByToggleProps()), column.render('Header'), /*#__PURE__*/_react.default.createElement("span", null, column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''), column.canFilter ? column.render('Filter') : null)))), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    colSpan: visibleColumns.length,
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/_react.default.createElement(GlobalFilter, {
    preGlobalFilteredRows: preGlobalFilteredRows,
    globalFilter: state.globalFilter,
    setGlobalFilter: setGlobalFilter
  })))), /*#__PURE__*/_react.default.createElement("tbody", getTableBodyProps(), page.map((row, i) => {
    prepareRow(row);
    return /*#__PURE__*/_react.default.createElement("tr", row.getRowProps(), row.cells.map(cell => {
      return /*#__PURE__*/_react.default.createElement("td", cell.getCellProps(), cell.render('Cell'));
    }));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => gotoPage(0),
    disabled: !canPreviousPage
  }, '<<'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => previousPage(),
    disabled: !canPreviousPage
  }, '<'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => nextPage(),
    disabled: !canNextPage
  }, '>'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => gotoPage(pageCount - 1),
    disabled: !canNextPage
  }, '>>'), ' ', /*#__PURE__*/_react.default.createElement("span", null, "Page", ' ', /*#__PURE__*/_react.default.createElement("strong", null, pageIndex + 1, " of ", pageOptions.length), ' '), /*#__PURE__*/_react.default.createElement("span", null, "| Go to page:", ' ', /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    defaultValue: pageIndex + 1,
    onChange: e => {
      const page = e.target.value ? Number(e.target.value) - 1 : 0;
      gotoPage(page);
    },
    style: {
      width: '100px'
    }
  })), ' ', /*#__PURE__*/_react.default.createElement("select", {
    value: pageSize,
    onChange: e => {
      setPageSize(Number(e.target.value));
    }
  }, [10, 20, 30, 40, 50].map(pageSize => /*#__PURE__*/_react.default.createElement("option", {
    key: pageSize,
    value: pageSize
  }, "Show ", pageSize)))));
};
exports.RaptorTable = RaptorTable;