import React, { useState} from 'react';
import styled from 'styled-components';


import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';


import Button from '../../ConnectUI_web/common/buttons/button1';


import LogoCreate from "../containers/buttonLogo";

import CreateDark from "../assets/createDark.png"
import CreateLight from "../assets/createLight.png"
import CreateActiveLight from "../assets/createLightActive.png"
import CreateActiveDark from "../assets/createDarkActive.png"

type ButtonKey = 'home' | 'search' | 'notifications' | 'inbox' | 'trending' | 'clips' | 'create';


interface LeftBarButtonsProps {
    activeButtons: {
        home: boolean;
        search: boolean;
        notifications: boolean;
        inbox: boolean;
        trending: boolean;
        clips: boolean;
        create: boolean;
    };
    toggleActive: (buttonKey: ButtonKey) => void;
}



const CreateButton: React.FC<LeftBarButtonsProps> = ({ activeButtons, toggleActive }) => {
  


    return (
        <>      
            <Button 
                variant= {"transparent"}
                width= {"60%"}
                onClick={() => toggleActive('create')} 
                to = "#"
                isActive={activeButtons.create}
            >
                <Temp>
                    <LogoCreate
                        darkModeLogo={CreateDark}
                        lightModeLogo={CreateLight}
                        activeDarkLogo={CreateActiveDark}
                        activeLightLogo={CreateActiveLight}
                        size={1.5}
                        isActive={activeButtons.create}
                    />
                    Create
                </Temp>
                </Button>
              
        </>
    );
};

export default CreateButton;

const Temp = styled.div`
display: flex;
flex-direction:row;
// background-color: red;
width: 100%;
align-items: center;
justify-content: center;
gap: 0.8rem;
`









