export const validateFullName = (fullName: string): boolean => {
    const validChars = /^[a-zA-Z\s]+$/.test(fullName);
    const noLeadingTrailing = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/.test(fullName);
    const noConsecutiveSpaces = !(/[\s]{2,}/.test(fullName));
    const lengthValid = fullName.length >= 1 && fullName.length <= 50;
    return validChars && noLeadingTrailing && noConsecutiveSpaces && lengthValid;
};

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone: string): boolean => /^\d{10}$/.test(phone.replace(/[^0-9]/g, ''));
export const validateUsername = (username: string): boolean => {
    const validChars = /^[a-zA-Z0-9._]+$/.test(username);
    const noConsecutiveDots = !/\.\./.test(username);
    const noStartEndDot = !/^\.|\.+$/.test(username);
    const lengthValid = username.length >= 1 && username.length <= 30;
    const hasLetters = /[a-zA-Z]/.test(username);
    return validChars && noConsecutiveDots && noStartEndDot && lengthValid && hasLetters;
};
export const validatePassword = (password: string): boolean => /\d/.test(password) && password.length >= 6;
