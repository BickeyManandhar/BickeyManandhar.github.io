import { useEffect, useState } from "react";

export function useReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduce, setReduce] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}
