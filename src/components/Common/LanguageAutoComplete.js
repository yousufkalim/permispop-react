import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
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
    display: "flex !important",
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
}));

export default function LanguageAutoComplete(props) {
  const classes = useStyles();
const valHtml = props.value.map((option, index) => {
  // This is to handle new options added by the user (allowed by freeSolo prop).
  const label = option.name || option;
  return (
    <Chip
      key={label}
      label={label}
      deleteIcon={<RemoveIcon />}
      onDelete={() => {
        props.setVal(props.name, props.value.filter((entry) => entry !== option));
      }}
    />
  );
});

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
      {props.required? <div style={{color:'red'}}> *</div>:''}
    </InputLabel>
    <Autocomplete
      multiple
      filterSelectedOptions
      getOptionLabel={(option) => option.name}
      options={props.options}
      disabled={props.disabled}
      renderTags={() => {}}
      value={props.value}
      // onChange={(e, newValue) => props.setVal(newValue)}
      onChange={(e, newValue) => props.setVal(props.name, newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          sx={{
            width: "100% !important",
            height: "72px !important",
          }}
          inputProps={{
            ...params.inputProps,
            className: classes.textfield,
            Autocomplete: "##autoComplete",
          }}
          variant="standard"
          placeholder="Language"
        />
      )}
    />

    <div style={{ position: "absolute", bottom: "-50px" }}>{valHtml}</div>
    {props.error && (
      <FormHelperText className={classes.helper} {...props.helperProps}>
        {props.ErrorMsg}
      </FormHelperText>
    )}
  </FormControl>
);
}
