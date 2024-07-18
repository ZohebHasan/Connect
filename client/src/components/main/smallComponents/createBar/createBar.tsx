import React from 'react';
import styled from 'styled-components';
import CreateBarContainer from './createBarContainer';
import { useCreateBar } from '../../../../contexts/leftBar/createBarContext';

import PixelAndClip from './elements/postTypes/personal/pixelAndClips/pixelAndClips';
import Chirps from './elements/postTypes/personal/chirps/chirp';

import ProfileType from "./elements/postAs/postAsBar/profileBar";

const Create: React.FC = () => {
  const { postAs, profiles, isClipAndPixelActive } = useCreateBar();
  const currentProfile = profiles[postAs];

  const renderComponent = () => {
    if (postAs === 'personal') {
      if (isClipAndPixelActive) {
        return <PixelAndClip />;
      } else {
        return <Chirps />;
      }
    }

    switch (postAs) {
      case 'professional':
        return <>Professional Post Component</>;
      case 'school':
        return <>School Post Component</>;
      default:
        return null;
    }
  };

  return (
    <CreateBarContainer>
      <ProfileType />
      {renderComponent()}
    </CreateBarContainer>
  );
};

export default Create;
