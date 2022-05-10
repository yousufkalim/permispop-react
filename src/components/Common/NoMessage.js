import { Typography } from "@mui/material";
import React from "react";
import { ReactComponent as NoMsg } from "../../assets/images/NoMessage.svg";

const NoMessage = (props) => {
  return (
    <div className="no_message_div">
      <NoMsg className="no_message_icons" />
      <Typography variant="h4" className="no_message">
        {props.msgText}
      </Typography>
    </div>
  );
};

export default NoMessage;
