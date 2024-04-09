import React, { useEffect, useRef } from 'react';
import '../../../../stylesheets/loginSignup/selectLang/backgroundLang.css'
import video from './assets/background1DarkMonitor.mp4'

export default function BackgroundAnimation() {
    return (
        <>
            <video autoPlay loop muted playsInline controls={false} className="backgroundSelectLang">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );;
}