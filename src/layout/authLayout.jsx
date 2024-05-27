import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { styles } from "./styles/authLayout-Styles";

const LoginPage = () => {
  const theme = useTheme();
  const style = styles(theme);
  return (
    <Container sx={style.mainContainer}>
      <Container sx={style.loginLeftDiv}>
        <img src="" alt="Logo" sx={style.loginLogo} />
      </Container>
      <Container sx={style.loginRightDiv}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default LoginPage;
