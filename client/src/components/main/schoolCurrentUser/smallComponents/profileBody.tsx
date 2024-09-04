import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useConnectUser } from '../../../../contexts/ConnectUser/connectUserProvider';


import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import ProfileBodyContainer from '../../../ConnectUI_web/templetes/bodyTemplete';

import ProfileInfo from "../elements/profileInfo/profileInfo";
import ProfileInfoLoading from "../elements/profileInfo/profileInfoLoading"
import PostFilter from "../elements/nav/schoolNav";
import PostFilterLoading from "../elements/nav/navLoading"

import Courses from "../elements/courses/courseList"
import CoursesLoading from "../elements/courses/courseListLoading"

import ClubsAndOrgs from "../elements/clubsAndOrgs/clubsAndOrgsList"

import CampusPosts from "../elements/campus/campusPosts"

import LeftButton from '../../smallComponents/leftButton';
import RightButton from '../../smallComponents/rightButton';

import AddSchool from './addSchool';
import SetSchoolEmail from './addSchoolEmail';
import VerifySchoolEmail from './verifySchoolEmail';
import SelectUserType from './selectUserType';



import { useSchoolProfile } from '../../../../contexts/schoolProfile/school';


const ProfileBody: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const navigate = useNavigate();  // Get the navigate function
    const { user } = useConnectUser();

    const { username } = useParams<{ username: string }>();
    const {
        schoolProfile,
        loading,
        fetchProfileData,
        profileLoading,
        isUniversitySelected,
        isEmailSet,
        isEmailVerified,
        isUserTypeSelected,
        handleUniversitySelection,
        handleEmailSet,
        handleEmailVerified,
        handleUserTypeSelected,
        setProfileLoadingOff,
        setProfileLoadingOn
    } = useSchoolProfile();

    setProfileLoadingOn();

    // if (!schoolProfile) {
    //     fetchProfileData();
    // }


    // if (schoolProfile) {
    //     if (schoolProfile.campus.name) {
    //         if (schoolProfile.schoolEmail) {
    //             if (schoolProfile.verifiedSchoolEmail) {
    //                 if (schoolProfile.userType) {
    //                     handleUserTypeSelected();
    //                 }
    //                 else {
    //                     navigate(`/school/${user?.username}/addUserType`);
    //                 }
    //             }
    //             else {
    //                 navigate(`/school/${user?.username}/verifySchoolEmail`);
    //             }
    //         }
    //         else {
    //             navigate(`/school/${user?.username}/addSchoolEmail`);
    //         }
    //     }
    //     else {
    //         navigate(`/school/${user?.username}/addUniversity`);
    //     }
    //     setProfileLoadingOff();
    // }


    // const renderContent = () => {
    //     switch (location.pathname) {
    //         case `/school/${username}`:
    //             return <>
    //                 <ProfileInfo />
    //                 <PostFilter />
    //                 <Courses />
    //             </>
    //         case `/school/${username}/courses`:
    //             return <>
    //                 <ProfileInfo />
    //                 <PostFilter />
    //                 <Courses />
    //             </>
    //         case `/school/${username}/clubsAndOrgs`:
    //             return <>
    //                 <ProfileInfo />
    //                 <PostFilter />
    //                 <ClubsAndOrgs />
    //             </>
    //         case `/school/${username}/campus`:
    //             return <>
    //                 <ProfileInfo />
    //                 <PostFilter />
    //                 <CampusPosts />
    //             </>
    //         case `/school/${username}/addUniversity`:
    //             return <AddSchool />
    //         case `/school/${username}/addSchoolEmail`:
    //             return <SetSchoolEmail />
    //         case `/school/${username}/verifySchoolEmail`:
    //             return <CampusPosts />
    //         case `/school/${username}/addUserType`:
    //             return <CampusPosts />
    //         default:
    //             return <></>
    //     }
    // };

    return (
        <>
            {/* <ProfileBodyContainer flexDirection="column" flex={5.5}>
                <LeftButton />
                <RightButton />
                {
                    profileLoading ? (
                        <>
                            <ProfileInfoLoading />
                            <PostFilterLoading />
                            <CoursesLoading />
                        </>
                    ) : renderContent()
                }




            </ProfileBodyContainer> */}
        </>
    );
};

export default ProfileBody;

const OptionIcon = styled.img`
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.10);
    }
    &:active {
        transform: scale(1.00);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const ProfileHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 95%;
    margin-top: 1rem;
    align-items: center;
    justify-content: flex-end;
    gap: 0.8rem;
`;
