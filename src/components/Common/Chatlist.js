import React from "react";
import Typography from "@mui/material/Typography";
import ChatAvatar from "./BasicAvatar";

const Chatlist = (props) => {
  return (
    <div className="NewMsgDiv" onClick={(e) => props.GetMessages(props.item)}>
      <div className="NewMsgHeaderDiv">
        <div className="NewMsgHeaderLeft">
          <div>
            <ChatAvatar
              showActiveStatus={true}
              online={props.item.isOnline}
              src={props.item.profile_photo}
              className="avatarBadgeclassName"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            />
          </div>
          <div>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000",
                paddingLeft: "10px",
              }}
            >
              {props.item.chatroom_label}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                color: props.item.isOnline === true ? "#149E7A" : "#B3B5C2",
                paddingLeft: "10px",
              }}
            >
              {props.item.user_role}
            </Typography>
          </div>
        </div>
        {/* <div className="NewMsgHeaderRight">
          <Typography
            className="NewMsgHeaderRightText"
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#B3B5C2",
            }}
          >
            1 minute ago
          </Typography>
        </div> */}
      </div>
      <div className="NewMsgTextDiv">
        <div className="NewMsgTextLeft">
          <Typography
            sx={{
              fontSize: "12px",
              width: "95%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: "500",
              color: "#757B80",
              paddingLeft: "10px",
            }}
          >
            {props.item.lastMessage}
          </Typography>
        </div>
        {/* {props.item.unread ? <div className="NewMsgRight" /> : ""} */}
      </div>
    </div>
  );
};

export default Chatlist;
