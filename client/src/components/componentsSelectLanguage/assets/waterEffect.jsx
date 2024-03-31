import React, { useEffect, useRef } from 'react';

const InteractiveWaterEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let ripples = [];

        const addRipple = (x, y) => {
            ripples.push({
                x, y, radius: 0, alpha: 1
            });
        };

        const drawRipples = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ripples.forEach(ripple => {
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
                ctx.fill();
                ripple.radius += 2; // speed of ripple
                ripple.alpha -= 0.02; // fade out ripple
            });
            ripples = ripples.filter(ripple => ripple.alpha > 0);
        };

        const animate = () => {
            drawRipples();
            requestAnimationFrame(animate);
        };

        canvas.addEventListener('click', (e) => {
            addRipple(e.clientX, e.clientY);
        });

        animate();
    }, []);

    return (
        <canvas ref={canvasRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999
        }} />
    );
};

export default InteractiveWaterEffect;
