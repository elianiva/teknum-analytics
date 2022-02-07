import { useState, useEffect } from "react";

const breakpoints = {
  isMobile: 480,
};

export const useMediaQuery = () => {
  const [matches, setMatches] = useState({});

  // setup initial
  useEffect(() => {
    setMatches({ isMobile: window.matchMedia(`(max-width: ${breakpoints.isMobile}px)`).matches })
  }, [])
  
  // setup on resize
  useEffect(() => {
    const listener = () => {
      setMatches({ isMobile: window.innerWidth <= breakpoints.isMobile });
    };
    
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  return matches;
};
