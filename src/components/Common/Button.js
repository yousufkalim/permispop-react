import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

export default function ButtonComponent(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      height: props.height || "55px",
      width: props.width || "fit-content",
      // minWidth: props.minWidth ? props.minWidth : "150px",
      // maxWidth: props.maxWidth ? props.maxWidth : "150px",
      color: props.textColor || theme.palette.common.white,
      backgroundColor: props.color || theme.palette.primary.main,
      boxShadow: "0px 7px 14px rgba(140, 69, 0, 0.21)",
      borderRadius: props.borderRadius || "33px",
      margin: props.margin || "",
      padding: props.padding || "",
      "&:hover": {
        backgroundColor: props.color || theme.palette.primary.main,
      },
      "& .MuiTypography-root": {
        textTransform: "none",
      },
      "@media (max-width:1366px)": {
        height: props.height2 || "40px",
      },
      "@media (max-width:992px)": {
        height: props.height3 || "40px",
      },
      "@media (max-width:600px)": {
        display: props.display,
        width: props.customWidth1,
        height: props.height4 || "55px",
        marginTop: "12px",
      },
      "@media (max-width:400px)": {
        width: props.customWidth2,
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
      disabled={props.disabled}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
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
        className={[classes.label, props.buttonLableStyle].join(" ")}
      >
        {props.text}
      </Typography>
    </Button>
  );
}
