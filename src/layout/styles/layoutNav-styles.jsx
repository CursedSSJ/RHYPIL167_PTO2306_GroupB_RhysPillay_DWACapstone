const styles = (theme) => {
  return {
    navBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: theme.primary.main,
      color: theme.text.primary,
      width: "100%",
      paddingTop: "1rem !important",
      paddingBottom: "1rem !important",
    },
    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "80% !important",
      fontFamily: "Montagu, Slab",
      fontSize: "2.5rem",
    },
  };
};

export default styles;
