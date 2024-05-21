import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateKeys, prepareKeysForServer } from './keyGeneration';
import { saveToIndexedDB } from './indexedDBhelpers'; // Import the IndexedDB helper function
import { AuthContextType } from './contextTypes';
import { validateEmail, validateFullName, validatePassword, validatePhone, validateUsername } from './validator';
import {
    handleFullNameChange, handleUserIdChange, handleUserNameChange, handlePasswordChange, handleDateOfBirthChange,
    triggerDateOfBirthErrors, handleFullNameError, handleUserIdError, handleUserNameError, handlePasswordError,
    handleFullnameEmpty, handleUserIdEmpty, handleUserNameEmpty, handlePasswordEmpty, handleAccountExistsError,
    handleSessionResetError
} from './handlers';

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

    const [token, setToken] = useState<string | null>(null);

    //features change
    const handleDataProtectionChange = () => {
        setDataProtection(prev => !prev);
    };

    const handleProfileEncryptionChange = () => {
        setProfileEncryption(prev => !prev);
    };

    const handleContentMonitizationChange = () => {
        setContentMonitization(prev => !prev);
    };

    const handleCensorChange = () => {
        setCensor(prev => !prev);
    };

    const handleRestrictedChange = () => {
        setRestricted(prev => !prev);
    };

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
            handleFullNameError(fullName, setErrors);
        } else {
            handleFullnameEmpty(setFullNameEmptyError);
        }

        if (userId === '') {
            handleUserIdEmpty(setUserIdEmptyError);
        } else {
            handleUserIdError(userId, setErrors);
        }
        if (password === '') {
            handlePasswordEmpty(setPasswordEmptyError);
        } else {
            handlePasswordError(password, setErrors);
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
            const response = await axios.post('http://localhost:8000/signup', payload, {
                withCredentials: true // To include cookies in the request
            });

            console.log('Signup successful:', response.data);

            // Save JWT token
            setToken(response.data.token);

            await saveToIndexedDB('identityKeyPair', keys.identityKeyPair);
            await saveToIndexedDB('signedPreKey', keys.signedPreKey);
            await saveToIndexedDB('senderKey', keys.senderKey);

            navigate('./idVerification');
        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false);
            handleAccountExistsError(setAccountExistsError);
        }
    };

    const handleVerification = async () => {
        if (dateOfBirth !== null) {
            const age = new Date().getFullYear() - dateOfBirth.getFullYear();

            if (age < 18) {
                navigate("./profiles")
            }
            else {
                navigate("./features")
            }
        }
    }

    const handleFeaturesSubmit = async () => {
        const payload = {
            dateProtection: dataProtection,
            profileEncryption: profileEncryption,
            contentMonitization: contentMonitization,
            censor: censor,
            restricted: restricted,
        };
    }

    return (
        <SignupContext.Provider value={{
            fullName,
            userId,
            userName,
            password,
            dateOfBirth,

            dataProtection,
            profileEncryption,
            contentMonitization,
            censor,
            restricted,

            isUnderEighteen,

            handleFullNameChange: (input) => handleFullNameChange(input, setFullName, setErrors, setFullNameEmptyError),
            handleUserIdChange: (input) => handleUserIdChange(input, setUserId, setErrors, setUserIdEmptyError, setPasswordEmptyError, setAccountExistsError),
            handleUserNameChange: (input) => handleUserNameChange(input, setUserName, setErrors, setUserNameEmptyError),
            handlePasswordChange: (password) => handlePasswordChange(password, setPassword, setErrors, setPasswordEmptyError),
            handleDateOfBirthChange: (date) => handleDateOfBirthChange(date, setDateOfBirth, setDateOfBirthEmptyError, setUnderThirteenError),
            triggerDateOfBirthErrors: () => triggerDateOfBirthErrors(setDateOfBirthEmptyError, setUnderThirteenError),

            handleDataProtectionChange,
            handleProfileEncryptionChange,
            handleContentMonitizationChange,
            handleCensorChange,
            handleRestrictedChange,

            errors,

            fullNameEmptyError,
            userIdEmptyError,
            userNameEmptyError,
            passwordEmptyError,
            accountExistsError,
            underThirteenError,
            dateOfBirthEmptyError,
            sessionResetError,

            handleSubmit,
            handleAgeNavigation,
            handleVerification,
            loading,
            token,
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
