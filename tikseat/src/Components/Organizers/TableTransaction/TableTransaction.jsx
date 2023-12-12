import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Button,
} from "@mui/material";
// import { parse } from "json2csv";

const data = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Chienn", age: 22 },
  { id: 4, name: "Linh", age: 18 },
  { id: 5, name: "Thien", age: 19 },
  { id: 6, name: "Anh", age: 47 },
  { id: 7, name: "An", age: 15 },
  // Add more data as needed
];

const tableStyle = {
  backgroundColor: "white",
};

const downloadTableData = (data) => {
  const fields = ["name", "age"];
  const opts = { fields };
  //   const csvData = parse(data, opts);
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  //   link.href = url;
  link.download = "table_data.csv";
  link.click();
};

const SortableTable = () => {
  const [nameSortBy, setNameSortBy] = useState(null);
  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [ageSortBy, setAgeSortBy] = useState(null);
  const [ageSortOrder, setAgeSortOrder] = useState("asc");

  const handleNameSort = () => {
    if (nameSortBy === "name") {
      setNameSortOrder(nameSortOrder === "asc" ? "desc" : "asc");
    } else {
      setNameSortBy("name");
      setNameSortOrder("asc");
    }
  };

  const handleAgeSort = () => {
    if (ageSortBy === "age") {
      setAgeSortOrder(ageSortOrder === "asc" ? "desc" : "asc");
    } else {
      setAgeSortBy("age");
      setAgeSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (nameSortBy) {
      const valueA = a[nameSortBy];
      const valueB = b[nameSortBy];
      if (nameSortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }
    if (ageSortBy) {
      const valueA = a[ageSortBy];
      const valueB = b[ageSortBy];
      return ageSortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  // Cleanup the URL object when the component is unmounted
  const linkRef = useRef(null);
  useEffect(() => {
    return () => {
      if (linkRef.current) {
        URL.revokeObjectURL(linkRef.current.href);
      }
    };
  }, []);

  return (
    <Table style={tableStyle}>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={nameSortBy === "name"}
              direction={nameSortOrder}
              onClick={handleNameSort}>
              Name
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={ageSortBy === "age"}
              direction={ageSortOrder}
              onClick={handleAgeSort}>
              Age
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => downloadTableData(sortedData)}
        ref={linkRef}>
        Download Table
      </Button> */}
    </Table>
  );
};

export default SortableTable;
