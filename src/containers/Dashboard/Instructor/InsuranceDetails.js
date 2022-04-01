import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "../../../components/Common/Button";
import { Divider } from "@mui/material";

const InsuranceDetails = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1} className="insurancediv">
        <Typography fontWeight={600} fontSize={25} paddingTop={5} marginLeft={4}>       
            Insurance Details
       </Typography> 
       <Button
          className="insuranceBtn"                  
          text="Update Profile"
          
       ></Button>  
      </Grid>
      <Divider/>

      <Grid container  paddingTop={3} sx={{margin:"30px"}}>

      <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid" >
            <Typography className="GridTitle"  paddingTop={2} paddingLeft={3} fontSize={20}> 
              Insurance Company 
            </Typography>
            <Divider/>
            <Grid item xs={12} md={12} className="textdiv">
              <label>Insurer</label>
              <input className="placeH" placeholder="EFU" /> 
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>Ploice Number</label>
              <input placeholder="3222222" /> 
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>Start Date</label>
              <input placeholder="invalid date" /> 
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>End Date</label>
              <input placeholder="30/05/2021" /> 
            </Grid>
          </Grid>
     
          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle"  paddingTop={2} paddingLeft={3} fontSize={20}> 
              Driving License
            </Typography>
            <Divider/>
            <Grid item xs={12} md={12} className="textdiv">
              <label>License Number</label>
              <input className="placeH" placeholder="05/07/2021" /> 
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>Delivery Place</label>
              <input placeholder="433-34344" /> 
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>Colour</label>
              <input placeholder="05/05/2021" /> 
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>Model</label>
              <input placeholder="05/05/2021" /> 
            </Grid>
          </Grid>
            
              

          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography className="GridTitle" paddingTop={2}  paddingLeft={3} fontSize={20}>
              Vehicle Detail
            </Typography>
            <Divider/>
            <Grid item md={12} className="textdiv">
              <label>Start Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid>
            <Grid item md={12} className="textdiv">
              <label>End Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid>
            </Grid>
            
          


          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              Vehicle Detail
            </Typography>
            <Divider/>
            <Grid item md={12} className="textdiv">
              <label>Start Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid><Grid item md={12} className="textdiv">
              <label>End Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid>
           
            
          </Grid>
          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              Vehicle Insurance
            </Typography>
            <Divider/>
            <Grid item md={12} className="textdiv">
              <label>Start Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid><Grid item md={12} className="textdiv">
              <label>End Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid>
           
            
          </Grid>
          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              Technical Control
            </Typography>
            <Divider/>
            <Grid item md={12} className="textdiv">
              <label>Start Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid><Grid item md={12} className="textdiv">
              <label>End Date</label>
              <input placeholder="05/05/2012" /> 
            </Grid>
           
            
          </Grid>

          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              Exercise Authorization
            </Typography>
            <Divider/>
            <Grid item md={12} className="textdiv">
              <label>Authorization Date</label>
              <input placeholder="xxxxxxxxxxx" /> 
            </Grid>
            <Grid item md={12} className="textdiv">
              <label>Issueing Authority</label>
              <input placeholder="xxxxxxxxxxx" /> 
            </Grid>
            <Grid item md={12} className="textdiv">
              <label>Expiry Date</label>
              <input placeholder="xxxxxxxxxxx" /> 
            </Grid>
            
          </Grid>
          
          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              Business Store
            </Typography>
            <Divider/>
            <Grid item md={12} className="textdiv">
              <label>Serial Number</label>
              <input placeholder="xxxxxxxxxx" />  
          </Grid>
          </Grid>
          

          
      </Grid>
    </React.Fragment>
  );
};

export default InsuranceDetails;