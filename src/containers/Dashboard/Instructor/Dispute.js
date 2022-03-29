// import { TableRow } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import noDispute from "../../../assets/images/noDispute.png";

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
      <MobileViewFilters title="Dispute" />
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={12} md={4}>
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
              Dispute 
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
              // label={["date"]}
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid>
        </Grid>
      </div>

       <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

    
       <Grid container spacing={1} sx={{ margin: "30px"}}>
              <Grid xs={12}>
                  <div className="DisputeGrid">
                        <noDispute />
                        <img src={noDispute} />
                        {/* <Typography className="DisputeTextGrid">No dispute found</Typography> */}
                  </div>
                 
                
              </Grid>
              
       </Grid>
      
    </>
  );
};

export default Index;
