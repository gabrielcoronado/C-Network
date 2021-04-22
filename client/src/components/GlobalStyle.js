import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html,
body,
div,
span,
button,
input {
  margin: 0;
  padding: 0;
  border: 0;
  color: white;
  background: #131516;
  vertical-align: baseline;
  font-family: Kiwi Maru, serif;
}
*::-webkit-scrollbar {
  width: 7px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: gray;
  size: 5px;
  border-radius: 20px;
  
}


/* @keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
} */ 

`;

export default GlobalStyle;
