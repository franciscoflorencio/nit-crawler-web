import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background-color: #F8F9FA;
    --text-color: #343a40;
    --primary-green: #005f4b;
    --primary-green-darker: #004c3d;
    --border-color: #dee2e6;
    --card-background: #FFFFFF;
    --link-color: var(--primary-green);
    --link-hover-color: var(--primary-green-darker);
  }

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
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }
  
  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: var(--text-color);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.25rem; /* 36px */
    font-weight: 700;
  }

  h2 {
    font-size: 1.75rem; /* 28px */
  }

  h3 {
    font-size: 1.5rem; /* 24px */
  }

  h4 {
    font-size: 1.25rem; /* 20px */
  }

  a {
    color: var(--link-color);
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    color: var(--link-hover-color);
    text-decoration: underline;
  }
`;
