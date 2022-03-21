import React, { useState } from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import { Instructorcolumns } from "../../../utils/tableHeads";
import { Instructorrows } from "../../../utils/tablerows";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";

const Index = () => {
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
      <MobileViewFilters title="Instructor" />
      <div className="Filters">
        <Grid
          container
          spacing={1}
          sx={{ marginTop: "30px", marginLeft: "70px" }}
        >
          <Grid xs={12} sm={12} md={3}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "24px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              Instructor
            </Typography>
          </Grid>
          <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["Filter by receiver"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Start Date"
              value={Startvalue}
              onChange={handleStartdate}
            ></DatePicker>
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="End Date"
              // label={["date"]}
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" />

      <DataTable data={Instructorrows} columns={Instructorcolumns}></DataTable>
    </>
  );
};

export default Index;
