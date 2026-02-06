import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Courier';
    }

  input, textarea, button, select, label {
    font-family: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background: #fafafa;;
    }
`;
