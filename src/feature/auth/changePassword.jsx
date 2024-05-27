import React, { useEffect } from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

// import { api } from "../../api/index.js";
import { styles } from "./styles/login.jsx";
import {
  styles as passStyles,
  passRequirement,
} from "./styles/changePassword.jsx";
import { VisibilityTwoTone, VisibilityOffTwoTone } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
// import { handlePostLogin } from "../../utils/authUtils.js";
// import { handlePasswordValidation } from "../../utils/dataUtils.js";

const ChangePasswordCard = () => {
  const theme = useTheme();
  const style = styles(theme);
  const passStyle = passStyles(theme);
  let { state } = useLocation();
  const [warnings, setWarnings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passRequirements, setPassRequirements] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    match: false,
  });
  const [password, setPassword] = useState("");
  const [visibilty, setVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  //   const handleChangePassword = async () => {
  //     setLoading(true);
  //     setButtonDisabled(true);
  //     if (state.page === "forgotPassword") {
  //       const requestData = {
  //         email: state.email,
  //         code: state.code,
  //         password: password,
  //       };
  //       // const response = await api("auth", requestData, "confirmForgotPassword", state);
  //       if (response.status === 200) {
  //         setButtonDisabled(false);
  //         setLoading(false);
  //         navigate("/");
  //       } else {
  //         setWarnings(response.data.error);
  //         setButtonDisabled(false);
  //         setLoading(false);
  //       }
  //     } else if (state.page === "newPassword") {
  //       const tempData = {
  //         newPassword: password,
  //         email: state.email,
  //       };
  //       const requestData = {
  //         data: tempData,
  //         session: state.session,
  //         challengeName: "NEW_PASSWORD_REQUIRED",
  //       };
  //       //   const response = await api("auth", requestData, "authChallenge", state);
  //       if (response.status === 200) {
  //         setButtonDisabled(false);
  //         setLoading(false);
  //         await handlePostLogin(response, navigate);
  //       } else {
  //         setWarnings(response.data.error);
  //         setButtonDisabled(false);
  //         setLoading(false);
  //       }
  //     }
  //   };

  useEffect(() => {
    if (Object.values(passRequirements).includes(false)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [passRequirements]);

  //   const handlePasswordRequirements = (value, type) => {
  //     if (type === "new") {
  //       setPassword(value);
  //     }
  //     handlePasswordValidation(
  //       value,
  //       type,
  //       passRequirements,
  //       setPassRequirements,
  //       password
  //     );
  //   };

  const handleGoBack = () => {
    navigate("/auth/code", {
      state: { email: state.email, hiddenEmail: state.hiddenEmail },
    });
  };

  const handlePasswordToggle = (id) => {
    const tempVisibility = visibilty;
    const password = document.getElementById(id);
    if (!visibilty[id]) {
      password.type = "text";
      tempVisibility[id] = true;
    } else {
      password.type = "password";
      tempVisibility[id] = false;
    }
    setVisibility({ ...tempVisibility });
  };

  return (
    <Container sx={style.loginFormWrapper}>
      <Typography sx={style.loginTitle}>Reset Password</Typography>
      <Typography sx={style.loginSubTitle}>
        Please choose your new password
      </Typography>
      <FormControl sx={style.loginForm}>
        <TextField
          sx={style.loginInputTextbox}
          type="password"
          id="newPassword"
          onChange={(e) => handlePasswordRequirements(e.target.value, "new")}
          placeholder="New Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {visibilty.newPassword ? (
                  <VisibilityTwoTone
                    sx={style.visibilityIcon}
                    onClick={() => handlePasswordToggle("newPassword")}
                  />
                ) : (
                  <VisibilityOffTwoTone
                    sx={style.visibilityIcon}
                    onClick={() => handlePasswordToggle("newPassword")}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={style.loginInputTextbox}
          type="password"
          id="confirmPassword"
          onChange={(e) =>
            handlePasswordRequirements(e.target.value, "confirm")
          }
          placeholder="Confirm Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {visibilty.confirmPassword ? (
                  <VisibilityTwoTone
                    sx={style.visibilityIcon}
                    onClick={() => handlePasswordToggle("confirmPassword")}
                  />
                ) : (
                  <VisibilityOffTwoTone
                    sx={style.visibilityIcon}
                    onClick={() => handlePasswordToggle("confirmPassword")}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Container sx={passStyle.passRequirements}>
          <Container sx={passStyle.passRequirementsLeft}>
            <Typography sx={passRequirement(passRequirements.length, theme)}>
              8 characters long
            </Typography>
            <Typography sx={passRequirement(passRequirements.upper, theme)}>
              1 Uppercase letter
            </Typography>
            <Typography sx={passRequirement(passRequirements.lower, theme)}>
              1 Lowercasse letter
            </Typography>
          </Container>
          <Container sx={passStyle.passRequirementsRight}>
            <Typography sx={passRequirement(passRequirements.number, theme)}>
              1 Number
            </Typography>
            <Typography sx={passRequirement(passRequirements.special, theme)}>
              1 Special Character
            </Typography>
            <Typography sx={passRequirement(passRequirements.match, theme)}>
              Passwords Match
            </Typography>
          </Container>
        </Container>
        {warnings && (
          <Typography variant="subtitle1" color="error" sx={style.warningText}>
            {warnings}
          </Typography>
        )}
        <Button
          sx={style.signInButton}
          variant="contained"
          onClick={() => handleChangePassword()}
          disabled={buttonDisabled}
        >
          {loading ? "Changing Password" : "Change Password"}
        </Button>
      </FormControl>
      <Typography sx={style.loginForgotPassword} onClick={() => handleGoBack()}>
        Go Back
      </Typography>
    </Container>
  );
};

export default ChangePasswordCard;
