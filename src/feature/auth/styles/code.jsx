export const styles = (theme) => {
  return {
    sendNewCode: {
      textDecoration: "underline",
      fontSize: "20px",
      color: "#FFFFFF",
      cursor: "pointer",
      marginBottom: "20px",
    },
    codeTextBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "10px",
      width: "60px",
      marginBottom: "5px",
      border: `1px solid #000000`,
      borderRadius: "20px",
      fontSize: "18px",

      "& .MuiOutlinedInput-input": {
        border: "none !important",
        color: "#FFFFFF",
        width: "10px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        margin: "0px",
        border: "none !important",
      },
      "&.Mui-focused .MuiOutlinedInput-input": {
        margin: "0px",
        border: "none !important",
        padding: "3px 30px 3px 0px !important",
      },
    },
    codeTextBoxContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };
};
