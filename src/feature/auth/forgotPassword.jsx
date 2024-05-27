import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
// import { api } from '../../api/index.js';
import { styles } from "./styles/login.jsx";
/**
 * This is the card component that is generated for the user to login
 * @returns This returns a generated card the user requires to login
 */
const ForgotPasswordCard = () => {
  let { state } = useLocation();
  const theme = useTheme();
  const style = styles(theme);
  const [warnings, setWarnings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  /**
   *This method handles the login flow for the user
   */
  // const handleSendCode = async () => {
  //     setButtonDisabled(true);
  //     setLoading(true);
  //     const email = document.getElementById('email').value;
  //     const response = await api("auth", { email }, "forgotPassword", state);
  //     if (response.status === 200) {
  //         const hiddenEmail = response.data.data.destination
  //         setButtonDisabled(false);
  //         setLoading(false);
  //         navigate('/auth/code', { state: { email, hiddenEmail } });
  //     } else {
  //         setWarnings(response.data.error);
  //         setButtonDisabled(false);
  //         setLoading(false);
  //     }
  // }

  const handleGoBack = () => {
    navigate("/auth/login");
  };

  const handleEmailChange = (email) => {
    const emailRegex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  return (
    <Container sx={style.loginFormWrapper}>
      <Typography sx={style.loginTitle}>Reset Your Password</Typography>
      <Typography sx={style.loginSubTitle}>
        We will send you an email with a verification code to reset your
        password
      </Typography>
      <FormControl sx={style.loginForm}>
        <Typography sx={style.loginInputLabel}>Email Address</Typography>
        <TextField
          sx={style.loginInputTextbox}
          onChange={(e) => handleEmailChange(e.target.value)}
          type="text"
          id="email"
          variant="outlined"
          placeholder="Email"
        />
        {warnings && (
          <Typography variant="subtitle1" color="error" sx={style.warningText}>
            {warnings}
          </Typography>
        )}
        <Button
          sx={style.signInButton}
          variant="contained"
          disabled={buttonDisabled}
          onClick={(event) => handleSendCode()}
        >
          {loading ? "Sending Code" : "Send code to email"}
        </Button>
      </FormControl>
      <Typography sx={style.loginForgotPassword} onClick={() => handleGoBack()}>
        Go Back
      </Typography>
    </Container>
  );
};

export default ForgotPasswordCard;
