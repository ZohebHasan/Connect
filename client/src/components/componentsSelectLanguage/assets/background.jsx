import React, { useEffect, useRef } from 'react';
import '../../../stylesheets/App.css'; 


export default function BackgroundAnimation () {
    const backgroundAnimation = useRef(null);

    useEffect(function() {
        const canvas = backgroundAnimation.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const balls = [
            { x: 250, y: 250, dx: 8, dy: 4, radius: 250, color: '#B93E56' },
            { x: canvas.width - 250, y: canvas.height - 250, dx: 8, dy: 4, radius: 250, color: '#7595AE' }
        ];

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                ctx.globalAlpha = 0.6; // Set a fixed opacity for the background animation
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.fill();
                ctx.filter = 'blur(150px)';
                ctx.closePath();

                ball.x += ball.dx;
                ball.y += ball.dy;
                if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                    ball.dx = -ball.dx;
                }
                if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                    ball.dy = -ball.dy;
                }
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return <canvas ref={backgroundAnimation} className="selectLanguageBackground"></canvas>;
};


