import React, { useState } from 'react';
import styled from "styled-components";
import { MessageForm } from './components/MessageForm';
import { MessageCard } from './components/MessageCard';
import { GlobalStyle } from "./styles/GlobalStyle";

//** App - the main component for the application. It handles the list of messages och passes them down function to child components */
export const App = () => {
  // State that stores all submitted messages
  const [messages, setMessages] = useState([]);

  //** addMessage - this function is called when MessageForm submits next time. It creates a message object and adds it to the beginning of the list */
  const addMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      likes: 0, //starting the like count
      time: Date.now(), // timestamp to show when the message was created. 
    };
    setMessages(prev => [newMessage, ...prev]); // add the newest message at the top 
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MessageForm onSend={addMessage} />
        <MessageList>
          {messages.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </MessageList>
      </AppContainer>
    </>
  );
}

// ===== Styled Components ===== //

const AppContainer = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;



