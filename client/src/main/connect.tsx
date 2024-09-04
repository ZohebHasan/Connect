import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { ConnectUserProvider } from '../contexts/ConnectUser/connectUserProvider';
import { PersonalProvider } from '../contexts/personalProfile/personal';
import { ProfessionalProvider } from '../contexts/professionalProfile/professional';
import { SchoolProfileProvider } from '../contexts/schoolProfile/school';


import { LoginProvider } from '../contexts/login/loginContext';
import { SignupProvider } from '../contexts/signup/signupContext';
import { ProfileProvider } from '../contexts/profiles/profilesContext';
import { LeftBarNavButtonProvider } from '../contexts/navigation/menuNavContext';
import { PerNavProvider } from '../contexts/navigation/perNavContext';
import { ProfNavProvider } from '../contexts/navigation/profNavContext';
import { SchoolNavProvider } from '../contexts/navigation/schoolNavContext';

import { CreateBarProvider } from '../contexts/leftBar/createBarContext';

import { PixelProvider } from '../contexts/personalProfile/pixelContext';
import { ClipProvider } from '../contexts/personalProfile/clipContext';
import { ChirpProvider } from '../contexts/personalProfile/chirpContext';

import { AboutInfoProvider } from '../contexts/professionalProfile/aboutContext';
import { RecInfoProvider } from '../contexts/professionalProfile/recommendationContext';
import { ProfPostProvider } from '../contexts/professionalProfile/profPostContext';

import { CoursesProvider } from '../contexts/schoolProfile/courseContext';
import { OrgsProvider } from '../contexts/schoolProfile/clubAndOrgsContext';
import { CampusPostProvider } from '../contexts/schoolProfile/campusPostContext';

import PageContainer from '../components/ConnectUI_web/templetes/pageTemplete';
import Background1 from '../components/ConnectUI_web/backgrounds/background1/background1';
import Copyright from '../components/ConnectUI_web/common/copyright/Copyright';
import ImageAnalysis from '../contentRec/imageAnalysis';

import Intro from '../pages/intro';
import SelectLanguagePage from "../pages/loginSignup/selectLanguage";
import LoginPage from "../pages/loginSignup/login";
import SignupPage from "../pages/loginSignup/signup";
import VerificationLoginPage from "../pages/loginSignup/verificationLogin";
import FeaturesPage from "../pages/loginSignup/features";
import ProfilesPage from "../pages/loginSignup/profiles";
import DateOfBirth from "../pages/loginSignup/ageVerification";
import UserCredentials from "../pages/loginSignup/userCredentials";
import VerificationSignup from "../pages/loginSignup/verificationSignup";

import CurrentUserPersonal from "../pages/currentUserPersonal";
import CurrentUserProfessional from "../pages/currentUserProfessional";
// import CurrentUserSchool from "../pages/currentUserSchool/profile";

// import SchoolCourseDataCurrentUser from "../pages/currentUserSchool/courseData";
// import SchoolOrgDataCurrentUser from "../pages/currentUserSchool/orgData";
// import SchoolCourses from "../pages/currentUserSchool/courses";
// import SchoolClubs from "../pages/currentUserSchool/clubsAndOrgs";
// import SchoolPosts from "../pages/currentUserSchool/schoolPosts";
// import AddCampus from "../pages/currentUserSchool/selectSchool";
// import AddSchoolEmail from "../pages/currentUserSchool/setSchoolEmail";
// import VerifySchoolEmail from "../pages/currentUserSchool/verifySchoolEmail";
// import AddUserType from "../pages/currentUserSchool/setUserType";


// import BodyContainer from '../components/ConnectUI_web/templetes/bodyTemplete';
// import LeftBar from '../components/main/smallComponents/leftBar';
// import ProfileBody from '../components/main/schoolCurrentUser/smallComponents/profileBody';
// import LoadingComponent from '../components/main/schoolCurrentUser/elements/loading/loading';
// import Header from '../components/main/elements/header';
// import { useSchoolProfile } from '../contexts/schoolProfile/school';

