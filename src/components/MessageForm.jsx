import React, { useState } from "react";
import styled from "styled-components";

const MessageForm = ({ onSend }) => {           //onSend, när någon klickar på knappen, skickar vi meddelandet till någon annan del av programmet
  const [message, setMessage] = useState("");   // här skapar vi en låda som heter message och den är till en början tom. setMessage är som en liten spak, när vi drar i den kan vi ändra vad som finns i lådan

  const handleSubmit = (e) => {                   //detta händer när vi trycker på knappen
    e.preventDefault();                           //förhindrar att sidan laddas om
    if (!message.trim()) return;              // hindrar tomma meddelande 
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <label htmlFor="message">What´s making you happy right now?</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}        /* När du skriver spara det du skriver i message */
        placeholder="Type your happy thought..."
      />
      <button type="submit">❤️ Send Happy Thought ❤️</button>
    </form>
  );
};

export default MessageForm;