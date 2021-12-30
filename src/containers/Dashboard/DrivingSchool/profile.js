import React from "react";
import Grid from "@mui/material/Grid";
import ProfileImage from "../../../components/ProfileComponents/ProfileImage";
import ProfileDetails from "../../../components/ProfileComponents/ProfileDetails";
import Studentprofile from "../../../assets/images/Studentprofile.svg";
import Typography from "@mui/material/Typography";
import Divider from "../../../components/Common/Divider";
const Profile = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1} className="maindiv">
        <Grid md={3} className="leftprofilediv">
          <ProfileImage src={Studentprofile}></ProfileImage>
        </Grid>

        <Grid md={9}>
          <ProfileDetails
            name={"John"}
            location={"France, FR"}
            role={"Driving school"}
            ranking={"Rankings"}
          ></ProfileDetails>
          <Grid className="ProfileDetails">
            <Typography className="Abouttitlle">About</Typography>
            <Divider className="ProfileDivider"></Divider>
          </Grid>
          <Typography className="AboutHeading">Contact Information</Typography>

          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Trade Name:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              Student
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Company Name:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              One
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Address:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              12,ab
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Complement:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              abc
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Postal Code:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              5s
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              City:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              A Definer
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              CDF Accepted:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              yes
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
