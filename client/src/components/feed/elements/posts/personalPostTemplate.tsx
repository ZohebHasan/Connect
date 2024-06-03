import React from 'react';
import styled from 'styled-components';

import HeaderPersonal from "./headers/personalHeader";
import PersonalCaption from "./captions/personal";
import Clip from "./bodies/clip";
import Post from "./bodies/post";
import Chirp from "./bodies/personalChirp";
import Bottom from "./bottom";

interface PersonalPostContainerProps {
  userName: string;
  bodyType: "post" | "chirp" | "clip";
  isVarified: boolean;
}

const PersonalPostContainer: React.FC<PersonalPostContainerProps> = ({ userName, bodyType, isVarified }) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>
        {/* Render Personal Header */}
        <HeaderPersonal userName={userName} isVarified={isVarified} />

        {/* Render Body based on bodyType */}
        {bodyType === "chirp" ? (
          <Chirp />
        ) : bodyType === "clip" ? (
          <Clip />
        ) : (
          <Post />
        )}

        {/* Render Personal Caption at the bottom if bodyType is not chirp */}
        {bodyType !== "chirp" && (
          <PersonalCaption userName={userName} isVarified={isVarified} />
        )}

        <Bottom />
      </PostTemplateWrapper>
    </PostTemplate>
  );
};

export default PersonalPostContainer;

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
