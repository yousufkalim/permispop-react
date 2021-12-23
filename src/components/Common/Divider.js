import React from "react";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";

export default function MainDivider(props) {
  const useStyles = makeStyles((theme) => ({
    divider: {
      width: props.width ? props.width : "90%",
      margin: props.margin ? props.margin : "6% 0px 6% 0px",
      alignSelf: props.alignSelf ? props.alignSelf : "center",
      borderColor: props.borderColor
        ? props.borderColor
        : "rgba(0, 0, 0, 0.05)",
    },
  }));
  const classes = useStyles();

  return (
    <Divider
      flexItem
      orientation={props.orientation ? props.variant : "horizontal"}
      variant={props.variant ? props.variant : "middle"}
      textAlign={props.textAlign ? props.textAlign : "center"}
      light={props.light ? props.light : true}
      className={classes.divider}
      style={props.style}
      {...props}
    />
  );
}
