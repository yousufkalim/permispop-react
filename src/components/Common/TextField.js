import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/styles";

export default function UseFormControl(props) {
  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     width: props.formWidth || "100% !important",
  //     "@media (max-width:600px)": {
  //       width: "100% !important",
  //     },
  //   },
  //   inputLabels: {
  //     fontFamily: "Inter !important",
  //     fontStyle: "normal !important",
  //     fontWeight: "550 !important",
  //     fontSize: "24px !important",
  //     lineHeight: "151.02 !important%",
  //     color: "#363557 !important",
  //     "&  .MuiInputLabel-formControl": { textAlign: "center !important" },

  //     "@media (max-width:992px)": {
  //       fontSize: "20px !important",
  //     },
  //     "@media (max-width:600px)": {
  //       width: "200% !important",
  //       textAlign: "center !important",
  //     },
  //   },
  //   input: {
  //     height: "70px !important",
  //     borderBottom: "none !important",
  //     fontFamily: "Inter !important",
  //     fontStyle: "normal !important",
  //     fontSize: "18px !important",
  //     lineHeight: "151.02% !important",
  //     color: "black !important",
  //     fontWeight: "300 !important",

  //     "@media (max-width:992px)": {
  //       fontSize: "16px !important",
  //     },
  //     "@media (max-width:600px)": {
  //       height: "60px !important",
  //       "& .MuiInput-input": {
  //         textAlign: "center !important",
  //       },
  //     },
  //   },
  //   helper: {},
  // }));
  // const classes = useStyles();
  return (
    <FormControl
      className="formControl"
      error={props.error ? true : false}
      variant={props.variant || "standard"}
      {...props.FormControlProps}
    >
      <InputLabel
        className="inputLabels"
        shrink={true}
        {...props.inputLabelProps}
      >
        {props.label}
      </InputLabel>
      <Input
        className="input"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder || ""}
        {...props.inputProps}
        autoComplete="########TextFields"
      />
      {props.error && (
        <FormHelperText {...props.helperProps}>{props.ErrorMsg}</FormHelperText>
      )}
    </FormControl>
  );
}
