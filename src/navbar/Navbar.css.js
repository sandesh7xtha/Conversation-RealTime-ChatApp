import styled from "styled-components";

export const Main = styled.div`
  // position: fixed;
  top: 0;
  width: 100%;
  z-index: 6;
`;

export const Root = styled.div`
  background-color: #010100;
  height: 9vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  justify-content: flex-end;

  @media (max-width: 425px) {
    margin-right: 0.1rem;
  }

  p {
    margin-left: 1.5rem;
    margin-right: 7.5rem;
    color: white;
    font-family: "Comic Sans MS", cursive, sans-serif;

    @media (max-width: 425px) {
      font-size: 1rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;
