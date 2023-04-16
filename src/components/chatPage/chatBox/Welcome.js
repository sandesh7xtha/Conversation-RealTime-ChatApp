import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tgkk from "../../../assets/Tgkk.gif";
import DMQDi from "../../../assets/DMQDi.gif";
import robot from "../../../assets/robot.gif";
import GZA from "../../../assets/4GZA.gif";
import DMa from "../../../assets/DMa.gif";
import WUUT from "../../../assets/WUUT.gif";

export default function Welcome() {
  const userName = localStorage.getItem("name");

  const images = [Tgkk, DMQDi, robot, GZA, DMa, WUUT];
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  return (
    <Container>
      <img src={randomImage} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
