import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Shows the time e.g., "2 minutes ago", formatting in dayjs
dayjs.extend(relativeTime);

// MessageCard - displays a single message with its text, like-button, like-count and relative timestamp
export const MessageCard = ({ message, onLike }) => {
  const [tick, setTick] = useState(0);
  const [likes, setLikes] = useState(message.likes ?? 0);

  // Update likes when app.js sends new data from API
  useEffect(() => {
    setLikes(message.likes);
  }, [message.likes]);

  // Re-render every 60 sec for "time ago", and cleans up interval on unmount. 
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  // Increments the like counter when the heard button is pressed, sends to the API
  const handleLike = () => {
    if (onLike) onLike(message.id);
  };
  console.log(
    "message.time:",
    message.time,
    dayjs(message.time).toISOString()
  );

  // Converts timestamp info "x minutes ago"
  const timeText = dayjs(message.time).fromNow();

  return (
    <CardWrapper>
      <MessageText>{message.text}</MessageText>
      <CardFooter>
        <LikeContainer>
          <HeartButton
            onClick={handleLike}
            $active={likes > 0}
            aria-label="Like this thought"
          >❤️
          </HeartButton>
          <LikesCount>{likes}</LikesCount>
        </LikeContainer>
        <Time>{timeText}</Time>
      </CardFooter>
    </CardWrapper>
  );
};

// ===== Styled Components ===== //

/* With animation for new message */
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
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  animation: fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    60% {
      opacity: 1;
      transform: translateY(5px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const MessageText = styled.p`
  font-size: 14px;
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

  &:active {
    animation: jump 0.8s forwards;
  }
  
  @keyframes jump {
    0% {
      transform: translateY(0) scale(1);
    }
    30% {
      transform: translateY(-15px) scale(1.2);
      }
    60% {
      transform: translateY(5px) scale(0.9);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }
`;

const LikesCount = styled.span`
  font-size: 14px;
  margin-left: 6px;
`;

const Time = styled.span`
  font-size: 12px;
  color: rgba(181, 177, 177, 1);
`;