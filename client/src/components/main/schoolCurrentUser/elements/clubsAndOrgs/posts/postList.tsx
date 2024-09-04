// import React from 'react';
// import styled from 'styled-components';

// import SchoolPost from '../../../../elements/posts/schoolOrgPostTemplate';
// import { useOrgs } from '../../../../../../contexts/schoolProfile/clubAndOrgsContext';

// const ChirpContainer: React.FC = () => {
//     const { activeOrg, isSearching, resultPosts } = useOrgs();

//     const postsToRender = isSearching ? resultPosts : activeOrg?.posts || [];

//     return (
//         <Container>
//             {isSearching && resultPosts.length === 0 && (
//                 <NoResultMessage>No available results</NoResultMessage>
//             )}
//             {postsToRender.map((post, index) => (
//                 <React.Fragment key={index}>
//                     <SchoolPost
//                         postedBy={post.postedBy}
//                         datePosted={post.datePosted}
//                         textBody={post.textBody}
//                         media={post.media}
//                         postType={post.postType}
//                         isQuestion={post.isQuestion}
//                         display={post.display}
//                     />
//                     {index < postsToRender.length - 1 && <Divider />}
//                 </React.Fragment>
//             ))}
//         </Container>
//     );
// };

// export default ChirpContainer;

// const Container = styled.div`
//   width: 95%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const Divider = styled.div`
//   width: 100%;
//   height: 1px;
//   background-color: #d08ebc79;
//   margin: 2rem 0rem;
// `;

// const NoResultMessage = styled.div`
//   margin-top: 2rem;
//   font-size: 1.2rem;
//   color: #888;
// `;
