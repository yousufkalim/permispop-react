// import { TableRow } from "@mui/material";
import React from "react";
import DataTable from "../../../components/Common/Table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Historycolumns } from "../../../utils/tableHeads";
import { pendingRequestsrows } from "../../../utils/tablerows";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";


import Divider from "../../../components/Common/Divider";

const index = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1} sx={{ marginTop: "30px" }}>
        <Grid xs={12} sm={12} md={3}>
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
            History
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
        <Grid xs={3} sm={3} md={2}>
          <MultipleSelectPlaceholder
            value={["Start Date"]}
          ></MultipleSelectPlaceholder>
        </Grid>

        <Grid xs={3} sm={3} md={2}>
          <MultipleSelectPlaceholder
            value={["End Date"]}
          ></MultipleSelectPlaceholder>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

      <DataTable
        data={pendingRequestsrows}
        columns={Historycolumns}
      ></DataTable>
    </React.Fragment>
  );
};

export default index;
