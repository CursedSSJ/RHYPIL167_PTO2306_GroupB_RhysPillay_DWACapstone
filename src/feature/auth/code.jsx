import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
// import { api } from '../../api/index.js';
import { styles } from "./styles/login.jsx";
import { styles as codeStyles } from "./styles/code.jsx";
import { useTheme } from "@mui/material/styles";

/**
 * This is the card component that is generated for the user to login
 * @returns This returns a generated card the user requires to login
 */
const CodeCard = () => {
  const theme = useTheme();
  const style = styles(theme);
  const codeStyle = codeStyles(theme);
  let { state } = useLocation();
  const [warnings, setWarnings] = useState(null);
  const [sendItAgain, setSendItAgain] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const handleSendCode = async () => {
    const finalCode = code.join("");
    navigate("/auth/changePassword", {
      state: {
        code: finalCode,
        email: state.email,
        hiddenEmail: state.hiddenEmail,
        page: "forgotPassword",
      },
    });
  };

  const handleGoBack = () => {
    navigate("/auth/forgotPassword");
  };

  // const handleSendItAgain = async () => {
  //     setSendItAgain(true);
  //     const response = await api("auth", { email: state.email }, "forgotPassword", state);
  //     if (response.status !== 200) {
  //         setWarnings(response.data.message);
  //     }
  //     setSendItAgain(false);
  // }

  const handleVerifyCode = async (index, number) => {
    const tempCode = code;
    if (number.length <= 1) {
      if (number.length === 1) {
        tempCode[index] = number;
        if (index < 5) {
          document.getElementById(`verify${index + 1}`).focus();
        }
      } else if (number.length === 0) {
        tempCode[index] = "";
        if (index > 0) {
          document.getElementById(`verify${index - 1}`).focus();
        }
      }
    } else if (number.length === 6) {
      tempCode[0] = number[0];
      tempCode[1] = number[1];
      tempCode[2] = number[2];
      tempCode[3] = number[3];
      tempCode[4] = number[4];
      tempCode[5] = number[5];
      document.getElementById("verify5").focus();
    }
    setCode([...tempCode]);
    if (tempCode.includes("")) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleFocusChange = (input) => {
    setTimeout(function () {
      input.selectionStart = input.selectionEnd = input.value.length;
      input.focus();
    }, 0);
  };

  const handleKeyDown = (index, key) => {
    if (key === "ArrowLeft") {
      if (index > 0) {
        handleFocusChange(document.getElementById(`verify${index - 1}`));
      }
    } else if (key === "ArrowRight") {
      if (index < 5) {
        handleFocusChange(document.getElementById(`verify${index + 1}`));
      }
    }
  };

  return (
    <Container sx={style.loginFormWrapper}>
      <Typography sx={style.loginTitle}>Enter Verification Code</Typography>
      {sendItAgain ? (
        <Typography sx={style.loginSubTitle}>
          Sending new code to {state.hiddenEmail}
        </Typography>
      ) : (
        <Typography sx={style.loginSubTitle}>
          We’ve sent a code to {state.hiddenEmail}
        </Typography>
      )}
      {sendItAgain ? (
        <CircularProgress page={"sendItAgain"} />
      ) : (
        <FormControl sx={style.loginForm}>
          <Container sx={codeStyle.codeTextBoxContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextField
                key={index}
                sx={codeStyle.codeTextBox}
                id={`verify${index}`}
                value={code[index]}
                onChange={(e) => handleVerifyCode(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e.key)}
              />
            ))}
          </Container>
          {warnings && (
            <Typography
              variant="subtitle1"
              color="error"
              sx={style.warningText}
            >
              {warnings}
            </Typography>
          )}
          <Button
            sx={style.signInButton}
            variant="contained"
            onClick={(event) => handleSendCode()}
            disabled={buttonDisabled}
          >
            Continue
          </Button>
        </FormControl>
      )}
      <Typography sx={style.loginSubTitle}>
        Did not receive the email? Check your spam filter, or
      </Typography>
      <Typography
        sx={codeStyle.sendNewCode}
        onClick={() => handleSendItAgain()}
      >
        Send it again
      </Typography>
      <Typography sx={style.loginForgotPassword} onClick={() => handleGoBack()}>
        Go Back
      </Typography>
    </Container>
  );
};

export default CodeCard;
