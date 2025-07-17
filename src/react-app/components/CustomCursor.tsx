import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const isPointerRef = useRef(false);
  const isClickingRef = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;
    const ring = ringRef.current;
    
    if (!cursor || !cursorGlow || !ring) return;

    const { x, y } = mousePos.current;
    
    // Update main cursor elements
    cursor.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`;
    cursorGlow.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
    ring.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
    
    // Update trail effect
    trailRefs.current.forEach((trail, index) => {
      if (trail) {
        const delay = (index + 1) * 2;
        const targetX = x - delay * 0.5;
        const targetY = y - delay * 0.5;
        trail.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0)`;
        trail.style.opacity = `${0.3 - index * 0.05}`;
      }
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        updateCursor();
        rafId.current = undefined;
      });
    }
  }, [updateCursor]);

    const updateCursorType = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.classList.contains('cursor-pointer') ||
      target.closest('a, button, [role="button"], input, textarea, select') !== null;
    
    if (isInteractive !== isPointerRef.current) {
      isPointerRef.current = isInteractive;
      const ring = ringRef.current;
      if (ring) {
        ring.style.opacity = isInteractive ? '1' : '0';
        ring.style.transform += isInteractive ? ' scale(1.2)' : ' scale(1)';
      }
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    isClickingRef.current = true;
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transform += ' scale(0.8)';
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isClickingRef.current = false;
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transform = cursor.style.transform.replace(/ scale\([^)]*\)/g, '');
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;
    if (cursor && cursorGlow) {
      cursor.style.opacity = '1';
      cursorGlow.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;
    if (cursor && cursorGlow) {
      cursor.style.opacity = '0';
      cursorGlow.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;
    const ring = ringRef.current;
    
    if (!cursor || !cursorGlow || !ring) return;

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', updateCursorType, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize visibility
    cursor.style.opacity = '1';
    cursorGlow.style.opacity = '1';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Trail effects */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) trailRefs.current[index] = el;
          }}
          className="absolute w-2 h-2 bg-purple-400/20 rounded-full opacity-0"
          style={{ willChange: 'transform' }}
        />
      ))}
      
      {/* Glow effect */}
      <div
        ref={cursorGlowRef}
        className="absolute w-8 h-8 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full blur-lg opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="absolute w-4 h-4 bg-white rounded-full shadow-2xl border-2 border-purple-300/70 opacity-0 transition-all duration-100 ease-out z-10"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-100 to-pink-100 rounded-full animate-pulse" />
        <div className="absolute inset-1 bg-white rounded-full" />
      </div>
      
      {/* Hover ring */}
      <div
        ref={ringRef}
        className="absolute w-8 h-8 border-2 border-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 transition-all duration-200"
        style={{ 
          willChange: 'transform',
          background: 'conic-gradient(from 0deg, #a855f7, #ec4899, #a855f7)',
          WebkitMask: 'radial-gradient(circle, transparent 50%, black 50%)',
          mask: 'radial-gradient(circle, transparent 50%, black 50%)'
        }}
      />
    </div>
  );
}
