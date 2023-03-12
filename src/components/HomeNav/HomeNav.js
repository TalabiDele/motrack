import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";
import logo from "../imgs/motrackLogo.png";

const HomeNav = () => {
  return (
    <Container>
      <Link href="/">
        <img src={logo} alt="logo" width={150} />
      </Link>
    </Container>
  );
};

export default HomeNav;
