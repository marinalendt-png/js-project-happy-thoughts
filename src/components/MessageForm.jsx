import React, { useState } from "react";
import styled from "styled-components";

//Creating MessageForm (component) with props onSend (function) This will be called when the user writes a message //
const MessageForm = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const MAX_CHARS = 140; //max letters in textarea

  //setMessage (function) is used to update the value in message (variable). handleSubmit runs when the user clicks on submitbutton. 
  const handleSubmit = (e) => {
    e.preventDefault();  //prevents the page to reload                         
    if (!message.trim() || message.length > MAX_CHARS) return;
    onSend(message);  //the message will be sent to function onSend. 
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    const value = e.target.slice(0, MAX_CHARS);
    setMessage(value);
  };

  const chars = message.length;
  const isOverLimit = chars >= MAX_CHARS;

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label htmlFor="message">What´s making you happy right now?</Label>
      <TextArea
        id="message"
        name="message"
        value={message}
        onChange={handleChange}
        placeholder="Type your happy thought..."
        $isOverLimit={isOverLimit}
        maxLength={MAX_CHARS}
      />
      <Counter $isOverLimit={isOverLimit}>
        {chars}/{MAX_CHARS}
      </Counter>
      {isOverLimit && <ErrorMessage>You have to many characters! Please shorten your message. </ErrorMessage>}
      <Button type="submit" disabled={isOverLimit}>
        ❤️ Send Happy Thought ❤️
      </Button>
    </FormWrapper>
  );
};

export default MessageForm;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid ${(p) => (p.$isOverLimit ? "red" : "lightgrey")};
  font-size: 14px;
  resize: vertical;
`;

const Counter = styled.div`
  align-self: flex-end;
  padding-right: 6px;
  font-size: 12px;
  color: ${(p) => (p.$isOverLimit ? "red" : "black")}
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`;

const Button = styled.button`
  background:${(p) => (p.disabled ? "#ccc" : "#ffb3b3")};
  margin-top: 10px 14px;
  padding: 10px; 
  border-radius: 20px;
  border: none;
  align-self: flex-start;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")} ;

  @media (min-width: 480px) {
    padding: 12px 18px
  }
`;
