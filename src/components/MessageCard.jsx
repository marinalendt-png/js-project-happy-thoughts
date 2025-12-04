import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
//This is what the messageCard looks like in the browser. The MessageCard (function) takes props (message) and return JSX. 

const MessageCard = ({ message }) => {
  const [likes, setLikes] = useState(message.likes ?? 0);
  const [tick, setTick] = useState(0); //time renders every minute

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes((l) => l + 1);
  };

  const timeText = dayjs(message.createdAt).fromNow();

  return (
    <CardWrapper>
      <MessageText>{message.text}</MessageText>
      <CardFooter>
        <LikeContainer>
          <HeartButton
            onClick={handleLike} $active={likes > 0}>❤️
          </HeartButton>
          <LikesCount>{likes}</LikesCount>
        </LikeContainer>
        <Time>{timeText}</Time>
      </CardFooter>
    </CardWrapper>
  );
};

export default MessageCard;

const CardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 2px;
  box-shadow: 6px 6px 0 #000;
  margin: 0 auto;
  width: 100%; 
  max-width: 550px;
`;

const MessageText = styled.p`
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
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
  background: ${(p) => (p.$active ? "#ffb3b3" : "rgba(237, 232, 232, 1)")}; 
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background 120ms ease, transform 120ms ease;
`;

const LikesCount = styled.span`
  font-size: 14px;
  margin-left: 6px;
`;

const Time = styled.span`
  font-size: 12px;
  color: rgba(181, 177, 177, 1);
`;