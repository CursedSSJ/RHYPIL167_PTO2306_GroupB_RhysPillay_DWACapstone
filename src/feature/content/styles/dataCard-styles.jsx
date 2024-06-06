export const styles = (theme) => {
  return {
    dataCardContainer: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.primary.dark,
    },
    seasonDropDownBox: {
      marginLeft: "2rem",
      width: "100%",
      textAlign: "left",
      borderColor: theme.text.primary,
    },
    seasonDropDownText: {
      color: theme.text.primary,
    },
    seasonDropDown: {
      width: "200px",
      marginBottom: "2rem",
      backgroundColor: theme.primary.dark,
    },
    seasonTitle: {
      textAlign: "center",
      marginBottom: "1rem",
      marginTop: "1rem",
      color: theme.text.primary,
    },
    episodeBackground: {
      backgroundColor: theme.primary.main,
    },
    episodeAccordion: {
      marginLeft: "1rem !important",
      marginRight: "1rem !important",
      marginBottom: "1rem",
      marginTop: "1rem",
      backgroundColor: theme.primary.light,
      color: theme.text.primary,
    },
    episodeSummaryAccordion: {
      marginLeft: "1rem !important",
      marginRight: "1rem !important",
      marginBottom: "1rem",
      marginTop: "1rem",
      transition: "margin 0.2s ease",
    },
    dataCardImage: {
      width: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "2rem",
    },
    audioPlayer: {
      marginTop: "1rem",
    },
  };
};
