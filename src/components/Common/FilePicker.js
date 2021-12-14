import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

export default function FilePicker(props) {
  const [value, setValue] = React.useState("");

  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: "#F5F6F9",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      borderRadius: "10px",
      "@media (max-width:600px)": {
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    input: {
      display: "none",
    },
    title: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "151.02%",
      color: "#363557",
      marginBottom: "16px",
      "&  .MuiInputLabel-formControl": { textAlign: "center" },
      "@media (max-width:1440px)": {
        fontSize: "16px",
      },
      "@media (max-width:1366px)": {
        fontSize: "16px",
      },
      "@media (max-width:992px)": {
        fontSize: "14px",
      },
      "@media (max-width:600px)": {
        textAlign: "center",
      },
    },
    button: {
      height: "48px",
      width: "38%",
      color: "#6C7593",
      backgroundColor: "white",
      boxShadow: "0px 4px 4px rgba(0, 14, 47, 0.06)",
      borderRadius: "10px",
      margin: props.margin || "",
      padding: props.padding || "",
      "&:hover": {
        color: "#fff",

        backgroundColor: props.color || theme.palette.primary.main,
      },
      "& .MuiTypography-root": {
        textTransform: "none",
      },

      // Media queries for button styles
      "@media (max-width:1440px)": {
        width: "38%",
      },
      "@media (max-width:992px)": {
        width: "58%",
      },
      "@media (max-width:600px)": {
        width: "100%",
      },
    },
    label: {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#ADB5CE",
      "@media (max-width:600px)": {
        marginTop: "20px",
      },
    },
  }));
  const classes = useStyles();

  const handleChange = (e) => {
    console.log(e.target.files[0].name);
    setValue(e.target.files[0].name);
  };

  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        {props.title}
      </Typography>
      <label htmlFor="contained-button-file">
        <div className={classes.container}>
          <input
            className={classes.input}
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={(e) => handleChange(e)}
          />
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            <Typography noWrap variant="button">
              Choose File
            </Typography>
          </Button>
          <Typography noWrap variant="body1" className={classes.label}>
            {value ? value : "No file choosen."}
          </Typography>
        </div>
      </label>
    </div>
  );
}
