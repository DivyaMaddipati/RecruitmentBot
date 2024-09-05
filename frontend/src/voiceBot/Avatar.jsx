
import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #6200ea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
`;

const AvatarImage = styled.img`
  width: 80%;
  height: auto;
  border-radius:50%;
`;

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 160px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 200px;
  text-align: center;
  font-size: 14px;
`;

const Avatar = ({ message }) => (
  <AvatarContainer>
    <AvatarImage src="https://img.freepik.com/free-photo/beautiful-business-woman-suit-glasses-3d-rendering_1142-55187.jpg?t=st=1725457700~exp=1725461300~hmac=5d732ee07d9471db09a07b0c3871503fa83964d8cd773911b2f8f01c87e18103&w=740" alt="Avatar" />
    {message && <SpeechBubble>{message}</SpeechBubble>}
  </AvatarContainer>
);

export default Avatar;
