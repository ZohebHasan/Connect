import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';


interface PostScrollerProps {
  children: React.ReactNode[];
  activeIndex: number;
}

const PostScroller: React.FC<PostScrollerProps> = ({ children, activeIndex }) => {
  const { isDarkMode } = useDarkMode();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToPost = useCallback((index: number) => {
    const container = containerRef.current;
    const post = postsRef.current[index];

    if (container && post) {
      const containerCenter = container.offsetHeight / 2;
      const postCenter = post.offsetTop + post.offsetHeight / 2;
      const scrollPosition = postCenter - containerCenter;

      container.scrollTop = scrollPosition;
    }
  }, []);

  useEffect(() => {
    scrollToPost(activeIndex);
  }, [activeIndex, scrollToPost]);

  return (
    <PostList ref={containerRef} $isDarkMode={isDarkMode}>
      {children.map((child, index) => (
        <Wrapper key={index}>
          <Post ref={(el) => (postsRef.current[index] = el)}>
            {child}
          </Post>
        </Wrapper>
      ))}
    </PostList>
  );
};

export default PostScroller;

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostList = styled.div<{ $isDarkMode: boolean }>`
  width: 100%;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;


  ::-webkit-scrollbar {
    width: 4px; /* Width of the vertical scrollbar */
    height: 8px; /* Height of the horizontal scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* Background of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ $isDarkMode }) => ($isDarkMode ? '#555' : '#888')}; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the thumb */
    min-height: 30px; /* Minimum height for the thumb */
    transition: background-color 0.3s ease; /* Smooth transition for color change */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #f41c7ac9;
  }
`;

const Post = styled.div`
  width: 100%;
`;
