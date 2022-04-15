// import { TableRow } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "../../../../components/Common/Divider";
import ChatAvatar from "../../../../components/Common/BasicAvatar";
import { ReactComponent as SingleTick } from "../../../../assets/images/SingleTick.svg";
import { ReactComponent as DoubleTick } from "../../../../assets/images/DoubleTick.svg";
import Fab from "@mui/material/Fab";
import SearchIcon from "../../../../assets/images/searchIcon.png";
import SendVector from "../../../../assets/images/SendVector.png";
import API from "../../../../api/index";
import moment from "moment";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Chatlist from "../../../../components/Common/Chatlist";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const Index = (props) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState({});
  const [connection, setConnection] = useState(null);
  const latestChat = useRef(null);
  const history = useHistory();
  latestChat.current = chatMessages;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    ChatList(user);
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://160.153.244.127:9093/chatHub")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected! / above receiver");
          connection.on("ReceiveMessage", (message, chat) => {
            const updatedChat = [...latestChat.current];
            console.log("message", chatMessages);
            console.log("chat", chat);
            updatedChat.push(message);
            setChatMessages(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const ChatList = async (user) => {
    await API("get", `Chat/GetChatList/?id=${user.id}`).then(
      (GetChatListResponse) => {
        let array = [];
        GetChatListResponse.data.data.map((item) => {
          let A = JSON.parse(item.userA);
          let B = JSON.parse(item.userB);
          if (A.id === user.id) {
            array.push({
              chatroom_id: item.id,
              chatroom_label: `${B.firstName} ${B.surName}`,
              user_role: B.role,
              reciever: B.id,
              isOnline: B.isOnline,
              lastSeen: B.lastSeen,
              block: item.block,
              blockBy: item.blockBy,
              last_activeTime: B.lastActiveTime,
              profile_photo: B.photo,
              lastMessage: item.lastMessage,
            });
          } else if (B.id === user.id) {
            array.push({
              chatroom_id: item.id,
              chatroom_label: `${A.firstName} ${A.surName}`,
              user_role: A.role,
              reciever: A.id,
              isOnline: A.isOnline,
              lastSeen: A.lastSeen,
              block: item.block,
              blockBy: item.blockBy,
              last_activeTime: A.lastActiveTime,
              profile_photo: A.photo,
              lastMessage: item.lastMessage,
            });
          }
        });
        setUserData(array);
        setFilteredUserData(array);
      }
    );
  };
  // get Messages api
  const GetMessages = async (item) => {
    setSelectedChat(item);
    await API("get", `Chat/GetMessages/?chatId=${item.chatroom_id}`).then(
      (GetMessagesResponse) => {
        let chatArray = [];
        GetMessagesResponse.data.data.messages.map((item) => {
          let msg = JSON.parse(item);
          chatArray.push({
            sender: msg.sender,
            reciever: msg.reciever,
            message: msg.message,
            timeStamp: msg.timeStamp,
            readMsg: msg.readMsg,
            id: msg.id,
          });
        });
        setChatMessages(chatArray);
      }
    );
  };
  // sending message method
  const sendMessage = async (message) => {
    const info = {
      Sender: user.id,
      Reciever: selectedChat.reciever,
      message: message,
    };
    if (connection._connectionStarted) {
      console.log("hit", info);
      try {
        await connection.send("SendMessage", info, info);
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("No connection to server yet.");
    }
  };
  // onSend click trigers the send message method
  const onClick = () => {
    sendMessage(message);
    setMessage("");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      let temp = [];
      filteredUserData.map((item) => {
        let name = item.chatroom_label.toLowerCase();
        let value = e.target.value.toLowerCase();
        let existingValue = name.indexOf(value);
        if (existingValue > -1) {
          temp.push(item);
        }
      });
      setFilteredUserData(temp);
    } else {
      setFilteredUserData(userData);
    }
  };
  const LastOnline = moment(selectedChat.lastSeen).format("hh:mm / DD-MM-YYYY");
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ block: "end" });
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <>
      <div>
        <Grid container spacing={1} sx={{ margin: "10px 30px" }}>
          <Grid xs={10.5} sm={10.5} md={10.5} lg={4.5}>
            <div className="ChatList">
              <div>
                <Typography className="ChatHeading">Chats</Typography>
                <div className="ChatListVector">
                  <Typography className="ChatVector">Recent chat</Typography>
                </div>
              </div>
            </div>

            <div className="SearchDiv">
              <div className="SearchText">
                <img src={SearchIcon} />
                <input
                  placeholder="Search"
                  className="SearchBoxTypingField"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="ListScroller">
              {filteredUserData.map((item) => {
                return <Chatlist item={item} GetMessages={GetMessages} />;
              })}
            </div>
          </Grid>
          <div style={{ width: "20px" }}></div>
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
            }}
          >
            <div className="ChatBoxHeader">
              <div className="ChatBoxAvatar">
                <ChatAvatar
                  className="AvatarClass"
                  sx={{ marginTop: "20px" }}
                  src={selectedChat.profile_photo}
                  showActiveStatus={true}
                  online={selectedChat.isOnline}
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
                    {selectedChat ? selectedChat.chatroom_label : ""}
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
                    {selectedChat.isOnline === false
                      ? LastOnline !== "Invalid date"
                        ? `Last seen at ${LastOnline}`
                        : "N/A"
                      : selectedChat.isOnline === true
                      ? "Online"
                      : `Last seen at ${LastOnline}`}
                  </Typography>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="ChatButton"
                  style={{ backgroundColor: "#FFA333" }}
                  onClick={() => history.push("/student/booking")}
                >
                  Book Me
                </button>
              </div>
            </div>
            <Divider
              width="100%"
              borderColor="#D5E4E8"
              margin="2% 0px 2% 0px"
            />
            <div className="ChatboxScroller">
              {chatMessages.map((item, index) => {
                return item.reciever === user.id ? (
                  <div className="ChatReceived">
                    <div className="AvatarClass">
                      <ChatAvatar
                        className="AvatarClass"
                        src={selectedChat.profile_photo}
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
                ) : item.sender === user.id ? (
                  <div className="SentDiv">
                    <div
                      id={chatMessages.length === index + 1 ? "lastMsg" : ""}
                      className="SentText"
                    >
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
                        <DoubleTick
                          style={{ color: "#d2d7d9", margin: "7px" }}
                        />
                      ) : item.readMsg === "Seen" ? (
                        <DoubleTick
                          style={{ color: "#79d8f2", margin: "7px" }}
                        />
                      ) : (
                        <SingleTick
                          style={{ color: "#d2d7d9", margin: "7px" }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <Divider
              width="100%"
              borderColor="#D5E4E8"
              margin="2% 0px 2% 0px"
              className="MessageDivider"
            />

            <div className="MessageDiv">
              <div className="MessageText">
                <input
                  placeholder="Type a message here"
                  className="ChatBoxTypingField"
                  value={message}
                  onKeyPress={handleKeypress}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              <div className="MessageRight" onClick={onClick}>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  sx={{ margin: "10px" }}
                >
                  <img src={SendVector} />
                </Fab>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Index;
