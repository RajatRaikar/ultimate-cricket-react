import Loading from "./components/loading/loading";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import UserProfile from './components/userProfile/userProfile';
import Home from './components/homeScreen/home';
// import Register from './components/register/register';
// import Login from './components/login/login';
import GamePlayScreen from './components/gameplayScreen/gamePlayScreen';
import About from "./components/about/about";
import Login from "./components/login/login"

import Lottie from "lottie-react";
import * as testJson from './lotties-data/test.json'

import {GlobalStyleComponent} from "../src/styleComponent/globalStyle";

import styled from "styled-components";

function App() {
  const Head = styled.h1`
    background-color: antiquewhite;
  `;
  return (
    <>

<BrowserRouter>
<GlobalStyleComponent />
      <Routes>
        <Route exact path="/" element={ <Loading />}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/gamePlay" element={<GamePlayScreen/>}/>
        <Route exact path="/profile" element={<UserProfile/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      
      {/* <Home/> */}
      {/* <Head>hi</Head> */}
     
    </>
    // <Lottie animationData={testJson} loop={false}  width={"100%"}/>
  );
}

export default App;
