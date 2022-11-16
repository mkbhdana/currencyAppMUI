import React from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const headerObj = {
  id: "S. No.",
  currency: "Currency",
  currencySymbol: "Currency Symbol",
  exchangeRate: "USD Exchange Rate",
  capital: "Capital",
  country: "Country",
};

function CurrencyListData({ data }) {
  const headers = Object.keys(headerObj);

  return (
    <TableContainer componenet={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="center">{headerObj[header]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((emp, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell align="center">{emp[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrencyListData;
