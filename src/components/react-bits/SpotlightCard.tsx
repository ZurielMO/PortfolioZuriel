'use client';

import React, { useCallback, useRef } from 'react';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Pointer position is written straight to CSS variables instead of React
  // state so moving the mouse does not re-render the card on every frame.
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(e => {
    const card = divRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    glow.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    glow.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  }, []);

  const setVisible = useCallback((visible: boolean) => {
    const glow = glowRef.current;
    if (glow) glow.style.opacity = visible ? '0.6' : '0';
  }, []);

  // Las clases base del componente original traen grises oscuros fijos. Aquí
  // solo queda la estructura y el color lo define quien lo usa.
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`group/spotlight relative overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out motion-reduce:hidden"
        style={{
          background: `radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 80%)`
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
