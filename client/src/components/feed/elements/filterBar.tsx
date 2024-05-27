import React, { useState } from 'react';
import styled from 'styled-components';
import FilterBarContainer from '../containers/filterBarContainer';

import Text from '../../ConnectUI_web/common/texts/static';
import Filters from "./filters"





const Filter: React.FC = () => {
  
    return (
        <FilterBarContainer>
            <ProfileTextContainer>
                <Text variant={"transparent"}
                    size={"1.7rem"}
                    fontWeight={"200"}
                >
                    Filters
                </Text>
            </ProfileTextContainer>
            <FiltersContainer>
                <FiltersWrapper>
                    <Filters/>
                </FiltersWrapper>
            </FiltersContainer>
            <EmptySpace>
            </EmptySpace>
        </FilterBarContainer>
    );
};

export default Filter;


const FiltersWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;
`

const ProfileTextContainer = styled.div`
    display: flex;
    flex: 1.5;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    // background-color: blue;
`
const FiltersContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;  // Changed from center to flex-start to align children from top to bottom
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    // background-color: pink;
`

const EmptySpace = styled.div`
  flex: 0.5;
  // background-color: red;
  width: 100%;
`