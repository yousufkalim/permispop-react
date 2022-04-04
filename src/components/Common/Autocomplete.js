import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100% !important",
    "@media (max-width:600px)": {
      width: "100% !important",
    },
  },
  inputLabels: {
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontWeight: "550 !important",
    fontSize: "24px !important",
    lineHeight: "151.02 !important%",
    color: "#363557 !important",
    "&  .MuiInputLabel-formControl": { textAlign: "center !important" },

    "@media (max-width:992px)": {
      fontSize: "20px !important",
    },
    "@media (max-width:600px)": {
      width: "200% !important",
      textAlign: "center !important",
    },
  },
  textfield: {
    height: "62px !important",
    borderBottom: "none !important",
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontSize: "18px !important",
    lineHeight: "151.02% !important",
    color: "black !important",
    fontWeight: "300 !important",
    marginTop: "10px !important",

    "@media (max-width:992px)": {
      fontSize: "16px !important",
    },
    "@media (max-width:600px)": {
      height: "60px !important",
      "& .MuiInput-input": {
        textAlign: "center !important",
      },
    },
  },
  helper: {},
}));
export default function ComboBox(props) {
  const classes = useStyles();

  return (
    <FormControl
      className={classes.formControl}
      error={props.error ? true : false}
      variant={props.variant || "standard"}
      {...props.FormControlProps}
    >
      <InputLabel
        {...props.inputLabelProps}
        className={[classes.inputLabels, props.inputLabelStyle].join(" ")}
        shrink={true}
      >
        {props.label}
      </InputLabel>
      <Autocomplete
        sx={{
          width: "100%",
          height: "72px !important",
        }}
        getOptionLabel={(option) => option.label}
        disabled={props.disabled}
        options={props.options}
        onChange={(event, value) => props.onAddressSelect(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            placeholder={props.placeholder}
            variant="standard"
            sx={{
              width: "100% !important",
              height: "72px !important",
            }}
            onChange={(e) => {
              props.onChangeAddress
                ? props.onChangeAddress(e)
                : props.onChangeLanguage(e);
            }}
            inputProps={{
              ...params.inputProps,
              className: classes.textfield,
              Autocomplete: "#####autoComplete",
              value: props.value,
            }}
          />
        )}
      />
      {props.error && (
        <FormHelperText className={classes.helper} {...props.helperProps}>
          {props.ErrorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
}
