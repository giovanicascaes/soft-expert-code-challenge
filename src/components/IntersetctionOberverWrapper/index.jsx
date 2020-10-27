import React, { useState, useCallback, useEffect } from "react";

export default function IntersetctionOberverWrapper({
  threshold,
  observableEl,
  observeCallback,
  children,
}) {
  const child = React.Children.only(children);

  const [childEl, setChildEl] = useState(null);
  const childRef = useCallback(setChildEl, [setChildEl]);

  useEffect(() => {
    if (!observableEl || !childEl) return;

    let observer;
    let prevRatio = 0.0;

    function handleIntersect(entries) {
      entries.forEach((entry) => {
        observeCallback(
          entry.intersectionRatio > prevRatio ? "up" : "down",
          entry.intersectionRatio
        );
        prevRatio = entry.intersectionRatio;
      });
    }

    function createObserver() {
      const options = {
        root: childEl,
        threshold,
      };
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(observableEl);
    }

    createObserver();

    return () => {
      observer.unobserve(observableEl);
    };
  }, [childEl, observableEl, observeCallback, threshold]);

  return React.cloneElement(child, { ref: childRef });
}
