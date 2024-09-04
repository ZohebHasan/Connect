import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';




import { useConnectUser } from '../ConnectUser/connectUserProvider';

// Define the interfaces
interface UserProfile {
    userId: string;
    name?: string;
    userName: string; //need to add in the controller
    isVerified?: boolean;
    profilePhoto?: string;
}

export interface Course {
    course: string;
    courseName: string;
    courseCode: string;
    instructor: UserProfile[];
    TAs: UserProfile[];
    courseId: string;
    isStudentLed: boolean;
}

interface Campus {
    school?: string; // This will hold the ObjectId as a string
    name?: string;
    domain?: string;
    isVerified?: boolean;
    profilePhoto?: string;
}

interface School {
    school: string;
    name: string;
    domain: string;
}

interface Student {
    degree?: string;
    major?: string;
    year?: string;
}

interface Faculty {
    position?: string;
    discipline?: string;
    office?: string;
}

interface Alumni {
    major?: string;
    graduationYear?: string;
}

interface Staff {
    department?: string;
    position?: string;
    office?: string;
}

interface SchoolProfileData {
    followers: string[];
    following: string[];
    bio: string;
    profilePhoto: string;
    campus: Campus;
    courses?: Course[];
    userType: 'Student' | 'Faculty' | 'Alumni' | 'Staff';
    studentData?: Student;
    facultyData?: Faculty;
    alumniData?: Alumni;
    staffData?: Staff;
    verifiedSchoolEmail: boolean;
    schoolEmail: string;
}

// interface SchoolCampusData {
//     verifiedSchoolEmail: boolean;
//     schoolEmail: string;
//     userType: 'Student' | 'Faculty' | 'Alumni' | 'Staff';
//     campus: Campus;
// }

// Define the context type
interface SchoolProfileContextType {
    schoolProfile?: SchoolProfileData;
    // campusData?: SchoolCampusData;
    activeCourse: Course | null;
    setActiveCourse: (courseCode: string) => void;
    toggleCourseBar: () => void;
    isCourseBarOpen: boolean;
    // fetchCampusData: () => void;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    isUniversitySelected: boolean;
    isEmailSet: boolean;
    isEmailVerified: boolean;
    isUserTypeSelected: boolean;

    handleUniversitySelection: () => void;
    handleEmailSet: () => void;

    setUniversitySelectionFalse: () => void;
    handleEmailSetFalse: () => void;
    handleEmailVerified: () => void;
    handleEmailVerifiedFalse: () => void;
    handleUserTypeSelected: () => void;

    handleUniversityNameChange: (value: string) => void;
    universityName: string;

    submitUniversity: () => void;
    universityError: boolean;
    connectionError: boolean;
    loading: boolean;
    setLoadingOn: () => void;
    setLoadingOff: () => void;

    profileLoading: boolean;
    setProfileLoadingOn: () => void;
    setProfileLoadingOff: () => void;

    handleEmailChange: (value: string) => void;
    handleUniversityMailSubmit: () => void;
    schoolEmail: string;
    schoolEmailError: boolean;
    schoolEmailEmptyError: boolean;
    notEduEmailError: boolean;

    handleResendCode: () => void;

    verificationCodeEmptyError: boolean;
    verificationCodeError: boolean;
    incorrectCodeError: boolean;
    expiredCodeError: boolean;

    handleCodeSubmission: () => void;

    handleVerificationCodeChange: (value: string) => void;
    verificationCode: string;

    handleUserTypeSubmission: () => void;
    userType: 'Student' | 'Faculty' | 'Staff' | 'Alumni' | '';
    handleUserTypeChange: (type: 'Student' | 'Faculty' | 'Staff' | 'Alumni') => void;

    fetchProfileData: () => void;

    isCourseSearchAddBarOpen: boolean;
    openCourseSearchAddBar: () => void;
    closeCourseSearchAddBar: () => void;


    isSearchBarActive: boolean;
    activateSearchBar: () => void;
    activateCreateBar: () => void;

    userExistsError: boolean;
    isViolatingPolicy: boolean;
    doesNeedHelp: boolean;

    handleUniversityEmailDelete: () => void;

    handleUniversityDelete: () => void;
    activeState: string;
    handleSetActiveState: (state: string) => void;

    togglePrivate: () => void;
    handleCourseNameChange: (value: string) => void;
    handleCourseCodeChange: (value: string) => void;
    handleInstructorKeywordChange: (value: string) => void;
    handleTAKeywordChange: (value: string) => void;

