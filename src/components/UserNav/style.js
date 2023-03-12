import styled from "styled-components";

export const Container = styled.div`
  div.container {
    /* background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0); */
    /* background: linear-gradient(to right, #8e2de2, #4a00e0); */
    /* background: #fff; */
    width: ${({ isOpen }) => (isOpen ? "30rem" : "4rem")};
    height: ${({ isOpen }) => (isOpen ? "100vh" : "4rem")};
    border-radius: ${({ isOpen }) => (isOpen ? "0rem 3rem 3rem 0rem" : "50%")};
    position: fixed;
    z-index: 100;
    top: ${({ isOpen }) => (isOpen ? "0rem" : "4rem")};
    left: ${({ isOpen }) => (isOpen ? "0rem" : "2rem")};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: all 0.1s ease-in-out;

    .icon {
      display: grid;
      background: linear-gradient(to right, #8e2de2, #4a00e0);
      align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
      justify-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
      width: ${({ isOpen }) => (isOpen ? "30rem" : "4rem")};
      height: ${({ isOpen }) => (isOpen ? "4rem" : "4rem")};
      border-radius: ${({ isOpen }) =>
        isOpen ? "0rem 3rem 3rem 0rem" : "50%"};
    }

    .cancel {
      color: ${({ isOpen }) => (isOpen ? "#8e2de2" : "#fff")};
      font-size: 30px;
      margin: ${({ isOpen }) => (isOpen ? "2rem 2rem" : "0rem")};
      background: ${({ isOpen }) => (isOpen ? "#fff" : "none")};
      transition: all 0.1s ease-in-out;
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      display: grid;
      justify-items: center;
      align-items: center;
      cursor: pointer;

      p {
        font-weight: 700;
      }
    }

    svg {
      cursor: pointer;
    }

    .nav {
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};
      z-index: 100;
    }
  }
`;
