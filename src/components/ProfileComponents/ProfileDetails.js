import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "../../components/Common/Rating";
import Button from "../../components/Common/Button";
import { ReactComponent as Vector } from "../../assets/images/Vector.svg";
import { ReactComponent as Locationicon } from "../../assets/images/locationicon.svg";
import { ReactComponent as Editprofile } from "../../assets/images/editprofile.svg";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ProfileDetails = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editProfile, seteditProfile] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid contianer spacing={2} className="ProfileDetails">
      <div className="uppersection">
        <Typography className="Name">{props.name}</Typography>
        <Locationicon className="locationicon"></Locationicon>
        <Typography className="location">{props.location}</Typography>
      </div>
      <Typography className="Role">{props.role}</Typography>
      <Typography className="Ranking">{props.ranking}</Typography>
      <Rating
        name="rating-feedback"
        size="large"
        readOnly={true}
        value="3.5"
        showLabel={true}
        precision="0.5"
        fontWeight="900"
        disabled={false}
        highlightSelectedOnly={false}
        opacity="0.55"
        style={{
          marginTop: "20px",
        }}
      />
      <Grid container className="ButtonSection">
        <Grid xs={12} sm={12} md={2}>
          <Button
            text="Languages"
            backgroundColor="primary"
            className="profileButton"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          ></Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Language 1</MenuItem>
            <MenuItem onClick={handleClose}>Language 2</MenuItem>
            <MenuItem onClick={handleClose}>Language 3</MenuItem>
          </Menu>
        </Grid>
        <Grid xs={12} sm={12} md={2}>
          <Button
            startIcon={<Editprofile />}
            text="Edit Profile"
            className="profileButton"
            onClick={(e) => seteditProfile(!editProfile)}
          ></Button>
        </Grid>
        {editProfile ? (
          <>
            <Vector className="VectorIcon"></Vector>
            <Grid xs={12} sm={12} md={3}>
              <Button
                text="Request Profile Update"
                className="profileButton"
              ></Button>
            </Grid>
            <Grid xs={12} sm={12} md={2}>
              <Button text="Change Password" className="profileButton"></Button>
            </Grid>{" "}
          </>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
