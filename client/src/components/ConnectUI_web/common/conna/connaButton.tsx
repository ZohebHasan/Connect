import React from 'react';
import styled from 'styled-components';

import Conna_v1 from "./asset/conna_v1.webm";

const ConnaButton: React.FC = () => {
  return (
    <VideoContainer>
      <video autoPlay loop muted>
        <source src={Conna_v1} type="video/webm" />
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
