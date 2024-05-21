import { validateEmail, validateFullName, validatePassword, validatePhone, validateUsername } from './validator';
import { Dispatch, SetStateAction } from 'react';

export const handleFullNameChange = (input: string, setFullName: Dispatch<SetStateAction<string>>, setErrors: Dispatch<SetStateAction<any>>, setFullNameEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setFullName(input);
    setErrors((prev: any) => ({ ...prev, fullNameError: false }));
    setFullNameEmptyError(false);
};

export const handleUserIdChange = (input: string, setUserId: Dispatch<SetStateAction<string>>, setErrors: Dispatch<SetStateAction<any>>, setUserIdEmptyError: Dispatch<SetStateAction<boolean>>, setPasswordEmptyError: Dispatch<SetStateAction<boolean>>, setAccountExistsError: Dispatch<SetStateAction<boolean>>) => {
    setUserId(input);
    setErrors((prev: any) => ({ ...prev, emailError: false, phoneError: false, passwordError: false }));
    setUserIdEmptyError(false);
    setPasswordEmptyError(false);
    setAccountExistsError(false);
};

export const handleUserNameChange = (input: string, setUserName: Dispatch<SetStateAction<string>>, setErrors: Dispatch<SetStateAction<any>>, setUserNameEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setUserName(input);
    setErrors((prev: any) => ({ ...prev, usernameError: false }));
    setUserNameEmptyError(false);
};

export const handlePasswordChange = (password: string, setPassword: Dispatch<SetStateAction<string>>, setErrors: Dispatch<SetStateAction<any>>, setPasswordEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setPassword(password);
    setErrors((prev: any) => ({ ...prev, passwordError: false }));
    setPasswordEmptyError(false);
};

export const handleDateOfBirthChange = (date: Date | null, setDateOfBirth: Dispatch<SetStateAction<Date | null>>, setDateOfBirthEmptyError: Dispatch<SetStateAction<boolean>>, setUnderThirteenError: Dispatch<SetStateAction<boolean>>) => {
    setDateOfBirth(date);
    setDateOfBirthEmptyError(false);
    setUnderThirteenError(false);
};

export const triggerDateOfBirthErrors = (setDateOfBirthEmptyError: Dispatch<SetStateAction<boolean>>, setUnderThirteenError: Dispatch<SetStateAction<boolean>>) => {
    setDateOfBirthEmptyError(false);
    setUnderThirteenError(false);
};

export const handleFullNameError = (fullName: string, setErrors: Dispatch<SetStateAction<any>>) => {
    setErrors((prev: any) => ({ ...prev, fullNameError: !validateFullName(fullName) }));
};

export const handleUserIdError = (userId: string, setErrors: Dispatch<SetStateAction<any>>) => {
    setErrors((prev: any) => ({
        ...prev,
        emailError: !validateEmail(userId),
        phoneError: !validatePhone(userId)
    }));
};

export const handleUserNameError = (userName: string, setErrors: Dispatch<SetStateAction<any>>) => {
    setErrors((prev: any) => ({
        ...prev,
        usernameError: !validateUsername(userName)
    }));
};

export const handlePasswordError = (password: string, setErrors: Dispatch<SetStateAction<any>>) => {
    setErrors((prev: any) => ({ ...prev, passwordError: !validatePassword(password) }));
};

export const handleFullnameEmpty = (setFullNameEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setFullNameEmptyError(true);
};

export const handleUserIdEmpty = (setUserIdEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setUserIdEmptyError(true);
};

export const handleUserNameEmpty = (setUserNameEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setUserNameEmptyError(true);
};

export const handlePasswordEmpty = (setPasswordEmptyError: Dispatch<SetStateAction<boolean>>) => {
    setPasswordEmptyError(true);
};

export const handleAccountExistsError = (setAccountExistsError: Dispatch<SetStateAction<boolean>>) => {
    setAccountExistsError(true);
};

export const handleSessionResetError = (setSessionResetError: Dispatch<SetStateAction<boolean>>) => {
    setSessionResetError(true);
};