    isPrivate: boolean;
    courseName: string;
    courseCode: string;
    instructorKeyword: string;
    taKeyword: string;

    courseCodeEmptyError: boolean;
    courseNameEmptyError: boolean;

    handleCourseCreationSubmit: () => void;


}

// Create the context with a default value
const SchoolProfileContext = createContext<SchoolProfileContextType | undefined>(undefined);

// Custom hook to use the context
export const useSchoolProfile = () => {
    const context = useContext(SchoolProfileContext);
    if (!context) {
        throw new Error('useSchoolProfile must be used within a SchoolProfileProvider');
    }
    return context;
};

// Provider component
export const SchoolProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { username } = useParams<{ username: string }>();
    const { user } = useConnectUser();
    const navigate = useNavigate();  // Get the navigate function

    const [schoolProfile, setSchoolProfile] = useState<SchoolProfileData | undefined>(undefined);
    // const [campusData, setCampusData] = useState<SchoolCampusData | undefined>(undefined);
    const [activeCourse, setActiveCourseState] = useState<Course | null>(null);
    const [isCourseBarOpen, setIsCourseBarOpen] = useState<boolean>(false);
    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);

    const [universityName, setUniversityName] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);


    const [universityError, setUniversityError] = useState(false);
    const [connectionError, setConnectionError] = useState(false);


    const [isUniversitySelected, setSelectUniversity] = useState(false);
    const [isEmailSet, setIsEmailSet] = useState(false);
    const [isEmailVerified, setEmailVerified] = useState(false);
    const [isUserTypeSelected, setUserTypeSelected] = useState(false);

    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolEmailError, setSchoolEmailError] = useState(false);
    const [schoolEmailEmptyError, setSchoolEmailEmptyError] = useState(false);
    const [notEduEmailError, setNotEduEmailError] = useState(false);

    const [verificationCode, setverificationCode] = useState("");

    const [verificationCodeEmptyError, setVerificationCodeEmptyError] = useState(false);
    const [verificationCodeError, setVerificationCodeError] = useState(false);

    const [incorrectCodeError, setIncorrectCodeError] = useState(false);
    const [expiredCodeError, setExpiredCodeError] = useState(false);

    const [userType, setUserType] = useState<'Student' | 'Faculty' | 'Staff' | 'Alumni' | ''>('');

    const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateCode = (code: string): boolean => /^\d{6}$/.test(code);

    const setLoadingOn = () => setLoading(true);
    const setLoadingOff = () => setLoading(false);

    const setProfileLoadingOn = () => setProfileLoading(true);
    const setProfileLoadingOff = () => setProfileLoading(false);

    const [isCourseSearchAddBarOpen, setCourseSearchAddBar] = useState(false);

    const [isSearchBarActive, setIsSearchBarActive] = useState(true);

    const [userExistsError, setUserExistsError] = useState(false);

    const [isViolatingPolicy, setIsViolatingPolicy] = useState(false);
    const [doesNeedHelp, setDoesNeedHelp] = useState(false);

    const [activeState, setActiveState] = useState('courses');

    const [isPrivate, setIsPrivate] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [instructorKeyword, setInstructorKeyword] = useState("");
    const [taKeyword, setTAKeyword] = useState("");
    const [courseCodeEmptyError, setCourseCodeEmptyError] = useState(false);
    const [courseNameEmptyError, setCourseNameEmptyError] = useState(false);

    const [schoolData, setSchoolData] = useState<School>({
        school: '',
        name: '',
        domain: ''
    });


    const handleCourseCreationSubmit = async () => {
        if (!courseName) {
            setCourseNameEmptyError(true);
            return;
        } else if (!courseCode) {
            setCourseCodeEmptyError(true);
            return;
        } else {
            setLoading(true);
    
            // Populate schoolData with values from schoolProfile
            // const schoolData: School = {
            //     name: schoolProfile?.campus?.name ?? '',
            //     domain: schoolProfile?.campus?.domain ?? '',
            //     school: schoolProfile?.campus?.school ?? ''
            // };
    
            // Prepare the payload based on the userType
            let payload: any = {
                courseName: courseName,
                courseCode: courseCode,
                // isStudentLed: schoolProfile?.userType === 'Student',
                // createdBy: user?.userId,
                // instructor: [],
                // students: [],
                // TAs: [],  // Keep the TAs array empty for now
                isPrivate: isPrivate,
                // school: schoolData
            };
    
            // Assign the current user's userId to the appropriate field
            // if (schoolProfile?.userType === 'Student') {
            //     payload.students.push(user?.userId);  // Add userId to students array
            // } else if (schoolProfile?.userType === 'Staff' || schoolProfile?.userType === 'Faculty') {
            //     payload.instructor.push(user?.userId);  // Add userId to instructor array
            // }
    
            try {
                // Make the API call
                const response = await axios.post('http://localhost:8000/currentUserSchool/createCourse', payload, {
                    withCredentials: true,  // Include credentials in the request
                });
    
                console.log('Course created successfully:', response.data);
                setCourseSearchAddBar(false);
                // Handle successful course creation (e.g., navigate to the course page or show a success message)
            } catch (error) {
                setConnectionError(true);
                console.error('Failed to create course:', error);
                // Handle error (e.g., show an error message to the user)
            } finally {
                setLoading(false);
            }
        }
    };
    
    const togglePrivate = () => {
        setIsPrivate(prev => !prev);
    };

    const handleCourseNameChange = (value: string) => {
        setCourseNameEmptyError(false);
        setCourseName(value);
    }

    const handleCourseCodeChange = (value: string) => {
        setCourseCodeEmptyError(false);
        setCourseCode(value);
    }
    const handleInstructorKeywordChange = (value: string) => {
        setInstructorKeyword(value);
    }

    const handleTAKeywordChange = (value: string) => {
        setTAKeyword(value);
    }


    const handleSetActiveState = (state: string) => {
        setActiveState(state);
        switch (state) {
            case 'campus':
                navigate(`/school/${username}/campus`);
                break;
            case 'clubsAndOrgs':
                navigate(`/school/${username}/clubsAndOrgs`);
                break;
            case 'courses':
                navigate(`/school/${username}/courses`);
                break;
            case 'addUniversity':
                navigate(`/school/${username}/profileSetup/addUniversity`);
                break;
            case 'addSchoolEmail':
                navigate(`/school/${username}/profileSetup/addSchoolEmail`);
                break;
            case 'verifySchoolEmail':
                navigate(`/school/${username}/profileSetup/verifySchoolEmail`);
                break;
            case 'addUserType':
                navigate(`/school/${username}/profileSetup/addUserType`);
                break;
            default:
                // navigate(`/school/${username}/courses`);
                break;
        }
    };


    const activateCreateBar = () => {
        setIsSearchBarActive(false);
    }

    const activateSearchBar = () => {
        setIsSearchBarActive(true);
    }


    const openCourseSearchAddBar = () => {
        setCourseSearchAddBar(true);
    };

    const closeCourseSearchAddBar = () => {
        setCourseSearchAddBar(false);
    }

    const handleVerificationCodeChange = (value: string) => {
        setVerificationCodeEmptyError(false);
        setVerificationCodeError(false);
        setIncorrectCodeError(false);
        setExpiredCodeError(false);
        setConnectionError(false);
        const formattedValue = value.replace(/\s+/g, '');
        setverificationCode(formattedValue);
    };


    const handleUniversityNameChange = (value: string) => {
        setUniversityError(false);

        const formattedName = value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        setUniversityName(formattedName);
    };


    const handleEmailChange = (input: string) => {
        const lowerCaseEmail = input.toLowerCase();
        setSchoolEmail(lowerCaseEmail);
        setSchoolEmailError(false);
        setSchoolEmailEmptyError(false);
        setNotEduEmailError(false);
        setConnectionError(false);
        setUserExistsError(false);
        setIsViolatingPolicy(false);
        setDoesNeedHelp(false);
    };


    const handleUniversitySelection = () => {
        navigate(`./profileSetup/addSchoolEmail`);
    };

    const setUniversitySelectionFalse = () => {
        navigate(`./profileSetup/addUniversity`);

    }

    const handleEmailSet = () => {
        navigate(`./profileSetup/verifySchoolEmail`);
    };

    const handleEmailSetFalse = () => {
        navigate(`./profileSetup/addSchoolEmail`);
    };

    const handleEmailVerified = () => {
        navigate(`./profileSetup/addUserType`);

    };

    const handleEmailVerifiedFalse = () => {
        navigate(`./profileSetup/addSchoolEmail`);
    }

    const handleUserTypeSelected = () => {
        navigate(`/school/${username}/`);

    }

    const submitUniversity = async () => {
        if (!universityName) {
            setUniversityError(true);
            return;
        } else {
            setLoading(true);
            const payload = {
                campusName: universityName
            };
            try {
                const response = await axios.post('http://localhost:8000/currentUserSchool/setSchool', payload, {
                    withCredentials: true // To include cookies in the request
                });
                setLoading(false);
                handleUniversitySelection();
                console.log('Campus set successfully:', response.data);
            } catch (error) {
                console.error('Campus set error:', error);
                setConnectionError(true);
            }
            finally {
                setLoading(false);
            }
        }
    };



    const handleUniversityDelete = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                'http://localhost:8000/currentUserSchool/deleteSchoolCampus',
                {},  // Empty body
                {
                    withCredentials: true,  // Properly placed in config object
                }
            );
            console.log('School campus deleted successfully:', response.data);
            handleUniversitySelection();

        } catch (error) {
            console.error('Error deleting school school campus:', error);
            setConnectionError(true);
        } finally {
            setLoading(false);
        }
    }

    const handleUniversityEmailDelete = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                'http://localhost:8000/currentUserSchool/deleteSchoolEmail',
                {},  // Empty body
                {
                    withCredentials: true,  // Properly placed in config object
                }
            );
            console.log('School email deleted successfully:', response.data);
            handleEmailSetFalse();

        } catch (error) {
            console.error('Error deleting school email:', error);
            setConnectionError(true);
        } finally {
            setLoading(false);
        }
    }

    const handleUniversityMailSubmit = async () => {



        if (!schoolEmail) {
            setSchoolEmailEmptyError(true);
            return;
        }
        if (!validateEmail(schoolEmail)) {
            setSchoolEmailError(true);
            return;
        }
        if (!schoolEmail.endsWith('.edu')) {
            setNotEduEmailError(true);
            return;
        }

        try {
            setLoading(true);
            const payload = { schoolEmail };
            const response = await axios.post('http://localhost:8000/currentUserSchool/setSchoolEmail', payload, {
                withCredentials: true,
            });
            console.log('School email set successfully:', response.data);
            handleEmailSet();

            if (schoolEmail && validateEmail(schoolEmail) && schoolEmail.endsWith('.edu')) {
                const payload = { email: schoolEmail };
                await axios.post('http://localhost:8000/currentUserSchool/sendVerificationEmail', payload, {
                    withCredentials: true,
                });
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error setting school email:', error);
            if (axiosError.response) {
                const statusCode = axiosError.response.status;

                if (statusCode === 409) {
                    setUserExistsError(true);
                } else if (statusCode === 429) {
                    setDoesNeedHelp(true);
                } else if (statusCode === 430) {
                    setIsViolatingPolicy(true);
                } else {
                    setConnectionError(true);
                }
            } else {
                setConnectionError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (schoolProfile?.schoolEmail) {
            try {
                setLoading(true);
                const payload = { email: schoolProfile.schoolEmail };
                await axios.post('http://localhost:8000/currentUserSchool/sendVerificationEmail', payload, {
                    withCredentials: true
                });
                console.log('Verification email resent successfully');
            } catch (error) {
                console.error('Error resending verification email:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUserTypeChange = (type: 'Student' | 'Faculty' | 'Staff' | 'Alumni') => {
        setConnectionError(false);
        setUserType(type);
    };


    const handleCodeSubmission = async () => {
        if (!verificationCode) {
            setVerificationCodeEmptyError(true);
            return;
        } else if (!validateCode(verificationCode)) {
            setVerificationCodeError(true);
            return;
        }

        try {
            setLoading(true);
            const payload = { verificationCode: verificationCode };
            await axios.post('http://localhost:8000/currentUserSchool/verifyCode', payload, {
                withCredentials: true,
            });
            handleEmailVerified();
            // Handle successful verification
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                // The server responded with a status code that falls out of the range of 2xx
                switch (axiosError.response.status) {
                    case 400:
                        setIncorrectCodeError(true);
                        break;
                    case 410:
                        setExpiredCodeError(true);
                        break;
                    default:
                        setConnectionError(true);
                }
            } else if (axiosError.request) {
                // The request was made but no response was received
                setConnectionError(true);
            } else {
                // Something happened in setting up the request that triggered an Error
                setConnectionError(true);
            }
        } finally {
            setLoading(false);
        }
    };



    const handleUserTypeSubmission = async () => {
        if (!userType) {
            return;
        }
        else {
            try {
                // setLoading(true);
                setProfileLoading(true);
                const payload = { userType };
                await axios.post('http://localhost:8000/currentUserSchool/setUserType', payload, {
                    withCredentials: true
                });
                setProfileLoading(true);
                // fetchProfileData();
                if (schoolProfile) {
                    schoolProfile.userType = userType;
                    schoolProfile.schoolEmail = schoolEmail;
                    schoolProfile.campus.name = universityName;
                    schoolProfile.verifiedSchoolEmail = isEmailVerified;
                }
                // setProfileLoading(false);
                handleUserTypeSelected();
                console.log('User type set successfully');
            } catch (error) {
                setConnectionError(true);
                console.error('Error resending verification email:', error);
            } finally {
                setProfileLoading(false);
            }
        }
    }



    const fetchProfileData = async () => {
        setProfileLoadingOn();
        try {
            const response = await axios.get('http://localhost:8000/currentUserSchool', {
                withCredentials: true,
            });
            const profileData = response.data;  // Use the fetched data directly
            setSchoolProfile(profileData);
            console.log('School Profile Data:', profileData);

            // Conditional navigation based on the fetched profile data
            if (profileData.campus?.name) {
                if (profileData.schoolEmail) {
                    if (profileData.verifiedSchoolEmail) {
                        if (profileData.userType) {
                            // navigate(`/school/${username}/`);
                            handleSetActiveState('courses')
                        } else {
                            handleSetActiveState('addUserType')
                            // navigate(`/school/${username}/profileSetup/addUserType`);
                        }
                    } else {
                        handleSetActiveState('verifySchoolEmail')
                        // navigate(`/school/${username}/profileSetup/verifySchoolEmail`);
                    }
                } else {
                    handleSetActiveState('addSchoolEmail')
                    // navigate(`/school/${username}/profileSetup/addSchoolEmail`);
                }
            } else {
                handleSetActiveState('addUniversity')
                // navigate(`/school/${username}/profileSetup/addUniversity`);
            }
        } catch (error) {
            console.error('Failed to fetch school profile data', error);
        } finally {
            setProfileLoadingOff();
        }
    };



    const toggleCourseBar = () => {
        setIsCourseBarOpen(!isCourseBarOpen);
    };

    const setActiveCourse = (courseCode: string) => {
        const selectedCourse = schoolProfile?.courses?.find(course => course.courseCode === courseCode) || null;
        setActiveCourseState(selectedCourse);
    };

    const addProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        if (!protectedRefs.current.includes(ref)) {
            protectedRefs.current.push(ref);
        }
    };

    const removeProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        protectedRefs.current = protectedRefs.current.filter(r => r !== ref);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isCourseBarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleCourseBar();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCourseBarOpen]);








    return (
        <SchoolProfileContext.Provider value={{
            schoolProfile,
            // campusData,
            // fetchCampusData,
            activeCourse,
            setActiveCourse,
            toggleCourseBar,
            isCourseBarOpen,
            addProtectedRef,
            removeProtectedRef,
            isUniversitySelected,
            isEmailSet,
            isEmailVerified,
            isUserTypeSelected,

            handleUniversitySelection,
            handleEmailSet,
            setUniversitySelectionFalse,
            handleEmailSetFalse,
            handleEmailVerified,
            handleEmailVerifiedFalse,
            handleUserTypeSelected,

            handleUniversityNameChange,
            universityName,

            submitUniversity,
            universityError,
            connectionError,
            loading,

            handleEmailChange,
            handleUniversityMailSubmit,
            schoolEmail,
            schoolEmailEmptyError,
            schoolEmailError,
            notEduEmailError,
            handleResendCode,

            verificationCodeEmptyError,
            verificationCodeError,
            incorrectCodeError,
            expiredCodeError,
            handleCodeSubmission,

            handleVerificationCodeChange,
            verificationCode,

            userType,
            handleUserTypeSubmission,
            handleUserTypeChange,
            setLoadingOn,
            setLoadingOff,
            fetchProfileData,

            profileLoading,
            setProfileLoadingOn,
            setProfileLoadingOff,


            isCourseSearchAddBarOpen,
            openCourseSearchAddBar,
            closeCourseSearchAddBar,

            isSearchBarActive,
            activateCreateBar,
            activateSearchBar,

            userExistsError,
            isViolatingPolicy,
            doesNeedHelp,
            handleUniversityEmailDelete,
            handleUniversityDelete,

            activeState,
            handleSetActiveState,

            togglePrivate,
            handleCourseNameChange,
            handleCourseCodeChange,
            handleInstructorKeywordChange,
            handleTAKeywordChange,

            isPrivate,
            courseName,
            courseCode,
            instructorKeyword,
            taKeyword,

            courseCodeEmptyError,
            courseNameEmptyError,

            handleCourseCreationSubmit
        }}>
            {children}
        </SchoolProfileContext.Provider>
    );
};
