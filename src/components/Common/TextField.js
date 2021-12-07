import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

export default function TextFieldComponent(props) {
  console.log(props);
  const useStyles = makeStyles((theme) => ({
    textField: {
      height: props.height ? props.height : "20px",
      width: props.width ? props.width : "fit-content",
      position: "absolute",
      borderRadius: props.borderRadius ? props.borderRadius : "0",
      "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
        color: props.color ? props.color : "black",
      },
      "& .css-qb0y3l-MuiFormLabel-root-MuiInputLabel-root": {
        color: "rgba(0, 0, 0, 0.6)",
        fontWeight: "600",
        fontSize: "24px",
        lineHeight: "25px",
        padding: "0px",
        position: "relative",
        display: "block",
        transformOrigin: "top-left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "120%",
        position: "absolute",
        left: "0px",
        top: "0",
        webkitTransform: "translate(0, -1.5px)",
      },
    },
  }));
  const classes = useStyles();
  return (
    <TextField
      size={props.size || "medium"}
      variant={props.variant ? props.variant : "standard"}
      placeholder={props.placeholder && props.placeholder}
      className={classes.textField}
      type={props.type && props.type}
      label={props.label && props.label}
      InputLabelProps={{ shrink: true }}
    >
      {props.text}
    </TextField>
  );
}
