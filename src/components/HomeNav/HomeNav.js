import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";
import logo from "../imgs/motrackLogo.png";

const HomeNav = () => {
  return (
    <Container>
      <div className="absolute top-0 left-0 right-0 bottom-0 grid justify-items-center">
        <Link href="/" className="">
          <img src={logo} alt="logo" width={100} className=" mt-[2rem]" />
        </Link>
      </div>
    </Container>
  );
};

export default HomeNav;
