import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div>
        <DatePicker
          label={props.label || "Date"}
          value={value}
          disabled={props.disabled === true ? true : false}
          maxDate={props.maxDate}
          minDate={props.minDate}
          shouldDisableDate={props.shouldDisableDate}
          shouldDisableYear={props.shouldDisableYear}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          {...props.datePickerProps}
        />
      </div>
    </LocalizationProvider>
  );
}
