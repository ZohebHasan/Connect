import React from 'react';
import styled from 'styled-components';

import HeaderProfessional from "./headers/professionalHeader";
import ProfessionalCaption from "./captions/professional";
import Clip from "./bodies/clip";
import Pixel from "./bodies/pixel";
import ProfessionalChirp from "./bodies/professionalChirp";
import Bottom from "./bottom";
import { Media } from './mediaType'; 

interface ProfessionalPostContainerProps {
  userName: string;
  bodyType: "pixel" | "chirp" | "clip";
  isVarified: boolean;
  media?: Media[];
  textBody?: string;
}

const ProfessionalPostContainer: React.FC<ProfessionalPostContainerProps> = ({ userName, bodyType, isVarified, media, textBody }) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>
        <HeaderProfessional userName={userName} isVarified={isVarified} />
        {bodyType !== "chirp" && textBody && <ProfessionalCaption textBody={textBody} />}
        
        {bodyType === "chirp" && textBody ? (
          <ProfessionalChirp textBody={textBody} />
        ) : bodyType === "clip" && media ? (
          <Clip media={media} />
        ) : bodyType === "pixel" && media ? (
          <Pixel media={media} />
        ) : (
          <div>No content available</div>
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
