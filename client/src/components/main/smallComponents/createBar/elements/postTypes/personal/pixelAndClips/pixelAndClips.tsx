import React from 'react';
import { useCreateBar } from '../../../../../../../../contexts/leftBar/createBarContext';
import DragAndSelect from "./dragAndSelectMedia/dragAndSelect";
import CropComponent from "./preview/preview";

const Create: React.FC = () => {
    const { profiles } = useCreateBar();
    const personalProfile = profiles.personal;

    const renderComponent = () => {
        if (!personalProfile.postType || !personalProfile.postType.media || personalProfile.postType.media.length === 0) {
            return <DragAndSelect />;
        } else {
            return <CropComponent />;
        }
    };

    return (
        <>
            {renderComponent()}
        </>
    );
};

export default Create;
