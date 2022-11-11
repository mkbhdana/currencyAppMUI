import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { Data } from "../Data/Data";

export default function SelectTextFields() {
  const [state, setState] = useState({
    sourceId: Data[4].id,
    targetId: Data[0].id,
    currencyFrom: Data[4].currency,
    currencyTo: Data[0].currency,
    sourceExchangeRate: Data[4].exchangeRate,
    targetExchangeRate: Data[0].exchangeRate,
    currencySymbolFrom: Data[4].currencySymbol,
    amount: "",
    output: "",
    showResult: false,
    showButton: false,
  });

  const currencyFromHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        currencyFrom: event.target.value,
        sourceId: event.target.value,
        sourceExchangeRate: event.target.value,
      };
    });
  };
  const currencyToHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        targetId: event.target.value,
        targetExchangeRate: event.target.value,
        currencyTo: event.target.value,
      };
    });
  };

  const amountHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        amount: event.target.value,
        showResult: false,
        showButton: false,
      };
    });
  };

  const convertCurrency = () => {
    const fromToUSD = state.amount / state.sourceExchangeRate;
    const usdToTarget = fromToUSD * state.targetExchangeRate;
    setState((prevState) => {
      return {
        ...prevState,
        output: usdToTarget,
        showResult: true,
        showButton: true,
      };
    });
  };

  const changeSymbol = () => {
    let fromExchangeRate = "";
    let toExchangeRate = "";
    let fromCurrency = "";
    let fromSymbol = "";
    let toCurrency = "";
    let toSymbol = "";
    Data.forEach((e) => {
      if (+e.id === +state.sourceId) {
        fromCurrency = e.currency;
        fromSymbol = e.currencySymbol;
        fromExchangeRate = e.exchangeRate;
      }
      if (+e.id === +state.targetId) {
        toCurrency = e.currency;
        toSymbol = e.currencySymbol;
        toExchangeRate = e.exchangeRate;
      }
    });
    setState((prevState) => {
      return {
        ...prevState,
        currencyFrom: fromCurrency,
        currencyTo: toCurrency,
        sourceExchangeRate: fromExchangeRate,
        targetExchangeRate: toExchangeRate,
        currencySymbolFrom: fromSymbol,
        currencySymbolTo: toSymbol,
      };
    });
  };

  const flip = () => {
    setState((prevSate) => {
      const fromToUSD = state.amount / state.targetExchangeRate;
      const usdToTarget = fromToUSD * state.sourceExchangeRate;
      return {
        ...prevSate,
        sourceId: state.targetId,
        targetId: state.sourceId,
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom,
        sourceExchangeRate: state.targetExchangeRate,
        targetExchangeRate: state.sourceExchangeRate,
        output: usdToTarget,
      };
    });
  };

  const reset = () => {
    setState((prevState) => {
      return {
        ...prevState,
        sourceId: Data[4].id,
        targetId: Data[0].id,
        currencyFrom: Data[4].currency,
        currencyTo: Data[0].currency,
        sourceExchangeRate: Data[4].exchangeRate,
        targetExchangeRate: Data[0].exchangeRate,
        currencySymbolFrom: Data[4].currencySymbol,
        amount: "",
        output: "",
        showResult: false,
        showButton: false,
      };
    });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "28ch" },
        }}
        noValidate
        autoComplete="off"
        onMouseEnter={changeSymbol}
        onMouseLeave={changeSymbol}
        onMouseMove={changeSymbol}
      >
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={+state.amount}
              onChange={amountHandler}
              startAdornment={
                <InputAdornment position="start">
                  {state.currencySymbolFrom}
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </div>
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="From"
            value={state.sourceId}
            onChange={currencyFromHandler}
            onMouseEnter={changeSymbol}
            onMouseLeave={changeSymbol}
            onMouseMove={changeSymbol}
          >
            {Data.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.currencySymbol} {option.currency}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div
          style={{
            border: "1px solid lightgrey",
            borderRadius: "50%",
            padding: 10,
            width: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <SwapHorizIcon 
        style={{ color: "#56a7c9" }} 
        onClick={flip}  
        onMouseEnter={changeSymbol}
        onMouseLeave={changeSymbol}
        onMouseMove={changeSymbol} />
        </div>

        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="To"
            value={state.targetId}
            onChange={currencyToHandler}
            onMouseEnter={changeSymbol}
            onMouseLeave={changeSymbol}
            onMouseMove={changeSymbol}
          >
            {Data.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.currencySymbol} {option.currency}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: !state.showButton ? "right" : "space-between",
          marginTop: !state.showButton ? "1rem" : "",
          width: "94%",
        }}
      >
        {state.showResult && (
          <div style={{ paddingLeft: "3.6rem" }}>
            <p
              style={{ color: "lightslategray" }}
              value={state.output}
              onChange={(e) => {
                setState((prevState) => {
                  return { ...prevState, output: e.target.value };
                });
              }}
            >
              {" " + state.amount + " " + state.currencyFrom + " = "}
            </p>
            <h4 style={{ color: "steelblue" }}>
              {state.output.toFixed(2) + " " + state.currencyTo}
            </h4>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            gap: 20,
          }}
        >
          {state.showButton && (
            <button
              onClick={reset}
              style={{
                backgroundColor: "rgb(97 67 179)",
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: 10,

                cursor: "pointer",
              }}
            >
              Reset
            </button>
          )}
          <button
            style={{
              backgroundColor: "rgb(97 67 179)",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: 10,
              cursor: "pointer",
            }}
            onClick={convertCurrency}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
