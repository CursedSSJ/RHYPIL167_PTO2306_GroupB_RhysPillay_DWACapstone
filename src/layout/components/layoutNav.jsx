import React from "react";
import { Container, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles/layoutNav-styles";
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
        sx={style.iconBox}
      >
        <HomeIcon style={style.icon} />
      </IconButton>
      <Typography sx={style.title}>
        Podyssey
        <MicIcon style={style.icon} />
      </Typography>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="favorites"
        onClick={() => navigate("/content/favourites")}
        sx={style.iconBox}
      >
        <FavoriteIcon style={style.icon} />
      </IconButton>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="logout"
        onClick={handleLogout}
        sx={style.iconBox}
      >
        <ExitToAppIcon style={style.icon} />
      </IconButton>
    </Container>
  );
};

export default LayoutNav;
