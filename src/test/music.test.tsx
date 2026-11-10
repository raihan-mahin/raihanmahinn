import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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
    expect(frame?.getAttribute("src")).toBe("https://www.youtube.com/embed/videoseries?list=PLMz3Ghq38K5gnDSoKaOMzWZthOOl0M1Db");
    expect(frame?.getAttribute("allow")).not.toContain("autoplay");
    expect(new URL(musicPlaylist.embedUrl).searchParams.has("shuffle")).toBe(false);
    expect(screen.getByRole("link", { name: "Open in YouTube Music" }).getAttribute("href")).toBe("https://music.youtube.com/playlist?list=PLMz3Ghq38K5gnDSoKaOMzWZthOOl0M1Db");
    const links = screen.getAllByRole("link", { name: /Open original reel/ });
    expect(links.filter((_, index) => index % 2 === 0).map(link => link.getAttribute("href"))).toEqual(motivationReels.map(reel => reel.url));
    expect(container.querySelectorAll("video")).toHaveLength(0);
    expect(motivationReels.every(reel => !reel.source)).toBe(true);
  });
  it("optional originals use native controls and pause other videos on play", () => {
    const { container } = render(<ReelGallery reels={motivationReels.map((reel, i) => ({ ...reel, source: `/test-original-${i}.mp4` }))} />);
    const videos = Array.from(container.querySelectorAll("video"));
    expect(videos).toHaveLength(4);
    const pauses = videos.map(video => vi.spyOn(video, "pause").mockImplementation(() => {}));
    const first = videos[0];
    if (!first) throw new Error("Missing native video");
    fireEvent.play(first);
    expect(pauses[0]).not.toHaveBeenCalled();
    for (const pause of pauses.slice(1)) expect(pause).toHaveBeenCalledOnce();
    for (const video of videos) {
      expect(video.controls).toBe(true);
      expect(video.hasAttribute("playsinline")).toBe(true);
      expect(video.preload).toBe("metadata");
      expect(video.autoplay).toBe(false);
    }
  });
});