// import "./home.css";
import Lottie from "lottie-react";
import styled from "styled-components";
import * as homeButton from "../../lotties-data/home-button.json";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  /* width: 100vw;
  height: 100vh; */
  /* background-image: url(images/home-screen.jpg); */
  /* background-size: cover; */
  display: flex; 
  justify-content: space-around;
  flex-wrap: wrap;
`;
const Container = styled.div`
  display: grid;
  top: 25%;
  width: 500px;
  height: 500px;
  grid-template-columns: 5fr 5fr;
  grid-template-rows: 3fr 2fr ;
  grid-gap: 1fr;
`;

const ChildContainer = styled.div`
  width: auto;
  height: auto;
  grid-column-start: 1;
  grid-column-end: 3;
  /* background-color: black; */
`;

const ChildContainer1 = styled.div`
text-align: center;
  width: auto;
  height: auto;
  background-color: antiquewhite;
`;

const Home = (props) => {
  const location = useLocation();
  const userNavigateHook = useNavigate()

  return (
    <>
      <Wrapper>
        <Container>
          <ChildContainer><Lottie animationData={homeButton} onClick={() => { userNavigateHook('/gamePlay')} } loop={true}/></ChildContainer>
            <ChildContainer1><Link to = '/about'> ABOUT </Link></ChildContainer1>
            <ChildContainer1><Link to = '/profile'> PROFILE</Link></ChildContainer1>
        </Container>
      </Wrapper>
    </>
  );
};

export default Home;
