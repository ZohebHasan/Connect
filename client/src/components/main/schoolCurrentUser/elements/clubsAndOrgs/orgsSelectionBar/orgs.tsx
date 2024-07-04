import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { useOrgs } from '../../../../../../contexts/schoolProfile/clubAndOrgsContext';

import SelectButton from "../../../../containers/buttonLogo";
import Text from '../../../../../ConnectUI_web/common/texts/static';

import SelectedDark from "../../../../../assets/selectedDark.png";
import SelectedLight from "../../../../../assets/selectedLight.png";
import NotSelectedLight from "../../../../../assets/notSelectedLight.png";
import NotSelectedDark from "../../../../../assets/notSelectedDark.png";

const LeftBarButtons: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { orgs, activeOrg, setActiveOrg, toggleOrgBar } = useOrgs();

    const handleOrgClick = (orgCode: string) => {
        setActiveOrg(orgCode);
        toggleOrgBar();
    };

    return (
        <>
            {orgs.map(Org => (
                <ButtonLink
                    key={Org.orgCode}
                    $isDarkMode={isDarkMode}
                    onClick={() => handleOrgClick(Org.orgCode)}
                >
                    <ButtonWrapper>
                        <LogoContainer>
                            <Border $type={"org"}>
                                <InnerBorder isDarkMode={isDarkMode} $type={"org"}>
                                    {activeOrg && <UserIcon src={activeOrg.photoUrl} $type={"org"} />}
                                </InnerBorder>
                            </Border>
                            <TextContainer>
                                <Text size={"1.1rem"} variant={"normal"} fontWeight={"300"}>{Org.orgName}</Text>
                            </TextContainer>
                            <SelectButtonContainer>
                                <SelectButton
                                    darkModeLogo={NotSelectedDark}
                                    lightModeLogo={NotSelectedLight}
                                    activeDarkLogo={SelectedDark}
                                    activeLightLogo={SelectedLight}
                                    isActive={activeOrg?.orgCode === Org.orgCode}
                                    size={1.5}
                                />
                            </SelectButtonContainer>
                        </LogoContainer>
                    </ButtonWrapper>
                </ButtonLink>
            ))}
        </>
    );
};

export default LeftBarButtons;

const UserIcon = styled.img<{ $type: "eboard" | "leader" | "org" }>`
  width: ${({ $type }) => ($type === "org" ? "2.5rem" : $type === "eboard" ? "1.6rem" : "1.8rem")};
  height: ${({ $type }) => ($type === "org" ? "2.5rem" : $type === "eboard" ? "1.6rem" : "1.8rem")};
  border-radius: 50%;
  flex-shrink: 0;
`;

const InnerBorder = styled.div<{ isDarkMode: boolean; $type: "eboard" | "leader" | "org" }>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
  padding: ${props => (props.$type === "org" ? "1.5px" : props.$type === "eboard" ? "1px" : "1.2px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const Border = styled.div<{ $type: "eboard" | "leader" | "org" }>`
  background: linear-gradient(to right, #EA8D8D, #A890FE);
  padding: ${props => (props.$type === "org" ? "2px" : "1.5px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
`;

const SelectButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    width: 96%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 0rem;
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
    /* margin: 0.5rem 0rem; */
   
    display: flex;
    align-items: center;
    justify-content: center;
    width: 93%;
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
        transform: scale(1.02); 
    }

    &:active {
        background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#919191' : '#595858')};
        transition: color 0.2s, background-color 0.2s;
        transform: scale(1.00);
    }
`;
