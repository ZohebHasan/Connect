import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import Info from "../../../../assets/info.png";

import Text from '../../../../ConnectUI_web/common/texts/static';

export interface User {
    name?: string;
    userName?: string;
    link: string;
    photoUrl: string;
    isVerified?: boolean;
    type: 'instructor' | 'student' | 'ta';
}

export interface Instructor extends User {
    type: 'instructor';
}

export interface Student extends User {
    type: 'student';
}

export interface TA extends User {
    type: 'ta';
}

interface IsImportantProps {
    markedBy: (Instructor | TA)[];
    isQuestion: boolean;
}

const IsImportantComponent: React.FC<IsImportantProps> = ({ markedBy, isQuestion }) => {
    const { isDarkMode } = useDarkMode();

    const uniqueMarkedBy = Array.from(new Set(markedBy.map(user => user.userName)))
        .map(userName => markedBy.find(user => user.userName === userName))
        .filter((user): user is Instructor | TA => user !== undefined);

    const instructors = uniqueMarkedBy.filter(user => user.type === 'instructor') as Instructor[];
    const tas = uniqueMarkedBy.filter(user => user.type === 'ta') as TA[];

    let message = '';
    const importanceText = isQuestion ? 'question' : 'post';

    if (instructors.length > 0 && tas.length > 0) {
        if (instructors.length === 1) {
            message = `${instructors[0].name} (Instructor) and ${tas.length} ${tas.length === 1 ? 'TA' : 'TAs'} marked this ${importanceText} as important.`;
        } else if (instructors.length === 2) {
            message = `${instructors[0].name} (Instructor), ${instructors[1].name} (Instructor), and ${tas.length} ${tas.length === 1 ? 'TA' : 'TAs'} marked this ${importanceText} as important.`;
        } else {
            message = `${instructors[0].name} (Instructor), ${instructors[1].name} (Instructor), and ${instructors.length - 2} more ${instructors.length - 2 === 1 ? 'Instructor' : 'Instructors'}, ${tas.length} ${tas.length === 1 ? 'TA' : 'TAs'} marked this ${importanceText} as important.`;
        }
    } else if (instructors.length > 0) {
        if (instructors.length === 1) {
            message = `${instructors[0].name} (Instructor) marked this ${importanceText} as important.`;
        } else if (instructors.length === 2) {
            message = `${instructors[0].name} (Instructor), ${instructors[1].name} (Instructor) marked this ${importanceText} as important.`;
        } else {
            message = `${instructors[0].name} (Instructor), ${instructors[1].name} (Instructor), and ${instructors.length - 2} more ${instructors.length - 2 === 1 ? 'Instructor' : 'Instructors'} marked this ${importanceText} as important.`;
        }
    } else if (tas.length > 0) {
        if (tas.length === 1) {
            message = `${tas[0].name} (TA) marked this ${importanceText} as important.`;
        } else {
            message = `${tas[0].name} (TA) and ${tas.length - 1} more ${tas.length - 1 === 1 ? 'TA' : 'TAs'} marked this ${importanceText} as important.`;
        }
    }

    if (!message) {
        return null;
    }

    return (
        <IsImportantContainer>
            <Wrapper $isDarkMode={isDarkMode}>
                <InfoIcon src={Info} />
                <Text variant="normal" size="0.9rem" fontWeight="500">
                    {message}
                </Text>
            </Wrapper>
        </IsImportantContainer>
    );
};

export default IsImportantComponent;

const InfoIcon = styled.img`
    width: 1.1rem;
`;

const Wrapper = styled.div<{$isDarkMode: boolean}>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.3rem 0.5rem;
    gap: 0.5rem;
    border: 0.5px solid white;
    border-radius: 5px;
    box-shadow: 0 2px 15px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(164, 164, 164, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
    border: 1px solid rgba(253, 211, 255, 0.201);
`;

const IsImportantContainer = styled.div`
    display: flex;
    width: 95%;
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
`;
