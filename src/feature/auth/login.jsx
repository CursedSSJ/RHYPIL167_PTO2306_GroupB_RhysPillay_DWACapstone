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
import { styles } from "./styles/login-styles.jsx";
import { VisibilityTwoTone, VisibilityOffTwoTone } from "@mui/icons-material";
import { handlePostLogin } from "../../utils/authUtils.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tlnuilcktcmfqpqyhqjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbnVpbGNrdGNtZnFwcXlocWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MDU3MTcsImV4cCI6MjAzMTk4MTcxN30.gDYVfNnEWuwB1R7KIf9voKetig0tS4g2gApSCn_EToU"
);

const LoginCard = () => {
  let { state } = useLocation();
  const theme = useTheme();
  const style = styles(theme);
  const [warnings, setWarnings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibilty, setVisibility] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    setWarnings("");
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("response", response);
    if (response.data.session.access_token) {
      await handlePostLogin(response, navigate);
    } else {
      setWarnings(response.data.message);
    }
    setLoading(false);
  };

  const handleSignUp = () => {
    navigate("/auth/signUp");
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
      <Typography sx={style.loginForgotPassword} onClick={() => handleSignUp()}>
        Click here to Sign Up.
      </Typography>
    </Container>
  );
};

export default LoginCard;