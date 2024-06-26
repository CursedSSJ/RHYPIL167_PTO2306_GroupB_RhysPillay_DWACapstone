import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import styles from "./styles/layoutContent-styles";
import { useTheme } from "@mui/material/styles";

const LoginPage = () => {
  const theme = useTheme();
  const style = styles(theme);
  return (
    <Container sx={style.mainContainerAuth}>
      <Container sx={style.loginLeftDiv}>
        <img src="/assets/Login-Image.png" alt="Logo" sx={style.loginLogo} />
      </Container>
      <Container sx={style.loginRightDiv}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default LoginPage;
