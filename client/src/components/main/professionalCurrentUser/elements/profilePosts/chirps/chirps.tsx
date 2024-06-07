import React from 'react';
import styled from 'styled-components';

import { useChirpContext } from '../../../../../../contexts/personalProfile/chirpContext';
import ChirpTemplete from '../../../../elements/posts/personalPostTemplate';

const ChirpContainer: React.FC = () => {
  
  const { chirps } = useChirpContext();

  return (
    <Container>
      {chirps.map((chirp) => (
        <ChirpTemplete
          key={chirp.id}
          userName={"zoheb.hasan"}
          bodyType={"chirp"}
          isVarified={true}
          textBody={chirp.textBody}
        />
      ))}
     </Container>
  );
};

export default ChirpContainer;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
