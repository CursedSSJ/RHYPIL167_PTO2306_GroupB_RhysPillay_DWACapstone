export const styles = (theme) => {
  return {
    favouriteCardContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      textAlign: "center",
      backgroundColor: theme.primary.dark,
      color: theme.text.primary,
    },
    favouriteCardImage: {
      width: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "2rem",
    },
    favouriteCardHeading: {
      fontSize: "3rem",
      border: `2px solid ${theme.text.primary}`,
      margin: "1rem",
    },
    favouriteCardEpisodeContainer: {
      fontSize: "3rem",
      border: `2px solid ${theme.text.primary}`,
      backgroundColor: theme.primary.main,
      color: theme.text.primary,
      margin: "1rem",
    },
    favouriteCardControllers: {
      display: "flex",
      flexDirection: "row",
      marginTop: "3rem",
      marginBottom: "1rem",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    favouriteCardContainerButton: {
      backgroundColor: theme.primary.dark,
      color: theme.text.primary,
      border: `1px solid ${theme.text.primary}`,
      marginLeft: "0.5rem",
    },
    favouriteCardLoading: {
      width: "60%",
      margin: "auto",
      textAlign: "center",
    },
    favouriteCardLoaderText: {
      color: theme.text.primary,
    },
  };
};
