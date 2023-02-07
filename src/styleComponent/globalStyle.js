import { createGlobalStyle } from "styled-components";

export const GlobalStyleComponent = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

body {
    height: 100vh;
    width: 100vw;
    /* background-image:url(images/cricket.jpg); */
    background-size: cover;
    background-repeat: no-repeat;
    /* font-family: 'Nunito', sans-serif; */
    font-family: 'Itim', cursive;
    /* opacity: 0.5; */
    /* background: rgba(0, 151, 19, 0.3); */
    /* background: rgba(0, 0, 0, 0.5) url(images/home-screen.jpg); */
    }
`;
