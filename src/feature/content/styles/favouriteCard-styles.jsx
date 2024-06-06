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
  };
};
