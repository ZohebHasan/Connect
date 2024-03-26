import React, { useEffect, useRef } from 'react';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css'; 


export default function BackgroundAnimation() {
    const backgroundAnimation = useRef(null);

    useEffect(() => {
        const canvas = backgroundAnimation.current;
        if (canvas && canvas.parentElement) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            const ctx = canvas.getContext('2d');

            const balls = [
                { x: 250, y: 250, dx: 9, dy: 4, radius: 250, color: '#B93E56' },
                { x: canvas.width - 250, y: canvas.height - 250, dx: 9, dy: 4, radius: 250, color: '#7595AE' }
            ];

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                balls.forEach(ball => {
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath();
                    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                    ctx.fillStyle = ball.color;
            
                    // glow effect
                    ctx.shadowBlur = 100; // Adjust for desired glow size
                    ctx.shadowColor = ball.color; // 
            
                    ctx.fill();
                    ctx.filter = 'blur(120px)'; //  adjust or remove this filter depending on the desired effect
                    ctx.closePath();
            
                    ball.x += ball.dx;
                    ball.y += ball.dy;

                    // Allow the ball to go beyond the canvas edges before bouncing back
                    if (ball.x + ball.radius > canvas.width + ball.radius || ball.x - ball.radius < -ball.radius) {
                        ball.dx = -ball.dx;
                    }
                    if (ball.y + ball.radius > canvas.height + ball.radius || ball.y - ball.radius < -ball.radius) {
                        ball.dy = -ball.dy;
                    }
                });
            
                requestAnimationFrame(animate);
            };
            

            animate();
        }
    }, []);

    return <canvas ref={backgroundAnimation} className="selectLanguageBackground"></canvas>;
}
