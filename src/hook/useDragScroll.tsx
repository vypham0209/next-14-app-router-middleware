//THIRD PARTY MODULES
import { useEffect, useRef } from 'react';

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isDragging = false;
    let start = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      start = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDragging = false;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - start) * 2;
      element.scrollLeft = scrollLeft - walk;
    };

    const handleClick = (e: MouseEvent) => {
      if (isDragging) {
        e.stopPropagation();
      }
    };

    const handleLinkClick = () => {
      isDragging = false; // Stop dragging if a link is clicked
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);
    element.addEventListener('click', handleLinkClick, true); // Capture phase to handle link clicks

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      element.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  return ref;
};

export default useDragScroll;
