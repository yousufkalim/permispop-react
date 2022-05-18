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
import { useTranslation } from "react-i18next";

const ProfileDetails = (props) => {
  const { i18n, t } = useTranslation();
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
      <Typography className="Role">{t(props.role)}</Typography>
      <Typography className="Ranking">{props.ranking}</Typography>
      <Rating
        className="rating"
        name="rating-feedback"
        size="large"
        readOnly={true}
        value={props.ratings}
        showLabel={true}
        precision="1"
        fontWeight="900"
        disabled={false}
        highlightSelectedOnly={false}
        opacity="0.55"
        style={{
          marginTop: "20px",
        }}
      />
      <Grid container className="ButtonSection">
        <Button
          className="LanguageButton"
          text={t("Languages")}
          variant="outlined"
          margin="0px 10px 1% 0px !important"
          borderRadius="10px"
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
          {props.languages && props.languages.length > 0 ? (
            props.languages.map((language) => {
              return <MenuItem onClick={handleClose}> {language}</MenuItem>;
            })
          ) : (
            <MenuItem disabled={true}>{t("No Language/s selected")}</MenuItem>
          )}
        </Menu>

        <Button
          startIcon={<Editprofile />}
          className="ProfileButton"
          text={t("Edit Profile")}
          borderRadius="10px"
          color="#149e7a  !important"
          margin="0 1% 1% 0 !important"
          onClick={(e) => seteditProfile(!editProfile)}
        ></Button>
        {editProfile ? (
          <>
            <Vector className="VectorIcon"></Vector>
            <Button
              text={t("Request Profile Update")}
              variant="outlined"
              borderRadius="10px"
              margin="0 1% 0 0 !important"
              textColor="#149e7a  !important"
              color="white !important"
              sx={{ marginRight: "2% !important" }}
              className="LanguageButton"
              onClick={(e) => props.openProfileUpdate(true)}
            ></Button>

            <Button
              text={t("Change Password")}
              variant="outlined"
              color="white !important"
              borderRadius="10px"
              textColor="#149e7a"
              onClick={(e) => props.openPasswordModal(true)}
            ></Button>
          </>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
