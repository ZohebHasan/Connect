import React, { useState} from 'react';

import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import Top from "./smallComponents/top"
import Bottom from './smallComponents/bottom';

type ProfileType = 'professional' | 'personal' | 'school';


const Body: React.FC= () => {
    const [selectedProfile, setSelectedProfile] = useState({
        professional: false,
        personal: false,
        school: false
    });
    const [notSelectedError, setNotSelectedError] = useState(false); 
    
    const handleSelected = (profileType: ProfileType) => {
        setSelectedProfile(prevState => {
            const newState = {
                ...prevState,
                [profileType]: !prevState[profileType]
            };
         
            const anySelected = Object.values(newState).some(value => value);
            if (anySelected) {
                setNotSelectedError(false); 
            }
            return newState;
        });
    };
    
    const handleConfirmClick = (event: React.MouseEvent<HTMLElement>) => {
        const anySelected = Object.values(selectedProfile).some(value => value);
        if (!anySelected) {
            event.preventDefault(); 
            setNotSelectedError(true); 
        } 
        else {
            console.log("Proceeding to the next page...");
        }
    };
    
    
    return (
        <>
            <Bodycontainer flexDirection="column">
                <Top 
                    selectedProfile={selectedProfile}
                    notSelectedError={notSelectedError}
                    handleSelected={handleSelected}
                />
                <Bottom 
                    selectedProfile={selectedProfile}
                    handleConfirmClick = {handleConfirmClick}
                />
            </Bodycontainer>
        </>
    );
};

export default Body;


