import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";

export default function ActionAreaCard(props) {
  const useStyles = makeStyles((theme) => ({
    cardMain: {
      width: props.mainWidth ? props.mainWidth : "40%",
      minHeight: props.mainHeight ? props.mainHeight : "600px",
      borderRadius: props.borderRadius ? props.borderRadius : "45px",
      border: props.border ? props.border : "none",
      marginLeft: "2%",
      marginRight: "2%",
      boxShadow: props.boxShadow
        ? props.boxShadow
        : "0px 31px 70px rgba(35, 17, 0, 0.07)",

      "@media (max-width:1366px)": {
        width: "38%",
        minHeight: "500px",
      },
      "@media (max-width:992px)": {
        minHeight: "460px",
      },
      "@media (max-width:600px)": {
        width: "70%",
        minHeight: "420px",
        marginBottom: "20px",
      },
      "@media (max-width:400px)": {
        minHeight: "320px",
      },
    },
    cardContentDiv: {
      height: props.contentHeight ? props.contentHeight : "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "6%",
    },
    heading: {
      fontSize: props.headingFontSize ? props.headingFontSize : "38px",
      color: "#25282f",
      fontWeight: "500",
      fontFamily: "Inter",
      "@media (max-width:1366px)": {
        fontSize: "28px",
      },
      "@media (max-width:992px)": {
        fontSize: "24px",
      },
      "@media (max-width:600px)": {},
      "@media (max-width:400px)": {},
    },
    divider: {
      width: "50px",
      margin: "10px",
      borderBottomWidth: "3px",
      borderImage: "linear-gradient(270deg, #FF8029 0%, #20C98D 100%)",
      borderImageSlice: 1,
      alignSelf: "center",
      "@media (max-width:1366px)": {},
      "@media (max-width:992px)": {},
      "@media (max-width:600px)": {},
      "@media (max-width:400px)": {},
    },
    subheading: {
      width: "70%",
      fontSize: props.subheadingFontSize ? props.subheadingFontSize : "26px",
      color: "#6A6D76",
      fontWeight: "300",
      fontFamily: "Inter",
      "@media (max-width:1366px)": {
        fontSize: "18px",
      },
      "@media (max-width:992px)": {
        fontSize: "14px",
      },
      "@media (max-width:600px)": {},
      "@media (max-width:400px)": {},
    },
  }));
  const classes = useStyles();
  return (
    <Card className={classes.cardMain}>
      <CardMedia component="img" image={props.image} alt="services" />
      <CardContent className={classes.cardContentDiv}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={classes.heading}
        >
          {props.heading}
        </Typography>
        <Divider
          flexItem
          variant="middle"
          textAlign="center"
          className={classes.divider}
        />
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          className={classes.subheading}
        >
          {props.subHeading}
        </Typography>
      </CardContent>
    </Card>
  );
}
