import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Typography } from "@mui/material";
import MultipleSelectPlaceholder from "./SelectField";
import { Grid } from "@mui/material";

const option = ["Filter by receiver", "All"];
export default function NativeSelectDemo(props) {
  return (
    <div className="mobileSelect">
      <Typography>Pending requests</Typography>
      <Box sx={{ minWidth: 120, mt: 1, mb: 2 }}>
        <FormControl fullWidth>
          <NativeSelect
            defaultValue={"Filter by receiver"}
            inputProps={{
              id: "uncontrolled-native",
            }}
          >
            <option value={"Filter by receiver"}>Filter by receiver</option>
            <option value={"All"}>All</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </div>
  );
}
