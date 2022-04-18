import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { makeStyles } from "@mui/styles";
import FormHelperText from "@mui/material/FormHelperText";

export default function BasicTimePicker(props) {
  const useStyles = makeStyles((theme) => ({
    TextField: {
      padding: props.padding,
      width: props.width,
    },

    helper: {},
  }));
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <TimePicker
        label={props.label}
        shrink={false}
        value={props.value}
        disabled={props.disabled === true ? true : false}
        maxDate={props.maxDate}
        minDate={props.minDate}
        shouldDisableDate={props.shouldDisableDate}
        shouldDisableYear={props.shouldDisableYear}
        onChange={props.onChange}
        views={props.views}
        // OpenPickerButtonProps={{ sx: "width:" }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.TextField}
            sx={{
              background: "#fff",
              borderRadius: "30px",
              fontStyle: "initial",
              boxShadow: "",
            }}
            disabled
            error={props.error ? true : false}
          >
            {props.error && (
              <FormHelperText className={classes.helper} {...props.helperProps}>
                {props.ErrorMsg}
              </FormHelperText>
            )}
          </TextField>
        )}
        {...props.datePickerProps}
      />
    </LocalizationProvider>
  );
}
