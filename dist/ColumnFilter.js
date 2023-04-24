"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnFilter = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ColumnFilter = _ref => {
  let {
    column
  } = _ref;
  const {
    filterValue,
    setFilter
  } = column;
  return /*#__PURE__*/_react.default.createElement("span", null, "Search:", ' ', /*#__PURE__*/_react.default.createElement("input", {
    value: filterValue || '',
    onChange: e => setFilter(e.target.value)
  }));
};
exports.ColumnFilter = ColumnFilter;