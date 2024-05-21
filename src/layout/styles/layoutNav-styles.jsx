const styles = (theme) => {
  return {
    appTopBar: {
      marginBottom: "0px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      flexDirection: "row",
      height: "60px",
      maxHeight: "60px",
      borderBottom: `1px solid ${theme.primary.dark} !important`,
      backgroundColor: theme.primary.main,
    },
  };
};

export default styles;
