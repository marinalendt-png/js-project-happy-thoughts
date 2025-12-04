import React, { useState } from 'react';
import styled from "styled-components";
import MessageForm from './components/MessageForm';
import MessageCard from './components/MessageCard';
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      likes: 0,
      time: Date.now(),
    };
    setMessages(prev => [newMessage, ...prev]);
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

export default App;

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



