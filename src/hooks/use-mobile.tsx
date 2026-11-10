import * as React from "react";

// Keep identical to the first-paint shell guard in styles.css, including fractional widths.
export const MOBILE_QUERY = "(width < 768px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useMobileViewport() {
  return React.useSyncExternalStore(subscribe, () => window.matchMedia(MOBILE_QUERY).matches, () => undefined);
}

export function useIsMobile() {
  return useMobileViewport() ?? false;
}
