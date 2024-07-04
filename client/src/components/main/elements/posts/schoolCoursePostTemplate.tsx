import React from 'react';
import styled from 'styled-components';

import HeaderSchool from "./headers/schoolCourseHeader";
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

export interface Instructor extends User {
  type: 'instructor';
}

export interface Student extends User {
  type: 'student';
}

export interface TA extends User {
  type: 'ta';
}

interface SchoolPostContainerProps {
  postedBy: User;
  datePosted: Date;
  title: string;
  textBody?: string;
  media?: Media[];
  postType: 'normal' | 'anonymous';
  display: 'profile' | 'feed';
  isQuestion: boolean;
  tag: string;
  markedBy: (Instructor | TA)[];
  postId: string;
}

const SchoolPostContainer: React.FC<SchoolPostContainerProps> = ({ postedBy, display, isQuestion, datePosted, title, textBody, media, postType, tag, markedBy, postId }) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>
        <TopWrapper>
          <HeaderSchool tag={tag} postedBy={postedBy} datePosted={datePosted} postType={postType} display={display} isQuestion={isQuestion} />
          {markedBy.length > 0 && <IsImportantComponenet markedBy={markedBy} isQuestion={isQuestion}/>}
        </TopWrapper>
        <SchoolCaption title={title} />
        {textBody && <SchoolChirp textBody={textBody} />}
        {media && <Pixel media={media} />}
        <Bottom type = {"school"} postId = {postId}/>
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
