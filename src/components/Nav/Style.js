import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 2rem 0rem;
  position: absolute;

  div.container {
    display: flex;
    justify-content: space-between;
    width: 70%;
    align-items: center;
    margin: auto;

    ul {
      display: flex;
      width: 20%;
      justify-content: space-between;

      a {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: 500;
        transition: all 0.3s ease-in-out;
      }

      .signin {
        /*  */
        color: #2b478b;

        &:hover {
          color: #ed7d2b;
        }
      }

      .signup {
        color: #ed7d2b;
        border: 2px solid #ed7d2b;

        &:hover {
          background: #ed7d2b;
          color: #eef6ff;
        }
      }
    }
  }
`;
