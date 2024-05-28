import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import Text from '../../ConnectUI_web/common/texts/static';

import CloseLight from "../assets/closeLight.png"
import CloseDark from "../assets/closeDark.png"
import FilterIcon from "../assets/filter.png"
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useFilter } from '../../../contexts/feed/filters/filtersContext';

const FeedHeader: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { isFiltersbarOpen, toggleFiltersbar, addProtectedRef, removeProtectedRef } = useFilter();

    const filterButtonRef = useRef<HTMLImageElement>(null);

    const iconSrc = isFiltersbarOpen
        ? (isDarkMode ? CloseDark : CloseLight)
        : FilterIcon;

    const altText = isFiltersbarOpen ? 'Close' : 'Open';

    useEffect(() => {
        if (filterButtonRef.current) {
          addProtectedRef(filterButtonRef);
        }
    
        return () => {
          if (filterButtonRef.current) {
            removeProtectedRef(filterButtonRef);
          }
        };
      }, [filterButtonRef, addProtectedRef, removeProtectedRef]);

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <TextContainer>
                    <Text variant={"transparent"} size={"2.5rem"} fontWeight={"300"}>Home</Text>
                </TextContainer>
                <FilterContainer>
                    <FilterContainerWrapper>
                        <FilterButton ref = {filterButtonRef} src={iconSrc} alt={altText} onClick={toggleFiltersbar} />
                    </FilterContainerWrapper>
                </FilterContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default FeedHeader;

const FilterContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;
    /* background-color: green; */
`;

const FilterContainerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 85%;
    /* background-color: red; */
`;

const FilterButton = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
        opacity: 0.8;
        transform: scale(1.05); 
    }

    &:active {
        transform: scale(1.00);
    }
`;

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* background-color: green; */
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 95%;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5rem;
    /* border-bottom: 1px solid rgba(235, 57, 137, 0.300); */
`;
