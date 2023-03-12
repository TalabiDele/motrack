import styled from "styled-components";
import map from "../imgs/mapbg.png";

export const Container = styled.div`
  background: url(${map});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  color: #11142d;
  align-items: center;
  display: grid;

  div.container {
    background: #fdfdfd;
    border-radius: 10px;
    width: 30%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0rem;

    h1 {
      font-size: 32px;
      margin-bottom: 2rem;
    }

    span {
      color: rgba(0, 67, 241, 1);
    }
  }

  div.wrapper {
    width: 90%;
    margin: auto;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;

    label {
      font-size: 14px;
    }

    input.input {
      font-size: 12px;
      width: 100%;
      background: none;
      border: none;
      padding: 1rem;
      border-bottom: 1px solid #e6eaf0;
    }

    div.actions {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 2rem;
      margin-top: 1rem;
    }

    div.save {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    p {
      font-size: 14px;
    }

    button {
      width: 100%;
      border: 2px solid #ed7d2b;
      padding: 1rem 0rem;
      background: #ed7d2b;
      border-radius: 4px;
      color: #eef6ff;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #eef6ff;
        background: #2b478b;
        border: 2px solid #2b478b;
      }
    }
  }
`;
