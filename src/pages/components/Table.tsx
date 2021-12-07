import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import BTable from "react-bootstrap/Table";

import { useSortBy, useTable } from "react-table";
import ReactTooltip from "react-tooltip";

export default function Table({ columns, data }: { columns: any; data: any }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Render the UI for your table
  return (
    <>
      <ReactTooltip place="left" type="success" effect="solid" />

      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  data-tip={column.Footer}
                  {...column.getHeaderProps()}
                  // {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
    </>
  );
}
