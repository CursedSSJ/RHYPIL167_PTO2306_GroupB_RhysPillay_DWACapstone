export const styles = (theme) => ({
  navBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primary.main,
    color: theme.text.primary,
    padding: "2rem !important",
  },
  title: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "3rem",
  },
  icon: {
    fontSize: "2rem",
  },
  iconBox: {
    "&:hover": {
      backgroundColor: theme.primary.light,
    },
  },
});
