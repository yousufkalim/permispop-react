import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

export default function BasicTimePicker(props) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <TimePicker
        label={props.label || "Time "}
        value={props.value}
        shouldDisableTime={props.shouldDisableTime}
        disabled={props.disabled === true ? true : false}
        onChange={props.onChange}
        renderInput={(params) => <TextField {...params} />}
        {...props.timePickerProps}
      />
    </LocalizationProvider>
  );
}
