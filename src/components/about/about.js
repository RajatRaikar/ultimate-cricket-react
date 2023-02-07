import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: "Itim", cursive;

  background-image: url(images/cricket.jpg);
  background-position: center;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const ButtonDiv = styled.div`
  grid-column-start: 2;
  grid-row-start: 3;
  display: flex;
  justify-content: center;
`;

const HeadDiv = styled.h1`
  color: white;
  grid-column-start: 2;
  grid-row-start: 1;
  margin-top: 50%;
  text-align: center;
`;

const SectionDiv = styled.section`
  grid-column-start: 2;
  grid-row-start: 2;
  align-content: center;
  text-align: center;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  background-color: #4CAF50; /* Green background */
  border: none; /* Remove border */
  color: white; /* White text */
  padding: 10px 30px; /* Add padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline */
  font-size: 16px; /* Set font size */
  margin: 4px 2px; /* Add margin */
  border-radius: 50px; /* Round the corners */
`

const About = () => {
  const userNavigateHook = useNavigate();
  return (
    <>
      <Wrapper>
        <HeadDiv>ABOUT</HeadDiv>
        <SectionDiv>
          Cricket Application - Your Ultimate Cricket Companion Welcome to the
          world of cricket! This application provides you with everything you
          need to know about the game. Download our cricket app today and join
          millions of cricket fans across the world for an exciting and
          immersive cricket experience!
        </SectionDiv>
        <ButtonDiv><Button onClick={() => { userNavigateHook('/home')}}>BACK</Button></ButtonDiv>
      </Wrapper>
    </>
  );
};

export default About;
