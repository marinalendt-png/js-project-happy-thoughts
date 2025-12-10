import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { MessageForm } from './components/MessageForm';
import { MessageCard } from './components/MessageCard';
import { GlobalStyle } from "./styles/GlobalStyle";
import { fetchThoughts, postThought, likeThought } from "./api.js";

//** App - the main component for the application. It handles the list of messages och passes them down function to child components */
export const App = () => {
  // State that stores all submitted messages
  const [messages, setMessages] = useState([]);

  //Loadingstatus while we wait for API
  const [isLoading, setIsLoading] = useState(true);

  //Errorstatus if the fetch will fail
  const [error, setError] = useState(null)

  //When the app starts, we get thoughts from API. We use a async-function inside the useEffect. 
  useEffect(() => {
    const loadThoughts = async () => {
      try {
        setIsLoading(true); //shows spinner or text
        setError(null); //reset previous errors
        const data = await fetchThoughts(); //calling api.js

        const normalized = data.map((t) => ({
          id: t._id,
          text: t.message,
          likes: t.hearts,
          time: new Date(t.createdAt).getTime(),
        }));

        setMessages(normalized);
      } catch (err) {
        console.error(err);
        setError("Could not fetch thoughts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadThoughts();
  }, []); //the useEffect will only be triggered once, because of the empty array []

  //** addMessage - this function is called when MessageForm submits next time. It creates a message object and adds it to the beginning of the list */
  const addMessage = async (text) => {
    try {
      const newThought = await postThought({ message: text }); //Sending to API

      //Making the object easier to read in the app by normalizing it. 
      const normalized = {
        id: newThought._id,
        text: newThought.message,
        likes: newThought.hearts,
        time: new Date(newThought.createdAt).getTime()
      };

      setMessages(prev => [normalized, ...prev]); // add the newest message at the top 
    } catch (err) {
      console.error(err);
      alert("Could not send your thought. Please try again later.");
    }
  };

  const handleLike = async (id) => {
    try {
      const updatedThought = await likeThought(id); //Sending like to API
      setMessages(prev =>
        prev.map(msg =>
          msg.id === id ? { ...msg, likes: updatedThought.hearts } : msg
        )
      );
    } catch (err) {
      console.error("Could not like thought", err);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MessageForm onSend={addMessage} />
        {isLoading && <p>Loading thoughts...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <MessageList>
          {messages.map((msg) => (
            <MessageCard
              key={msg.id}
              message={msg}
              onLike={handleLike} />
          ))}
        </MessageList>
      </AppContainer>
    </>
  );
}

// ===== Styled Components ===== //

const AppContainer = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MessageList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 480px) {
    gap: 16px;
  }
`;



