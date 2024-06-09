import React from 'react';
import styled from 'styled-components';
import { usePixelContext } from '../../../../../../contexts/personalProfile/pixelContext';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';

import Text from '../../../../../ConnectUI_web/common/texts/static';
import Bottom from "../postGridBottom";
import PostGridIcons from '../postGridIcons';

const Pixels: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { posts, setActiveIndex, togglePixelBar } = usePixelContext();

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
        togglePixelBar();
    };

    return (
        <PixelsContainer $isDarkMode={isDarkMode}>
            {posts.map((post, index) => (
                <PostThumbnail key={post.id} onClick={() => handleThumbnailClick(index)}>
                    {post.media[0].type === 'image' ? (
                        <PhotoWrapper>
                            <Photo src={post.media[0].url} alt={`Post ${post.id} Thumbnail`} />
                        </PhotoWrapper>
                    ) : (
                        <VideoWrapper>
                            <VideoThumbnail>
                                <source src={post.media[0].url} type="video/mp4" />
                            </VideoThumbnail>
                        </VideoWrapper>
                    )}
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
                        <PostGridIcons postType={"pixel"} isMonetizedPixel={post.media.length > 1} />
                    </OverlayIcons>

                </PostThumbnail>
            ))}
        </PixelsContainer>
    );
};

export default Pixels;

const PixelsContainer = styled.div<{ $isDarkMode: boolean }>`
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
    padding-top: 100%;
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

const PhotoWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    background: black;
`;

// Ensuring the first frame of the video is shown as a thumbnail
VideoThumbnail.defaultProps = {
    autoPlay: false,
    controls: false,
    loop: false,
    muted: true,
    playsInline: true,
};
