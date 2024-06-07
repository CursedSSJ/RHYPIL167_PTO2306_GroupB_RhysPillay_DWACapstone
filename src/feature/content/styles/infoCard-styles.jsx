export const styles = (theme) => {
  return {
    infoCardMainContainer: {
      flex: "wrap",
      overflowX: "none",
      width: "100%",
      overflowX: "hidden",
      backgroundColor: theme.primary.light,
    },
    infoCardLoading: {
      width: "60%",
      margin: "auto",
      textAlign: "center",
    },
    infoCardCarasoulCardContainerSlider: {
      marginBottom: "1rem",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1rem",
    },
    infoCardCarasoulCardContainer: {
      padding: "1rem",
      textAlign: "center",
      maxWidth: "350px",
      margin: "auto",
      padding: "20px",
      height: "auto",
      border: `2px solid ${theme.primary.dark}`,
    },
    infoCardGridContainercard: {
      backgroundColor: theme.primary.dark,
      color: theme.text.primary,
      textAlign: "center",
    },
    infoCardContainerGridContainer: {
      maxWidth: "90%",
      margin: "auto",
      padding: "20px",
      height: "auto",
      border: `2px solid ${theme.primary.dark}`,
    },
    infoCardContainerCardContent: {
      minHeight: "280px",
    },
    infoCardContainerGenrePills: {
      backgroundColor: theme.primary.main,
      color: theme.text.primary,
      "&:focus": {
        backgroundColor: theme.primary.light,
      },
    },
    infoCardMainLoaderText: {
      color: theme.text.primary,
    },
    infoCardContainerControllers: {
      display: "flex",
      flexDirection: "row",
      marginTop: "3rem",
      marginBottom: "1rem",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    infoCardContainerFilterBox: {
      backgroundColor: theme.primary.dark,
      "& .MuiInputBase-input": {
        color: theme.text.primary,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: theme.text.primary,
        },
        "&:hover fieldset": {
          borderColor: theme.text.primary,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.text.primary,
        },
      },
      "& .MuiInputLabel-root": {
        color: theme.text.primary,
        "&.Mui-focused": {
          color: theme.text.primary,
        },
      },
    },
    infoCardContainerButton: {
      backgroundColor: theme.primary.dark,
      color: theme.text.primary,
      border: `1px solid ${theme.text.primary}`,
      marginLeft: "0.5rem",
    },
  };
};
