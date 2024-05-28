const styles = (theme) => {
  return {
    mainContainer: {
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
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 60px)",
      minWidth: "100% !important",
    },
  };
};

export default styles;