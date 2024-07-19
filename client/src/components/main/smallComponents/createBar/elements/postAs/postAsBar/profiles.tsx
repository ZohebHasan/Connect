import React from 'react';
import styled from 'styled-components';
import SelectLogo from "../../../../../containers/buttonLogo";
import Text from '../../../../../../ConnectUI_web/common/texts/static';
import SelectedDark from "../../../../../../assets/selectedDark.png";
import SelectedLight from "../../../../../../assets/selectedLight.png";
import NotSelectedLight from "../../../../../../assets/notSelectedLight.png";
import NotSelectedDark from "../../../../../../assets/notSelectedDark.png";
import { useDarkMode } from '../../../../../../../contexts/DarkMode/DarkMode';
import { useCreateBar } from '../../../../../../../contexts/leftBar/createBarContext';

const LeftBarButtons: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { profiles, postAs, setPostAs, togglePostingAsBar } = useCreateBar();

    const handleProfileChange = (profileType: 'personal' | 'professional' | 'school') => {
        setPostAs(profileType);
        togglePostingAsBar();
    };

    return (
        <>
            {Object.entries(profiles).map(([profileType, profile]) => (
                <ButtonLink
                    key={profileType}
                    $isDarkMode={isDarkMode}
                    onClick={() => handleProfileChange(profileType as 'personal' | 'professional' | 'school')}
                >
                    <ButtonWrapper>
                        <LogoContainer>
                            <Border profileType={profileType as 'personal' | 'professional' | 'school'}>
                                <Photo src={profile.photoUrl} />
                            </Border>
                            <Text size={"1.1rem"} variant={profileType as 'personal' | 'professional' | 'school'} fontWeight={"300"}>
                                {profileType.charAt(0).toUpperCase() + profileType.slice(1)}
                            </Text>
                            <SelectLogoContainer>
                                <SelectLogo
                                    darkModeLogo={NotSelectedDark}
                                    lightModeLogo={NotSelectedLight}
                                    activeDarkLogo={SelectedDark}
                                    activeLightLogo={SelectedLight}
                                    isActive={postAs === profileType}
                                    size={1.5}
                                />
                            </SelectLogoContainer>
                        </LogoContainer>
                    </ButtonWrapper>
                </ButtonLink>
            ))}
        </>
    );
};

export default LeftBarButtons;

const SelectLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

interface BorderProps {
    profileType: 'personal' | 'professional' | 'school';
}

const getBackgroundGradient = (profileType: string) => {
    switch (profileType) {
        case 'personal':
            return 'linear-gradient(to right, #662D8C, #ED1E79)';
        case 'professional':
            return 'linear-gradient(to right, #2E3192, #1BFFFF)';
        case 'school':
            return 'linear-gradient(to right, #EA8D8D, #A890FE)';
        default:
            return '';
    }
};

const Border = styled.div<BorderProps>`
    background: ${({ profileType }) => getBackgroundGradient(profileType)};
    padding: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Photo = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
`;

const ButtonWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 0.7rem;
`;

const ButtonLink = styled.button<{ $isDarkMode: boolean }>`
  flex: 1;
  margin: 0.5rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  font-size: inherit;
  outline: none;

  transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;

  &:hover {
    color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#6c6c6c' : '#a2a2a2')};
    transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
    opacity: 0.8;
    transform: scale(1.05); 
  }

  &:active {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#919191' : '#595858')};
    transition: color 0.2s, background-color 0.2s;
    transform: scale(1.00);
  }
`;
