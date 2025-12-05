import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Shows the time e.g., "2 minutes ago", formatting in dayjs
dayjs.extend(relativeTime);

//** MessageCard - displays a single message with its text, like-button, like-count and relative timestamp */
export const MessageCard = ({ message }) => {
  // Local like-state, that starts from message.likes or 0
  const [likes, setLikes] = useState(message.likes ?? 0);

  // Used to force re-render every minute so the "time ago" updates 
  const [tick, setTick] = useState(0);

  //** Update the component every 60 seconds. This makes the "3 minutes ago" text stay accurate */
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Increments the like counter when the heard button is pressed 
  const handleLike = () => {
    setLikes((l) => l + 1);
  };

  // Converts timestamp info "x minutes ago"
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

// ===== Styled Components ===== //

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