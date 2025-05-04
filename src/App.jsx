import React, { useRef, useEffect } from 'react';
import './App.css'; 

function App() {
  
  const particleContainerRef = useRef(null);
  
  const textRef = useRef(null);

 
  const lastParticleTimeRef = useRef(0);
  const particleInterval = 5; 

  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  
  const handleGlobalMouseMove = (e) => {
    const currentTime = Date.now();

   
    if (currentTime - lastParticleTimeRef.current < particleInterval) {
      return; 
    }
    lastParticleTimeRef.current = currentTime; 

    
    const particle = document.createElement('div');
    particle.classList.add('particle'); 

    
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    
    particle.style.backgroundColor = getRandomColor();

    const angle = Math.random() * Math.PI * 2; 
    const velocity = Math.random() * 2 + 1; 
    const deltaX = Math.cos(angle) * velocity * 50; 
    const deltaY = Math.sin(angle) * velocity * 50; 

   
    particle.style.setProperty('--deltaX', `${deltaX}px`);
    particle.style.setProperty('--deltaY', `${deltaY}px`);

    
    if (particleContainerRef.current) {
      particleContainerRef.current.appendChild(particle);
    }

    
    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  };

  
  const handleTextMouseMove = (e) => {
    const textElement = textRef.current;
    if (!textElement) return;

    
    const textRect = textElement.getBoundingClientRect();

    
    const mouseXRelativeToText = e.clientX - textRect.left;
    const mouseYRelativeToText = e.clientY - textRect.top;

    
    const mouseXPercent = (mouseXRelativeToText / textRect.width) * 100;
    const mouseYPercent = (mouseYRelativeToText / textRect.height) * 100;

    
    textElement.style.maskPosition = `${mouseXPercent}% ${mouseYPercent}%`;
    textElement.style.webkitMaskPosition = `${mouseXPercent}% ${mouseYPercent}%`; 
    textElement.style.backgroundPosition = `${mouseXPercent}% ${mouseYPercent}%`;


     
     textElement.style.maskSize = '150px'; 
     textElement.style.webkitMaskSize = '150px'; 
  };

  
  const handleTextMouseLeave = () => {
    const textElement = textRef.current;
    if (!textElement) return;

   
     textElement.style.maskSize = '0%'; 
     textElement.style.webkitMaskSize = '0%';
  };


  useEffect(() => {
   
    document.addEventListener('mousemove', handleGlobalMouseMove);

    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []); 

  
  return (
    
    <div className="App">
      {/*  */}
      {/* */}
      <div
        ref={textRef}
        className="centered-text"
        onMouseMove={handleTextMouseMove}
        onMouseLeave={handleTextMouseLeave}
      >
        Lince Gato
      </div>
      {/*  */}
      <div ref={particleContainerRef} className="particle-container" style={{ pointerEvents: 'none' }}>
        {/*  */}
      </div>
    </div>
  );
}

export default App;