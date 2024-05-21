import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateKeys, prepareKeysForServer } from './keyGeneration';
import { saveToIndexedDB } from './indexedDBhelpers'; // Import the IndexedDB helper function


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
    dateOfBirth: Date | null;

    isUnderEighteen: boolean;

    handleFullNameChange: (input: string) => void;
    handleUserIdChange: (input: string) => void;
    handleUserNameChange: (input: string) => void;
    handlePasswordChange: (password: string) => void;
    handleDateOfBirthChange: (dateOfBirth: Date | null) => void;

    triggerDateOfBirthErrors: () => void;


    errors: {
        fullNameError: boolean,
        usernameError: boolean;
        emailError: boolean;
        phoneError: boolean;
        passwordError: boolean;

    };


    underThirteenError: boolean;
    userIdEmptyError: boolean;
    userNameEmptyError: boolean;
    fullNameEmptyError: boolean;
    passwordEmptyError: boolean;
    accountExistsError: boolean;
    dateOfBirthEmptyError: boolean;
    sessionResetError: boolean;

    handleSubmit: () => void;
    handleAgeNavigation: () => void;
    // handleFullSubmit: () => void;
    loading: boolean;
}

export const SignupContext = createContext<AuthContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [fullName, setFullName] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

    const [errors, setErrors] = useState({ fullNameError: false, usernameError: false, emailError: false, phoneError: false, passwordError: false });

    const [fullNameEmptyError, setFullNameEmptyError] = useState(false);
    const [userIdEmptyError, setUserIdEmptyError] = useState(false);
    const [userNameEmptyError, setUserNameEmptyError] = useState(false); //incomplete
    const [passwordEmptyError, setPasswordEmptyError] = useState(false);
    const [sessionResetError, setSessionResetError] = useState(false)

    const [dateOfBirthEmptyError, setDateOfBirthEmptyError] = useState(false);
    const [underThirteenError, setUnderThirteenError] = useState(false);
    const [isUnderEighteen, setIsUnderEighteen] = useState(false);

    const [accountExistsError, setAccountExistsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [dataProtection, setDataProtection] = useState(true);
    const [profileEncryption, setProfileEncryption] = useState(true);
    const [contentMonitization, setContentMonitization] = useState(true);
    const [censor, setCensor] = useState(false);
    const [restricted, setRestricted] = useState(false);


    //input change
    const handleFullNameChange = (input: string) => {
        setFullName(input);
        setErrors(prev => ({ ...prev, fullNameError: false }));
        setFullNameEmptyError(false);


    };

    const handleUserIdChange = (input: string) => {
        setUserId(input);
        setErrors(prev => ({ ...prev, emailError: false, phoneError: false, passwordError: false }));
        setUserIdEmptyError(false);
        setPasswordEmptyError(false);
        setAccountExistsError(false);
    };

    const handleUserNameChange = (input: string) => {
        setUserName(input);
        setErrors(prev => ({ ...prev, usernameError: false }));
        setUserNameEmptyError(false);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        setErrors(prev => ({ ...prev, passwordError: false }));
        setPasswordEmptyError(false);
    };



    const handleDateOfBirthChange = (date: Date | null) => {
        setDateOfBirth(date);
        setDateOfBirthEmptyError(false);
        setUnderThirteenError(false);
    };

    const triggerDateOfBirthErrors = () => {
        setDateOfBirthEmptyError(false);
        setUnderThirteenError(false);
    }


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



    const handlePasswordError = () => {
        setErrors(prev => ({ ...prev, passwordError: !validatePassword(password) }));
    };


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


    const handleAccountExistsError = () => {
        setAccountExistsError(true);
    }

    const handlesessionResetError = () => {
        setSessionResetError(true);
    }

    const validateCredentials = () => {
        return ((validateEmail(userId) || validatePhone(userId)) && validatePassword(password) && validateFullName(fullName))
    }

    const validateUserPersonalInfo = () => {
        return (validateUsername(userName) && validateFullName(fullName) && validatePassword(password));
    }
    const validateUserInfo = () => {
        return (validateFullName(fullName) && validatePassword(password)) &&
            (validateUsername(userName)) &&
            (validateEmail(userId) || validatePhone(userId));
    };

    const handleAgeNavigation = () => {
        if (!dateOfBirth) {
            setDateOfBirthEmptyError(true);
        }
        else {
            const age = new Date().getFullYear() - dateOfBirth.getFullYear();
            if (age < 13) {
                setUnderThirteenError(true);
                return;
            }
            else {
                setUnderThirteenError(false);
            }
            if (age < 18) {
                setIsUnderEighteen(true);
                setProfileEncryption(true);
                setRestricted(true);
                setDataProtection(true);
                setCensor(true);
                setContentMonitization(true);
                navigate("./userInfo")
            }
            else {
                setIsUnderEighteen(false);
                navigate("./userInfo")
            }
        }
    }
    const handleSubmit = async () => {
        if (!dateOfBirth) {
            setSessionResetError(true);
    
            setTimeout(() => {
                navigate("./ageVerification");
                setSessionResetError(false);
                console.log("user fields are empty");
            }, 1000);
        }
        if (fullName !== '') {
            handleFullNameError();
        } else {
            handleFullnameEmpty();
        }
    
        if (userId === '') {
            handleUserIdEmpty();
        } else {
            handleUserIdError();
        }
        if (password === '') {
            handlePasswordEmpty();
        } else {
            handlePasswordError();
        }
        if (dateOfBirth) {
            const age = new Date().getFullYear() - dateOfBirth.getFullYear();
            if (age < 13) {
                return;
            } else {
                if (!validateCredentials()) {
                    console.log("Invalid Credentials");
                    return;
                }
            }
        } else {
            return;
        }
    
        setLoading(true);
        const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    
        // Generate keys
        const keys = await generateKeys();
        const serverReadyKeys = await prepareKeysForServer(keys);
    
        const payload = {
            fullName: validateFullName(fullName) ? fullName : '',
            email: validateEmail(userId) ? userId : '',
            phoneNumber: validatePhone(userId) ? userId : '',
            password: validatePassword(password) ? password : '',
            dateProtection: dataProtection,
            profileEncryption: profileEncryption,
            contentMonitization: contentMonitization,
            censor: censor,
            restricted: restricted,
            age: age,
            dateOfBirth: dateOfBirth ? dateOfBirth : null,
            keys: serverReadyKeys,
        };
    
        try {
            const response = await axios.post('http://localhost:8000/signup', payload);
    
            console.log('Signup successful:', response.data);
    
            await saveToIndexedDB('identityKeyPair', keys.identityKeyPair);
            await saveToIndexedDB('signedPreKey', keys.signedPreKey);
            await saveToIndexedDB('senderKey', keys.senderKey);
    
            navigate('./idVerification');
        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false);
            handleAccountExistsError();
        }
    };
    


    return (
        <SignupContext.Provider value={{
            fullName,
            userId,
            userName,
            password,
            dateOfBirth,

            isUnderEighteen,

            handleFullNameChange,
            handleUserIdChange,
            handleUserNameChange,
            handlePasswordChange,
            triggerDateOfBirthErrors,
            sessionResetError,

            handleDateOfBirthChange,

            errors,

            fullNameEmptyError,
            userIdEmptyError,
            userNameEmptyError,
            passwordEmptyError,
            accountExistsError,
            underThirteenError,
            dateOfBirthEmptyError,

            handleSubmit,
            handleAgeNavigation,
            // handleFullSubmit,
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