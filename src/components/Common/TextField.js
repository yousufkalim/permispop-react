import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/styles";

export default function UseFormControl(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      width: props.formWidth || "100%",
      "@media (max-width:600px)": {
        width: "100%",
      },
    },
    inputLabels: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "24px",
      lineHeight: "151.02%",
      color: "#363557",
      "&  .MuiInputLabel-formControl": { textAlign: "center" },

      "@media (max-width:992px)": {
        fontSize: "20px",
      },
      "@media (max-width:600px)": {
        width: "200%",
        textAlign: "center",
      },
    },
    input: {
      height: "70px",
      borderBottom: "none",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "151.02%",
      color: "#B9B7CC",
      fontWeight: "300",

      "@media (max-width:992px)": {
        fontSize: "16px",
      },
      "@media (max-width:600px)": {
        height: "60px",
        "& .MuiInput-input": {
          textAlign: "center",
        },
      },
    },
    helper: {},
  }));
  const classes = useStyles();
  return (
    <FormControl
      className={classes.formControl}
      error={props.error ? true : false}
      variant={props.variant || "standard"}
      {...props.FormControlProps}
    >
      <InputLabel
        className={[classes.inputLabels, props.inputLabelStyle].join(" ")}
        shrink={true}
        {...props.inputLabelProps}
      >
        {props.label}
      </InputLabel>
      <Input
        className={classes.input}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder || ""}
        {...props.inputProps}
      />
      {props.error && (
        <FormHelperText className={classes.helper} {...props.helperProps}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}
