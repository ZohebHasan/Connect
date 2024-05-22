import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { generateKeys, prepareKeysForServer } from './keyGeneration';
import { saveToIndexedDB } from './indexedDBhelpers'; // Import the IndexedDB helper function
import { useAuth } from '../../authentication/authContext'; // Import useAuth hook
import { validateEmail, validateFullName, validatePassword, validatePhone, validateUsername } from './validator';
import { AuthContextType } from './contextTypes';

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
    const [userNameEmptyError, setUserNameEmptyError] = useState(false);
    const [passwordEmptyError, setPasswordEmptyError] = useState(false);
    const [sessionResetError, setSessionResetError] = useState(false);

    const [dateOfBirthEmptyError, setDateOfBirthEmptyError] = useState(false);
    const [underThirteenError, setUnderThirteenError] = useState(false);
    const [isUnderEighteen, setIsUnderEighteen] = useState(false);

    const [accountExistsError, setAccountExistsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [dataProtection, setDataProtection] = useState(true);
    const [profileEncryption, setProfileEncryption] = useState(true);
    const [contentMonetization, setContentMonetization] = useState(true);
    const [censor, setCensor] = useState(false);
    const [restricted, setRestricted] = useState(false);

    const [token, setToken] = useState<string | null>(null);
    const { setUser } = useAuth();

    const setCookie = (name: string, value: string, days: number) => {
        Cookies.set(name, value, { expires: days });
    };

    const getCookie = (name: string): string | undefined => {
        return Cookies.get(name);
    };

    useEffect(() => {
        const storedDataProtection = getCookie('dataProtection');
        const storedProfileEncryption = getCookie('profileEncryption');
        const storedContentMonetization = getCookie('contentMonetization');
        const storedCensor = getCookie('censor');
        const storedRestricted = getCookie('restricted');

        setDataProtection(storedDataProtection !== undefined ? storedDataProtection === 'true' : true);
        setProfileEncryption(storedProfileEncryption !== undefined ? storedProfileEncryption === 'true' : true);
        setContentMonetization(storedContentMonetization !== undefined ? storedContentMonetization === 'true' : true);
        setCensor(storedCensor !== undefined ? storedCensor === 'true' : false);
        setRestricted(storedRestricted !== undefined ? storedRestricted === 'true' : false);
    }, []);

    // Features change handlers
    const handleDataProtectionChange = () => {
        setDataProtection(prev => !prev);
    };

    const handleProfileEncryptionChange = () => {
        setProfileEncryption(prev => !prev);
    };

    const handleContentMonetizationChange = () => {
        setContentMonetization(prev => !prev);
    };

    const handleCensorChange = () => {
        setCensor(prev => !prev);
    };

    const handleRestrictedChange = () => {
        setRestricted(prev => !prev);
    };

    // Input change handlers
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
    };

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
    };

    const handlesessionResetError = () => {
        setSessionResetError(true);
    };

    const validateCredentials = () => {
        return ((validateEmail(userId) || validatePhone(userId)) && validatePassword(password) && validateFullName(fullName));
    };

    const validateUserPersonalInfo = () => {
        return (validateUsername(userName) && validateFullName(fullName) && validatePassword(password));
    };

    const validateUserInfo = () => {
        return (validateFullName(fullName) && validatePassword(password)) &&
            (validateUsername(userName)) &&
            (validateEmail(userId) || validatePhone(userId));
    };

    const handleAgeNavigation = () => {
        if (!dateOfBirth) {
            setDateOfBirthEmptyError(true);
        } else {
            const age = new Date().getFullYear() - dateOfBirth.getFullYear();
            if (age < 13) {
                setUnderThirteenError(true);
                return;
            } else {
                setUnderThirteenError(false);
            }
            if (age < 18) {
                setIsUnderEighteen(true);
                setProfileEncryption(true);
                setRestricted(true);
                setDataProtection(true);
                setCensor(true);
                setContentMonetization(true);
                navigate("./userInfo");
            } else {
                setIsUnderEighteen(false);
                navigate("./userInfo");
            }
        }
    };

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
            contentMonetization: contentMonetization,
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
            setUser(response.data.user); // Set the authenticated user

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

    const handleVerification = async () => {
        if (dateOfBirth !== null) {
            const age = new Date().getFullYear() - dateOfBirth.getFullYear();

            if (age < 18) {
                navigate("./profiles");
            } else {
                navigate("./features");
            }
        }
    };

    const handleFeaturesSubmit = async () => {
        const payload = {
            dataProtection,
            profileEncryption,
            contentMonetization,
            censor,
            restricted,
        };

        try {
            const response = await axios.post('http://localhost:8000/changeFeatures', payload, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Set cookies with new state values
            setCookie('dataProtection', dataProtection.toString(), 7);
            setCookie('profileEncryption', profileEncryption.toString(), 7);
            setCookie('contentMonetization', contentMonetization.toString(), 7);
            setCookie('censor', censor.toString(), 7);
            setCookie('restricted', restricted.toString(), 7);
            navigate("./profiles")
        } catch (error) {
            
            console.error('Error updating features:', error);
        }
    };

    return (
        <SignupContext.Provider value={{
            fullName,
            userId,
            userName,
            password,
            dateOfBirth,

            dataProtection,
            profileEncryption,
            contentMonetization,
            censor,
            restricted,

            isUnderEighteen,

            handleFullNameChange,
            handleUserIdChange,
            handleUserNameChange,
            handlePasswordChange,
            triggerDateOfBirthErrors,
            sessionResetError,

            handleDataProtectionChange,
            handleProfileEncryptionChange,
            handleContentMonetizationChange,
            handleCensorChange,
            handleRestrictedChange,

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
            handleVerification,
            loading,
            token, // Add token here
            handleFeaturesSubmit
        }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignup = () => {
    const context = useContext(SignupContext);
    if (context === undefined) {
        throw new Error('useSignup must be used within a SignupProvider');
    }
    return context;
};
