/** One audible attempt per selection/gesture; policy refusal falls back once, never retries in a loop. */
export async function playCampaignPreview(video: HTMLVideoElement, muted: boolean, blocked: (value: boolean) => void) {
  video.muted = muted;
  video.volume = 1;
  try {
    await video.play();
    if (!muted) blocked(false);
  } catch (error) {
    if (typeof error === "object" && error !== null && "name" in error && error.name === "NotAllowedError" && !muted) {
      video.muted = true;
      blocked(true);
      await video.play().catch(() => {});
    }
  }
}