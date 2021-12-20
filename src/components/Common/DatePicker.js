import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div>
        <DatePicker
          label={props.label || "Date"}
          value={props.value}
          disabled={props.disabled === true ? true : false}
          maxDate={props.maxDate}
          minDate={props.minDate}
          shouldDisableDate={props.shouldDisableDate}
          shouldDisableYear={props.shouldDisableYear}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
          {...props.datePickerProps}
        />
      </div>
    </LocalizationProvider>
  );
}
