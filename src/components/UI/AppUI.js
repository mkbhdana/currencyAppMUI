import React from "react";

import TabPanel from "./TabPanel";
import Container from "@mui/material/Container";

import classes from "./AppUI.module.css";

const AppUI = () => {
  return (
    <Container fixed>
      <div className={classes.container}>
        <TabPanel />
      </div>
    </Container>
  );
};

export default AppUI;
