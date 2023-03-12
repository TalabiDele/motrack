import Nav from "../components/Nav/Nav";
import Hero from "../components/Hero/Hero";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Hero />
    </Container>
  );
}

export const Container = styled.div`
  background-image: url("/mapbg.png");
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center; */
`;
