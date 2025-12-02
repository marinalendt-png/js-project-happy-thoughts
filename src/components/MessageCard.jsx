import React from "react";
import styled from "styled-components";

const MessageCard = ({ message }) => {
  return (
    <div className="message-card">
      <p>{message.text}</p>
      <div className="message-footer">
        <button className="like-button">❤️</button>
        <span>{message.likes}</span>
        <span className="time">{message.time}</span>
      </div>
    </div>
  );
};

export default MessageCard;