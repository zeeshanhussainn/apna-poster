import React, { useState, useEffect } from 'react';

const useImage = (src) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }
    
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';

    const handleLoad = () => {
      setStatus('loaded');
    };

    const handleError = () => {
      setStatus('error');
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return status;
};

export default useImage;