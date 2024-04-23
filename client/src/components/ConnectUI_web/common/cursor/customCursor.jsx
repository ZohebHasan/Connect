import React, { useEffect, useRef } from 'react';
import '../../../stylesheets/animations/cursor.css';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const updateCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
                cursorRef.current.style.opacity = 1; // Show the cursor
            }
        };

        const hideCursor = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = 0; // Hide the cursor
            }
        };

        const changeCursorOnHover = (e) => {
            if (!cursorRef.current) return;

            const target = e.target;
            const shouldEnlarge = ['P', 'H1', 'H2', 'H3', 'A', 'BUTTON'].includes(target.tagName);
            cursorRef.current.style.width = shouldEnlarge ? '50px' : '20px';
            cursorRef.current.style.height = shouldEnlarge ? '50px' : '20px';
        };

        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseleave', hideCursor);
        document.addEventListener('mouseover', changeCursorOnHover);
        document.addEventListener('mouseout', changeCursorOnHover);

        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseleave', hideCursor);
            document.removeEventListener('mouseover', changeCursorOnHover);
            document.removeEventListener('mouseout', changeCursorOnHover);
        };
    }, []);

    return <div ref={cursorRef} className="cursor"></div>;
}
