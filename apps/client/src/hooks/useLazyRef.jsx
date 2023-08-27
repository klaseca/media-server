import { useRef } from 'react';

const none = {};

export const useLazyRef = (init) => {
  const ref = useRef(none);

  if (ref.current === none) {
    ref.current = init();
  }

  return ref;
};
