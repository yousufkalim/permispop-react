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
            name={"John Doe"}
            location={"France, FR"}
            role={"Instructor"}
            ranking={"Rankings"}
          ></ProfileDetails>
          <Grid className="ProfileDetails">
            <Typography className="Abouttitlle">About</Typography>
            <Divider className="ProfileDivider"></Divider>
          </Grid>
          <Typography className="AboutHeading">Contact Information</Typography>

          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              First Name:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              Student
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Surname:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              One
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Gender:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              Male
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Date of birth:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              16/11/2021
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Place of birth:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              5s
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Address:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              A Definer
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Complement:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              Area
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Postal Code:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              712333
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              City:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              Saint-clients
            </Grid>
          </Grid>
          <Divider className="ProfileDivider" />

          <Typography className="AboutHeading">Contact Information</Typography>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Meetup point 1:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              N/A
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              Meetup point 2:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              12
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
