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
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

const supabase = createClient(
  "https://tlnuilcktcmfqpqyhqjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbnVpbGNrdGNtZnFwcXlocWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MDU3MTcsImV4cCI6MjAzMTk4MTcxN30.gDYVfNnEWuwB1R7KIf9voKetig0tS4g2gApSCn_EToU"
);

const SignUp = () => {
  let { state } = useLocation();
  const theme = useTheme();
  const style = styles(theme);
  const [warnings, setWarnings] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    setWarnings("");

    const response = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("response", response);
  };

  const handleGoBack = () => {
    navigate("/auth/login");
  };

  return (
    <Container sx={style.loginFormWrapper}>
      <Typography sx={style.loginTitle}>Sign Up</Typography>
      <Typography sx={style.loginSubTitle}>
        Please fill in your details to create an account.
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
        />
        <Button
          sx={style.signInButton}
          variant="contained"
          onClick={(event) => handleSignup()}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </FormControl>
      <Typography sx={style.loginForgotPassword} onClick={() => handleGoBack()}>
        Go Back
      </Typography>
    </Container>
  );
};

export default SignUp;
