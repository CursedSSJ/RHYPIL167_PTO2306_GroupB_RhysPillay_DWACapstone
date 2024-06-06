import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styles } from "./styles/login-styles.jsx";
import { VisibilityTwoTone, VisibilityOffTwoTone } from "@mui/icons-material";
import { handlePostLogin } from "../../utils/authUtils.js";
import supabase from "./authClient";

const LoginCard = () => {
  const theme = useTheme();
  const style = styles(theme);
  const [warnings, setWarnings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    setWarnings("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("data: ", data);

      if (error) {
        setWarnings(error.message);
        setLoading(false);
      } else {
        if (data.user) {
          await handlePostLogin(data, navigate);
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setWarnings("Login failed. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/auth/signUp");
  };

  const handlePasswordToggle = (id) => {
    const password = document.getElementById(id);
    setVisibility(!visibility);
    password.type = visibility ? "password" : "text";
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
                {visibility ? (
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
          onClick={handleLogin}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </FormControl>
      <Typography
        sx={style.loginForgotPassword}
        onClick={handleSignUp}
        style={{ cursor: "pointer" }}
      >
        Click here to Sign Up.
      </Typography>
    </Container>
  );
};

export default LoginCard;
