import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import MonetizedDark from '../../../../assets/monetizedDark.png';
import MonetizedLight from '../../../../assets/monetizedLight.png';

import ListLight from '../../../../assets/listLight.png';
import ListDark from '../../../../assets/listDark.png';

import ViewsDark from '../../../../assets/viewsDark.png';
import ViewsLight from '../../../../assets/viewsLight.png';


import PlayIconDark from "../../../../assets/storyPlayDark.png"
import PlayIconLight from "../../../../assets/storyPlayLight.png"

interface PostGridIconsProps {
    postType: 'pixel' | 'clip';
    isMonetizedPixel?: boolean;
}

const PostGridIcons: React.FC<PostGridIconsProps> = ({ postType, isMonetizedPixel }) => {
    const { isDarkMode } = useDarkMode();

    return (
        <Bottom>
            <BottomWrapper>
                {((postType === 'pixel' && isMonetizedPixel) || postType === 'clip') && (
                    <IconsContainer>
                        {postType === 'pixel' && (
                            <ListIconContainer>
                                <Icon src={isDarkMode ? ListDark : ListLight} />
                            </ListIconContainer>
                        )}
                        <MonetizedIconContainer>
                            <Icon src={isDarkMode ? MonetizedDark : MonetizedLight} />
                        </MonetizedIconContainer>
                    </IconsContainer>
                )}
                <ViewsIconContainer>
                    <ViewsIconWrapper>
                        {postType === 'pixel' ? <><ViewIcon src={isDarkMode ? ViewsDark : ViewsLight} /></> :
                            <ViewIcon src={isDarkMode ? PlayIconDark : PlayIconLight} />}

                        <Text variant={'transparent'} size={'0.9rem'} fontWeight="500">
                            450k
                        </Text>
                    </ViewsIconWrapper>
                </ViewsIconContainer>
            </BottomWrapper>
        </Bottom>
    );
};

export default PostGridIcons;

const ViewsIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
`

const ViewsIconContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: 95%;
  /* background-color: red; */
`;

const ViewIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0.8rem;
`;

const IconsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  width: 95%;
  gap: 0.5rem;
  
`;

const MonetizedIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;

const ListIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;

const Icon = styled.img`
  width: 1.1rem;
  height: 1.1rem;
`;
