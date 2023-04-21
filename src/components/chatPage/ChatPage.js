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
import { useSelector } from "react-redux";
export const ChatPage = (props) => {
  const socket = useRef();
  const [selectFriendList, setSelectFriendList] = useState(null);
  const LoggedINUser = localStorage.getItem("id");

  const frnlist = useSelector((state) => state.frnlist);

  useEffect(() => {
    if (LoggedINUser) {
      socket.current = io.connect("http://localhost:3000");
      socket.current.emit("add-user", LoggedINUser);
    }
  }, [LoggedINUser]);

  const getValuefromFrnList = (frnData) => {
    setSelectFriendList({ ...frnData });
  };

  const fadeInAnimation = {
    fadeIn: {
      animation: "x 39s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
  };

  const friendListStyle = {
    ...fadeInAnimation.fadeIn,
    flex: frnlist ? "0 0 20%" : "1 1 0%",
    display: frnlist ? "block" : "none",
  };

  return (
    <StyleRoot>
      <ChatPageContainer>
        <FriendListContainer style={friendListStyle}>
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
  // height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FriendListContainer = styled.div`
  display: none;
  height: 90vh;
  // @media (min-width: 768px) {
  //   display: block;
  //   width: 20%;
  // }

  /* Mobile styles */
  @media (max-width: 767px) {
    display: block;
    // position: fixed;
    top: 4;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: 1;
    overflow-y: scroll;
  }
`;

const ChatBoxContainer = styled.div`
  flex: 1;

  /* Mobile styles */
  @media (max-width: 767px) {
    padding: 1rem;
    height: 50%;
    overflow-y: scroll;
  }
`;
