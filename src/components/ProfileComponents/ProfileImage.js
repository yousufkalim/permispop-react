import React from "react";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const ProfileImage = (props) => {
  const { i18n, t } = useTranslation();

  return (
    <>
      <Grid
        container
        spacing={1}
        className="profile_image_container"
        sx={{ paddingLeft: "15%" }}
      >
        <label>
          <div>
            <label htmlFor={`contained-button-file` + props.label}>
              <input
                accept="image/*"
                id={`contained-button-file` + props.label}
                name={props.name}
                type="file"
                disabled={props.disabled}
                onChange={props.onChange}
                style={{ display: "none" }}
              />

              <img
                className="Profile-img"
                src={props.src}
                alt=""
                style={{ height: "280px", width: "200px" }}
              />
            </label>
          </div>
        </label>
      </Grid>
    </>
  );
};

export default ProfileImage;
