import React from "react";
import { Container } from "./Style";
import { Link, useLocation } from "react-router-dom";
import logo from "../imgs/motrackLogo.png";

const Nav = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "login" ||
        (location.pathname !== "register" && (
          <Container>
            <div className="container">
              <Link to={"/"}>
                <img src={logo} alt="Motrack Logo" width={150} />
              </Link>
              <ul>
                <li>
                  <Link to="/login">Sign in</Link>
                </li>
                <li>
                  <Link to="/register">Sign up</Link>
                </li>
              </ul>
            </div>
          </Container>
        ))}
    </>
  );
};

export default Nav;
