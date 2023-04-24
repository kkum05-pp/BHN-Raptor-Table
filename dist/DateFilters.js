"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangeColumnFilter = DateRangeColumnFilter;
exports.SelectColumnFilter = exports.Filter = exports.DefaultColumnFilter = void 0;
exports.dateBetweenFilterFn = dateBetweenFilterFn;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Filter = _ref => {
  let {
    column
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 5
    }
  }, column.canFilter && column.render("Filter"));
};
exports.Filter = Filter;
const DefaultColumnFilter = _ref2 => {
  let {
    column: {
      filterValue,
      setFilter,
      preFilteredRows: {
        length
      }
    }
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("input", {
    value: filterValue || "",
    onChange: e => {
      setFilter(e.target.value || undefined);
    }
    //   placeholder={`buscar (${length}) ...`}
  });
};
exports.DefaultColumnFilter = DefaultColumnFilter;
const SelectColumnFilter = _ref3 => {
  let {
    column: {
      filterValue,
      setFilter,
      preFilteredRows,
      id
    }
  } = _ref3;
  const options = _react.default.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return /*#__PURE__*/_react.default.createElement("select", {
    id: "custom-select",
    type: "select",
    value: filterValue,
    onChange: e => {
      setFilter(e.target.value || undefined);
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Todos"), options.map(option => /*#__PURE__*/_react.default.createElement("option", {
    key: option,
    value: option
  }, option)));
};
exports.SelectColumnFilter = SelectColumnFilter;
function inputFormatDate(filterValues, i) {
  // var dateAndHour = r.values[id].split(" ");
  var valueDate = '';
  var [day, month, year] = filterValues[i] ? filterValues[i].split("-") : '';
  if (filterValues[i]) {
    let formatDate = [day, month, year].join("/");
    valueDate = (0, _moment.default)(formatDate).format("DD/MM/YYYY");
  }
  return valueDate;
}
function dateBetweenFilterFn(rows, id, filterValues) {
  //   const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
  //   const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;

  const sd = inputFormatDate(filterValues, 0);
  const ed = inputFormatDate(filterValues, 1);
  if (ed || sd) {
    return rows.filter(r => {
      // format data
      var dateAndHour = r.values[id].split(" ");
      //   var [day, month, year] = dateAndHour[0].split("/");
      //   var date = [day,month, year].join("-");
      //   var hour = dateAndHour[1];
      //   // var formattedData = date + " " + hour;
      //   //var formattedData = date;
      //   const cellDate = date;
      const cellDate = dateAndHour[0];
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
function DateRangeColumnFilter(_ref4) {
  var _filterValue$;
  let {
    column: {
      filterValue = [],
      preFilteredRows,
      setFilter,
      id
    }
  } = _ref4;
  const [min, max] = _react.default.useMemo(() => {
    let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0);
    let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0);
    preFilteredRows.forEach(row => {
      const rowDate = new Date(row.values[id]);
      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });
    return [min, max];
  }, [id, preFilteredRows]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    //min={min.toISOString().slice(0, 10)}
    onChange: e => {
      const val = e.target.value;
      setFilter(function () {
        let old = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return [val ? val : undefined, old[1]];
      });
    },
    type: "date",
    value: filterValue[0] || ""
  }), " to ", /*#__PURE__*/_react.default.createElement("input", {
    //max={max.toISOString().slice(0, 10)}
    onChange: e => {
      const val = e.target.value;
      setFilter(function () {
        let old = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return [old[0],
        // val ? val.concat("T23:59:59.999Z") : undefined
        val ? val : undefined];
      });
    },
    type: "date",
    value: ((_filterValue$ = filterValue[1]) === null || _filterValue$ === void 0 ? void 0 : _filterValue$.slice(0, 10)) || ""
    // value={filterValue[1] || ""}
  }));
}