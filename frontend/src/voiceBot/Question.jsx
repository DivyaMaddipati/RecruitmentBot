
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const QuestionText = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Question = ({ text }) => {
  useEffect(() => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }, [text]);

  return <QuestionText>{text}</QuestionText>;
};

export default Question;
