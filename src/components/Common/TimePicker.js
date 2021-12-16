import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

export default function BasicTimePicker(props) {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <TimePicker
        label={props.label || "Time "}
        value={value}
        shouldDisableTime={props.shouldDisableTime}
        disabled={props.disabled === true ? true : false}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        {...props.timePickerProps}
      />
    </LocalizationProvider>
  );
}
