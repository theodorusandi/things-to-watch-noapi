import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Poppins', sans-serif;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  } 

  ul, ol {
    list-style: none;
  }

  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
`;
