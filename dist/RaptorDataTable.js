"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaptorTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactTable = _interopRequireDefault(require("react-table-6"));
require("react-table-6/react-table.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import _ from 'lodash';

const RaptorTable = props => {
  let noDataText = "No data found";
  if (props.noDataText && props.noDataText !== '') {
    noDataText = props.noDataText;
  }
  let defaultPageSize = 25;
  if (props.defaultPageSize) {
    defaultPageSize = props.defaultPageSize;
  }
  let minRows = 25;
  if (props.minRows) {
    minRows = props.minRows;
  }
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactTable.default, {
    minRows: minRows,
    defaultPageSize: defaultPageSize,
    data: props.data,
    columns: props.columns,
    noDataText: noDataText,
    className: "searchResults -highlight -striped"
  }));
};
exports.RaptorTable = RaptorTable;