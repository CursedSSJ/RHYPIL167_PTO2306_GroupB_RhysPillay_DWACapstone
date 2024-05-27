import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
// import { api } from '../../api/index.js';
import { styles } from "./styles/login.jsx";
// import { handlePostLogin } from "../../utils/authUtils.js";
import { VisibilityTwoTone, VisibilityOffTwoTone } from "@mui/icons-material";
/**
 * This is the card component that is generated for the user to login
 * @returns This returns a generated card the user requires to login
 */
const LoginCard = () => {
  let { state } = useLocation();
  const theme = useTheme();
  const style = styles(theme);
  const [warnings, setWarnings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibilty, setVisibility] = useState(false);

  const navigate = useNavigate();

  /**
   *This method handles the login flow for the user
   */
  //   const handleLogin = async () => {
  //     setLoading(true);
  //     const email = document.getElementById("email").value;
  //     const password = document.getElementById("password").value;
  //     setWarnings("");
  //     const requestData = { email, password };
  //     const response = await api("auth", requestData, "login", state, navigate);
  //     if (
  //       (response.status === 200 || response.status === 201) &&
  //       response.data.accessToken
  //     ) {
  //       await handlePostLogin(response, navigate);
  //     } else if (response.data?.challengeName) {
  //       if (response.data.challengeName === "NEW_PASSWORD_REQUIRED") {
  //         navigate("/auth/changePassword", {
  //           state: {
  //             email: response.data.email,
  //             page: "newPassword",
  //             session: response.data.session,
  //           },
  //         });
  //       }
  //     } else {
  //       setWarnings(response.data.message);
  //     }
  //     setLoading(false);
  //   };

  const handleForgotPassword = () => {
    navigate("/auth/forgotPassword");
  };

  const handlePasswordToggle = (id) => {
    const password = document.getElementById(id);
    if (!visibilty) {
      password.type = "text";
      setVisibility(true);
    } else {
      password.type = "password";
      setVisibility(false);
    }
  };

  return (
    <Container sx={style.loginFormWrapper}>
      <Typography sx={style.loginTitle}>Welcome</Typography>
      <Typography sx={style.loginSubTitle}>
        Please sign in to access your account
      </Typography>
      <FormControl sx={style.loginForm}>
        <Typography sx={style.loginInputLabel}>Email Address</Typography>
        <TextField
          sx={style.loginInputTextbox}
          type="text"
          id="email"
          variant="outlined"
          placeholder="Email"
        />
        <Typography sx={style.loginInputLabel}>Password</Typography>
        <TextField
          sx={style.loginInputTextbox}
          type="password"
          id="password"
          variant="outlined"
          placeholder="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {visibilty ? (
                  <VisibilityTwoTone
                    sx={style.visibilityIcon}
                    onClick={() => handlePasswordToggle("password")}
                  />
                ) : (
                  <VisibilityOffTwoTone
                    sx={style.visibilityIcon}
                    onClick={() => handlePasswordToggle("password")}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        {warnings && (
          <Typography variant="subtitle1" color="error" sx={style.warningText}>
            {warnings}
          </Typography>
        )}
        <Button
          sx={style.signInButton}
          variant="contained"
          onClick={(event) => handleLogin()}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </FormControl>
      <Typography
        sx={style.loginForgotPassword}
        onClick={() => handleForgotPassword()}
      >
        Forgot Your Password?
      </Typography>
    </Container>
  );
};

export default LoginCard;
