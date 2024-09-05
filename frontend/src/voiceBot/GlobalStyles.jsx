
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    color: #333;
  }

  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 600px;
    margin: auto;
  }

  .intro-message,
  .completed-message {
    font-size: 1.2em;
    margin-bottom: 20px;
    text-align: center;
  }

  .question {
    font-size: 1.5em;
    margin: 20px 0;
    text-align: center;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #ddd;
  }
`;

export default GlobalStyles;
