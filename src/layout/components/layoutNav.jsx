import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Container, Typography } from "@mui/material";
import styles from "../styles/layoutNav-styles";
import { useTheme } from "@mui/material/styles";

const LayoutNav = () => {
  const theme = useTheme();
  const style = styles(theme);

  return (
    <AppBar sx={style.appTopBar} position="static" color="transparent">
      <Container>
        <Typography variant="h6">Nav Placeholder</Typography>
      </Container>
    </AppBar>
  );
};

export default LayoutNav;
