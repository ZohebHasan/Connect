import React, { useState } from 'react';

import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

import LeftBarContainer from '../../ConnectUI_web/templetes/bodyTemplete';
import Logo from '../../ConnectUI_web/common/logo/logo';
import LeftBarButtons from '../elements/leftBarButtons';
import Option from '../elements/optionButton';
import UserProfile from '../elements/userProfile';

import OptionBar from "../elements/optionBar"
import ProfileBar from "../elements/profileBar"

import CreateButton from '../elements/createButton';
import { ProfileProvider } from '../../../contexts/feed/profilesContext';

const LeftBar: React.FC = () => {

    const { isDarkMode } = useDarkMode();
    const [activeButtons, setActiveButtons] = useState({
        home: false,
        search: false,
        notifications: false,
        inbox: false,
        clips: false,
        trending: false,
        create: false
    });

    const toggleActive = (buttonKey: keyof typeof activeButtons) => {
        setActiveButtons({
            home: false,
            search: false,
            notifications: false,
            inbox: false,
            clips: false,
            trending: false,
            create: false,
            [buttonKey]: true
        });
    };



    return (
        <>
      
                <LeftBarContainer flexDirection="column" flex={1.6}>
                    <OptionBar />
                    <ProfileBar />
                    <Container>
                        <LogoContainer>
                            <Logo />
                        </LogoContainer>

                        <ButtonsContainer>
                            <LeftBarButtons
                                activeButtons={activeButtons}
                                toggleActive={toggleActive}
                            />
                        </ButtonsContainer>
                        <CreateButtonContainer>
                            <CreateButton
                                activeButtons={activeButtons}
                                toggleActive={toggleActive}
                            />
                        </CreateButtonContainer>
                        <BottomButtonContainer>
                            <UserProfile />
                            <Option />
                        </BottomButtonContainer>
                    </Container>
                </LeftBarContainer>
         
        </>
    );
};

export default LeftBar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-right: 1px solid rgba(235, 57, 137, 0.300);
`

const ButtonsContainer = styled.div`
    flex: 3.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const BottomButtonContainer = styled.div`
    flex: 1.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const CreateButtonContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LogoContainer = styled.div`
    flex: 0.8;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 80%;
    position: relative;
    z-index: 1;
`;







