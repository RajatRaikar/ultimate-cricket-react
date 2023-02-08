import React from "react";
import Axios from 'axios';
import { Dna } from  'react-loader-spinner';

import styled, {keyframes} from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";

import Lottie from "lottie-react";
import * as CoinAnimation from "../../lotties-data/coin.json";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 12fr 12fr 12fr;
  grid-template-rows: 15fr 250fr 200fr 150fr ;
  grid-gap: 10fr;
  background-image: url(images/cricket.jpg);
  background-position: center;
  background-repeat: no-repeat;
`

const Box1 = styled.div`
  display: flex;
  /* background-color: #fff; */
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  font-size: xx-large;
  justify-content: center;
  /* color: violet; */
  /* text-shadow: 2px 2px blue; */
`
const Box2 = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: beige; */
  grid-column-start: 2;
  grid-row-start: 3;
  flex-wrap: wrap;
  gap: 10px;
`

const Box3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blanchedalmond; */
  flex-direction: column;
  grid-column-start: 3;
  grid-row-start: 3;
  flex-wrap: wrap;
  gap: 10px;
`

const Box4 = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-row-start: 4;
  flex-wrap: wrap;
  gap: 10px;
`

const Box5 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  grid-column-start: 1;
  grid-row-start: 3;
  flex-wrap: wrap;
  align-items: center;
  /* gap: 10px; */
  /* background-color: azure; */

`

const Button = styled.button`
  /* width: 100px;
  height: 50px;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer; */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    /* background-color: blue; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* color: white; */
    
`

const InputArea = styled.input`
  width: 400px;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  border: 2px solid lightgray;
  text-align: center;
`

const UpdateImage = styled.img`
  width: 210px;
  height: 65px;
`
const HeadLine = styled.h2`
  color: white;
`

const NavigateButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #4CAF50; /* Green background */
  border: none; /* Remove border */
  color: white; /* White text */
  padding: 15px 32px; /* Add padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline */
  font-size: 16px; /* Set font size */
  margin: 4px 2px; /* Add margin */
  border-radius: 50px; /* Round the corners */
`
const MatchStatsDiv = styled.div`
  background-color: aliceblue;
  width: 250px;
  height: 25px;
  border-radius: 9px;
  text-align: center;
`
const CoinValueDiv = styled.div`
  width: 200px;
  height: 75px;
  /* background-color: aliceblue; */
  text-align: center;
`

const CoinAnimationDiv = styled.div`
  width: 200px;
  height: 150px;
  /* background-color: blueviolet; */
  text-align: center;
  padding: 50px;
`

const UserProfile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  
  const userNavigateHook = useNavigate();
  useEffect(() => {
    setLoading(true);
    const res = decodeToken(localStorage.getItem('access_token'));
    console.log(res);
    Axios.get(`https://ultimate-cricket.onrender.com/user/detail?email=${res.email}`).then(res => {
      setLoading(false);
      console.log(res.data);
      setUserData({
        email: res.data.response_data.user.email,
        profile: res.data.response_data.user.profile,
        name: res.data.response_data.user.name,
        match_played: res.data.response_data.user.match_played,
        match_wins: res.data.response_data.user.match_wins,
        fifty: res.data.response_data.user.fifty,
        hundred: res.data.response_data.user.hundred,
        coin: res.data.response_data.user.coin
      })       
    })
  }, []);

  const userUpdate = () => {

  }

  return (
    <>
      <Wrapper>
        { loading ? <Box2> <Dna visible={true} height="80" color="#4fa94d" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/> </Box2> : 
        <>
          <Box1><img src={`images/${userData.profile}.png`} /></Box1>

          <Box2>
            <InputArea value={userData.name}></InputArea>
            <Button onClick={() => alert('Hi DIVYA')}><UpdateImage src="images/update-icon.png" /></Button>
          </Box2>

          <Box3>
            <HeadLine>MATCH STATS</HeadLine>
            <MatchStatsDiv>MATCH PLAYED: {userData.match_played}</MatchStatsDiv>
            <MatchStatsDiv>MATCH WIN: {userData.match_wins}</MatchStatsDiv>
            <MatchStatsDiv>WINNING PERCENTAGE:{ (userData.match_wins !== 0 ) ? Math.floor(((userData.match_wins/userData.match_played) * 100 )) : 0 } </MatchStatsDiv>
            <MatchStatsDiv>100's: {userData.fifty}</MatchStatsDiv>
            <MatchStatsDiv>50's: {userData.hundred}</MatchStatsDiv>
            <MatchStatsDiv>Coin: {userData.coin}</MatchStatsDiv>
          </Box3>

          <Box4>
            <NavigateButton onClick={() => {
              localStorage.removeItem('access_token');
              userNavigateHook('/');
            }}>LOGOUT</NavigateButton>
            <NavigateButton onClick={() => { userNavigateHook('/home')}}>BACK</NavigateButton>
          </Box4>

          {/* <Box5>
            <CoinAnimationDiv>
              <h1>{userData.coin}</h1>
              <Lottie animationData={CoinAnimation} loop={true}/>
            </CoinAnimationDiv>
          </Box5> */}
        </>
      }
      </Wrapper>
    </>
  );
};

export default UserProfile;
