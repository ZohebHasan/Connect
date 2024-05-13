import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  }
`;

const UserInfo = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const names = fullName.split(' ');
        const firstName = names[0];
        const lastName = names.slice(1).join(' ');

        const userData = {
            firstName,
            lastName,
            email,
            password,
            username,
            phoneNumber
        };

        try {
            const response = await axios.post('http://localhost:8000/signup', userData);
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledInput
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
            />
            <StyledInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <StyledInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <StyledInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <StyledInput
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
            />
            <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
    );
};

export default UserInfo;
