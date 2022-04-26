import { useState, useEffect, MutableRefObject } from 'react';

const useIntersection = (element: Element, rootMargin: string) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element && observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return isVisible;
};

export default useIntersection;
