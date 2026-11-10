import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { motivationReels, musicPlaylist } from "@/data/portfolio";
import { Music, ReelGallery } from "@/os/apps/Music";

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
  it.each([false, true])("uses the official playlist player and honest reel fallbacks (mobile=%s)", mobile => {
    const { container } = render(<Music mobile={mobile} />);
    expect(container.querySelectorAll("iframe")).toHaveLength(1);
    const frame = container.querySelector("iframe");
    expect(frame?.getAttribute("src")).toBe("https://www.youtube.com/embed/hRxyvtvxC9c?list=PLMz3Ghq38K5gnDSoKaOMzWZthOOl0M1Db&index=4");
    expect(frame?.getAttribute("allow")).not.toContain("autoplay");
    expect(new URL(musicPlaylist.embedUrl).searchParams.has("shuffle")).toBe(false);
    expect(screen.getByRole("link", { name: "Open in YouTube Music" }).getAttribute("href")).toBe("https://music.youtube.com/playlist?list=PLMz3Ghq38K5gnDSoKaOMzWZthOOl0M1Db");
    expect(container.querySelectorAll('a[href*="instagram.com"]')).toHaveLength(4);
    expect(screen.getAllByRole("button", { name: /Open video/ })).toHaveLength(4);
    expect(container.querySelectorAll("video")).toHaveLength(0);
    expect(motivationReels.every(reel => !reel.source)).toBe(true);
  });
  it("prefers verified native sources and preserves source order in one player", () => {
    const reels = motivationReels.map((reel, i) => ({ ...reel, source: `/test-original-${i}.mp4`, poster: `/test-frame-${i}.jpg`, sourceVerified: i !== 1 }));
    render(<ReelGallery reels={reels} />);
    expect(screen.getAllByRole("button", { name: /Open video/ })).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Open video 3" }));
    const video = screen.getByLabelText("Selected video") as HTMLVideoElement;
    expect(video.getAttribute("src")).toBe("/test-original-2.mp4");
    expect(video.getAttribute("poster")).toBe("/test-frame-2.jpg");
    expect(video.controls).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
    expect(video.autoplay).toBe(false);
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByLabelText("Selected video")).toBeNull();
  });
  it("falls back without deleting the tile when a native source fails", () => {
    const { container } = render(<ReelGallery reels={[{ url: "https://www.instagram.com/reel/DfJMntJKKb5/", source: "/missing.mp4", sourceVerified: true }]} />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Missing preview");
    fireEvent.error(video);
    fireEvent.click(screen.getByRole("button", { name: "Open video 1" }));
    expect(screen.getByText(/Public playback is unavailable/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /^Open original reel$/ }).getAttribute("href")).toBe("https://www.instagram.com/reel/DfJMntJKKb5/");
    expect(container.querySelector("video")).toBeNull();
  });
  it("shows the known unavailable public embed as an explicit fallback", () => {
    render(<ReelGallery />);
    fireEvent.click(screen.getByRole("button", { name: "Open video 3" }));
    expect(screen.getByText(/Public playback is unavailable/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /^Open original reel$/ }).getAttribute("href")).toBe("https://www.instagram.com/reel/DfJMntJKKb5/");
    expect(document.querySelector('iframe[src*="instagram"]')).toBeNull();
  });
});