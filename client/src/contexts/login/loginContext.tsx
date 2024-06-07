import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getFromIndexedDB, saveToIndexedDB } from '../indexedDBhelpers';
import { generateKeys, prepareKeysForServer } from '../keyGeneration'; // Ensure correct import paths
import { useAuth } from '../authentication/authContext'; // Ensure correct import path

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
    userIdEmptyError: boolean;
    incorrectCredentials: boolean;
    wrongCodeError: boolean;
    setErrors: (errors: { usernameError: boolean; emailError: boolean; phoneError: boolean; passwordError: boolean }) => void;
    handleSubmit: () => void;
    loading: boolean;
    handleVerification: () => void;
    setVerificationCode: (code: string) => void; 
    verificationCode: string;
    handleResendCode: () => void; // New method for resending code
    resendTimer: number; // New state for resend timer
    resetResendTimer: () => void;
}

export const LoginContext = createContext<AuthContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ usernameError: false, emailError: false, phoneError: false, passwordError: false });
    const [userIdEmptyError, setUserIdEmptyError] = useState(false);
    const [passwordEmptyError, setPasswordEmptyError] = useState(false);
    const [wrongCodeError, setWrongCodeError] = useState(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [incorrectCredentials, setIncorrectCredentials] = useState(false);
    const { setUser, setToken } = useAuth(); 


    const [verificationEmail, setVerificationEmail] = useState<string>(''); // Add state for email
    const [verificationPhone, setVerificationPhone] = useState<string>('');
    const [verificationCode, setVerificationCodeState] = useState<string>('');
    const [resendTimer, setResendTimer] = useState(20);

  

    const setVerificationCode = (code: string) => {
        setVerificationCodeState(code); // Set the code in the state
    };

    const resetResendTimer = () => {
        setResendTimer(20);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleResendCode = async () => {
        if (resendTimer > 0) return; // Prevent resending if timer is not finished
        setWrongCodeError(false); 

        try {
            console.log(verificationEmail, verificationPhone);
            if (validateEmail(userId)) {
                await axios.post('http://localhost:8000/verification/send_email', { email: verificationEmail });
            } else if (validatePhone(userId)) {
                await axios.post('http://localhost:8000/verification/send_sms', { phone: verificationPhone });
            }
            setResendTimer(20); // Reset the timer to 20 seconds
        } catch (error) {
            console.error('Resend code error:', error);
        }
    };


    const handleUserIdChange = (input: string) => {
        setUserId(input);
        setErrors({
            usernameError: false,
            emailError: false,
            phoneError: false,
            passwordError: errors.passwordError
        });

        setUserIdEmptyError(false);
        setPasswordEmptyError(false);
        setIncorrectCredentials(false);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        setErrors({
            usernameError: errors.usernameError,
            emailError: errors.emailError,
            phoneError: errors.phoneError,
            passwordError: false
        });
        setUserIdEmptyError(false);
        setPasswordEmptyError(false);
        setIncorrectCredentials(false);

    };


    // Error handling
    const handleUserIdError = () => {
        setErrors({
            usernameError: !validateUsername(userId),
            emailError: !validateEmail(userId),
            phoneError: !validatePhone(userId),
            passwordError: false
        });
    };
    const handlePasswordError = () => {
        setErrors(prev => ({ ...prev, passwordError: !validatePassword(password) }));
    };

   
 

    const handleUserIdEmpty = () => {
        setUserIdEmptyError(true);
    };
    const handlePasswordEmpty = () => {
        setPasswordEmptyError(true);
    };

    const validateCredentials = () => {
        return (validateEmail(userId) || validatePhone(userId) || validateUsername(userId)) && validatePassword(password);
    };

    const handleVerification = async () => {
        try {
            let response;
            if (validateEmail(userId)) {
                response = await axios.post('http://localhost:8000/verification/verify_email', { email: verificationEmail, code: verificationCode });
                console.log('Code verified:', response.data);
            } else if (validatePhone(userId)) {
                response = await axios.post('http://localhost:8000/verification/verify_sms', { phone: verificationPhone, code: verificationCode });
                console.log('Code verified:', response.data);
            }
            navigate("/home");
            
        }  catch (error: any) {
            console.error('Code verification error:', error);
            if(error.response.status === 400){
                setWrongCodeError(true);
            }
        }
    };





    const handleSubmit = async () => {
        if (userId !== '') {
            handleUserIdError();
        } else {
            handleUserIdEmpty();
        }

        if (password !== '') {
            handlePasswordError();
        } else {
            handlePasswordEmpty();
        }

        if (userId === '' && password === '') {
            handleUserIdEmpty();
            handlePasswordEmpty();
            return;
        }

        if (!validateCredentials()) {
            console.log("incorrectly formatted credentials, unable to make an http request");
            return;
        }

        setLoading(true);

        const payload = {
            identifier: userId.trim(),
            password
        };

        console.log(payload);
        try {
            const response = await axios.post('http://localhost:8000/login', payload, {
                withCredentials: true // Ensure cookies are included
            });

            console.log('Login successful:', response.data);

            // Save JWT token in local state or context
            setToken(response.data.token);
            setUser(response.data.user);

            // // Check if keys are already stored in IndexedDB
            // const identityKeyPair = await getFromIndexedDB('identityKeyPair');
            // const signedPreKey = await getFromIndexedDB('signedPreKey');
            // const senderKey = await getFromIndexedDB('senderKey');

            // // If keys are missing, generate new keys and send them to the server
            // if (!identityKeyPair || !signedPreKey || !senderKey) {
            //     const keys = await generateKeys();
            //     const serverReadyKeys = await prepareKeysForServer(keys);

            //     // Send the new keys to the server
            //     await axios.post('http://localhost:8000/api/auth/updateKeys', {
            //         userId: response.data.user._id,
            //         keys: serverReadyKeys
            //     });

            //     // Save new keys to IndexedDB
            //     await saveToIndexedDB('identityKeyPair', keys.identityKeyPair);
            //     await saveToIndexedDB('signedPreKey', keys.signedPreKey);
            //     await saveToIndexedDB('senderKey', keys.senderKey);
            // }

            if (validateEmail(userId)) {
                const email = payload.identifier;
                setVerificationEmail(email);
                console.log(email, verificationEmail);
                await axios.post('http://localhost:8000/verification/send_email', { email });
            } else if (validatePhone(userId)) {
                const phone = `+91${payload.identifier}`;
                setVerificationPhone(phone);
                console.log(phone, verificationPhone);
                await axios.post('http://localhost:8000/verification/send_sms', { phone });
            }

            navigate('twoStep');
        } catch (error) {
            console.error('Login error:', error);
            setLoading(false);
            setIncorrectCredentials(true);
        }
    };

    return (
        <LoginContext.Provider value={{
            userId, password,
            handleUserIdChange, handlePasswordChange,
            handleUserIdError, handlePasswordError,
            errors, setErrors, handleSubmit, loading,
            userIdEmptyError, passwordEmptyError, incorrectCredentials,
            wrongCodeError,
            handleVerification,
            verificationCode,
            setVerificationCode, 
            handleResendCode,
            resendTimer,
            resetResendTimer,
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
