import React from "react";
import styled from "styled-components";

const MessageCard = ({ message }) => {
  return (
    <CardWrapper>
      <MessageText>{message.text}</MessageText>
      <CardFooter>
        <LikeContainer>
          <HeartButton className="like-button">❤️</HeartButton>
          <span>{message.likes}</span>
        </LikeContainer>
        <Time>{message.time}</Time>
      </CardFooter>
    </CardWrapper>
  );
};

export default MessageCard;

const CardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 6px 6px 0 #000;
  margin: 20px auto;
  width: 100%; 
  max-width: 550px;
`;

const MessageText = styled.p`
  font-size: 16px;
  line-height: 1.4;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
`;

const HeartButton = styled.button`
  background:  rgba(237, 232, 232, 1); 
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:active {
    background: #ffb3b3;
  }
`;

const Time = styled.span`
  font-size: 12px;
  color: rgba(181, 177, 177, 1);
`;