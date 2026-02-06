import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { MessageForm } from './components/MessageForm';
import { MessageCard } from './components/MessageCard';
import { GlobalStyle } from "./styles/GlobalStyle";
import { fetchThoughts, postThought, likeThought, deleteThought, patchThought } from "./api.js";
import { LogInForm } from "./components/LogInForm.jsx";
import { SignUpForm } from './components/SignUpForm.jsx';

export const App = () => {

  // STATE 
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [isSigningUp, setIsSigningUp] = useState(true);

  useEffect(() => {
    const loadThoughts = async () => {
      try {
        setIsLoading(true); //shows text when loading
        setError(null); //reset previous errors
        const data = await fetchThoughts(); //calling api.js
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //Added to make the dating work 

        setMessages(sorted);
      } catch (error) {
        console.error(error);
        setError("Could not fetch thoughts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadThoughts();
  }, [accessToken]);

  // Saves token (authentication) so the app knows that the user is logged in
  const handleLogin = (userData) => {
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
      setAccessToken(userData.accessToken);
    }
  };

  // Removes token when the user logs out
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    setMessages([]);
  };

  // Creates a new thought, the user must be logged in (accessToken)
  const addMessage = async (text) => {
    try {
      const newThought = await postThought(text, accessToken);
      if (!newThought || !newThought._id) {
        console.error("Invalid newThought returned from API:", newThought)
        return;
      }

      setMessages(prev => [newThought, ...prev]);
      setError(null); // add the newest message at the top 
    } catch (error) {
      console.error(error);
      setError("Could not send your thought. Make sure you have 5-140 characters.");
    }
  };

  // Liking a thought (also when user is logged in)
  const handleLike = async (id) => {
    try {
      const updatedThought = await likeThought(id);
      setMessages(prev =>
        prev.map(msg =>
          msg._id === id
            ? { ...msg, hearts: updatedThought.hearts }
            : msg
        )
      )
    } catch (error) {
      console.error("Could not like thought", error);
      setError("Could not like thought");
    }
  };

  // Deletes a thought (also when user is logged in)
  const handleDelete = async (id) => {
    try {
      await deleteThought(id, accessToken);
      setMessages(prev => prev.filter(message => message._id !== id))
    } catch (error) {
      console.error("delete failed:", error);
      setError("Could not delete thought");
    }
  };

  // Edits a thought (also when user is logged in)
  const handleUpdate = async (id) => {
    const thought = messages.find(msg => msg._id === id);
    if (!thought) return;

    const newText = prompt("Edit your thought:", thought.message);
    if (!newText || newText.trim().length === 0) return;

    try {
      const updatedThought = await patchThought(id, { message: newText }, accessToken);
      console.log("Response from API:", updatedThought)
      setMessages(prev => prev.map(msg => msg._id === id ? updatedThought : msg
      )
      );
    } catch (error) {
      console.error("Update failed:");
      setError("Could not update thought");
    }
  };

  return (
    <>
      <GlobalStyle />
      {!accessToken ? (
        //LOGGED OUT: Shows login/signup 
        <>
          {isSigningUp ? (
            <SignUpForm handleLogin={handleLogin} />
          ) : (
            <LogInForm handleLogin={handleLogin} />
          )}
          <ToggleButton onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? "Log in HERE, to post your own happy thought" : "Do you want to post your own happy thought? Sign up HERE"}
          </ToggleButton>
        </>
      ) : (

        //LOGGED IN: This shows when your logged in
        <AppContainer>
          <LogOutButton onClick={handleLogout}>Log Out</LogOutButton>
          <MessageForm onSend={addMessage} />
        </AppContainer>
      )}
      <LoadingContainer>
        {isLoading && <p style={{ textAlign: "center" }}>Loading thoughts...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </LoadingContainer>

      {/* This will show both in logged in and logged out*/}
      <MessageList>
        {messages.filter(msg => msg)
          .map((msg) => (
            <MessageCard
              key={msg._id}
              message={msg}
              onLike={handleLike}
              onDelete={accessToken ? handleDelete : null}
              onUpdate={accessToken ? handleUpdate : null} />
          ))}
      </MessageList>
    </>
  );
}

// ===== Styled Components ===== //

const AppContainer = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  margin: 0 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  padding: 16px;
  margin: 0 auto;

  @media (min-width: 480px) {
    gap: 20px;
    padding: 24px;
    max-width: 500px;
  }

  @media (min-width: 768px) { 
    gap: 24px;
    padding: 32px;
    max-width: 500px;
  }
`;

const LogOutButton = styled.button`
  padding: 8px 16px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  transition: background 0.2s;

  &:hover {
    background: #b71c1c;
  }
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: black;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 16px;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;


