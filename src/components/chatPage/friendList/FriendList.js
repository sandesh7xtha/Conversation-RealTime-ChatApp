import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { allUsersRoute, config } from "../../../utils/APIRoutes";
import axios from "axios";

export const FriendList = ({ getValuefromFrnList }) => {
  const [friendlist, setFriendlist] = useState([]);

  const getFriendlistFromDB = () => {
    axios
      .get(allUsersRoute)
      .then((res) => {
        setFriendlist(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to fetch friendlist from server");
      });
  };

  useEffect(() => {
    getFriendlistFromDB();
  }, []);

  const handleFriendClick = (frnData) => {
    getValuefromFrnList(frnData);
  };

  return (
    <FriendListSection>
      <Header>Friends</Header>
      <FriendListContener>
        {friendlist.map((friend) => (
          <FriendListItem
            // onClick={() => handleFriendClick([friend.email, friend.name])}
            onClick={() =>
              handleFriendClick({
                email: friend.email,
                name: friend.name,
                id: friend._id,
              })
            }
          >
            <FriendProfilePic
              src={"https://via.placeholder.com/50"}
              alt="Friend profile picture"
            />
            <FriendName>{friend.name}</FriendName>
          </FriendListItem>
        ))}
      </FriendListContener>
    </FriendListSection>
  );
};

const FriendListSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  padding: 1rem;
  height: 95vh;

  @media (max-width: 768px) {
    width: 100%;
    height: 90vh;
  }
`;
const FriendListContener = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
`;
const Header = styled.h2`
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: bold;
`;

const FriendListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
  }
`;

const FriendProfilePic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const FriendName = styled.h3`
  margin: 0;
`;
