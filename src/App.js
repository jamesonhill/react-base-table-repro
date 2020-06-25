import React from "react";
import faker from "faker";
import BaseTable from "react-base-table";
import "react-base-table/styles.css";
import "./App.css";

const generateColumns = (count = 10, prefix = "column-", props) =>
  new Array(count).fill(0).map((column, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
    hidden: false,
    sortable: true,
  }));

const generateData = (columns, count = 200, prefix = "row-") =>
  new Array(count).fill(0).map((row, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });
const columns = generateColumns(8);
const data = generateData(columns);
function App() {
  const [cols, setCols] = React.useState(columns);

  const handleClick = () => {
    setCols((prev) => prev.map((col, i) => ({ ...col, hidden: i === 0 })));
  };
  /**
   * When using dynamic row heights, columns dynamically hidden don't cause the
   * Grid to recalculate the total column widths
   *  */

  return (
    <div className="App">
      <BaseTable width={500} height={500} fixed columns={cols} data={data} />
      <button onClick={handleClick}>Remove one column</button>
    </div>
  );
}

export default App;
