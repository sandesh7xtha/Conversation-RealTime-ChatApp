// Navbar.js

import React from "react";
import * as n from "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

export const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const closeOpenlist = () => {
    dispatch({ type: "SET_FRNLIST", payload: 3 });
  };

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    navigate("/LoginPage");
    window.location.reload(false);
  };

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const type = localStorage.getItem("type");

  return (
    <div>
      <n.Main>
        <n.Root>
          <n.NavMenu>
            <Button
              style={{
                borderColor: "white",
                borderWidth: "0.1rem",
                borderRadius: "0.4rem",
                borderStyle: "solid",
                color: "white",
                transition: "background-color 0.3s",
                backgroundColor: "transparent",
              }}
              onClick={closeOpenlist}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              lll
            </Button>
            &nbsp;
            <Link style={{ textDecoration: "none" }} to="/">
              <p>Conversation</p>
            </Link>
            {!token ? (
              <Link style={{ textDecoration: "none" }} to="/LoginPage">
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    borderStyle: "solid",
                    borderRadius: "0.4rem",
                    marginRight: "2rem",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                &nbsp;
                <Button
                  style={{
                    borderColor: "white",
                    borderWidth: "0.1rem",
                    borderRadius: "0.4rem",
                    borderStyle: "solid",
                    color: "white",
                    transition: "background-color 0.3s",
                    backgroundColor: "transparent",
                  }}
                  onClick={logout}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "white";
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </n.NavMenu>
        </n.Root>
      </n.Main>
    </div>
  );
};
