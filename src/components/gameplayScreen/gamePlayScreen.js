import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import * as handAction from "../../lotties-data/hand-action.json";
import * as SixData from "../../lotties-data/six-data.json";
import * as FourData from "../../lotties-data/four-data.json";
import * as BatBallData from "../../lotties-data/bat-ball.json";

import Swal from "sweetalert2";
import Axios from "axios";

import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Dna } from  'react-loader-spinner';

const Wrapper = styled.div`
  /* @import url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap'); */
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 0.5fr 2fr 0.1fr 0.5fr 0.5fr;
  /* grid-gap: 10fr; */
  /* font-family: 'Unbounded', cursive; */
  background-image: url(https://wallpaperaccess.com/full/1489187.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  background-color: #00FF00 ;

  /* @media (max-width: 1000px) {
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 0.25fr 1fr .25fr 0.25fr;
    height: 50vh;
    width: 50vw;
  } */
`;

// PLAYER_NAME BOX
const Box1 = styled.div`
  background-color: aliceblue;
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  font-size: xx-large;
  /* text-shadow: 2px 2px blue; */
  display: flex;
  flex-wrap: wrap;
`;

// OPPNENT_NAME BOX
const Box2 = styled.div`
  /* background-color: bisque; */
  grid-column-start: 3;
  grid-column-end: 4;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  font-size: xx-large;
  /* color: violet; */
`;

// SCORE_BOARD BOX 
const Box10 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  grid-column-start: 2;
  grid-row-start: 1;
  /* background-color: aqua; */
  justify-content: space-between;
  flex-wrap: wrap;
`

// SCORE BOARD ANIMATION
const ScoreBoardAnimation = keyframes`
  0% {
    box-shadow: 2px 2px 3px 2px blueviolet
  }
  100% {
    box-shadow: 2px 2px 3px 2px violet
  }
`

// SCORE BOARD DIV
const PlayerScoreDiv = styled.div`
  padding-top: 15px;
  width: 200px;
  /* height: 15px; */
  background-color: white;
  text-align: center;
  /* text-shadow: 2px 2px black; */
  animation: ${ScoreBoardAnimation} 1s linear infinite;
`

// ACTION NUMBER DIV
const NumberActionDiv = styled.div`
  font-size: 200px;
  color: white;
  text-shadow: -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 10px 2.5px 0 blueviolet;
  @media (max-width: 500px) {
    font-size: 100px;
  }
`;

// PLAYER PROFILE ANIMATION
const PlayerProfileAnimation = keyframes`
  0% {
    box-shadow: 2px -2px 2px -2px #0ff
  }
  100% {
    box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;
    /* box-shadow: 5px -5px 5px -5px greenyellow */
  }
`;

// PLAYER PROFILE BOX
const Box3 = styled.div`
  margin: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  animation: ${PlayerProfileAnimation} 1s linear infinite;
`;

// OPPNENT PROFILE BOX
const Box5 = styled.div`
  margin: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  animation: ${PlayerProfileAnimation} 1s linear infinite;
  /* background-color: rgb(207, 133, 41); */
`;

// PROFILE DIV
const ProfileImgDiv = styled.img`
  box-shadow: 0 0 100px black;
  width: 200px;

  @media (max-width: 679px) {
    width: 75px;
    box-shadow: 0 0 10px black;
    /* text-align: center;
    padding: 10px 15px; */
  }
`;

// PLAYER NAME DIV
const PlayerNameDiv = styled.div`
  /* color: #ffff00; yellow color */
  font-size: 25px;
  color: white;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
`;

// HAND ANIMATION BOX
const Box7 = styled.div`
  /* background-color: bisque; */
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-column-start: 2;
  grid-row-start: 3;
`;

// 6 & 4 ANIMATION BOX
const Box8 = styled.div`
  margin: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  box-shadow: 2px 2px 4px 2px #0ff;
  flex-wrap: wrap;
  grid-column-start: 3;
  grid-row-start: 3;
`;

// 6 & 4 ANIMATION DIV
const ScreenDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  height: 250px;

  @media (max-width: 545px) {
    width: 100px;
    height: 100px;
  }
`;

// BOX TO SHOW PLAYER ACTION
const Box4 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); */
  border: 25px;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
