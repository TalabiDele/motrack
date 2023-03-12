import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";
import illustration from "../imgs/illustration.png";

const Hero = () => {
  return (
    <Container>
      <div className="container">
        <div className="text">
          <h1>
            Track <span>Easily</span>
          </h1>
          <p>
            An application for tracking family, friends and mobile devices with
            just a few easy steps. Know the real-time location of loved ones and
            find your lost devices.
          </p>
          <Link href="/signup">
            <button>Get Started</button>
          </Link>
        </div>
        <div className="image">
          <img src={illustration} alt="Illustration" width={1000} />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
