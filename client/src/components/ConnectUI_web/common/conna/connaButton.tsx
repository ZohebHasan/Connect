import React from 'react';
import styled from 'styled-components';

import Conna from "./asset/conna_v3.webm";

const ConnaButton: React.FC = () => {
  return (
    <VideoContainer>
      <video autoPlay loop muted>
        <source src={Conna} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};

export default ConnaButton;

const VideoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;

  video {
    width: 5rem;
    height: auto;
    background-color: transparent;
  }
`;
