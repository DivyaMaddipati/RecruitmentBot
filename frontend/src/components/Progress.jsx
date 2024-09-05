import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profileImage from "../pages/profile.jpg";
import { useUserProgress } from "../contexts/userProgressContext";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  position: fixed; /* Make it fixed to stick to the top */
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure it stays on top */
`;

const LeftPane = styled.div`
  display: flex;
  flex-direction: row; /* Horizontal layout for header items */
  align-items: center;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-x: auto; /* Allow horizontal scrolling if needed */
`;

const ProfileImage = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 16px;
`;

const StepList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
`;

const StepItem = styled.li`
  margin-right: 12px;
`;

const StepButton = styled.div`
  border-radius: 8px;
  padding: 8px 16px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#fff" : "#757575")};
  font-weight: bold;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#cfcfcf")};
  }
`;

const Progress = () => {
  const navigate = useNavigate();
  const { userProgress } = useUserProgress();
  const steps = [
    { id: 0, name: "Resume Round", location: "/u" },
    { id: 1, name: "MCQ Round", location: "/u/test" },
    { id: 2, name: "Coding Round", location: "/u/code" },
    { id: 3, name: "Interview Round", location: "/u/voice" },
    { id: 4, name: "Result & Feedback", location: "/u/results" },
  ];

  return (
    <Header>
      <LeftPane>
        <ProfileImage src={profileImage} alt="Profile" />
        <Heading>Hiring Process</Heading>
        <StepList>
          {steps.map((step) => (
            <StepItem key={step.id}>
              <StepButton
                active={step.id <= userProgress}
                onClick={() => {
                  if (step.id <= userProgress) navigate(step.location);
                }}
              >
                {step.name}
              </StepButton>
            </StepItem>
          ))}
        </StepList>
      </LeftPane>
    </Header>
  );
};

export default Progress;
