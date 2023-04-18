import { ChatBox } from "./chatBox/ChatBox";
import { FriendList } from "./friendList/FriendList";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";
import Welcome from "./chatBox/Welcome";
import Radium, { StyleRoot } from "radium";
import { fadeIn } from "react-animations";

export const ChatPage = () => {
  const socket = useRef();
  const [selectFriendList, setSelectFriendList] = useState(null);
  const LoggedINUser = localStorage.getItem("id");

  // useEffect(() => {
  //   if (LoggedINUser) {
  //     socket.current = io.connect(host, { secure: true });
  //     socket.current.emit("add-user", LoggedINUser);
  //   }
  // }, [LoggedINUser]);

  useEffect(() => {
    if (LoggedINUser) {
      socket.current = io.connect(host, {
        secure: true,
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });
      socket.current.emit("add-user", LoggedINUser);
    }
  }, [LoggedINUser]);

  const getValuefromFrnList = (frnData) => {
    setSelectFriendList({ ...frnData });
  };

  const fadeInAnimation = {
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
  };

  return (
    <StyleRoot>
      <ChatPageContainer>
        <FriendListContainer style={fadeInAnimation.fadeIn}>
          <FriendList getValuefromFrnList={getValuefromFrnList} />
        </FriendListContainer>
        <ChatBoxContainer>
          {selectFriendList === null ? (
            <Welcome />
          ) : (
            <ChatBox
              selectFriendList={selectFriendList}
              LoggedINUser={LoggedINUser}
              socket={socket}
            />
          )}
        </ChatBoxContainer>
      </ChatPageContainer>
    </StyleRoot>
  );
};

const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FriendListContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 20%;
  }
`;

const ChatBoxContainer = styled.div`
  flex: 1;
`;
