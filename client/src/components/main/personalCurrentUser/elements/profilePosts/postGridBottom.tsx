import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import Text from '../../../../ConnectUI_web/common/texts/static';


import LikedIcon from '../../../../assets/likedIcon.png';

import CommentActiveLight from '../../../../assets/commentActiveLight.png';
import CommentActiveDark from '../../../../assets/commentActiveDark.png';

import ShareLight from '../../../../assets/shareActiveLight.png';
import ShareDark from '../../../../assets/shareActiveDark.png';



const BottomComponent: React.FC = () => {

  const { isDarkMode } = useDarkMode();




  return (
    <Bottom>
      <BottomWrapper>
        <IconsContainer>
          <LikedIconContainer>
            <Icon src={LikedIcon} />
            <Text variant={'transparent'} size={'0.9rem'} fontWeight="600">
              12k
            </Text>
          </LikedIconContainer>
          <CommentIconContainer>
            <Icon src={isDarkMode ? CommentActiveDark : CommentActiveLight} />
            <Text variant={'transparent'} size={'0.9rem'} fontWeight="600">
              3k
            </Text>
          </CommentIconContainer>
          <ShareIconContainer>
            <Icon src={isDarkMode ? ShareDark : ShareLight} />
            <Text variant={'transparent'} size={'0.9rem'} fontWeight="600">
              3k
            </Text>
          </ShareIconContainer>
      
        </IconsContainer>

      </BottomWrapper>
    </Bottom>
  );
};

export default BottomComponent;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 0.8rem;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  gap: 1rem;
`;

const LikedIconContainer = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const CommentIconContainer = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const ShareIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;




const Icon = styled.img`
  width: 1rem;
  height: 1rem;
`;
