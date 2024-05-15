import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string): boolean => /^\d{10}$/.test(phone.replace(/[^0-9]/g, ''));
const validateUsername = (username: string): boolean => {
    const validChars = /^[a-zA-Z0-9._]+$/.test(username);
    const noConsecutiveDots = !/\.\./.test(username);
    const noStartEndDot = !/^\.|\.+$/.test(username);
    const lengthValid = username.length >= 1 && username.length <= 30;
    const hasLetters = /[a-zA-Z]/.test(username);
    return validChars && noConsecutiveDots && noStartEndDot && lengthValid && hasLetters;
};
const validatePassword = (password: string): boolean => /\d/.test(password) && password.length >= 6;


interface AuthContextType {
    userId: string;
    password: string;
    handleUserIdChange: (input: string) => void;
    handlePasswordChange: (password: string) => void;
    handleUserIdError: () => void;
    handlePasswordError: () => void;
    errors: { usernameError: boolean; emailError: boolean; phoneError: boolean; passwordError: boolean };
  
    passwordEmptyError: boolean;
    userIdEmptyError:  boolean;
    setErrors: (errors: { usernameError: boolean; emailError: boolean; phoneError: boolean; passwordError: boolean }) => void;
    handleSubmit: () => void;
    loading: boolean;
    
}

export const LoginContext = createContext<AuthContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ usernameError: false, emailError: false, phoneError: false, passwordError: false });
    const [userIdEmptyError, setuserIdEmptyError] = useState(false);
    const [passwordEmptyError, setPasswordEmptyError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    //error state managing
    const handleUserIdChange = (input: string) => {
        setUserId(input);
        setErrors({
            usernameError: false,
            emailError: false,
            phoneError: false,
            passwordError: errors.passwordError
        });

        setuserIdEmptyError(false);
        setPasswordEmptyError(false);
    };


    const handlePasswordChange = (password: string) => {
        setPassword(password);
        setErrors({
            usernameError: errors.usernameError,
            emailError: errors.emailError,
            phoneError: errors.phoneError,
            passwordError: false
        });
        setuserIdEmptyError(false);
        setPasswordEmptyError(false);

    };
    //error handling
    const handleUserIdError = () => {
        setErrors({
            usernameError: !validateUsername(userId),
            emailError: !validateEmail(userId),
            phoneError: !validatePhone(userId),
            passwordError: false
        });
    }
    const handleUserIdEmpty = () => {
        setuserIdEmptyError(true);

    }
    const handlePasswordEmpty = () => {
        setPasswordEmptyError(true);
        
    }

    const handlePasswordError = () => {
        setErrors(prev => ({ ...prev, passwordError: !validatePassword(password) }));
    }

    // console.log("Email Error context: ", errors.emailError);
    // console.log("Phone Error context: ", errors.phoneError);
    // console.log("Username Error context: ", errors.usernameError);
    // console.log("Password Error context: ", errors.passwordError);
    // console.log("All errors context: ", (errors.emailError && errors.phoneError && errors.usernameError) && errors.passwordError);
    // console.log("User ID errors context: ", (errors.emailError && errors.phoneError && errors.usernameError));


    const validateCredentials = () => {
        return (validateEmail(userId) || validatePhone(userId) || validateUsername(userId)) && validatePassword(password);
    };

    const handleSubmit = async () => {
        if(userId != '') {
            handleUserIdError();
        }
        else{
            handleUserIdEmpty();
        }

        if(password != ''){
            handlePasswordError();
        }
        else{
            handlePasswordEmpty();
        }
        if(userId === '' && password === ''){
            handleUserIdEmpty();
            handlePasswordEmpty();
            return;
        }
      
      
        if (!validateCredentials()) {
            console.log("incorrectly formatted credentials, unable to make an http request")
            return;
        }
        
        setLoading(true);

        //KAMRUL LOOK AT HERE! This is only working for email, but the payload below is compatable for any type [email, phonenumber, username]
        // const payload = {
        //     // username: validateUsername(userId) ? userId.toLowerCase() : undefined,
        //     email: validateEmail(userId) ? userId.toLowerCase() : undefined,
        //     // phone: validatePhone(userId) ? userId : undefined,  
        //     password
        // };

        // KAMRUL LOOK AT HERE!But this code is not working even though it should. 

        const payload = {
            identifier: userId.trim(),  
            password
        };

        console.log(payload)
        try {
            const response = await axios.post('http://localhost:8000/login', payload);
            console.log('Login successful:', response.data);
            navigate('twoStep');
        } catch (error) {
            console.error('Login error:', error);
            setLoading(false);
        }
    };

    return (
        <LoginContext.Provider value={{
            userId, password,
            handleUserIdChange, handlePasswordChange,
            handleUserIdError, handlePasswordError,
            errors, setErrors, handleSubmit, loading, 
            userIdEmptyError, passwordEmptyError
        }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};


