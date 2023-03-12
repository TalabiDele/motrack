import React, { useContext, useState } from "react";
import { Container } from "./style";
import AuthContext from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  console.log(user);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container isOpen={isOpen}>
      <div className="container">
        <div className="icon">
          {isOpen ? (
            <div className="cancel" onClick={handleOpen}>
              <p>X</p>
            </div>
          ) : (
            <GiHamburgerMenu fontSize={30} color="#fff" onClick={handleOpen} />
          )}
        </div>
        <div className="nav">
          <a>View Members</a>
          <a>Add Members</a>
        </div>
      </div>
    </Container>
  );
};

export default UserNav;
