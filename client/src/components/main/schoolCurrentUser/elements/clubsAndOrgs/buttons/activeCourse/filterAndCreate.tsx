// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useDarkMode } from '../../../../../../../contexts/DarkMode/DarkMode';
// import Text from '../../../../../../ConnectUI_web/common/texts/static';

// import CreateDark from "../../../../../../assets/createWriteDark.png";
// import CreateLight from "../../../../../../assets/createWriteLight.png";

// import FilterDark from "../../../../../../assets/filterDark.png";
// import FilterLight from "../../../../../../assets/filterLight.png";

// import SearchBox from "./searchPost/searchPostBox";
// import { useOrgs } from '../../../../../../../contexts/schoolProfile/clubAndOrgsContext';

// const Header: React.FC = () => {
//   const { isDarkMode } = useDarkMode();
//   const { activeOrg, searchPosts } = useOrgs();
//   const [searchText, setSearchText] = useState('');

//   const handleSearchTextChange = (value: string) => {
//     setSearchText(value);
//     searchPosts(value);
//   };

//   const truncatedOrgName = activeOrg && activeOrg.orgName
//     ? activeOrg.orgName.length > 30
//       ? activeOrg.orgName.substring(0, 30) + '...'
//       : activeOrg.orgName
//     : '';

//   return (
//     <ButtonsContainer>
//       <FirstHalf>
//         <SearchBoxContainer>
//           <SearchBox
//             id="search_in_course"
//             label={"Search in " + truncatedOrgName}
//             value={searchText}
//             onChange={handleSearchTextChange}
//             width="100%"
//           />
//         </SearchBoxContainer>
//       </FirstHalf>
//       <SecondHalf>
//         <CreateButton $isDarkMode={isDarkMode}>
//           <CreateIcon src={isDarkMode ? CreateDark : CreateLight} />
//           <Text variant="normal" size="1rem" fontWeight="200">
//             Create a post
//           </Text>
//         </CreateButton>
//         <FilterButton>
//           <FilterIcon src={isDarkMode ? FilterDark : FilterLight} />
//         </FilterButton>
//       </SecondHalf>
//     </ButtonsContainer>
//   );
// };

// export default Header;

// const ButtonsContainer = styled.div`
//   display: flex;
//   width: 95%;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 1rem;
// `;

// const SecondHalf = styled.div`
//   flex: 3;
//   display: flex;
//   flex-direction: row;
//   gap: 1rem;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const FirstHalf = styled.div`
//   flex: 2;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const SearchBoxContainer = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
// `;

// const CreateButton = styled.div<{ $isDarkMode: boolean }>`
//   border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff73' : 'black')}; 
//   padding: 0.4rem 0.8rem;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.3rem;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//     transform: scale(1.04);
//   }
//   &:active {
//     transform: scale(0.99);
//   }
//   background-color: #ffffff2b;
//   transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
// `;

// const FilterButton = styled.div`
//   display: flex;
//   align-items: flex-end;
//   justify-content: flex-end;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//     transform: scale(1.05);
//   }
//   &:active {
//     transform: scale(0.96);
//   }
//   transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
// `;

// const FilterIcon = styled.img`
//   width: 1.8rem;
// `;

// const CreateIcon = styled.img`
//   width: 1.5rem;
// `;
