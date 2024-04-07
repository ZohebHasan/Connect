import React, { useEffect, useRef } from 'react';
import '../../../stylesheets/App.css'; 
import video from './assets/background1DarkMonitor.mp4'

export default function BackgroundAnimation() {
    return (
        <>
            <video autoPlay loop muted playsInline controls={false} className="background1">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );;
}
