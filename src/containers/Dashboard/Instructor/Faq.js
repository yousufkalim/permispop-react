import React from "react";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
const Faq = () => {
    return(
        <React.Fragment>

            <Typography fontWeight={600} fontSize={25} paddingTop={5} marginLeft={6}>       
              FAQ
            </Typography>
            <Divider/> 
            <div className="topTitle">
                <Typography className="TitleH" fontWeight={500} fontSize={20} marginLeft={6}>
                test data for hags jjksm ls,l,ls lll j heading
                </Typography>
                <Typography className="TitleP" marginLeft={6}>
                test data for headingtest data for heading data for heading
                </Typography>
            </div>
           
            <Grid container spacing={1} marginTop={5} sx={{marginLeft:"30px"}}>
                <Grid item xs={11} sm={11} md={11} lg={6.5}> 
                <div className="leftdivs">
                    <Typography className="LeftH">1- test data for heading</Typography>
                    <Typography className="LeftP">test data for headingtest data for heading</Typography>
                <div className="sliderdiv" >
                <div className="slidertop">
                    <Typography className="SliderH">15 H</Typography>
                    <Typography className="SliderFade">60 H</Typography>
                    
                </div>
                <div className="borderH">
                <Typography className="SliderH">25H</Typography>
                
                </div>
                </div>
                <Slider
                      aria-label="temperature"
                      defaultValue={40}
                      color="primary"
                      className="slider"
                />
                </div>
                <div className="leftdivs">
                    <Typography className="LeftH">2- test data for heading</Typography>
                    <Typography className="LeftP" >test data for headingtest data for heading</Typography>

                <div className="sliderdiv" >
                <div className="slidertop">
                    <Typography className="SliderH">300 $</Typography>
                    <Typography className="SliderFade">600 $</Typography>
                </div>
                <div className="borderH">
                <Typography className="SliderH">370$</Typography>
                </div>
                </div>
                <Slider
                      aria-label="Temperature"
                      defaultValue={40}
                      color="primary"
                      className="slider"
                />
                </div>
                <div className="leftdivs">
                <Typography className="LeftH">3- test data for heading</Typography>
                <Typography className="LeftP">test data for headingtest data for heading</Typography>
                <div className="sliderdiv" >
                <div className="slidertop">
                <Typography className="SliderH">200 $</Typography>
                <Typography className="SliderFade">500 $</Typography>
                </div>
                <div className="borderH">
                <Typography className="SliderH">430$</Typography>
                </div>
                </div>
                <Slider
                      aria-label="Temperature"
                      defaultValue={40}
                      color="primary"
                      className="slider"
                />
                </div>
                
                
             

                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={4.5} sx={{marginRight:"10px"}}>
                <div className="rightdivs">
                <div >
                <Typography className="RightH">CFE (5)</Typography>
                <Typography className="RightP">test data for headingtest data for heading</Typography>
                </div>
                <div className="rightR">
                    <Typography className="rightR">20$</Typography>
                
                </div>
                </div>
                <div className="rightdivs">
                <div>
                <Typography className="RightH">Cotisation fiscales (4)</Typography>
                <Typography className="RightP">test data for headingtest data for heading</Typography>
      
                </div>
                <div className="rightR">
                <Typography className="rightR">280$</Typography>
                
                </div>
                </div>
                <div className="rightdivs">
                <div>
                <Typography className="RightH">Cotisation fiscales (2)</Typography>
                <Typography className="RightP">test data for headingtest data for heading</Typography>
        
                </div>
                <div className="rightR">
                <Typography className="rightR">90$</Typography>
                
                </div>
                </div>
                <div className="rightdivs">
                <div>
                <Typography className="RightH">Cotisation fiscales (3)</Typography>
                <Typography className="RightP">test data for headingtest data for heading</Typography>
                </div>
                <div className="rightR">
                <Typography className="rightR">200$</Typography>

                
                </div>
                </div>
                <div className="rightdivs">
                <div>
                <Typography className="RightH">lorem de lasca lapev (1)</Typography>
                <Typography className="RightP">test data for headingtest data for heading</Typography>
                
                </div>
                <div className="rightR">
                <Typography className="rightR">920$</Typography>
              
                </div>
                </div>
                
                </Grid>
                <Grid item md={12}>
              <div className="radioBtn">
                <FormControlLabel fontWeight={550} control={<Radio />} label="Anne 1 (11%)" />
                <FormControlLabel className="label" control={<Radio checked/>} label="Sans ACRE (22%)" />
                </div>
                </Grid>
                    
            </Grid>
        </React.Fragment>
    );
};

export default Faq;