import React from "react";
import { Container, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

import styles from "../styles/layoutNav-styles";
import { useTheme } from "@mui/material/styles";

const LayoutNav = () => {
  const theme = useTheme();
  const style = styles(theme);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <Container sx={style.navBar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="home"
        onClick={() => navigate("/content")}
      >
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" sx={style.title}>
        Podyssey
        <MicIcon />
      </Typography>
      <IconButton edge="end" color="inherit" aria-label="favorites">
        <FavoriteIcon />
      </IconButton>
      {/* <IconButton edge="end" color="inherit" aria-label="profile">
        <AccountCircleIcon />
      </IconButton> */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="logout"
        onClick={handleLogout}
      >
        <ExitToAppIcon />
      </IconButton>
    </Container>
  );
};

export default LayoutNav;
