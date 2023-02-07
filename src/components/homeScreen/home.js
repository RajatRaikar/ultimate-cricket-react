import Lottie from "lottie-react";
import styled from "styled-components";
import * as HomeButtonOffline from "../../lotties-data/home-button-offline.json";
import * as HomeButtonOnline from "../../lotties-data/home-button-online.json";
import * as MatchSelectAnimation from "../../lotties-data/home-logo.json";

import { Link, useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 3fr 1fr;
  align-items: center;
  font-family: 'Itim', cursive;

  background-image: url(images/cricket.jpg);
  background-position: center;
  /* background-size: cover; */
  /* display: flex; 
  justify-content: space-around;
  flex-wrap: wrap; */
`;

const Box1 = styled.div`
  /* background-color: aliceblue; */
  grid-row-start: 2;
  /* grid-row-end: 4; */
  grid-column-start: 1;
  /* grid-column-end: 3; */
  
`

const Box2 = styled.div`
  /* background-color: aliceblue; */
  grid-column-start: 3;
  grid-row-start: 2;
`

const Box3 = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  justify-content: space-around;
  /* background-color: aliceblue; */
  grid-column-start: 2;
  grid-row-start: 3;
`



const Box4 = styled.div`
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap; */
  /* background-color: aliceblue; */
  grid-column-start: 2;
  grid-row-start: 2;
`

const Box5 = styled.div`
  display: flex;
  justify-content: center;
  /* flex-wrap: wrap; */
  /* background-color: aliceblue; */
  grid-column-start: 2;
  grid-row-start: 4;
`

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

const Home = () => {
  const userNavigateHook = useNavigate()

  return (
    <>
      <Wrapper>
        <Box1><Lottie animationData={HomeButtonOffline} onClick={() => { userNavigateHook('/gamePlay')} } loop={true}/></Box1>
        <Box2><Lottie animationData={HomeButtonOnline} loop={true}/></Box2>
        <Box3>
          <Button onClick={() => { userNavigateHook("/about")}}>ABOUT</Button>
          <Button>LEADER BOARD</Button>
          <Button onClick={() => { userNavigateHook("/profile")}}>PROFILE</Button>
        </Box3>
        <Box4><Lottie animationData={MatchSelectAnimation} loop={true}/></Box4>
        <Box5><Button onClick={() => { userNavigateHook("/")}}>LOGOUT</Button></Box5>
      </Wrapper>
    </>
  );
};

export default Home;
