// import React, { useState } from 'react';
// import styled from 'styled-components';
// import OrgBarContainer from './orgsBarContainer';

// import Text from '../../../../../ConnectUI_web/common/texts/static';
// import Orgs from "./orgs"





// const Org: React.FC = () => {
  
//     return (
//         <OrgBarContainer>
//             <ProfileTextContainer>
//                 <Text variant={"school"}
//                     size={"2rem"}
//                     fontWeight={"300"}
//                 >
//                     Clubs & organizations
//                 </Text>
//             </ProfileTextContainer>
//             <OrgsContainer>
//                 {/* <OrgsWrapper> */}
//                     <Orgs/>
//                 {/* </OrgsWrapper> */}
//             </OrgsContainer>
//             {/* <EmptySpace>
//             </EmptySpace> */}
//         </OrgBarContainer>
//     );
// };

// export default Org;


// const OrgsWrapper = styled.div`
//   width: 90%;
//   /* flex: 2; */
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;
//   background-color: red;
//   // width: 100%;
// `

// const ProfileTextContainer = styled.div`
//     display: flex;
//     /* flex: 1.5; */
//     align-items: center;
//     justify-content: flex-start;
//     width: 90%;
//     margin-top: 0.5rem;
//      /* background-color: blue; */
// `
// const OrgsContainer = styled.div`
//     /* flex: 5; */
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;  // Changed from center to flex-start to align children from top to bottom: ;
//     max-height: 100%;
//     width: 100%;
//     overflow-y: auto;
//     margin-bottom: 1.2rem;
//     /* background-color: pink; */
// `

// const EmptySpace = styled.div`
//   flex: 0.5;
//   // background-color: red;
//   width: 100%;
// `