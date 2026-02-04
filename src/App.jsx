import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { MessageForm } from './components/MessageForm';
import { MessageCard } from './components/MessageCard';
import { GlobalStyle } from "./styles/GlobalStyle";
import { fetchThoughts, postThought, likeThought, deleteThought, patchThought } from "./api.js";
import { LogInForm } from "./components/LogInForm.jsx";
import { SignUpForm } from './components/SignUpForm.jsx';

// App - the main component for the application. It handles the list of messages och passes them down function to child components
export const App = () => {

  // States that stores all submitted messages, shows when loading and when error
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [isSigningUp, setIsSigningUp] = useState(true);

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
  }, [accessToken]);

  // Saves token (authentication) so the app knows that the user is logged in
  const handleLogin = (userData) => {
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
      setAccessToken(userData.accessToken);
    }
  }
  // Removes token when the user logs out
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setMessages([]);
  }

  // Creates a new thought, the user must be logged in (accessToken)
  const addMessage = async (text) => {
    try {
      const newThought = await postThought(text, accessToken);

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

  // Liking a thought (also when user is logged in)
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

  // Deletes a thought (also when user is logged in)
  const handleDelete = async (id) => {
    try {
      await deleteThought(id, accessToken);
      setMessages(prev => prev.filter(message => message.id !== id))
    } catch (error) {
      console.error("delete failed:", error);
      setError("Could not delete thought");
    }
  };

  // Edits a thought (also when user is logged in)
  const handleUpdate = async (id) => {
    const thought = messages.find(msg => msg.id === id);
    if (!thought) return;

    const newText = prompt("Edit your thought:", thought.text);
    if (!newText || newText.trim().length === 0) return;

    try {
      const updatedThought = await patchThought(id, { message: newText }, accessToken);
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
      {!accessToken ? (
        //LOGGED OUT: Shows login/signup 
        <>
          {isSigningUp ? (
            <SignUpForm handleLogin={handleLogin} />
          ) : (
            <LogInForm handleLogin={handleLogin} />
          )}
          <ToggleButton onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? "Already have an account? Log in" : "Don´t have an account? Sign up"}
          </ToggleButton>
        </>
      ) : (
        //LOGGED IN: This shows when your logged in
        <AppContainer>
          <LogOutButton onClick={handleLogout}>Log Out</LogOutButton>
          <MessageForm onSend={addMessage} />
        </AppContainer>
      )}
      {isLoading && <p>Loading thoughts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* This will show both in logged in and logged out*/}
      <MessageList>
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
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

const LogOutButton = styled.button`
  padding: 0.5rem 1rem;
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
  padding: 0.5rem 1rem;
  background: transparent;
  color: #1976d2;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;