`;

// CANCEL BUTTON BOX
const Box6 = styled.div`
  display: flex;
  justify-content: center;
  /* border-color: black; */
  grid-column-start: 2;
  grid-row-start: 5;
`;

// BUTTON BOX
const Box9 = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-column-start: 2;
  grid-column-end: 3;

  @media (max-width: 545px) {
    width: 50%;
    height: 50%;
  }
`;

const Button = styled.button`
  width: 130px;
  height: 50px;
  background-color: white; /* Green background */
  border: none; /* Remove border */
  color: black; /* White text */
  padding: 15px 32px; /* Add padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline */
  font-size: 16px; /* Set font size */
  margin: 4px 2px; /* Add margin */
  border-radius: 50px; /* Round the corners */
  box-shadow: 2px 2px 4px 2px violet;

  @media (max-width: 1080px) {
    width: 75px;
    text-align: center;
    padding: 10px 15px;
  }
`;

// NOT IN USE
const HandAnimation = keyframes`
from {
  transform: scale(0);
}
to {
  transform: scale(1);
}`;

// NOT IN USE
const ActionArea = styled.div`
  display: flex;
  width: 400px;
  height: 300px;
  background-color: blueviolet;
  align-items: center;
  justify-content: center;
  animation-name: ${HandAnimation};
  animation-duration: 2s;
  /* animation-iteration-count: infinite; */
`;


