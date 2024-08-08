export interface SignupContextType {
    fullName: string;
    userId: string;
    userName: string;
    password: string;
    dateOfBirth: Date | null;

    dataProtection: boolean;
    profileEncryption: boolean;
    contentMonetization: boolean;
    censor: boolean;
    restricted: boolean;

    isUnderEighteen: boolean;

    handleFullNameChange: (input: string) => void;
    handleUserIdChange: (input: string) => void;
    handleUserNameChange: (input: string) => void;
    handlePasswordChange: (password: string) => void;
    handleDateOfBirthChange: (dateOfBirth: Date | null) => void;

    handleDataProtectionChange: () => void;
    handleProfileEncryptionChange: () => void;
    handleContentMonetizationChange: () => void;
    handleCensorChange: () => void;
    handleRestrictedChange: () => void;

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
    wrongCodeError: boolean;

    handleSubmit: () => void;
    handleAgeNavigation: () => void;
    handleVerification: () => void;
    loading: boolean;
    handleFeaturesSubmit: () => void;
    setVerificationCode: (code: string) => void; 
    verificationCode: string;
    handleResendCode: () => void; // New method for resending code
    resendTimer: number; // New state for resend timer
    resetResendTimer: () => void;

    token: string | null;
    handleSelectedSubmit: (selectedProfiles: { professional: boolean; personal: boolean; school: boolean }) => Promise<void>;
    handleSelectAllThree: () => Promise<void>;
}
