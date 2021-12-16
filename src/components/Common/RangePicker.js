import * as React from "react";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import DateAdapter from "@mui/lab/AdapterMoment";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

export default function ResponsiveDateRangePicker(props) {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MobileDateRangePicker
        startText={props.startText || "Start"}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
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
