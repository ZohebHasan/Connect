import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validateFullName = (fullName: string): boolean => {
    const validChars = /^[a-zA-Z\s]+$/.test(fullName);
    const noLeadingTrailing = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/.test(fullName);
    const noConsecutiveSpaces = !(/[\s]{2,}/.test(fullName));
    const lengthValid = fullName.length >= 1 && fullName.length <= 50;
    return validChars && noLeadingTrailing && noConsecutiveSpaces && lengthValid;
};

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

    fullName: string;
    userId: string;
    userName: string;
    password: string;
    confirmPassword: string;

    handleFullNameChange: (input: string) => void;
    handleUserIdChange: (input: string) => void;
    handleUserNameChange: (input: string) => void;
    handlePasswordChange: (password: string) => void;
    handleConfirmPasswordChange: (confirmPassword: string) => void;

    handleFullNameError: () => void;
    handleUserIdError: () => void;
    handleUserNameError: () => void;
    handlePasswordError: () => void;
    handlePasswordMismatchError: () => void;

    errors: {
        fullNameError: boolean,
        usernameError: boolean;
        emailError: boolean;
        phoneError: boolean;
        passwordError: boolean;
        passwordNotMatchError: boolean
    };

    setErrors: (
        errors: {
            fullNameError: boolean,
            usernameError: boolean;
            emailError: boolean;
            phoneError: boolean;
            passwordError: boolean;
            passwordNotMatchError: boolean
        }) => void;

    userIdEmptyError: boolean;
    userNameEmptyError: boolean;
    fullNameEmptyError: boolean;
    passwordEmptyError: boolean;
    confirmPasswordEmptyError: boolean;

    handleCredentialSubmit: () => void;
    handleFullSubmit: () => void;
    loading: boolean;
}

