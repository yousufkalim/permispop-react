import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

export default function ButtonComponent(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      height: props.height ? props.height : "55px",
      width: props.width ? props.width : "fit-content",
      // minWidth: props.minWidth ? props.minWidth : "150px",
      // maxWidth: props.maxWidth ? props.maxWidth : "150px",
      color: props.textColor || theme.palette.common.white,
      backgroundColor: props.color || theme.palette.primary.main,
      boxShadow: "0px 7px 14px rgba(140, 69, 0, 0.21)",
      borderRadius: "33px",
      "&:hover": {
        backgroundColor: props.color || theme.palette.primary.main,
      },
      "& .MuiTypography-root": {
        textTransform: "none",
      },
      ["@media (max-width:1366px)"]: {
        // eslint-disable-line no-useless-computed-key
        height: "40px",
      },
      ["@media (max-width:992px)"]: {
        // eslint-disable-line no-useless-computed-key
        height: "40px",
      },
    },
    label: {
      color: props.textColor || theme.palette.common.white,
    },
  }));
  const classes = useStyles();

  return (
    <Button
      to={props.to}
      onClick={props.onClick}
      endIcon={props.endIcon}
      disabled={props.disabled}
      startIcon={props.startIcon}
      size={props.size || "large"}
      type={props.type || "button"}
      variant={props.variant || "contained"}
      component={props.component || "button"}
      fullWidth={props.fullWidth === false ? false : true}
      className={classes.button}
      style={props.style}
      classes={{ label: classes.label }}
    >
      <Typography
        noWrap
        variant="button"
        className={[classes.label, "btn_main"]}
      >
        {props.text}
      </Typography>
    </Button>
  );
}
