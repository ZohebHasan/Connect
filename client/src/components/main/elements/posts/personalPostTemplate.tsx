import React from 'react';
import styled from 'styled-components';
import HeaderPersonal from "./headers/personalHeader";
import PersonalCaption from "./captions/personal";
import Clip from "./bodies/clip";
import Pixel from "./bodies/pixel";
import Chirp from "./bodies/personalChirp";
import Bottom from "./bottom";
import { Media } from './mediaType'; 

interface PersonalPostContainerProps {
  userName: string;
  bodyType: "pixel" | "chirp" | "clip";
  isVarified: boolean;
  media?: Media[];
  textBody?: string;
}

const PersonalPostContainer: React.FC<PersonalPostContainerProps> = ({ userName, bodyType, isVarified, media, textBody }) => {
  return (
    <PostTemplate>
      <PostTemplateWrapper>

        <HeaderPersonal userName={userName} isVarified={isVarified} />

        {bodyType === "chirp" && textBody ? (
          <Chirp textBody={textBody} />
        ) : bodyType === "clip" && media ? (
          <Clip media={media} />
        ) : bodyType === "pixel" && media ? (
          <Pixel media={media} />
        ) : (
          <div>No content available</div>
        )}

        {bodyType !== "chirp" && (
          <PersonalCaption userName={userName} isVarified={isVarified} />
        )}

        <Bottom type={"personal"}/>
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
