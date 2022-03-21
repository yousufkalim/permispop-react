import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import SelectField from "./SelectField";
import Grid from "@mui/material/Grid";
import DatePicker from "./DatePicker";
import InputLabel from "@mui/material/InputLabel";

export default function MobileViewFilters(props) {
  const [item, setItem] = React.useState("");
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const [Startvalue, setStartValue] = useState(new Date());
  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };

  const [Endvalue, setEndValue] = useState(new Date());
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };

  return (
    <>
      <Grid container spacing={1} className="MobileFilterGrid">
        <Grid xs={12} sm={12}>
          <Typography
            sx={{
              marginTop: "20px",
              paddingLeft: "7.5%",
              fontFamily: "Inter",
              fontStyle: " normal",
              fontWeight: 600,
              fontSize: "18px",
              /* identical to box height */
              marginBottom: "-5% !important",
              color: "#2A3235",
            }}
          >
            {props.title}
          </Typography>
        </Grid>
        <Grid xs={6} sm={6}>
          <FormControl
            variant=""
            sx={{ ml: 2, paddingBottom: "5%" }}
            className="MobileView"
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //   value={item}
              defaultValue={0}
              onChange={handleChange}
              sx={{
                width: "80%",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#9BAAAF",
              }}
            >
              <MenuItem
                value={0}
                disabled
                sx={{ paddingTop: "0px !important" }}
              >
                Filter
              </MenuItem>
              <MenuItem value={2}>All</MenuItem>
              <MenuItem value={1}>Filter by receiver</MenuItem>
              <MenuItem value={3}>Filter by Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} sm={6} sx={{ display: "flex", alignItems: "center" }}>
          {item == 1 ? (
            <SelectField></SelectField>
          ) : item == 2 ? (
            <SelectField />
          ) : (
            <></>
          )}
        </Grid>
        {item == 3 ? (
          <Grid container spacing={1} sx={{ padding: "2% 0 4% 7%" }}>
            <Grid xs={6} sm={6} sx={{ display: "flex", alignItems: "center" }}>
              <DatePicker
                label="Start date"
                onChange={handleStartdate}
                value={Startvalue}
              />
            </Grid>
            <Grid xs={6} sm={6} sx={{ display: "flex", alignItems: "center" }}>
              <DatePicker
                label="End date"
                onChange={handleEnddate}
                value={Endvalue}
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
