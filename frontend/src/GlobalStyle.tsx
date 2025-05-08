import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito Sans', sans-serif;
    background-color: #f0f0f0;

  }

  h1, h2, h3{
    font-family: 'Montserrat', sans-serif;
} 

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
