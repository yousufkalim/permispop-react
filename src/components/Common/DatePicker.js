import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker(props) {
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
              sx={{
                background: "#fff",
                borderRadius: "30px",
                fontStyle: "initial",
                width: "85% !important",
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