const GamePlayScreen = () => {
  const userNavigateHook = useNavigate();

  const [score, setScore] = useState({ player_score: 0, opponent_score: 0 });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [sixOrFour, setSixOrFour] = useState({ state: 0, data: 0 });
  const [playersData, setPlayersData] = useState({
    player_run: 0,
    opponent_run: 0,
    target: 0,
    is_player_batting: 1,
    is_opponent_batting: 0,
    is_player_bowling: 0,
    is_opponent_bowling: 1,
    player_batted: 0,
    opponent_batted: 0,
    player_bowled: 0,
    opponent_bowled: 0,
  });

  useEffect(() => {
    setLoading(true);
    const res = decodeToken(localStorage.getItem("access_token"));
    Axios.get(
      `https://ultimate-cricket.onrender.com/user/detail?email=${res.email}`
    ).then((res) => {
      setLoading(false);
      setUser({
        email: res.data.response_data.user.email,
        profile: res.data.response_data.user.profile,
        name: res.data.response_data.user.name,
      });
    });
  }, []);

  const updateMatchData = (isWin) => {
    setLoading(true);
    Axios.post("https://ultimate-cricket.onrender.com/user/update", {
      email: user.email,
      is_win: isWin,
      score: score.player_score,
    }).then((res) => {
      setLoading(false);
      let result = res.data;
      console.log(result);
    });
  };

  const updateScore = (e) => {
    const run = [1, 2, 3, 4, 5, 6, 0];
    const randSelect = run[Math.floor(Math.random() * run.length)];
  
    const endStats = (winner) => {
      Swal.fire({
        title: winner,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Play Again",
        denyButtonText: `Back`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          userNavigateHook("/home", { state: { data: { email: user.email } } });
        }
      });
    };
    
    // OPPONENT ACTION
    if (playersData.is_opponent_batting === 1) {
      if (randSelect === Number(e.target.value)) {
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);
        setPlayersData({
          player_run: score.player_score,
          opponent_run: score.opponent_score,
          target: playersData.target,
          is_player_batting: 0,
          is_opponent_batting: 1,
          is_player_bowling: 1,
          is_opponent_bowling: 0,
          player_batted: 1,
          opponent_batted: 1,
          player_bowled: 1,
          opponent_bowled: 1,
        });

        if (score.opponent_score >= playersData.target) {
          updateMatchData(0);
          endStats(`OPPONENT IS THE WINNER`);
        }
        if (score.opponent_score < playersData.target) {
          updateMatchData(1);
          endStats(`PLAYER IS THE WINNER`);
        }
        if (score.opponent_score === score.player_score) {
          endStats(`MATCH IS DREW`);
        }
      } else {
        
        console.log(score, 'not out');
        // score.opponent_score >= playersData.target ? setPlayersData({...playersData,  opponent_batted: 1 }) : setPlayersData({...playersData});
        if (score.opponent_score + randSelect >= playersData.target ) {
          updateMatchData(0);
          endStats(`OPPONENT IS THE WINNER`);
        }
        
        if ([4, 6].includes(Number(e.target.value))) {
          setSixOrFour({ state: 1, data: Number(e.target.value) });
        } else {
          setSixOrFour({ state: 0, data: 0 });
        }
        setScore({
          opponent_score: score.opponent_score + randSelect,
          player_score: score.player_score,
        });
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);
      }
    }

    // PLAYER ACTION
    if (playersData.is_player_batting === 1) {
      if (randSelect === Number(e.target.value)) {
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);

        setPlayersData({
          player_run: score.player_score,
          opponent_run: score.opponent_score,
          target: score.player_score + 1,
          is_player_batting: 0,
          is_opponent_batting: 1,
          is_player_bowling: 1,
          is_opponent_bowling: 0,
          player_batted: 1,
          opponent_batted: 0,
          player_bowled: 0,
          opponent_bowled: 1,
        });

        Swal.fire(`Player score ${score.player_score} now opponent batting target is ${score.player_score + 1}`);
      } else {
        if ([4, 6].includes(Number(e.target.value))) {
          setSixOrFour({ state: 1, data: Number(e.target.value) });
        } else {
          setSixOrFour({ state: 0, data: 0 });
        }

        setScore({
          player_score: score.player_score + Number(e.target.value),
          opponent_score: score.opponent_score,
        });
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);
      }
    }
  };

  return (
    <Wrapper>
    { loading ? <Box7> <Dna visible={true} height="80" color="#4fa94d" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/> </Box7> : <>

      {/* <Box1>
        <PlayerNameDiv>{user.name} </PlayerNameDiv>
      </Box1> */}

      <Box2></Box2>

      <Box3>
        <ProfileImgDiv src={`images/${user.profile}.png`} /><PlayerNameDiv>{user.name} </PlayerNameDiv>
      </Box3>

      <Box4>
        <NumberActionDiv>{numberOne}</NumberActionDiv>
        <NumberActionDiv>{numberTwo}</NumberActionDiv>
        {/* <ActionArea><ActionImage src={`images/${numberOne}.jpg`} /></ActionArea> */}
        {/* <ActionArea><ActionImage src={`images/${numberTwo}.jpg`} /></ActionArea> */}
      </Box4>

      <Box5>
        <PlayerNameDiv>OPPONENT</PlayerNameDiv><ProfileImgDiv src="images/11.png" />
      </Box5>

      {/* <Box6>
        <ScoreBoardDiv>
          PLAYER_SCORE: {score.player_score} OPPONENT_SCORE:{" "}
          {score.opponent_score}
        </ScoreBoardDiv>
      </Box6> */}

      <Box7>
        <Lottie animationData={handAction} loop={true} />
      </Box7>

      <Box8>
        <ScreenDiv>
          {sixOrFour.state === 1 ? ( sixOrFour.data === 6 ? ( <Lottie animationData={SixData} loop={true} height={4000} width={40} />) : ( <Lottie animationData={FourData} loop={true} height={4000} width={40} />)
          ) : (
            <Lottie
              animationData={BatBallData}
              loop={true}
              height={4000}
              width={40}
            />
          )}
        </ScreenDiv>
      </Box8>

      <Box9>
        <Button value="1" onClick={updateScore}> 1 </Button>
        <Button value="2" onClick={updateScore}> 2 </Button>
        <Button value="3" onClick={updateScore}> 3 </Button>
        <Button value="4" onClick={updateScore}> 4 </Button>
        <Button value="5" onClick={updateScore}> 5 </Button>
        <Button value="6" onClick={updateScore}> 6 </Button>
        <Button value="0" onClick={updateScore}> 0 </Button>
      </Box9>

      <Box10>
        <PlayerScoreDiv>PLAYER SCORE = {score.player_score}</PlayerScoreDiv>
        <PlayerScoreDiv>TARGET = {playersData.target}</PlayerScoreDiv>
        <PlayerScoreDiv>OPPONENT SCORE = {score.opponent_score}</PlayerScoreDiv>
      </Box10>

      <Box6>
        <Button onClick={() => { userNavigateHook("/home") }}> CANCEL </Button>
      </Box6>
      </>
    }
    </Wrapper>
  );
};

export default GamePlayScreen;
