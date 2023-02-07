import React, {useState, useEffect} from "react";
import Lottie from "lottie-react";
import * as handAction from "../../lotties-data/hand-action.json";
import * as SixData from "../../lotties-data/six-data.json";
import * as FourData from "../../lotties-data/four-data.json";
import * as BatBallData from "../../lotties-data/bat-ball.json";

import Swal from 'sweetalert2'
import Axios from 'axios';


import styled, {keyframes} from 'styled-components';
import { useNavigate, useLocation} from "react-router-dom";
import { decodeToken } from "react-jwt";




const Wrapper = styled.div`

  @import url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 12fr 20fr 12fr;
  grid-template-rows: 3fr 20fr 10fr 10fr;
  grid-gap: 10fr;
  font-family: 'Unbounded', cursive;

  @media (max-width: 1080px) {
    grid-template-columns: 5fr 13fr 13fr;
    grid-template-rows: 3fr 20fr 10fr;
  }
`

const Box1 = styled.div`
  /* background-color: #fff; */
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  font-size: xx-large;
  /* color: violet; */
  /* text-shadow: 2px 2px blue; */
`

const Box2 = styled.div`
  /* background-color: bisque; */
  grid-column-start: 3;
  grid-column-end: 4;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  font-size: xx-large;
  /* color: violet; */
`

const Box3 = styled.div`
  display: flex;
  /* background-color: rgb(151, 14, 128); */
  justify-content: center;
  align-items: center;

`

const Box4 = styled.div`
  /* background-color: bisque; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  /* background-color: whitesmoke; */
  border: 25px;
  border-color: yellow;

`

const Box5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(207, 133, 41); */
`

const Box6 = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: rgb(84, 221, 30); */
  border-color: black;
`

const Box7 = styled.div`
  /* background-color: bisque; */
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Box8 = styled.div`
display: flex;
justify-content: center;
  align-content: center;
  /* background-color: rgb(84, 221, 30); */
`

const Box9 = styled.div`
/* background-color: bisque; */
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-column-start: 2;
  grid-column-end: 3;
  /* background-color: rgb(84, 221, 30); */
  /* clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); */
`

const Button = styled.button`
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
const HandAnimation = keyframes`
from {
  transform: scale(0);
}
to {
  transform: scale(1);
}`

const ActionArea= styled.div`
  display: flex;
  width: 400px;
  height: 300px;
  background-color: blueviolet;
  align-items: center;
  justify-content: center;
  animation-name: ${HandAnimation};
  animation-duration: 2s;
  /* animation-iteration-count: infinite; */
`

const ScoreBoardDiv = styled.div`
  width: 250px;
  height: 250px;
  background-color: aqua;
`

const ActionImage = styled.img`
  width: 250px;
  height: 250px;
  text-align: center;
`

const ScreenDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  height: 250px;
  /* background-color: aqua; */
