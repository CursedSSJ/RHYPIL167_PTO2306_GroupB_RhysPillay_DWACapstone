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
      paddingLeft: "3rem !important",
      paddingRight: "3rem !important",
    },
    mainCardInnerContainer: {
      border: `2px solid ${theme.primary.dark}`,
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "2rem",
      marginBottom: "5rem",
      padding: "2rem !important",
    },
    mainCardLoading: {
      width: "60%",
      margin: "auto",
      textAlign: "center",
    },
    mainCardContainerCardContent: {
      width: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "2rem",
    },
    mainCardTitle: {
      fontSize: "3rem",
    },
    mainCardSummary: {
      fontSize: "1rem",
    },
    mainLoaderText: {
      color: theme.text.primary,
    },
  };
};
