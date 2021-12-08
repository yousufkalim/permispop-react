import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

export default function HoverRating(props) {
  const [showValue, setshowValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  console.log(props);
  const useStyles = makeStyles((theme) => ({
    rating: {
      display: props.display || "flex",
      alignItems: props.alignItems || "center",
      justifyContent: props.justifyContent || "center",
    },
    icon: {
      opacity: props.opacity || "0.55",
      fontFamily: props.fontFamily || "sans-serif",
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
        alignItems: "center",
        justifyContent: "center",
      }}
      className={classes.rating}
    >
      {showValue !== null && (
        <Box sx={{ ml: 2 }}>
          <Typography
            color={props.labelColor || "#2A3235"}
            className={classes.text}
            {...props.typographyProps}
          >
            {props.value}
          </Typography>
        </Box>
      )}
      <Rating
        name="rating-feedback"
        value={props.value}
        readOnly={props.readOnly}
        size={props.size || "large"}
        precision={props.precision}
        disabled={props.disabled}
        highlightSelectedOnly={props.highlightSelectedOnly}
        onChange={(event, newValue) => {
          setshowValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon className={classes.icon} />}
      />
    </Box>
  );
}

//how to use RATING-FEEDBACk

// Rating   => props

//  rating number   =>  value="5.0"

//  rating size    => size="medium"

//  rating precision =>  precision="0.5"

//   rating show number => showValue={false}

//  rating Read-only => readOnly={true}

//  rating Disable => disabled={false}

//  rating highlight only selected => highlightSelectedOnly={false}
//
