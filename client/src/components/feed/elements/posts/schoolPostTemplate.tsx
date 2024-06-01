import React from 'react';
import styled from 'styled-components';

import HeaderSchool from "./headers/schoolHeader";
import SchoolCaption from "./captions/school";
import Clip from "./bodies/clip";
import Post from "./bodies/post";
import SchoolChirp from "./bodies/schoolChirp"
import Bottom from "./bottom";

interface SchoolPostContainerProps {
  userName: string;
  bodyType: "post" | "chirp" | "clip";
  isVarified: boolean;
}

const SchoolPostContainer: React.FC<SchoolPostContainerProps> = ({ userName, bodyType, isVarified }) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>
        {/* Render Header for school profile */}
        <HeaderSchool userName={userName} isVarified={isVarified} />

        {/* Always render School Caption and Chirp */}
        <SchoolCaption />
        <SchoolChirp />

        {/* Optionally render Clip or Post based on bodyType */}
        {(bodyType === "clip" || bodyType === "post") && (
          bodyType === "clip" ? <Clip /> : <Post />
        )}

        <Bottom />
      </PostTemplateWrapper>
    </PostTemplate>
  );
};

export default SchoolPostContainer;

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
  width: 95%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(235, 57, 137, 0.300);
`;
