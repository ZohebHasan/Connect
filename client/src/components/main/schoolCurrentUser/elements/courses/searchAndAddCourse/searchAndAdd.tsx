import React from 'react';
import styled from 'styled-components';
import CreateBarContainer from './container';
// import { useCreateBar } from '../../../../contexts/leftBar/createBarContext';

import SearchComponent from './elements/barType/searchCourse/searchBar';
import CreateCourse from './elements/barType/createCourse/createBar';





import { useSchoolProfile } from '../../../../../../contexts/schoolProfile/school';

const SearchAndCreate: React.FC = () => {

  const {isSearchBarActive} = useSchoolProfile();


  const renderComponent = () => {
    if (isSearchBarActive) {
      return <SearchComponent />;
    } else {
      return <CreateCourse />;
    }



  };

  return (
    <CreateBarContainer>
     
      {renderComponent()}
    </CreateBarContainer>
  );
};

export default SearchAndCreate;
