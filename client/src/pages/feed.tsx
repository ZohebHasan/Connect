import React from 'react';

import Header from '../components/feed/header';
import Body from '../components/feed/body'

import { StoriesPageProvider } from '../contexts/stories/storiesContext';


const ProfilesPage: React.FC = () => {

    return (
        <>
            {/* <Header/> */}
            <StoriesPageProvider>
                <Body />
            </StoriesPageProvider>
        </>
    );
};

export default ProfilesPage;
