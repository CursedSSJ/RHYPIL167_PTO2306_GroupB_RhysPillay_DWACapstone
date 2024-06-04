export const styles = (theme) => {
  return {
    mainCardContainer: {
      flex: "wrap",
      overflowX: "none",
      width: "100%",
      overflowX: "hidden",
      backgroundColor: theme.primary.light,
      textAlign: "center",
      color: theme.text.primary,
    },
    mainCardLoading: {
      width: "60%",
      margin: "auto",
      textAlign: "center",
    },
    mainCardContainerGridContainer: {
      maxWidth: "90%",
      margin: "auto",
      padding: "20px",
      height: "auto",
    },
    mainCardContainerCardContent: {
      width: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "2rem",
    },
    mainCardGenrePills: {
      backgroundColor: theme.primary.main,
      color: theme.text.primary,
    },
  };
};
