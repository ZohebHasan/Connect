import React, { useEffect, useRef } from 'react';
import video from './background1DarkMonitor.mp4'

export default function BackgroundAnimation() {
    return (
        <>
            <video autoPlay loop muted playsInline controls={false} className="backgroundLogin">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );;
}
