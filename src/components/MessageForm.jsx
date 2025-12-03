import React, { useState } from "react";
import styled from "styled-components";

const MessageForm = ({ onSend }) => {             //onSend, när någon klickar på knappen, skickar vi meddelandet till någon annan del av programmet
  const [message, setMessage] = useState("");     // här skapar vi en låda som heter message och den är till en början tom. setMessage är som en spak, när vi drar i den kan vi ändra vad som finns i lådan

  const handleSubmit = (e) => {                   //detta händer när vi trycker på knappen
    e.preventDefault();                           //förhindrar att sidan laddas om
    if (!message.trim()) return;                  // hindrar tomma meddelande 
    onSend(message);
    setMessage("");
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label htmlFor="message">What´s making you happy right now?</Label>
      <TextArea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}        /* När du skriver spara det du skriver i message */
        placeholder="Type your happy thought..."
      />
      <Button type="submit">❤️ Send Happy Thought ❤️</Button>
    </FormWrapper>
  );
};

export default MessageForm;

const FormWrapper = styled.form`
  background: rgba(237, 232, 232, 1);
  padding: 20px;
  border: 1px solid #000;
  border-radius: 2px;
  box-shadow: 6px 6px 0 #000;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  margin-top: 30px;
`;

const Label = styled.label`
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 50px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid lightgrey;
`;

const Button = styled.button`
  background: #ffb3b3;
  margin-top: 15px;
  padding: 10px; 
  border-radius: 20px;
  border: none;
`;
