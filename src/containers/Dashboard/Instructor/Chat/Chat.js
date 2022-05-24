// import { TableRow } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchIcon from "../../../../assets/images/searchIcon.png";
import API from "../../../../api/index";
import moment from "moment";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Chatlist from "../../../../components/Common/Chatlist";
import { chatUrl } from "../../../../config";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NoMessage from "../../../../components/Common/NoMessage.js";
import ChatView from "../../../../components/Common/ChatView";

const user = JSON.parse(localStorage.getItem("user"));
const Index = (props) => {
  const { i18n, t } = useTranslation();
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
  const [chatroomId, setChatroomId] = useState("");

  useEffect(() => {
    ChatList(user);
    if (chatroomId) {
      let SelectedChatroom = filteredUserData.find((item) => {
        if (item?.chatroom_id === JSON.parse(chatroomId)) {
          return item;
        }
      });
      GetMessages(SelectedChatroom);
      localStorage.removeItem("ChatroomId");
    }
  }, [chatroomId]);

  useEffect(() => {
    ChatList(user);
    const newConnection = new HubConnectionBuilder().withUrl(`${chatUrl}/chathub`).withAutomaticReconnect().build();
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
    await API("get", `Chat/GetChatList/?id=${user?.id}`).then((GetChatListResponse) => {
      let array = [];
      GetChatListResponse.data.data.map((item) => {
        let A = JSON.parse(item?.userA);
        let B = JSON.parse(item?.userB);
        if (A?.id != null && B?.id != null) {
          if (A?.id === user.id) {
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
          } else if (B?.id === user.id) {
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
        }
      });
      setUserData(array);
      setFilteredUserData(array);
      setChatroomId(localStorage.getItem("ChatroomId"));
    });
  };
  // get Messages api
  const GetMessages = async (item) => {
    setSelectedChat(item);
    await API("get", `Chat/GetMessages/?chatId=${item.chatroom_id}`).then((GetMessagesResponse) => {
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
    });
  };
  // checking user is online or not
  if (connection) {
    connection.on("checkIsOnline", (userId, isOnline, lastSeen, status) => {
      console.log("user is online now", userId, isOnline, lastSeen, status);
      let index = filteredUserData.findIndex((x) => x.reciever === userId);
      console.log(index, "index", filteredUserData[index]);
      if (index != -1) {
        setFilteredUserData((prev) => {
          prev[index].isOnline = isOnline;
          return [...prev];
        });
      }

      // var item = filteredUserData.find(
      //   (item) => userId === item.reciever
      // ).chatroom_id;
      // API("get", `Chat/GetMessages/?chatId=${item}`).then(
      //   (GetMessagesResponse) => {
      //     let chatArray = [];
      //     GetMessagesResponse.data.data.messages.map((item) => {
      //       let msg = JSON.parse(item);
      //       chatArray.push({
      //         sender: msg.sender,
      //         reciever: msg.reciever,
      //         message: msg.message,
      //         timeStamp: msg.timeStamp,
      //         readMsg: msg.readMsg,
      //         id: msg.id,
      //       });
      //     });
      //     setChatMessages(chatArray);
      //   }
      // );
    });
  }
  // block user
  if (connection) {
    connection.on("blockStatus", (userId, chatId, blockStatus) => {
      console.log("after block user int ", userId, chatId, blockStatus);
    });
  }
  // messaeg seen status
  if (connection) {
    connection.on("msgSeenStatus", (usrId, chatId, seen) => {
      console.log("===========>", usrId, chatId, seen);
      // selectedChat;
      // let index = filteredUserData.findIndex((x) => x.reciever === userId);
      // console.log(index, "index", filteredUserData[index]);
      // if (index != -1) {
      //   setFilteredUserData((prev) => {
      //     prev[index].isOnline = isOnline;
      //     return [...prev];
      //   });
      // }
    });
  }
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
      toast.error(t("No connection to server yet."));
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
  const LastOnline = moment(selectedChat.last_activeTime).format("hh:mm / DD-MM-YYYY");
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ block: "end" });
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter" && e.target.value === "") {
      toast.error("Cannot Send Empty Message");
    } else if (e.key === "Enter" && e.target.value !== "") {
      onClick();
    }
  };
  const HandleInstructorBooking = (selectedChat) => {
    var item = filteredUserData.find((item) => item.id === selectedChat.reciever);
    localStorage.setItem("selectedInstructor", JSON.stringify(item));
    // history.push("/Instructor/InstructorBooking");
  };
  const HandleBlockInstructor = async (selectedChat, block) => {
    if (block === true) {
      connection.send("blockUser", user.id, selectedChat.chatroom_id, block).then(() => {
        toast.success("User Blocked Successfully");
        console.log("User Blocked Successfully");
      });
    } else if (block === false) {
      connection.send("blockUser", user.id, selectedChat.chatroom_id, block).then(() => {
        toast.success("User Un-Blocked Successfully");
        console.log("User Un-Blocked Successfully");
      });
    }
  };
  return (
    <>
      <div>
        <Grid container spacing={1} sx={{ margin: "10px 30px" }}>
          <Grid xs={10.5} sm={10.5} md={10.5} lg={4.5}>
            <div className="ChatList">
              <div>
                <Typography className="ChatHeading">{t("Chats")}</Typography>
                <div className="ChatListVector">
                  <Typography className="ChatVector">{t("Recent chat")}</Typography>
                </div>
              </div>
            </div>

            <div className="SearchDiv">
              <div className="SearchText">
                <img src={SearchIcon} />
                <input placeholder={t("Search")} className="SearchBoxTypingField" value={search} onChange={handleSearch} />
              </div>
            </div>

            {filteredUserData.length !== 0 ? (
              <div className="ListScroller">
                {filteredUserData.map((item) => {
                  return <Chatlist item={item} GetMessages={GetMessages} />;
                })}
              </div>
            ) : (
              <div
                style={{
                  marginTop: "30%",
                }}
              >
                <NoMessage msgText={"No Message"} />
              </div>
            )}
          </Grid>
          <div style={{ width: "20px" }}></div>
          <ChatView
            filteredUserData={filteredUserData}
            selectedChat={selectedChat}
            LastOnline={LastOnline}
            HandleInstructorBooking={HandleInstructorBooking}
            user={user}
            chatMessages={chatMessages}
            messagesEndRef={messagesEndRef}
            HandleBlockInstructor={HandleBlockInstructor}
            message={message}
            setMessage={setMessage}
            handleKeypress={handleKeypress}
            onClick={onClick}
          />
        </Grid>
      </div>
    </>
  );
};

export default Index;
