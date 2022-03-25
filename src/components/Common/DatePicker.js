import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { makeStyles } from "@mui/styles";

export default function BasicDatePicker(props) {
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
      <div>
        <DatePicker
          label={props.label}
          value={props.value}
          disabled={props.disabled === true ? true : false}
          maxDate={props.maxDate}
          minDate={props.minDate}
          shouldDisableDate={props.shouldDisableDate}
          shouldDisableYear={props.shouldDisableYear}
          onChange={props.onChange}
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
            />
          )}
          {...props.datePickerProps}
        />
      </div>
    </LocalizationProvider>
  );
}
