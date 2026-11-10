import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { portraitGaze, portraitPoint } from "@/lib/portrait-gaze";
import { DesktopPortrait } from "@/os/DesktopPortrait";
import { OSProvider, useOS } from "@/os/store";

afterEach(() => { cleanup(); vi.restoreAllMocks(); localStorage.clear(); });
describe("desktop home portrait behavior", () => {
  it("clamps head pose and reverses with the pointer", () => {
    expect(portraitGaze(10000, 10000)).toEqual({ x: 1, y: 1 });
    expect(portraitGaze(-10000, -10000)).toEqual({ x: -1, y: -1 });
    expect(portraitGaze(0, 0)).toEqual({ x: 0, y: 0 });
  });
  it("moves the head noticeably while anchoring lower chest and preserving neutral art", () => {
    expect(portraitPoint(640, 1000, { x: 1, y: 1 })).toEqual({ x: 640, y: 1000 });
    expect(portraitPoint(640, 389, { x: 1, y: 0 }).x).toBeGreaterThan(690);
    expect(portraitPoint(640, 389, { x: -1, y: 0 }).x).toBeLessThan(590);
    expect(portraitPoint(546, 389, { x: 0, y: 0 })).toEqual({ x: 546, y: 389 });
    const a = portraitPoint(640, 869, { x: 1, y: 1 });
    expect(Math.abs(a.x - 640) + Math.abs(a.y - 869)).toBeLessThan(.01);
  });
  it("starts home with no windows but preserves explicit Notes payloads", () => {
    function Probe() {
      const os = useOS();
      return <><output aria-label="Windows">{os.windows.map(w => `${w.id}:${w.payload}`).join(",")}</output><button onClick={() => os.open("notes", "about")}>Open note</button></>;
    }
    render(<OSProvider><Probe /></OSProvider>);
    expect(screen.getByLabelText("Windows")).toHaveTextContent(/^$/);
    fireEvent.click(screen.getByText("Open note"));
    expect(screen.getByLabelText("Windows")).toHaveTextContent("notes:about");
  });
  it.each(["(prefers-reduced-motion: reduce)", "coarse"])("does not schedule tracking for %s", preference => {
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({ matches: query === preference, addEventListener: vi.fn(), removeEventListener: vi.fn() }) as unknown as MediaQueryList);
    const raf = vi.spyOn(window, "requestAnimationFrame");
    vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
    render(<DesktopPortrait />);
    act(() => window.dispatchEvent(Object.assign(new Event("pointermove"), { pointerType: "mouse", clientX: 900, clientY: 600 })));
    expect(raf).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});