// import SearchAndCreate from '../components/main/schoolCurrentUser/elements/courses/searchAndAddCourse/searchAndAdd';


// import LeftButton from '../components/main/smallComponents/leftButton';
// import RightButton from '../components/main/smallComponents/rightButton';

// import ProfileInfoLoading from "../components/main/schoolCurrentUser/elements/profileInfo/profileInfoLoading"
// import PostFilterLoading from "../components/main/schoolCurrentUser/elements/nav/navLoading"
// import CoursesLoading from "../components/main/schoolCurrentUser/elements/courses/courseListLoading"
// import SetUserType from '../components/main/schoolCurrentUser/smallComponents/selectUserType';


import ProfileInfo from "../components/main/schoolCurrentUser/elements/profileInfo/profileInfo";
import PostFilter from "../components/main/schoolCurrentUser/elements/nav/schoolNav";
import Courses from "../components/main/schoolCurrentUser/elements/courses/courseList"

import styled from 'styled-components';

import Feed from "../pages/feed";

import { CurrentUserSchoolRoutes } from './currentUser/school/schoolRouters';

import ProtectedRoute from '../contexts/protectedRoute/protectedRoute';

export default function Connect(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
            </Routes>
            <ConnectInner />
        </Router>
    );
}

function ConnectInner() {
    const location = useLocation();

    const [backgroundComponent, setBackgroundComponent] = useState<React.ReactNode>(<Background1 />);

    useEffect(() => {
        console.log("Current Pathname:", location.pathname); // Debugging log
        switch (location.pathname) {
            case "/login":
            case "/selectLanguage":
            case "/login/signup":
            case "/signup":
            case "/signup/userInfo":
            case "/signup/idVerification":
            case "/signup/ageVerification":
            case "/signup/features":
            case "/signup/profiles":
                setBackgroundComponent(<Background1 />);
                break;
            default:
                setBackgroundComponent(null);
                break;
        }
    }, [location.pathname]);

    return (
        <>
            <PageContainer>
                {backgroundComponent}
                <RoutesWrapper />
            </PageContainer>
            <Copyright />
        </>
    );
}

