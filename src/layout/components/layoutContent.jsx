import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "../styles/layoutContent-styles";
import LayoutNav from "./layoutNav";

const LayoutContent = () => {
  const theme = useTheme();
  const style = styles(theme);
  return (
    <Container sx={style.mainContainer}>
      <LayoutNav />
      <Container sx={style.contentContainer}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default LayoutContent;
