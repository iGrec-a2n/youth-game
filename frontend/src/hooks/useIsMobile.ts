import { useState, useEffect } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Pour les navigateurs qui supportent addEventListener sur MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback pour les anciens navigateurs
      mediaQuery.addListener(handleChange);
    }

    // Mise à jour initiale
    setIsMobile(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
}

