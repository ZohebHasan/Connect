import React from 'react';
import styled from 'styled-components';

import LeftBarContainer from '../../ConnectUI_web/templetes/bodyTemplete';
import ConnectLogo from '../../ConnectUI_web/common/logo/logo';

import LeftBarButtons from '../elements/leftBar/leftBarButtons';
import Option from '../elements/leftBar/optionButton';
import UserProfile from '../elements/leftBar/userProfile';

import OptionBar from "../elements/leftBar/optionBar";
import ProfileBar from "../elements/leftBar/profileBar";

import CreateButton from '../elements/leftBar/createButton';
import { useLeftBarNavButton } from '../../../contexts/navigation/menuNavContext';

const LeftBar: React.FC = () => {
    const { leftBarNavButtons, toggleActive } = useLeftBarNavButton();

    return (
        <>
            <LeftBarContainer flexDirection="column" flex={1.4}>
                <OptionBar />
                <ProfileBar />
                <Container>
                    <LogoContainer>
                        {/* <ConnectLogo /> */}
                    </LogoContainer>

                    <ButtonsContainer>
                        <LeftBarButtons
                            activeButtons={leftBarNavButtons}
                            toggleActive={toggleActive}
                        />
                    </ButtonsContainer>
                    <CreateButtonContainer>
                        <CreateButton
                            activeButtons={leftBarNavButtons}
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
    box-sizing: border-box;
    border-right: 1px solid rgba(235, 57, 137, 0.300);
`;

const ButtonsContainer = styled.div`
    flex: 3.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BottomButtonContainer = styled.div`
    flex: 1.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CreateButtonContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

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
