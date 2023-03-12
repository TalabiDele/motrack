import styled from "styled-components";
import img from "../imgs/mapbg.png";

export const Container = styled.div`
  background-image: url(${img});
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  div.container {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    margin: auto;
    height: 100vh;

    h1 {
      font-size: 62px;
      color: #2b478b;
    }

    span {
      color: #ed7d2b;
    }

    p {
      color: #2b478b;
      line-height: 1.5;
      width: 50%;
      margin: 1rem 0rem;
      font-size: 14px;
    }

    button {
      border: 2px solid #2b478b;
      color: #eef6ff;
      background: #2b478b;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background: none;
        color: #2b478b;
      }
    }
  }

  .image {
    object-fit: cover;
  }
`;
