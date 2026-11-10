import { describe, expect, it, vi } from "vitest";
import { playCampaignPreview } from "@/lib/campaign-playback";

describe("campaign preview sound", () => {
  it("starts audible playback with positive volume by default", async () => {
    const video = document.createElement("video");
    const play = vi.spyOn(video, "play").mockResolvedValue();
    await playCampaignPreview(video, false, vi.fn());
    expect(video.muted).toBe(false);
    expect(video.volume).toBe(1);
    expect(play).toHaveBeenCalledTimes(1);
  });
  it("falls back muted once after policy refusal and exposes gesture retry", async () => {
    const video = document.createElement("video");
    const play = vi.spyOn(video, "play").mockRejectedValueOnce(new DOMException("Gesture required", "NotAllowedError")).mockResolvedValue();
    const blocked = vi.fn();
    await playCampaignPreview(video, false, blocked);
    expect(video.muted).toBe(true);
    expect(blocked).toHaveBeenCalledWith(true);
    expect(play).toHaveBeenCalledTimes(2);
    await playCampaignPreview(video, false, blocked);
    expect(video.muted).toBe(false);
    expect(blocked).toHaveBeenLastCalledWith(false);
  });
  it("preserves intentional mute", async () => {
    const video = document.createElement("video");
    vi.spyOn(video, "play").mockResolvedValue();
    await playCampaignPreview(video, true, vi.fn());
    expect(video.muted).toBe(true);
  });
});