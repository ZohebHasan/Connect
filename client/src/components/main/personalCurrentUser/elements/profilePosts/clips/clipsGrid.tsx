import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useClipContext } from '../../../../../../contexts/personalProfile/clipContext';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';

import Text from '../../../../../ConnectUI_web/common/texts/static';
import Bottom from "../postGridBottom";
import PostGridIcons from '../postGridIcons';

const Clips: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { posts, setActiveIndex, toggleClipBar } = useClipContext();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
        toggleClipBar();
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
        const video = videoRefs.current[index];
        if (video) {
            video.currentTime = 0;
            if (video.paused) {
                video.play().catch(error => {
                    console.error("Failed to play video:", error);
                });
            }
        }
    };

    const handleMouseLeave = (index: number) => {
        setHoveredIndex(null);
        const video = videoRefs.current[index];
        if (video && !video.paused) {
            video.pause();
        }
    };

    useEffect(() => {
        if (hoveredIndex !== null) {
            const timer = setTimeout(() => {
                const video = videoRefs.current[hoveredIndex];
                if (video && !video.paused) {
                    video.pause();
                }
                setHoveredIndex(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [hoveredIndex]);

    return (
        <ClipsContainer $isDarkMode={isDarkMode}>
            {posts.map((post, index) => (
                <PostThumbnail
                    key={post.id}
                    onClick={() => handleThumbnailClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                >
                    <VideoWrapper>
                        <VideoThumbnail
                            ref={el => (videoRefs.current[index] = el)}
                            src={post.media[0].url}
                        />
                    </VideoWrapper>
                    <HoverOverlay className="hover-overlay" $isDarkMode={isDarkMode}>
                        <TimeContainer>
                            <Text variant={'transparent'} size={'0.9rem'} fontWeight="500">
                                June 5
                            </Text>
                        </TimeContainer>
                        <BottomContainer>
                            <Bottom />
                        </BottomContainer>
                    </HoverOverlay>
                    <OverlayIcons>
                        <PostGridIcons postType="clip" />
                    </OverlayIcons>
                </PostThumbnail>
            ))}
        </ClipsContainer>
    );
};

export default Clips;

const ClipsContainer = styled.div<{ $isDarkMode: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 75%;
    padding: 20px;
`;

const OverlayIcons = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
    z-index: 1;
`;

const PostThumbnail = styled.div`
    position: relative;
    width: 100%;
    padding-top: 177.78%; /* 16:9 aspect ratio */
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }

    &:hover .hover-overlay {
        opacity: 1;
    }
`;

const HoverOverlay = styled.div<{ $isDarkMode: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
    z-index: 2;
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)')};
`;

const TimeContainer = styled.div`
    padding: 5px 10px;
`;

const BottomContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0px;
`;

const VideoWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const VideoThumbnail = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.3s ease;
`;

VideoThumbnail.defaultProps = {
    autoPlay: false,
    controls: false,
    loop: false,
    muted: true,
    playsInline: true,
};
