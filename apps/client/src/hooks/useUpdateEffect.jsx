import { useEffect, useRef } from 'react';

export const useUpdateEffect = (callback, deps) => {
  const renderCycleRef = useRef(false);
  const effectCycleRef = useRef(false);

  useEffect(() => {
    const mounted = renderCycleRef.current;
    const run = mounted && effectCycleRef.current;
    if (run) {
      return callback();
    }
    effectCycleRef.current = true;
  }, deps);

  useEffect(() => {
    renderCycleRef.current = true;
    return () => {
      renderCycleRef.current = false;
    };
  }, []);
};
