import { useState, useEffect } from "react";

type Matches = {
  isMobile: boolean;
};

const breakpoints = {
  isMobile: 480,
};

export const useMediaQuery = () => {
  const [matches, setMatches] = useState<Matches>({
    isMobile: false,
  });

  useEffect(() => {
    const listener = () => {
      setMatches({ isMobile: window.innerWidth <= breakpoints.isMobile });
    };

    // adjust on initial render
    listener();

    // adjust on resize
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  return matches;
};
