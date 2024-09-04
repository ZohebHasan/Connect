import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { BrowserRouter as Router, useParams, Routes, Route, useLocation, Navigate } from 'react-router-dom';


import { CoursesProvider } from '../../../contexts/schoolProfile/courseContext';
import { OrgsProvider } from '../../../contexts/schoolProfile/clubAndOrgsContext';
import { CampusPostProvider } from '../../../contexts/schoolProfile/campusPostContext';



import SchoolCourseDataCurrentUser from "../../../pages/currentUserSchool/courseData";
import SchoolOrgDataCurrentUser from "../../../pages/currentUserSchool/orgData";





import BodyContainer from '../../../components/ConnectUI_web/templetes/bodyTemplete';
import LeftBar from '../../../components/main/smallComponents/leftBar';
import ProfileBody from '../../../components/main/schoolCurrentUser/smallComponents/profileBody';
import LoadingComponent from '../../../components/main/schoolCurrentUser/elements/loading/loading';
import Header from '../../../components/main/elements/header';
import { useSchoolProfile } from '../../../contexts/schoolProfile/school';

import SearchAndCreate from '../../../components/main/schoolCurrentUser/elements/courses/searchAndAddCourse/searchAndAdd';


import LeftButton from '../../../components/main/smallComponents/leftButton';
import RightButton from '../../../components/main/smallComponents/rightButton';

import ProfileInfoLoading from "../../../components/main/schoolCurrentUser/elements/profileInfo/profileInfoLoading"
import PostFilterLoading from "../../../components/main/schoolCurrentUser/elements/nav/navLoading"
import CoursesLoading from "../../../components/main/schoolCurrentUser/elements/courses/courseListLoading"



import ProfileInfo from "../../../components/main/schoolCurrentUser/elements/profileInfo/profileInfo";
import PostFilter from "../../../components/main/schoolCurrentUser/elements/nav/schoolNav";
import Courses from "../../../components/main/schoolCurrentUser/elements/courses/courseList"
import ClubsAndOrgs from "../../../components/main/schoolCurrentUser/elements/clubsAndOrgs/clubsAndOrgsList";
import CampusPosts from "../../../components/main/schoolCurrentUser/elements/campus/campusPosts"

import AddSchool from "../../../components/main/schoolCurrentUser/smallComponents/addSchool"
import AddSchoolEmail from "../../../components/main/schoolCurrentUser/smallComponents/addSchoolEmail"
import VerifySchoolEmail from "../../../components/main/schoolCurrentUser/smallComponents/verifySchoolEmail"
import SetUserType from "../../../components/main/schoolCurrentUser/smallComponents/selectUserType"



export function CurrentUserSchoolRoutes() {
    const { username } = useParams<{ username: string }>();
    const { loading,
        isCourseSearchAddBarOpen,
        profileLoading,
        schoolProfile,
        fetchProfileData
    } = useSchoolProfile();

    if(!schoolProfile) {
        fetchProfileData();
    }

    const isDisabled = loading || isCourseSearchAddBarOpen;
    return (
        <BodyContainer flexDirection="row">
            {loading && <LoadingComponent />}
            <SearchAndCreate />
            <LoadingWrapper $isDisabled={isDisabled}>
                <Header />
                <LeftBar />
                <BodyContainer flexDirection="column" flex={5.5}>
                    <LeftButton />
                    <RightButton />
                    {
                        profileLoading ? (
                            <>
                                <ProfileInfoLoading />
                                <PostFilterLoading />
                                <CoursesLoading />
                            </>
                        ) :
                            <>

                                <Routes>
                                    <Route path="/" element={<Navigate to={`/school/${username}/courses`} replace />} />
                                    <Route path="/*" element={<ProfileDataRoutes />} />
                                    <Route path="profileSetup/*" element={<ProfileSetupRoutes />} />
                                </Routes>
                            </>
                    }

                </BodyContainer>
            </LoadingWrapper>
        </BodyContainer>
    );
}

export function ProfileDataRoutes() {
    return (
        <>
            <ProfileInfo />
            <PostFilter />
            <Routes>
                <Route path="courses" element={<CoursesProvider> <Courses /> </CoursesProvider>} />
                <Route path="courses/:courseCode/*" element={<CoursesProvider><SchoolCourseDataCurrentUser /></CoursesProvider>} />
                <Route path="clubsAndOrgs" element={<OrgsProvider> <ClubsAndOrgs /> </OrgsProvider>} />
                <Route path="clubsAndOrgs/:orgCode/*" element={<OrgsProvider><SchoolOrgDataCurrentUser /></OrgsProvider>} />
                <Route path="campus" element={<CampusPostProvider> <CampusPosts /> </CampusPostProvider>} />

            </Routes>
        </>
    );
}

export function ProfileSetupRoutes() {
    return (
        <Routes>
            <Route path="addUniversity" element={<AddSchool />} />
            <Route path="addSchoolEmail" element={<AddSchoolEmail />} />
            <Route path="verifySchoolEmail" element={<VerifySchoolEmail />} />
            <Route path="addUserType" element={<SetUserType />} />

        </Routes>
    );
}

const LoadingWrapper = styled.div<{ $isDisabled: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: auto;
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.2 : 1)};
`;


