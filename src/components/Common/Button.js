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

      // Media queries for button styles
      "@media (max-width:1440px)": {
        height: props.height2 || "40px",
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

    // Button lable styles
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
      className={[classes.button, props.className].join(" ")}
      style={props.style}
      classes={{ label: classes.label }}
      {...props.buttonProps}
    >
      <Typography
        noWrap
        variant="button"
        className={[classes.label, props.buttonLableStyle].join(" ")}
        {...props.buttonLableProps}
      >
        {props.text}
      </Typography>
    </Button>
  );
}

/* Using Button component:

          <Button
            startIcon={<muiIcon><MuiIcon>}   
            type="submit"   
            color="white"          // Button color
            textColor="#252831"    // Button label color
            text="Play Video"      // Button label text
            width= "50%"           // default width
            customWidth1="36%"     // width when width is 600px
            customWidth2="60%"     // width when width is 400px
            buttonLableStyle="btn_main"  // style for button labels
            height ="40px"      // default height
            height2 ="40px"     // height when width is 1336px and 1440px
            height3 ="40px"     // height when width is 992px
            height4 ="40px"     // height when width is 600px
            buttonProps = {{prop1:value , prop2:value}}     // Default mui button props
            buttonLableProps = {{prop1:value , prop2:value}}     // Default mui Typography props
          ></Button>
          
*/
