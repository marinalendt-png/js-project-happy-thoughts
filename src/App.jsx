import React, { useState } from 'react';
import MessageForm from './components/MessageForm';
import MessageCard from './components/MessageCard';
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (text) => {
    const newMessage = {
      text,
      likes: 0,
      time: 'Just now',
    };
    setMessages([newMessage, ...messages]);
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <MessageForm onSend={addMessage} />
        <div className="messages-list">
          {messages.map((msg, index) => (
            <MessageCard key={index} message={msg} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;