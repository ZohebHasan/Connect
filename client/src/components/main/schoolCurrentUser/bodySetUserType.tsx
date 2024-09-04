import React from 'react';
import styled from 'styled-components';
import BodyContainer from '../../ConnectUI_web/templetes/bodyTemplete';
import LeftBar from '../smallComponents/leftBar';
import ProfileBody from './smallComponents/profileBody';
import LoadingComponent from './elements/loading/loading';
import Header from '../elements/header';
import { useSchoolProfile } from '../../../contexts/schoolProfile/school';

import SearchAndCreate from './elements/courses/searchAndAddCourse/searchAndAdd';


import LeftButton from '../smallComponents/leftButton';
import RightButton from '../smallComponents/rightButton';

import ProfileInfoLoading from "./elements/profileInfo/profileInfoLoading"
import PostFilterLoading from "./elements/nav/navLoading"
import CoursesLoading from "./elements/courses/courseListLoading"
import SetUserType from './smallComponents/selectUserType';


const Body: React.FC = () => {
    const { loading, 
            isCourseSearchAddBarOpen, 
            profileLoading
            } = useSchoolProfile();


    // Calculate isDisabled based on the conditions
    const isDisabled = loading || isCourseSearchAddBarOpen;



    return (
        <>
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
                            ) : <SetUserType/>
                        }




                    </BodyContainer>
                </LoadingWrapper>
            </BodyContainer>
        </>
    );
};

export default Body;

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