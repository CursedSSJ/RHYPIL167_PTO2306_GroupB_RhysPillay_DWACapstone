export const styles = (theme) => {
  return {
    passRequirements: {
      margin: "0px",
      marginTop: "10px",
      padding: "0px !important",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "10px",
    },
    passRequirementsLeft: {
      margin: "0px",
      padding: "0px !important",
      display: "flex",
      flexDirection: "column",
    },
    passRequirementsRight: {
      margin: "0px",
      padding: "0px !important",
      display: "flex",
      flexDirection: "column",
    },
  };
};

export const passRequirement = (status, theme) => {
  const returnObj = {
    fontSize: "14px",
    marginBottom: "5px",
  };
  if (status === true) {
    returnObj.color = "white";
  } else if (status === false) {
    returnObj.color = "white";
  }
  return returnObj;
};
