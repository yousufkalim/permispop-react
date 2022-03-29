// import { TableRow } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import ButtonComponent from "../../../components/Common/Button";


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
      <MobileViewFilters title="My Procedure" />
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px" }}>
          <Grid xs={12} sm={12} md={4}>
            <Typography
            className="MyProcedureHeading"
              sx={{
                marginTop: "20px",
                paddingLeft: "80px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "28px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              My Procedure 
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
                  <div className="ProceduresList">
                        <Typography className="ProcedureGrid">ANTS</Typography>
                        <ButtonComponent
                             buttonLableStyle="btn_main"
                             className="procedureBtn"
                             text="Edit"      
                             width= "10%"            
                        />
                  </div>
                  <Divider/>
                  <div className="ProceduresList">
                        <Typography className="ProcedureGrid">Mes demarches simplifees</Typography>
                        <ButtonComponent
                             buttonLableStyle="btn_main"
                             className="procedureBtn"
                             text="Edit"      
                             width= "10%"            
                        />
                  </div>
                  <Divider/>
                  <div className="ProceduresList">
                        <Typography className="ProcedureGrid">Reserver une date de code</Typography>
                        <ButtonComponent
                             className="procedureBtn"
                             buttonLableStyle="btn_main"
                             text="Edit"      
                             width= "10%"            
                        />
                  </div>
                
              </Grid>
              
       </Grid>

    

      
    </>
  );
};

export default Index;
