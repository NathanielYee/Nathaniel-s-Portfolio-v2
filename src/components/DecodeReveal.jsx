// In components/DecodeReveal.jsx
import { useState, useEffect } from 'react';

export const DecodeReveal = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let progress = 0;
      const totalIterations = 20;
      
      const interval = setInterval(() => {
        if (progress < totalIterations) {
          setDisplayText(
            text
              .split('')
              .map((char, index) => {
                const revealThreshold = (index / text.length) * totalIterations;
                
                if (progress > revealThreshold + 5) {
                  return char;
                } else if (progress > revealThreshold) {
                  return Math.random() > 0.7 ? char : Math.floor(Math.random() * 10);
                } else {
                  return Math.floor(Math.random() * 10);
                }
              })
              .join('')
          );
          progress++;
        } else {
          setDisplayText(text);
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 80);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={`font-mono transition-all duration-300 ${
      isComplete 
        ? 'text-foreground tracking-normal' 
        : 'text-primary tracking-wider'
    }`}>
      {displayText}
    </span>
  );
};