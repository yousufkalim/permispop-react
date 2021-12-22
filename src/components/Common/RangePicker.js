import * as React from "react";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import DateAdapter from "@mui/lab/AdapterMoment";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

export default function ResponsiveDateRangePicker(props) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MobileDateRangePicker
        startText={props.startText || "Start"}
        value={props.value ? props.value : [null, null]}
        onChange={props.onChange}
        disabled={props.disabled === true ? true : false}
        maxDate={props.maxDate}
        minDate={props.minDate}
        shouldDisableDate={props.shouldDisableDate}
        shouldDisableYear={props.shouldDisableYear}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
        {...props.MobileDateRangePicker}
      />
    </LocalizationProvider>
  );
}
