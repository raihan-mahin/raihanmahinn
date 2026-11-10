import { act, cleanup, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MOBILE_QUERY, useMobileViewport } from "@/hooks/use-mobile";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("shell viewport selection", () => {
  it("keeps server selection pending instead of claiming a desktop viewport", () => {
    let viewport: boolean | undefined = false;
    function Probe() { viewport = useMobileViewport(); return null; }
    renderToString(<Probe />);
    expect(viewport).toBeUndefined();
  });
  it.each([[767, true], [767.5, true], [768, false], [1280, false]])("selects the correct shell at %s pixels", (width, mobile) => {
    const match = vi.spyOn(window, "matchMedia").mockImplementation(query => ({
      media: query, matches: query === "(width < 768px)" && width < 768,
      addEventListener: vi.fn(), removeEventListener: vi.fn(),
    } as unknown as MediaQueryList));
    const { result } = renderHook(useMobileViewport);
    expect(result.current).toBe(mobile);
    expect(match).toHaveBeenCalledWith(MOBILE_QUERY);
  });
  it("updates on live resize and removes its subscription on exit", () => {
    let matches = true;
    const listeners = new Set<() => void>();
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({ media: query, matches,
      addEventListener: (_type: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_type: string, cb: () => void) => listeners.delete(cb),
    } as unknown as MediaQueryList));
    const { result, unmount } = renderHook(useMobileViewport);
    expect(result.current).toBe(true);
    act(() => { matches = false; listeners.forEach(cb => cb()); });
    expect(result.current).toBe(false);
    act(() => { matches = true; listeners.forEach(cb => cb()); });
    expect(result.current).toBe(true);
    unmount();
    expect(listeners.size).toBe(0);
  });
});