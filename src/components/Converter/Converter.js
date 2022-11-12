import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import Data from "../Data/Data";

export default function SelectTextFields(props) {
  const [state, setState] = useState({
    sourceId: Data[4].id,
    targetId: Data[0].id,
    currencyFrom: Data[4].currency,
    currencyTo: Data[0].currency,
    sourceExchangeRate: Data[4].exchangeRate,
    targetExchangeRate: Data[0].exchangeRate,
    currencySymbolFrom: Data[4].currencySymbol,
    currencySymbolTo: Data[0].currencySymbol,
    amount: "",
    output: 0.0,
    showResult: false,

    formIsValid: false,
  });

  const currencyFromHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        currencyFrom: event.target.value,
        sourceId: event.target.value,
        sourceExchangeRate: event.target.value,
        currencySymbolFrom: event.target.value,
        amount: "",

        showResult: false,
        formIsValid: false,
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
        amount: "",

        showResult: false,
        formIsValid: false,
      };
    });
  };

  const amountHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        amount: event.target.value,
        showResult: false,

        formIsValid: event.target.value >= 1,
      };
    });
  };

  const convertCurrency = () => {
    const fromToUSD = state.amount / state.sourceExchangeRate;
    const usdToTarget = fromToUSD * state.targetExchangeRate;
    setState({
      ...state,
      output: usdToTarget,
      showResult: true,
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
    setState({
      ...state,
      currencyFrom: fromCurrency,
      currencyTo: toCurrency,
      sourceExchangeRate: fromExchangeRate,
      targetExchangeRate: toExchangeRate,
      currencySymbolFrom: fromSymbol,
      currencySymbolTo: toSymbol,
    });
  };

  const flip = () => {
    const fromToUSD = state.amount / state.targetExchangeRate;
    const usdToTarget = fromToUSD * state.sourceExchangeRate;
    setState((prevSate) => {
      return {
        ...prevSate,
        sourceId: state.targetId,
        targetId: state.sourceId,
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom,
        sourceExchangeRate: state.targetExchangeRate,
        targetExchangeRate: state.sourceExchangeRate,
        output: usdToTarget,
        currencySymbolFrom: state.currencySymbolTo,
        currencySymbolTo: state.currencySymbolFrom,
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
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
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

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">From</InputLabel>
          <Select
            native
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            label="From"
            value={state.sourceId}
            onChange={currencyFromHandler}
            onClick={changeSymbol}
          >
            {Data.map((option) => (
              <option key={option.id} value={option.id}>
                {option.currency}
              </option>
            ))}
          </Select>
        </FormControl>
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
          <SwapHorizIcon style={{ color: "#56a7c9" }} onClick={flip} />
        </div>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">To</InputLabel>
          <Select
            native
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            label="From"
            value={state.targetId}
            onChange={currencyToHandler}
            onClick={changeSymbol}
          >
            {Data.map((option) => (
              <option key={option.id} value={option.id}>
                {option.currencySymbol} {option.currency}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: !state.showResult ? "right" : "space-between",
          marginTop: !state.showResult ? "1rem" : "",
          width: "95.6%",
        }}
      >
        {state.showResult && (
          <div style={{ paddingLeft: "3rem" }}>
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
          }}
        >
          <button
            style={{
              backgroundColor: !state.formIsValid ? "grey" : "rgb(97 67 179)",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: 10,
              cursor: !state.formIsValid ? "not-allowed" : "pointer",
            }}
            onClick={convertCurrency}
            disabled={!state.formIsValid}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
