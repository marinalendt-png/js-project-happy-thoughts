import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { MessageForm } from './components/MessageForm';
import { MessageCard } from './components/MessageCard';
import { GlobalStyle } from "./styles/GlobalStyle";
import { fetchThoughts, postThought, likeThought, deleteThought, patchThought } from "./api.js";

// App - the main component for the application. It handles the list of messages och passes them down function to child components
export const App = () => {

  // States that stores all submitted messages, shows when loading and when error
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  // When the app starts, we get thoughts from API. The data is normalized and stored in messages (state). Runs only once when the app loads (empty array [])
  useEffect(() => {
    const loadThoughts = async () => {
      try {
        setIsLoading(true); //shows text when loading
        setError(null); //reset previous errors
        const data = await fetchThoughts(); //calling api.js

        const normalized = data.map((t) => ({
          id: t._id,
          text: t.message,
          likes: t.hearts,
          time: new Date(t.createdAt).getTime(),
        }));

        setMessages(normalized);
      } catch (error) {
        console.error(error);
        setError("Could not fetch thoughts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadThoughts();
  }, []);

  // addMessage - this function is called when MessageForm submits next time. It creates a message object and adds it to the start of the list 
  const addMessage = async (text) => {
    try {
      const newThought = await postThought(text); //Sending to API

      //Making the object easier to read in the app by normalizing it. 
      const normalized = {
        id: newThought._id,
        text: newThought.message,
        likes: newThought.hearts,
        time: new Date(newThought.createdAt).getTime()
      };

      setMessages(prev => [normalized, ...prev]);
      setError(null); // add the newest message at the top 
    } catch (error) {
      console.error(error);
      setError("Could not send your thought. Make sure you have 5-140 characters.");
    }
  };

  // Updates the like count for a message both locally and in the API
  const handleLike = async (id) => {
    try {
      const updatedThought = await likeThought(id);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === id
            ? { ...msg, likes: updatedThought.hearts }
            : msg
        )
      )
    } catch (error) {
      console.error("Could not like thought", error);
      setError("Could not like thought");
    }
  };

  // Deletes the thought when the deletebutton is pushed
  const handleDelete = async (id) => {
    console.log("handleDelete called for ID:", id);
    try {
      await deleteThought(id);
      setMessages(prev => prev.filter(message => message.id !== id))
    } catch (error) {
      console.error("delete failed:", error);
      setError("Could not delete thought");
    }
  };

  // Edits the thought when the editbutton is pushed
  const handleUpdate = async (id) => {
    const thought = messages.find(msg => msg.id === id);
    if (!thought) return;

    const newText = prompt("Edit your thought:", thought.text);
    if (!newText || newText.trim().length === 0) return;

    try {
      const updatedThought = await patchThought(id, { message: newText });
      console.log("Response from API:", updatedThought)
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, text: updatedThought.message || newText } : msg
      ));
    } catch (error) {
      console.error("Update failed:");
      setError("Could not update thought");
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
              onLike={handleLike}
              onDelete={handleDelete}
              onUpdate={handleUpdate} />
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



