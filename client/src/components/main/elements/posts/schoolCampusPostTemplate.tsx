import React from 'react';
import styled from 'styled-components';

import HeaderSchool from "./headers/schoolCampusPostHeader";
import SchoolCaption from "./captions/school";
import SchoolChirp from "./bodies/schoolChirp"
import Pixel from "./bodies/pixel";
import Bottom from "./bottom";
import IsImportantComponenet from './info/isImportant';

import { Media } from './mediaType';

export interface User {
  name?: string;
  userName?: string;
  link: string;
  photoUrl: string;
  isVerified?: boolean;
}


interface SchoolPostContainerProps {
  postedBy: User;
  datePosted: Date;
  textBody?: string;
  title: string;
  media?: Media[];
  postType: 'normal' | 'anonymous';
  display: 'profile' | 'feed';
  isQuestion: boolean;
}

const SchoolPostContainer: React.FC<SchoolPostContainerProps> = ({ postedBy, title, display, isQuestion, datePosted, textBody, media, postType }) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>
        {/* <TopWrapper> */}
        <HeaderSchool postedBy={postedBy} datePosted={datePosted} postType={postType} display={display} isQuestion={isQuestion} />
        {/* </TopWrapper> */}
        <SchoolCaption title={title} />
        {textBody && <SchoolChirp textBody={textBody} />}
        {media && <Pixel media={media} />}
        <Bottom type={"school"} />
      </PostTemplateWrapper>
    </PostTemplate>
  );
};

export default SchoolPostContainer;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const PostTemplate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PostTemplateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;
