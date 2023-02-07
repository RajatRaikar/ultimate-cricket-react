import { React, useState, useEffect } from "react";
import Register from "../register/register";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://static.vecteezy.com/system/resources/previews/012/979/472/original/modern-high-resolution-black-geometric-background-with-polygonal-grid-abstract-black-metallic-hexagonal-pattern-simple-illustration-vector.jpg);
`;

const LogoAnimationStyleComponent = keyframes`
from {
  transform: scale(0);
}
to {
  transform: scale(1);
}`;

const LogoStyleComponent = styled.div`
  animation-name: ${LogoAnimationStyleComponent};
  animation-duration: 3s;
  animation-iteration-count: infinite;
`;

const Loading = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (
    <Wrapper>
      <LogoStyleComponent>
        <img src="images/loading_screen_logo.jpg" alt="no image" />
      </LogoStyleComponent>
    </Wrapper>
  ) : (
    <Register />
  );
};

export default Loading;
