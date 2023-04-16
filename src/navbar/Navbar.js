import React, { useState } from "react";
import * as n from "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Navbar = () => {
  const navigate = useNavigate();

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
            <Link style={{ textDecoration: "none" }} to="/">
              <p style={{ fontSize: "20px" }}>Conversation</p>
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
                <div
                  style={{
                    padding: "20px",
                    fontSize: "20px",
                    color: "white",
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
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
