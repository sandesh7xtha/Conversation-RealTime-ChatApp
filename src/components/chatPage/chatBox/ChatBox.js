import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChatInput } from "./chatInput/ChatInput";
import {
  recieveMessageRoute,
  sendMessageRoute,
} from "../../../utils/APIRoutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ChatBox = ({ selectFriendList, LoggedINUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const isMobile = useMediaQuery("(max-width:767px)");
  const dispatch = useDispatch();

  const getMessagesFromDB = () => {
    axios
      .post(recieveMessageRoute, {
        from: LoggedINUser,
        to: selectFriendList.id,
      })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to fetch messages from server");
      });
  };

  useEffect(() => {
    if (selectFriendList) {
      getMessagesFromDB();
    }
  }, [selectFriendList]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: LoggedINUser,
      to: selectFriendList.id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: selectFriendList.id,
      from: LoggedINUser,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMenuClick = () => {
    dispatch({ type: "SCROLL_UP", scrollValue: true });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ChatContainer>
      <Header>
        <ProfilePic
          src="https://via.placeholder.com/50"
          alt="Profile picture"
        />
        <UserName>
          {selectFriendList.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </UserName>
        {isMobile && <ArrowIcon onClick={handleMenuClick} />}
      </Header>

      <ChatMessages>
        {messages.map((message) => {
          return message.fromSelf ? (
            <OutgoingMessage ref={scrollRef} key={uuidv4()}>
              <MessageText>{message.message}</MessageText>{" "}
              <FriendProfilePic
                src="https://via.placeholder.com/50"
                alt="Friend profile picture"
              />
            </OutgoingMessage>
          ) : (
            <IncomingMessage ref={scrollRef} key={uuidv4()}>
              <FriendProfilePic
                src="https://via.placeholder.com/50"
                alt="Friend profile picture"
              />
              <MessageText>{message.message}</MessageText>
            </IncomingMessage>
          );
        })}
      </ChatMessages>

      <ChatInput handleSendMsg={handleSendMsg} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #212121;
  color: #fff;
  justify-content: space-between;
`;

const ProfilePic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserName = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const ArrowIcon = styled(KeyboardArrowUpIcon)`
  font-size: 40px;
  color: #212121;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

// const ArrowIcon = styled.div`
//   width: 0;
//   height: 0;
//   color: red;
//   border-left: 20px solid transparent;
//   border-right: 20px solid transparent;
//   border-bottom: 20px solid #fff;
//   cursor: pointer;
// `;
const ChatMessages = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
`;

const IncomingMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: flex-start;
`;

const FriendProfilePic = styled(ProfilePic)`
  margin-right: 10px;
  margin-left: 10px;
`;

const OutgoingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const MessageText = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #f3f3f3;
`;
