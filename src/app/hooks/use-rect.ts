import { useCallback, useState, useLayoutEffect } from 'react';

const useRectHook = (ref:any) => {
  const [size, setSize] = useState({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0
  });

  const handleResize = useCallback(() => {
    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSize({
        x: rect.x,
        y: rect.y,
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height
      });
    }
  }, [ref.current]);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, [handleResize, ref]);

  return { ...size };
};

export default useRectHook;
