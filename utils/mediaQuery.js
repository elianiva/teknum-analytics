import { useState, useEffect } from "react";

const breakpoints = {
  isMobile: 480,
};

export const useMediaQuery = () => {
  const [matches, setMatches] = useState({});

  useEffect(() => {
    const listener = () => {
      setMatches({ isMobile: window.innerWidth <= breakpoints.isMobile });
    };

    // adjust on initial render
    listener()
    
    // adjust on resize
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  return matches;
};
