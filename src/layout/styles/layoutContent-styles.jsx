const styles = (theme) => {
  return {
    mainContainer: {
      backgroundColor: theme.primary.light,
      padding: "0px !important",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      minWidth: "100vw",
      "& .MuiContainer-root": {
        maxWidth: "100vw",
        padding: "0px",
      },
      margin: "0px",
      overflowX: "hidden",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      minWidth: "100% ",
    },
    mainContainerAuth: {
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
      backgroundColor: "#000a13",
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
      backgroundColor: theme.primary.light,
    },
  };
};

export default styles;
