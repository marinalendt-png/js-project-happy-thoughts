import React, { useState } from "react";
import styled from "styled-components";
import { AUTH_BASE_URL } from "../api";

export const SignUpForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${AUTH_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok && response.status > 499) {
        throw new Error("Failed to create user");
      }

      const resJson = await response.json();

      if (!resJson.success) {
        throw new Error(resJson.message || "Failed to create user");
      }

      handleLogin(resJson.response);
      e.target.reset();
    } catch (error) {
      setError(error.message);
      console.log("error occurred during signup", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Sign Up</Title>
      <InputWrapper>
        <Label>
          Email
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </Label>
        <Label>
          Password
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </Label>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

// ===== Styled Components ===== //
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 250px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  gap: 8px;
`;

const Input = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

const Button = styled.button`
  padding: 8px;
  background: #ffb3b3;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1565c0;
  }
`;
