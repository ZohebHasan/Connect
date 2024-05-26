import React from 'react';

import Header from '../components/feed/header';
import Body from '../components/feed/body'

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
