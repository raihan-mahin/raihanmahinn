import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { motivationReels } from "@/data/portfolio";
import { Music } from "@/os/apps/Music";

afterEach(cleanup);

describe("Music curated reels", () => {
  it("keeps the four canonical reels in the owner's order", () => {
    expect(motivationReels.map(reel => reel.url)).toEqual([
      "https://www.instagram.com/reel/DeMQdiPDrIT/",
      "https://www.instagram.com/reel/DfjHOPGuXIo/",
      "https://www.instagram.com/reel/DfJMntJKKb5/",
      "https://www.instagram.com/reel/DfUDCG9Nc5a/",
    ]);
  });
  it.each([false, true])("mounts only the selected non-autoplay embed and its fallback (mobile=%s)", mobile => {
    const { container } = render(<Music mobile={mobile} />);
    for (const reel of motivationReels) {
      fireEvent.click(screen.getByRole("button", { name: reel.label }));
      expect(container.querySelectorAll("iframe")).toHaveLength(1);
      const frame = container.querySelector("iframe");
      expect(frame?.getAttribute("src")).toBe(`${reel.url}embed/`);
      expect(frame?.getAttribute("loading")).toBe("lazy");
      expect(frame?.getAttribute("allow")).not.toContain("autoplay");
      expect(screen.getByRole("link", { name: "Open on Instagram" }).getAttribute("href")).toBe(reel.url);
      expect(screen.getByRole("button", { name: reel.label }).getAttribute("aria-pressed")).toBe("true");
    }
  });
});