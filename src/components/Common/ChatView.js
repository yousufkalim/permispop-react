import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import ChatAvatar from "./BasicAvatar";
import { ReactComponent as SingleTick } from "../../assets/images/SingleTick.svg";
import { ReactComponent as DoubleTick } from "../../assets/images/DoubleTick.svg";
import SendVector from "../../assets/images/SendVector.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import NoMessage from "./NoMessage.js";
import Fab from "@mui/material/Fab";
import { IconButton } from "@mui/material";
import { ReactComponent as Block } from "../../assets/images/Block.svg";

const ChatView = (props) => {
  const { i18n, t } = useTranslation();
  const [block, setBlock] = useState();
  useEffect(() => {
    setBlock(props.selectedChat.block);
  }, [props.selectedChat]);
  const handleBlockClick = () => {
    setBlock(!block);
    props.HandleBlockInstructor(props.selectedChat, !block);
  };
  return (
    <>
      {Object.keys(props?.selectedChat).length !== 0 ? (
        <Grid
          xs={10}
          sm={10}
          md={10}
          lg={6}
          sx={{
            backgroundColor: "white",
            marginLeft: "15px",
            padding: "30px",
            height: "fit-content",
            marginTop: "20px",
            borderRadius: "10px",
            display: props.filteredUserData.length === 0 ? "none" : "",
          }}
        >
          <div className="ChatBoxHeader">
            <div className="ChatBoxAvatar">
              <ChatAvatar
                className="AvatarClass"
                sx={{ marginTop: "20px" }}
                src={block === false && props.selectedChat.profile_photo}
                showActiveStatus={block === false && true}
                online={props.selectedChat.isOnline}
              />
              <div>
                <Typography
                  sx={{
                    marginTop: "10px",
                    paddingLeft: "10px",
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHight: "34px",
                    color: "#2A3235",
                  }}
                >
                  {props.selectedChat ? props.selectedChat.chatroom_label : ""}
                </Typography>
                <Typography
                  sx={{
                    paddingLeft: "12px",
                    fontFamily: "Inter",
                    fontStyle: " normal",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHight: "15px",
                    color: "#149E7A",
                  }}
                >
                  {block === false
                    ? props.selectedChat.isOnline === false
                      ? props.LastOnline !== "Invalid date"
                        ? `Last seen at ${props.LastOnline}`
                        : "N/A"
                      : props.selectedChat.isOnline === true
                      ? "Online"
                      : `Last seen at ${props.LastOnline}`
                    : ""}
                </Typography>
              </div>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  handleBlockClick();
                }}
              >
                <Block />
              </IconButton>
              {/* <button
                type="submit"
                className="ChatButton"
                style={{
                  backgroundColor: "#FFA333",
                }}
                onClick={() => {
                  handleBlockClick();
                }}
              >
                {block === true ? "Un-Block" : "Block"}
              </button> */}
              <button
                type="submit"
                className="ChatButton"
                style={{
                  backgroundColor: props.selectedChat.block === false ? "#FFA333" : "gray",
                  marginLeft: 5,
                }}
                disabled={props.selectedChat.block}
                onClick={() => props.HandleInstructorBooking(props.selectedChat)}
              >
                {t("Book Me")}
              </button>
            </div>
          </div>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <div className="ChatboxScroller">
            {props.chatMessages.map((item, index) => {
              // console.log("chatMessages", props.chatMessages);
              return item.reciever === props.user.id ? (
                <div className="ChatReceived">
                  <div className="AvatarClass">
                    <ChatAvatar
                      className="AvatarClass"
                      src={block === false && props.selectedChat.profile_photo}
                      showActiveStatus={false}
                    />
                  </div>
                  <div className="ReceivedText">
                    <div className="ReceivedDots">
                      <Typography
                        sx={{
                          wordBreak: "break-all",
                          padding: "18px",
                          margin: "4px",
                          fontFamily: "Inter",
                          width: "fit-content",
                          borderRadius: "0px 10px 10px 10px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHight: "15px",
                          color: "#EAFFEB",
                          backgroundColor: "#149E7A",
                        }}
                      >
                        {item.message}
                      </Typography>
                    </div>
                  </div>
                </div>
              ) : item.sender === props.user.id ? (
                <div className="SentDiv">
                  <div id={props.chatMessages.length === index + 1 ? "lastMsg" : ""} className="SentText">
                    <Typography
                      sx={{
                        padding: "15px",
                        marginBottom: "4px",
                        fontFamily: "Inter",
                        maxWidth: "fit-content",
                        border: "1px solid #F0F0F0",
                        borderRadius: "10px 10px 0px 10px",
                        fontStyle: " normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHight: "15px",
                        color: "#2A3235",
                      }}
                    >
                      {item.message}
                    </Typography>
                    {item.readMsg === "Delivered" ? (
                      <DoubleTick style={{ color: "#d2d7d9", margin: "7px" }} />
                    ) : item.readMsg === "Seen" ? (
                      <DoubleTick style={{ color: "#79d8f2", margin: "7px" }} />
                    ) : (
                      <SingleTick style={{ color: "#d2d7d9", margin: "7px" }} />
                    )}
                  </div>
                </div>
              ) : (
                ""
              );
            })}
            {block === true ? (
              props.selectedChat.blockBy !== props.user.id ? (
                <h4 style={{ textAlign: "center", color: "red" }}>You have been Blocked</h4>
              ) : (
                <h4 style={{ textAlign: "center", color: "red" }}>You Blocked this user</h4>
              )
            ) : (
              ""
            )}
            <div ref={props.messagesEndRef} />
          </div>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" className="MessageDivider" />

          <div className="MessageDiv">
            <div className="MessageText">
              <input
                disabled={block}
                placeholder={t("Type a message here")}
                className="ChatBoxTypingField"
                value={props.message}
                onChange={(e) => {
                  props.setMessage(e.target.value);
                }}
                onKeyPress={props.handleKeypress}
              />
            </div>
            <div className="MessageRight">
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                sx={{ margin: "10px" }}
                onClick={props.onClick}
                disabled={block}
              >
                <img src={SendVector} />
              </Fab>
            </div>
          </div>
        </Grid>
      ) : (
        <Grid
          xs={10}
          sm={10}
          md={10}
          lg={6}
          sx={{
            marginLeft: "15px",
            padding: "30px",
            height: "fit-content",
            marginTop: "15%",
          }}
        >
          <NoMessage msgText={"No Chat Selected"} />
        </Grid>
      )}
    </>
  );
};

export default ChatView;
