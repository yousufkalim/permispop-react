import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
export default function HoverRating(props) {
  const useStyles = makeStyles((theme) => ({
    rating: {
      display: props.display || "flex",
      alignItems: props.alignItems || "center",
      justifyContent: props.justifyContent || "center",
    },
    icon: {
      opacity: props.opacity || "0.55 !important",
      fontFamily: props.fontFamily || "inter",
      fontSize: "inherit",
    },
    text: {
      fontSize:
        props.size === "large"
          ? "18px"
          : props.size === "medium"
          ? "16px"
          : props.size === "small"
          ? "13px"
          : "18px",
      fontFamily: props.fontFamily || "inter",
      fontWeight: props.fontWeight || "700",
      marginTop: "2px",
      "& .css-d0uhtl ": {
        marginLeft: "0px",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        justifyContent: "left",
        marginTop: "20px",
      }}
      className={classes.rating}
    >
      {props.showLabel && (
        <Box sx={{ ml: 2 }}>
          <Typography
            color={props.labelColor || "#2A3235"}
            className={classes.text}
            {...props.ratingLabelprops}
          >
            {props.value}
          </Typography>
        </Box>
      )}
      <Rating
        name={props.name || "rating-feedback"}
        value={props.value}
        readOnly={props.readOnly}
        size={props.size || "large"}
        precision={props.precision || "0.5"}
        disabled={props.disabled}
        highlightSelectedOnly={props.highlightSelectedOnly}
        onChange={props.onChange}
        emptyIcon={<StarIcon className={classes.icon} />}
      />
    </Box>
  );
}
//how to use RATING-FEEDBACk
/*
   <Rating
        name="rating-feedback"             =>  Rating name
        size="large"                       => Rating size  
        readOnly={true}                    => Set if use as readonly
        value="2.5"                        => values of rating
        showLabel={true}                   => for rating label
        precision="0.5"                    => rating stars precision
        disabled={false}
        highlightSelectedOnly={false}      => only high light the selected ones

    >
    </Rating>
*/
