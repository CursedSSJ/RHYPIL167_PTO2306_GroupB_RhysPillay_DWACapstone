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
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    setWarnings("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setWarnings("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setWarnings(error.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000); // 2-second delay before navigating
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      setWarnings("Signup failed. Please try again.");
      setLoading(false);
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
        <Typography sx={style.loginInputLabel}>Confirm Password</Typography>
        <TextField
          sx={style.loginInputTextbox}
          type="password"
          id="confirm-password"
          variant="outlined"
          placeholder="Confirm Password"
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
      {success && (
        <Typography variant="subtitle1" color="success">
          Signup successful! Redirecting to login...
        </Typography>
      )}
    </Container>
  );
};

export default SignUp;
