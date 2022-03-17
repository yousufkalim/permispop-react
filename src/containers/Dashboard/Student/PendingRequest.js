// import { TableRow } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PendingRequestcolumns } from "../../../utils/tableHeads";
import { pendingRequestsrows } from "../../../utils/tablerows";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import MobileDateRangePicker from "../../../components/Common/RangePicker";
import DatePicker from "../../../components/Common/DatePicker";
import Divider from "../../../components/Common/Divider";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";

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
      <MobileViewFilters title="Pending requests" />
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={6} md={4}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "80px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 400,
                fontSize: "24px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              Pending Request
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
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
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid>
        </Grid>
      </div>

      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

      <DataTable
        data={pendingRequestsrows}
        columns={PendingRequestcolumns}
      ></DataTable>
    </>
  );
};

export default Index;
