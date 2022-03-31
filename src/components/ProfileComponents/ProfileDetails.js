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
import { toast } from "react-toastify";

import API from "../../api";

const ProfileDetails = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editProfile, seteditProfile] = React.useState(false);
  const [openmodal, setOpenModal] = React.useState(false);

  const handleOpenmodaL = () => setOpenModal(true);

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
        className="rating"
        name="rating-feedback"
        size="large"
        readOnly={true}
        value={props.ratings}
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
        <Grid xs={12} sm={12} md={2} className="ProfileButtonGrid">
          <Button
            className="LanguageButton"
            text="Languages"
            variant="outlined"
            margin="0px 10px 0px 0px !important"
            borderRadius="10px"
            width="95% !important"
            textColor="#149e7a"
            color="white"
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
            {props.languages.length > 0 ? (
              props.languages.map((language) => {
                return <MenuItem onClick={handleClose}> {language}</MenuItem>;
              })
            ) : (
              <MenuItem disabled={true}>No Language/s selected</MenuItem>
            )}
          </Menu>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={2}
          className="ProfileButtonGrid"
          sx={{ marginRight: "1%" }}
        >
          <Button
            startIcon={<Editprofile />}
            className="ProfileButton"
            text="Edit Profile"
            borderRadius="10px"
            width="100% !important"
            color="#149e7a  !important"
            sx={{ padding: "0 !important" }}
            onClick={(e) => seteditProfile(!editProfile)}
          ></Button>
        </Grid>
        {editProfile ? (
          <>
            <Vector className="VectorIcon"></Vector>
            <Grid xs={12} sm={6} md={3}>
              <Button
                text="Request Profile Update"
                variant="outlined"
                borderRadius="10px"
                width="95% !important"
                textColor="#149e7a  !important"
                color="white !important"
                className="LanguageButton"
              ></Button>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Button
                text="Change Password"
                variant="outlined"
                width="95% !important"
                color="white !important"
                borderRadius="10px"
                textColor="#149e7a"
                onClick={(e) => props.openPasswordModal(true)}
              ></Button>
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
