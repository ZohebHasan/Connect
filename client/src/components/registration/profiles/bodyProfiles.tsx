import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Top from "./smallComponents/top";
import Bottom from './smallComponents/bottom';
import { useSignup } from '../../../contexts/signup/signupContext';

type ProfileType = 'professional' | 'personal' | 'school';

const Body: React.FC = () => {
    const navigate = useNavigate();
    const { handleSelectedSubmit, handleSelectAllThree } = useSignup();
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

    const handleConfirmClick = async (event: React.MouseEvent<HTMLElement>) => {
        const anySelected = Object.values(selectedProfile).some(value => value);
        if (!anySelected) {
            event.preventDefault();
            setNotSelectedError(true);
        } else {
            try {
                await handleSelectedSubmit(selectedProfile);
                console.log("Profiles created successfully. Proceeding to the next page...");
            } catch (error) {
                console.error("Error creating profiles:", error);
            }
        }
    };

    const selectAllAndNavigate = async () => {
        setSelectedProfile({
            professional: true,
            personal: true,
            school: true
        });

        try {
            await handleSelectAllThree();
        } catch (error) {
            console.error("Error creating all profiles:", error);
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
                    handleConfirmClick={handleConfirmClick}
                    selectAllAndNavigate={selectAllAndNavigate}
                />
            </Bodycontainer>
        </>
    );
};

export default Body;
