import React from "react";
import Grid from "@mui/material/Grid";
const ProfileImage = (props) => {
  return (
    <>
      <Grid container spacing={1}>
        <img className="Profile-img" src={props.src} alt="" />
      </Grid>
    </>
  );
};

export default ProfileImage;
