import { useEffect, useState } from "react";
export function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 1000 * 15); return () => clearInterval(t); }, []);
  return now;
}
