"use client";
import { useEffect, useState } from "react";

export default function UseMedia(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    
    const mediaQuery = window.matchMedia(query);
    const result = mediaQuery.matches;
     
    setMatches(result);

    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

 
  return matches;
}
