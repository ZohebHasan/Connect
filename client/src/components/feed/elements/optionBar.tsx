import React, {useState} from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../../contexts/Language/Language';
import { transHeader } from '../../../translations/loginSignup/selectLang/transHeader';
import Sidebar from '../containers/optionBarContainer';
import SideBarLinks from '../containers/optionsContainer'
import Text from '../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import Logo from "../../ConnectUI_web/common/logo/logo";
import Options from "./options"
import ControlCenter from "./controlCenter"


const SidebarContainer: React.FC = () => {    
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
          clips:false,
          trending: false,
          create: false,
          [buttonKey]: true  
      });
  };
  
  const { language } = useLanguage();

 

  return (
    <Sidebar>
      <SettingsTextContainer>
        <Text variant= {"personal"}
                size= {"2.5rem"}
                fontWeight= {"200"}
        >
            Options
        </Text>
      </SettingsTextContainer>
      <OptionsContainer>
        <ControlCenter/>
        <OptionsWrapper>
          <Options
              activeButtons={activeButtons}
              toggleActive={toggleActive}
          />
          
        </OptionsWrapper>
      
      </OptionsContainer>
      <EmptySpace>

      </EmptySpace>
    </Sidebar>
  );
};

export default SidebarContainer;

const OptionsWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;

`

const SettingsTextContainer = styled.div`
    display: flex;
    flex: 0.7;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    // background-color: blue;
`
const OptionsContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;  // Changed from center to flex-start to align children from top to bottom
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    // background-color: pink;
`

const EmptySpace = styled.div`
  flex: 0.8;
  // background-color: red;
  width: 100%;
`