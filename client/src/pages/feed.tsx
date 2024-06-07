import React from 'react';

import Header from '../components/main/feed/header';
import Body from '../components/main/feed/body'

import { StoriesProvider } from '../contexts/stories/storiesContext';


const ProfilesPage: React.FC = () => {

    return (
        <>
            {/* <Header/> */}
            <StoriesProvider>
                <Body />
            </StoriesProvider>
        </>
    );
};

export default ProfilesPage;
