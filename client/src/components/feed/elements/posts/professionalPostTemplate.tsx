import React from 'react';
import styled from 'styled-components';

import HeaderProfessional from "./headers/professionalHeader";
import ProfessionalCaption from "./captions/professional";
import Clip from "./bodies/clip";
import Post from "./bodies/post";
import ProfessionalChirp from "./bodies/professionalChirp"
import Bottom from "./bottom";

interface ProfessionalPostContainerProps {
  userName: string;
  bodyType: "post" | "chirp" | "clip";
  isVarified: boolean;
}

const ProfessionalPostContainer: React.FC<ProfessionalPostContainerProps> = ({ userName, bodyType, isVarified}) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>
        {/* Render Professional Header */}
        <HeaderProfessional userName={userName} isVarified={isVarified} />

        {/* Render Professional Caption if bodyType is not chirp */}
        {bodyType !== "chirp" && <ProfessionalCaption />}

        {/* Render Body based on bodyType */}
        {bodyType === "chirp" ? (
          <ProfessionalChirp />
        ) : bodyType === "clip" ? (
          <Clip />
        ) : (
          <Post />
        )}

        <Bottom />
      </PostTemplateWrapper>
    </PostTemplate>
  );
};

export default ProfessionalPostContainer;

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
