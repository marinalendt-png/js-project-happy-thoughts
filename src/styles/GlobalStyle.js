import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family:  'Courier';
    }

  body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    }
`;

export default GlobalStyle;