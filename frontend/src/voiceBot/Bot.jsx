import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Question from "./Question";
import ResponseRecorder from "./ResponseRecorder";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { useUserProgress } from "../contexts/userProgressContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const IntroMessage = styled.div`
  font-size: 24px;
  color: #333;
  margin: 20px 0;
`;

const CompletedMessage = styled.div`
  font-size: 24px;
  color: #28a745;
  margin: 20px 0;
`;
const SuccessImage = styled.img`
  max-width: 150px;
  height: auto;
  margin: 20px 0;
  border-radius: 49%;
`;

const Image = styled.img`
  max-width: 50%;
  height: 50%;
  border-radius: 20%;
  margin-bottom: 20%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
    background-color: #004494;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

const introductionText = "";

const questions = [
  "Tell me about yourself.",
  "Can you explain one of your projects?",
  "Why do you want to work in this field?",
  "What are your strengths and weaknesses?",
  "Describe a time you disagreed with a teammate or supervisor.",
  "What are your goals?",
  "Why should we hire you?",
  "Do you have any questions for us?",
];

function Bot() {
  const [currentPhase, setCurrentPhase] = useState("introduction"); // 'introduction' or 'interview'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [voices, setVoices] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [introductionCompleted, setIntroductionCompleted] = useState(false);
  const { changeUserProgress } = useUserProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPhase === "introduction" && !introductionCompleted) {
      const synth = window.speechSynthesis;

      if (!synth) {
        console.error("SpeechSynthesis API is not supported.");
        return;
      }

      const populateVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
      };

      populateVoices();
      synth.onvoiceschanged = populateVoices;

      const text = introductionText;
      const femaleVoice = voices.find((v) =>
        v.name.toLowerCase().includes("female")
      );
      const utterance = new SpeechSynthesisUtterance(text);

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      synth.speak(utterance);

      utterance.onend = () => {
        setIntroductionCompleted(true); // Mark introduction as completed
        setCurrentPhase("interview"); // Transition to interview phase
        setCurrentQuestion(0); // Set to the first question
      };
    }
  }, [currentPhase, voices, introductionCompleted]);

  useEffect(() => {
    if (
      currentPhase === "interview" &&
      introductionCompleted &&
      currentQuestion < questions.length
    ) {
      const synth = window.speechSynthesis;

      if (!synth) {
        console.error("SpeechSynthesis API is not supported.");
        return;
      }

      const text = questions[currentQuestion];
      const femaleVoice = voices.find((v) =>
        v.name.toLowerCase().includes("female")
      );
      const utterance = new SpeechSynthesisUtterance(text);

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      synth.speak(utterance);

      utterance.onend = () => {
        setIsRecording(true);
      };
    }
  }, [currentQuestion, currentPhase, voices, introductionCompleted]);

  const handleResponse = (response) => {
    setResponses([...responses, response]);
    setIsRecording(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Interview complete. Responses:", responses);
      setCurrentPhase("completed");
    }
  };

  const startInterview = () => {
    setCurrentPhase("interview");
  };

  return (
    <>
      <GlobalStyles />
      <div className="App">
        <Avatar />
        {currentPhase === "introduction" && (
          <>
            <Image
              src="https://img.freepik.com/premium-vector/contract-signing_10498-58.jpg?w=740"
              alt="Interview Image"
            />
            <IntroMessage>Introduction Phase</IntroMessage>
            <Button onClick={startInterview}>Start Interview</Button>
          </>
        )}
        {currentPhase === "interview" && (
          <>
            <Question text={questions[currentQuestion]} />
            <ResponseRecorder
              onResponse={handleResponse}
              isRecording={isRecording}
            />
          </>
        )}
        {currentPhase === "completed" && (
          <>
            <CompletedMessage>Interview completed. Thank you!</CompletedMessage>
            <SuccessImage
              src="https://img.freepik.com/premium-vector/vector-d-check-mark-realistic-icon-trendy-plastic-green-round-starburst-badge-with-checkmark_254538-471.jpg?w=740"
              alt="Success"
            />
          </>
        )}
      </div>
      <button
        onClick={() => {
          changeUserProgress(4);
          navigate("/u/results");
        }}
      >
        Submit
      </button>
    </>
  );
}

export default Bot;