export const SignupContext = createContext<AuthContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [fullName, setFullName] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState(); //incomplete

    const [errors, setErrors] = useState({ fullNameError: false, usernameError: false, emailError: false, phoneError: false, passwordError: false, passwordNotMatchError: false });

    const [fullNameEmptyError, setFullNameEmptyError] = useState(false);
    const [userIdEmptyError, setUserIdEmptyError] = useState(false);
    const [userNameEmptyError, setUserNameEmptyError] = useState(false); //incomplete
    const [passwordEmptyError, setPasswordEmptyError] = useState(false);
    const [confirmPasswordEmptyError, setConfirmPasswordEmptyError] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //input change
    const handleFullNameChange = (input: string) => {
        setFullName(input);
        setErrors(prev => ({ ...prev, fullNameError: false }));
        setFullNameEmptyError(false);
    };

    const handleUserIdChange = (input: string) => {
        setUserId(input);
        setErrors(prev => ({ ...prev, emailError: false, phoneError: false, passwordError: false, passwordNotMatchError: false }));
        setUserIdEmptyError(false);
        setPasswordEmptyError(false);
        setConfirmPasswordEmptyError(false);

    };

    const handleUserNameChange = (input: string) => {
        setUserName(input);
        setErrors(prev => ({ ...prev, usernameError: false }));
        setUserNameEmptyError(false);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        setErrors(prev => ({ ...prev, passwordError: false, passwordNotMatchError: false }));
        setPasswordEmptyError(false);
    };

    const handleConfirmPasswordChange = (confirmPassword: string) => {
        setConfirmPassword(confirmPassword);
        setErrors(prev => ({ ...prev, confirmPasswordError: false }));
        setConfirmPasswordEmptyError(false);
    }

    //handling the errors
    const handleFullNameError = () => {
        setErrors(prev => ({ ...prev, fullNameError: !validateFullName(fullName) }));
    };

    const handleUserIdError = () => {
        setErrors(prev => ({
            ...prev,
            emailError: !validateEmail(userId),
            phoneError: !validatePhone(userId)
        }));
    };

    const handleUserNameError = () => {
        setErrors(prev => ({
            ...prev,
            usernameError: !validateUsername(userName)
        }));
    };

    const handlePasswordMismatchError = () => {
        setErrors(prev => ({ ...prev, passwordNotMatchError: !(password === confirmPassword) }));
    }

    const handlePasswordError = () => {
        setErrors(prev => ({ ...prev, passwordError: !validatePassword(password) }));
    };


    //handling the empty input errors
    const handleFullnameEmpty = () => {
        setFullNameEmptyError(true);
    };

    const handleUserIdEmpty = () => {
        setUserIdEmptyError(true);
    };

    const handleUserNameEmpty = () => {
        setUserNameEmptyError(true);
    };

    const handlePasswordEmpty = () => {
        setPasswordEmptyError(true);
    };

    const handleConfirmPasswordEmpty = () => {
        setConfirmPasswordEmptyError(true);
    };


    //validating all crendentials
    const validateCredentials = () => {
        return ((validateEmail(userId) || validatePhone(userId)) && validatePassword(password))
    }

    const validateUserInfo = () => {
        return (validateFullName(fullName) && validatePassword(password)) &&
            (validateUsername(userName)) &&
            (validateEmail(userId) || validatePhone(userId));
    };


    //intial submit button, just to check if the credential contains in the database
    const handleCredentialSubmit = async () => {
        if (userId === '') {
            handleUserIdEmpty();
        } else {
            handleUserIdError();
        }
        if (password === '') {
            handlePasswordEmpty();
        }
        else if (confirmPassword === '') {
            handleConfirmPasswordEmpty();
        }
        else {
            handlePasswordMismatchError();
        }
        if (errors.passwordNotMatchError) {
        }
        else {
            handlePasswordError();
        }


        if (!validateCredentials()) {
            console.log("Incorrectly formatted credentials, unable to make an HTTP request");
            return;
        }


        setLoading(true);
        const initialPayload = {
            identifier: userId
        };

        try {
            const response = await axios.post('http://localhost:8000/check-identifier', initialPayload);
            console.log('Identifier check successful:', response.data);
            navigate('../verifySignup');
        } catch (error) {
            console.error('Identifier check error:', error);
            setLoading(false);
        }
    };


    //final submit button, sends out all of the credentials
    const handleFullSubmit = async () => {
        if (fullName === '') {
            handleFullnameEmpty();
        } else {
            handleFullNameError();
        }
        if (userId === '') {
            handleUserIdEmpty();
            return;
        } else {
            handleUserIdError();
        }
        if (password === '') {
            handlePasswordEmpty();
            return;
        }
        else if (confirmPassword === '') {
            handleConfirmPasswordEmpty();
            return;
        }
        else {
            handlePasswordMismatchError();
        }
        if (errors.passwordNotMatchError) {
            return;
        }
        else {
            handlePasswordError();
        }

        if (!validateUserInfo()) {
            console.log("Incorrectly formatted userinfo, unable to make an HTTP request");
            return;
        }

        setLoading(true);

        const payload = {
            fullName: validateFullName(fullName) ? fullName : '',
            username: validateUsername(userName) ? userName : '',
            email: validateEmail(userId) ? userId : '',
            phoneNumber: validatePhone(userId) ? userId : '',
            password: validatePassword(password) ? password : ''
        };

        try {
            const response = await axios.post('http://localhost:8000/signup', payload);
            console.log('Signup successful:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false);
        }
    };

    return (
        <SignupContext.Provider value={{
            fullName,
            userId,
            userName,
            password,
            confirmPassword,

            handleFullNameChange,
            handleUserIdChange,
            handleUserNameChange,
            handlePasswordChange,
            handleConfirmPasswordChange,

            handleFullNameError,
            handleUserIdError,
            handleUserNameError,
            handlePasswordError,
            handlePasswordMismatchError,

            errors,
            setErrors,

            fullNameEmptyError,
            userIdEmptyError,
            userNameEmptyError,
            passwordEmptyError,
            confirmPasswordEmptyError,

            handleCredentialSubmit,
            handleFullSubmit,
            loading,
        }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignup = () => {
    const context = useContext(SignupContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};
