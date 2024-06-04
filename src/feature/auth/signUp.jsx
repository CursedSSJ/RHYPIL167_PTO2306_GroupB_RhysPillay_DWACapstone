import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styles } from "./styles/login-styles.jsx";
import supabase from "./authClient"; // Import the single instance of GoTrueClient

const SignUp = () => {
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

    try {
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setWarnings(error.message);
      } else {
        console.log("Signup successful:", user);
        navigate("/"); // Redirect to home page or any desired location
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      setWarnings("Signup failed. Please try again."); // Handle signup error
    } finally {
      setLoading(false);
    }
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
          onClick={handleSignup}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </FormControl>
      <Typography
        sx={style.loginForgotPassword}
        onClick={handleGoBack}
        style={{ cursor: "pointer" }}
      >
        Go Back
      </Typography>
      {warnings && (
        <Typography variant="subtitle1" color="error">
          {warnings}
        </Typography>
      )}
    </Container>
  );
};

export default SignUp;
