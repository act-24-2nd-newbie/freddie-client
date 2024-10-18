import React from 'react';

const useClickOutside = () => {
  const clickOutsideListener = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  };

  return { clickOutsideListener };
};

export default useClickOutside;
