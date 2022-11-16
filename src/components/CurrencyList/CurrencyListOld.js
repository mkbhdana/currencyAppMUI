import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Data } from "../Data/Data";

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ Width: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">S.No.</TableCell>
            <TableCell align="left">Currency </TableCell>
            <TableCell align="center">USD Exchange Rate</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Capital</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.currency}</TableCell>
              <TableCell align="center">{item.exchangeRate}</TableCell>
              <TableCell align="center">{item.country}</TableCell>
              <TableCell align="center">{item.capital}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
