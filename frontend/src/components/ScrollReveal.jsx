import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Wraps children and applies a fade-in animation when they enter the viewport.
 * 
 * @param {React.ReactNode} children - Content to animate
 * @param {number} delay - Animation delay in ms
 * @param {string} className - Additional CSS classes
 * @param {number} threshold - Visibility threshold (0 to 1)
 */
const ScrollReveal = ({ children, delay = 0, className = '', threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect after first reveal as per user request ("once")
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: '50px', // Start animation slightly before it enters
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-700 ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