`



const GamePlayScreen = () => {
  const location = useLocation();
  const userNavigateHook = useNavigate()

  const [score, setScore] = useState({player_score: 0, opponent_score: 0});

  const [user, setUser] = useState({});
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [sixOrFour, setSixOrFour] = useState({state: 0, data: 0});
  const [playersData, setPlayersData] = useState({
    player_run: 0,
    opponent_run:0,
    is_player_batting: 1,
    is_opponent_batting: 0,
    is_player_bowling: 0,
    is_opponent_bowling:1,
    player_batted: 0,
    opponent_batted: 0,
    player_bowled: 0,
    opponent_bowled: 0
  })

  useEffect(() => {
    const res = decodeToken(localStorage.getItem('access_token'));
    Axios.get(`https://ultimate-cricket.onrender.com/user/detail?email=${res.email}`).then(res => {
      setUser({
        email: res.data.response_data.user.email,
        profile: res.data.response_data.user.profile,
        name: res.data.response_data.user.name,
      })       
    })
    
  }, [])

  const updateMatchData = (isWin) => {
    Axios.post("https://ultimate-cricket.onrender.com/user/update", {
              email: user.email,
              is_win: isWin,
              score: score.player_score
            })
            .then( res => {
              let result = res.data;
              console.log(result);
              
            })
  }

  const updateScore = (e) => {
    const run = [1, 2, 3, 4, 5, 6, 0];
    const randSelect = run[Math.floor(Math.random() * run.length)];
    // if(score.opponent_score > score.player_score) {
    //   setPlayersData({
    //     player_run: score.player_score,
    //     opponent_run: score.opponent_score,
    //     is_player_batting: 0,
    //     is_opponent_batting: 0,
    //     is_player_bowling: 0,
    //     is_opponent_bowling:0,
    //     player_batted: 1,
    //     opponent_batted: 1,
    //     player_bowled: 1,
    //     opponent_bowled: 1
    //   })
    // }

    const endStats = (winner) => {
      // window.location.reload();
      Swal.fire({
            title: winner,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Play Again',
            denyButtonText: `Back`,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            } else {
              console.log(user, {state: {data: user.email}}, 'koooo');
              userNavigateHook('/home', {state: {data:{email: user.email} }});
            }
          })
    }
    // CHECK BOTH PLAYER FINISHED BATTING
    // if(playersData.player_batted === 1 && playersData.opponent_batted === 1 && playersData.player_bowled === 1 && playersData.opponent_bowled === 1) {
    //   // alert(` winner ${playersData.player_run, playersData.opponent_run} `)
    //   Swal.fire({
    //     title: score.player_score > score.opponent_score ? 'Player is won' : 'opponent is won',
    //     showConfirmButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: 'Save',
    //     denyButtonText: `Don't save`,
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //       Swal.fire(<h1>HI</h1>)
    //     } else if (result.isDenied) {
    //       Swal.fire('Changes are not saved', '', 'info')
    //     }
    //   })
    // }
    // OPPONENT ACTION 
    if(playersData.is_opponent_batting === 1) {
      if(randSelect === Number(e.target.value)) {
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);
        setPlayersData({
          player_run: score.player_score,
          opponent_run: score.opponent_score,
          is_player_batting: 0,
          is_opponent_batting: 1,
          is_player_bowling: 1,
          is_opponent_bowling:0,
          player_batted: 1,
          opponent_batted: 1,
          player_bowled: 1,
          opponent_bowled: 1
        })

        if(score.opponent_score > score.player_score && playersData.opponent_batted) {
          updateMatchData(0)
          endStats(`OPPONENT IS THE WINNER`)
        } 
        if(score.opponent_score < score.player_score && playersData.opponent_batted) {
          updateMatchData(1)
          endStats(`PLAYER IS THE WINNER`)
        } 
        if(score.opponent_score === score.player_score && playersData.opponent_batted) {
          endStats(`MATCH IS DREW`)
        }
        // Swal.fire(`opponent score ${score.opponent_score}`);
        } else {

          if(score.opponent_score > score.player_score && playersData.opponent_batted) {
            updateMatchData(0)

            endStats(`OPPONENT IS THE WINNER`)
          } if(score.opponent_score < score.player_score && playersData.opponent_batted) {
            updateMatchData(1)

            endStats(`PLAYER IS THE WINNER`)
          } 
          if(score.opponent_score === score.player_score && playersData.opponent_batted) {
            endStats(`MATCH IS DREW`)
          }
        if([4,6].includes(Number(e.target.value))) {
          setSixOrFour({state: 1, data: Number(e.target.value)})
        } else {
          setSixOrFour({state: 0, data: 0})
        }

        setScore({opponent_score: score.opponent_score + Number(e.target.value), player_score: score.player_score});
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);
      }
    }

    // PLAYER ACTION
    if(playersData.is_player_batting === 1) {
      if(randSelect === Number(e.target.value)) {
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect);

        setPlayersData({
          player_run: score.player_score,
          opponent_run:score.opponent_score,
          is_player_batting: 0,
          is_opponent_batting: 1,
          is_player_bowling: 1,
          is_opponent_bowling: 0,
          player_batted: 1,
          opponent_batted: 0,
          player_bowled: 0,
          opponent_bowled: 1
        })
        
        Swal.fire(`Player score ${score.player_score} now opponent batting target is ${score.player_score + 1}`);
      } else {
  
        if([4,6].includes(Number(e.target.value))) {
          setSixOrFour({state: 1, data: Number(e.target.value)})
        } else {
          setSixOrFour({state: 0, data: 0})
        }
        
        setScore({player_score: score.player_score + Number(e.target.value), opponent_score: score.opponent_score});
        setNumberOne(Number(e.target.value));
        setNumberTwo(randSelect)
      }
    }
  }
  return (
    <Wrapper>
      <Box1> {user.name} </Box1>
      <Box2>OPPONENT</Box2>
      <Box3> <img src={`images/${user.profile}.png`} /> </Box3>
      <Box4>
        <ActionArea><ActionImage src={`images/${numberOne}.jpg`} /></ActionArea>
        <ActionArea><ActionImage src={`images/${numberTwo}.jpg`} /></ActionArea>
      </Box4>
      <Box5>
        <img src="images/11.png" />
      </Box5>
      <Box6><ScoreBoardDiv>
        PLAYER_SCORE: {score.player_score} OPPONENT_SCORE: {score.opponent_score}
        </ScoreBoardDiv></Box6>
      <Box7>  <Lottie animationData={handAction} loop={true} height={4000} width={40}/>
      </Box7>
      <Box8><ScreenDiv>
          {sixOrFour.state === 1 ? ( sixOrFour.data === 6 ?  <Lottie animationData={SixData} loop={true} height={4000} width={40}/> : <Lottie animationData={FourData} loop={true} height={4000} width={40}/> ): <Lottie animationData={BatBallData} loop={true} height={4000} width={40}/>}
        </ScreenDiv></Box8>
      <Box9>
          <Button value='1' onClick={updateScore}>1</Button>
          <Button value='2' onClick={updateScore}>2</Button>
          <Button value='3' onClick={updateScore}>3</Button>
          <Button value='4' onClick={updateScore}>4</Button>
          <Button value='5' onClick={updateScore}>5</Button>
          <Button value='6' onClick={updateScore}>6</Button>
          <Button value='0' onClick={updateScore}>0</Button>
          <Button onClick={() => { userNavigateHook('/home')}}>CANCEL</Button>
      </Box9>
    </Wrapper>
  );
};

export default GamePlayScreen;
