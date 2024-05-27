export const styles = (theme) => {
  return {
    mainContainer: {
      margin: "0px",
      padding: "0px !important",
      minWidth: "100%",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      "& .MuiContainer-root": {
        maxWidth: "100vw",
        padding: "0px",
      },
    },
    loginLeftDiv: {
      margin: "0px",
      padding: "0px !important",
      width: "40%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
    loginLogo: {
      width: "90%",
      height: "90%",
    },
    loginRightDiv: {
      width: "60%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
  };
};
