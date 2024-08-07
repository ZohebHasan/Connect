import React from 'react';
import styled from 'styled-components';

import DefaultPersonalDark from "../../../assets/personalDark.png";
import DefaultPersonalLight from "../../../assets/personalLight.png";

import DefaultProfessionalDark from "../../../assets/professionalDark.png";
import DefaultProfessionalLight from "../../../assets/professionalLight.png";

import DefaultSchoolDark from "../../../assets/schoolUserDark.png";
import DefaultSchoolLight from "../../../assets/schoolUserLight.png";

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useProfile, ProfileType } from '../../../../contexts/profiles/profilesContext'; // Import ProfileType

interface ContentProps {
    parentSize?: number;
    childSize?: number;
}

const ProfilePhotos: React.FC<ContentProps> = ({ parentSize, childSize }) => {
    const { profiles, activeProfile } = useProfile();
    const { isDarkMode } = useDarkMode();

    const getProfilePhoto = (type: ProfileType) => {
        const profile = profiles.find(p => p.type === type);
        if (profile && profile.photoUrl) {
            return profile.photoUrl;
        }

        switch (type) {
            case 'personal':
                return isDarkMode ? DefaultPersonalDark : DefaultPersonalLight;
            case 'professional':
                return isDarkMode ? DefaultProfessionalDark : DefaultProfessionalLight;
            case 'school':
                return isDarkMode ? DefaultSchoolDark : DefaultSchoolLight;
            default:
                return null;
        }
    };

    const renderProfilePhoto = (type: ProfileType, role: 'parent' | 'child', position?: 'top' | 'bottom') => (
        <PhotoContainer
            key={type}
            role={role}
            position={position}
        >
            <Border role={role} profileType={type}>
                <InnerBorder $isDarkMode={isDarkMode}>
                    <Photo
                        src={getProfilePhoto(type)}
                        role={role}
                        $parentSize={parentSize}
                        $childSize={childSize}
                    />
                </InnerBorder>
            </Border>
        </PhotoContainer>
    );

    const renderChildProfile = (type: ProfileType, position: 'top' | 'bottom') => {
        const profile = profiles.find(p => p.type === type);
        if (profile) {
            return renderProfilePhoto(type, 'child', position);
        }
        return null;
    };

    return (
        <>
            <ProfilePhotoContainer>
                {activeProfile && renderProfilePhoto(activeProfile, 'parent')}
                {activeProfile === 'personal' && (
                    <>
                        {renderChildProfile('professional', 'top')}
                        {renderChildProfile('school', 'bottom')}
                    </>
                )}
                {activeProfile === 'professional' && (
                    <>
                        {renderChildProfile('personal', 'top')}
                        {renderChildProfile('school', 'bottom')}
                    </>
                )}
                {activeProfile === 'school' && (
                    <>
                        {renderChildProfile('personal', 'top')}
                        {renderChildProfile('professional', 'bottom')}
                    </>
                )}
            </ProfilePhotoContainer>
        </>
    );
};

export default ProfilePhotos;

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 1.5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; 
`;

const ProfilePhotoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
`;

interface PhotoContainerProps {
    role: 'parent' | 'child';
    position?: 'top' | 'bottom';
}

const PhotoContainer = styled.div<PhotoContainerProps>`
  position: absolute;
  z-index: ${({ role }) => (role === 'parent' ? 2 : 1)};
  display: flex;
  width: 100%;
  height: 100%;
  align-items: ${({ role, position }) =>
        role === 'parent'
            ? 'center'
            : position === 'top'
                ? 'flex-start'
                : 'flex-end'};
  justify-content: ${({ role, position }) =>
        role === 'parent'
            ? 'flex-start'
            : 'flex-end'};
`;

interface BorderProps {
    role: 'parent' | 'child';
    profileType: ProfileType;
}

const getBackgroundGradient = (profileType: ProfileType) => {
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
  padding: ${({ role }) => (role === 'parent' ? '1.8px' : '1.5px')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Photo = styled.img<{ role: 'parent' | 'child', $parentSize?: number, $childSize?: number }>`
    height: ${({ role, $parentSize, $childSize }) => {
        if (role === 'parent' && $parentSize) {
            return `${$parentSize}rem`;
        } else if (role === 'child' && $childSize) {
            return `${$childSize}rem`;
        }
        return role === 'parent' ? '2.5rem' : '1.5rem';
    }};
    width: ${({ role, $parentSize, $childSize }) => {
        if (role === 'parent' && $parentSize) {
            return `${$parentSize}rem`;
        } else if (role === 'child' && $childSize) {
            return `${$childSize}rem`;
        }
        return role === 'parent' ? '2.5rem' : '1.5rem';
    }};
    border-radius: 50%;
`;
