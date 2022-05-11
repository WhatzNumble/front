import { useState, useEffect, MutableRefObject } from 'react';

const useIntersection = (
  element: MutableRefObject<any>,
  rootMargin: string,
  treshhold: number[] = [1]
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold: treshhold }
    );

    element && observer.observe(element.current);

  }, [rootMargin, element, treshhold]);

  return isVisible;
};

export default useIntersection;
