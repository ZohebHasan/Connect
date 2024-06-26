import React from 'react';
import styled from 'styled-components';

import { useProfPostContext } from '../../../../../contexts/professionalProfile/profPostContext';
import ProfPostTemplete from '../../../elements/posts/professionalPostTemplate';

const ProfPostContainer: React.FC = () => {
  
  const { profPosts } = useProfPostContext();

  return (
    <Container>
      {profPosts.map((post) => (
        <ProfPostTemplete
          key={post.id}
          userName={"zoheb.hasan"}
          bodyType={post.postType}
          isVarified={true}
          textBody={post.textBody}
          media={post.media}
        />
      ))}
     </Container>
  );
};

export default ProfPostContainer;

const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
