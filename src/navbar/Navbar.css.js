import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1b1b1b;
  width: 100%;
  // height: 80px;
  // position: fixed;
  top: 0;
  left: 0;
`;

export const Root = styled.div`
  // display: flex;
  // justify-content: flex-end;
  align-items: center;
  width: 90%;
  // max-width: 1200px;
  height: 100%;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  @media (max-width: 767px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  p {
    margin: 0 1rem;
    font-size: 1.2rem;
    color: white;
    font-family: "Comic Sans MS", cursive, sans-serif;

    @media (max-width: 767px) {
      font-size: 1rem;
      margin: 0;
      text-align: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  div {
    padding: 20px;
    font-size: 20px;
    color: white;
    font-family: "Comic Sans MS", cursive, sans-serif;

    @media (max-width: 767px) {
      font-size: 1rem;
      padding: 10px;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  button {
    margin-right: 1rem;
    font-size: 1rem;

    @media (max-width: 767px) {
      margin-right: 0;
      margin-bottom: 0.5rem;
      width: 100%;
      font-size: 0.5rem;
    }
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: white;
    }
  }
`;