function RoutesWrapper() {
    return (
        <Routes>
            <Route path="/selectLanguage" element={<SelectLanguagePage />} />
            <Route path="/login/signup" element={<SignupPage />} />
            <Route
                path="/login/*"
                element={
                    <LoginProvider>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/twoStep" element={<VerificationLoginPage />} />
                        </Routes>
                    </LoginProvider>
                }
            />

            <Route
                path="/signup/*"
                element={
                    <SignupProvider>
                        <Routes>
                            <Route path="/" element={<SignupPage />} />
                            <Route path="/userInfo" element={<UserCredentials />} />
                            <Route path="/idVerification" element={<VerificationSignup />} />
                            <Route path="/ageVerification" element={<DateOfBirth />} />
                            <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
                            <Route path="/profiles" element={<ProtectedRoute><ProfilesPage /></ProtectedRoute>} />
                        </Routes>
                    </SignupProvider>
                }
            />

            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <ConnectUserProvider>
                            <LeftBarNavButtonProvider>
                                <ProfileProvider>
                                    <CreateBarProvider>
                                        <Routes>
                                            <Route path="/home" element={<Feed />} />
                                            <Route path="/personal/:username/*" element={<CurrentUserPersonalRoutes />} />
                                            <Route path="/professional/:username/*" element={<CurrentUserProfessionalRoutes />} />
                                            <Route path="/school/:username/*" element={<SchoolProfileProvider><SchoolNavProvider><CurrentUserSchoolRoutes /></SchoolNavProvider></SchoolProfileProvider>} />
                                        </Routes>
                                    </CreateBarProvider>
                                </ProfileProvider>
                            </LeftBarNavButtonProvider>
                        </ConnectUserProvider>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

function CurrentUserPersonalRoutes() {
    return (
        <PersonalProvider>
            <PerNavProvider>
                <Routes>
                    <Route path="/" element={<PixelProvider> <CurrentUserPersonal /> </PixelProvider>} />
                    <Route path="clips" element={<ClipProvider> <CurrentUserPersonal /> </ClipProvider>} />
                    <Route path="chirps" element={<ChirpProvider> <CurrentUserPersonal /> </ChirpProvider>} />
                </Routes>
            </PerNavProvider>
        </PersonalProvider>
    );
}

function CurrentUserProfessionalRoutes() {
    return (
        <ProfessionalProvider>
            <ProfNavProvider>
                <Routes>
                    <Route path="/" element={<AboutInfoProvider> <CurrentUserProfessional /> </AboutInfoProvider>} />
                    <Route path="/recommendations" element={<RecInfoProvider> <CurrentUserProfessional /></RecInfoProvider>} />
                    <Route path="/posts" element={<ProfPostProvider><CurrentUserProfessional /></ProfPostProvider>} />
                </Routes>
            </ProfNavProvider>
        </ProfessionalProvider>
    );
}



// function CurrentUserSchoolRoutes() {
//     const { username } = useParams<{ username: string }>();
//     const { loading,
//         isCourseSearchAddBarOpen,
//         profileLoading
//     } = useSchoolProfile();

//     const isDisabled = loading || isCourseSearchAddBarOpen;
//     return (
//         <BodyContainer flexDirection="row">
//             {loading && <LoadingComponent />}
//             <SearchAndCreate />
//             <LoadingWrapper $isDisabled={isDisabled}>
//                 <Header />
//                 <LeftBar />
//                 <BodyContainer flexDirection="column" flex={5.5}>
//                     <LeftButton />
//                     <RightButton />
//                     {
//                         profileLoading ? (
//                             <>
//                                 <ProfileInfoLoading />
//                                 <PostFilterLoading />
//                                 <CoursesLoading />
//                             </>
//                         ) : <>
//                             <ProfileInfo />
//                             <PostFilter />
//                             <Courses />
//                         </>
//                     }




//                 </BodyContainer>
//             </LoadingWrapper>
//         </BodyContainer>

//         // <Routes>
//         //     {/* <Route path="/" element={<Navigate to={`/school/${username}/courses`} replace />} />
//         //         <Route path="courses" element={<CoursesProvider> <SchoolCourses/> </CoursesProvider>} />
//         //         <Route path="courses/:courseCode/*" element={<CoursesProvider><SchoolCourseDataCurrentUser /></CoursesProvider>} />
//         //         <Route path="clubsAndOrgs" element={<OrgsProvider> <SchoolClubs/> </OrgsProvider>} />
//         //         <Route path="clubsAndOrgs/:orgCode/*" element={<OrgsProvider><SchoolOrgDataCurrentUser /></OrgsProvider>} />
//         //         <Route path="campus" element={<CampusPostProvider> <SchoolPosts/> </CampusPostProvider>} />
//         //         <Route path="addUniversity" element={<CoursesProvider> <AddCampus /> </CoursesProvider>} />
//         //         <Route path="addSchoolEmail" element={<CoursesProvider> <AddSchoolEmail /> </CoursesProvider>} />
//         //         <Route path="verifySchoolEmail" element={<CoursesProvider> <VerifySchoolEmail /> </CoursesProvider>} />
//         //         <Route path="addUserType" element={<CoursesProvider> <AddUserType/> </CoursesProvider>} /> */}
//         //      <Route path="/" element={<Navigate to={`/school/${username}/courses`} replace />} />
//         //      <Route path="courses" element={<CoursesProvider> Hello </CoursesProvider>} />

//         // </Routes>

//     );
// }

// const LoadingWrapper = styled.div<{ $isDisabled: boolean }>`
//   display: flex;
//   align-items: center;
//   position: relative;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
//   opacity: ${({ $isDisabled }) => ($isDisabled ? 0.2 : 1)};
// `;
