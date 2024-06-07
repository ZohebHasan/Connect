import React from 'react';
import styled from 'styled-components';

import PersonalPhoto from "../../../dummies/personal.jpeg";
import ProfessionalPhoto from "../../../dummies/professional.jpeg";
import SchoolPhoto from "../../../dummies/school.jpeg";

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

interface ContentProps {
  parentSize?: number;
  childSize?: number;
  suggestedProfile: 'personal' | 'professional' | 'school';
}

const ProfilePhotos: React.FC<ContentProps> = ({ parentSize, childSize, suggestedProfile }) => {
  const { isDarkMode } = useDarkMode();

  const profiles = {
    personal: PersonalPhoto,
    professional: ProfessionalPhoto,
    school: SchoolPhoto,
  };

  return (
    <>
      <ProfilePhotoContainer>
        <PhotoContainer role="parent">
          <Border role="parent" profileType={suggestedProfile}>
            <InnerBorder $isDarkMode={isDarkMode}>
              <Photo
                src={profiles[suggestedProfile]}
                role={'parent'}
                $parentSize={parentSize}
                $childSize={childSize}
              />
            </InnerBorder>
          </Border>
        </PhotoContainer>

        <PhotoContainer role="child" position="top">
          <Border role="child" profileType={suggestedProfile === 'personal' ? 'school' : 'personal'}>
            <InnerBorder $isDarkMode={isDarkMode}>
              <Photo
                src={suggestedProfile === 'personal' ? profiles['school'] : profiles['personal']}
                role={'child'}
                $parentSize={parentSize}
                $childSize={childSize}
              />
            </InnerBorder>
          </Border>
        </PhotoContainer>

        <PhotoContainer role="child" position="bottom">
          <Border role="child" profileType={suggestedProfile === 'professional' ? 'school' : 'professional'}>
            <InnerBorder $isDarkMode={isDarkMode}>
              <Photo
                src={suggestedProfile === 'professional' ? profiles['school'] : profiles['professional']}
                role={'child'}
                $parentSize={parentSize}
                $childSize={childSize}
              />
            </InnerBorder>
          </Border>
        </PhotoContainer>
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
      : position === 'top'
      ? 'flex-end'
      : 'flex-end'};
`;

interface BorderProps {
  role: 'parent' | 'child';
  profileType: 'personal' | 'professional' | 'school';
}

const getBackgroundGradient = (profileType: string) => {
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

const Photo = styled.img<{ role: 'parent' | 'child'; $parentSize?: number; $childSize?: number }>`
  height: ${({ role, $parentSize, $childSize }) => {
    if (role === 'parent' && $parentSize) {
      return `${$parentSize}rem`;
    } else if (role === 'child' && $childSize) {
      return `${$childSize}rem`;
    }
    return role === 'parent' ? '2.5rem' : '2rem';
  }};
  width: ${({ role, $parentSize, $childSize }) => {
    if (role === 'parent' && $parentSize) {
      return `${$parentSize}rem`;
    } else if (role === 'child' && $childSize) {
      return `${$childSize}rem`;
    }
    return role === 'parent' ? '2.5rem' : '2rem';
  }};
  border-radius: 50%;
`;
