import { createFileRoute } from "@tanstack/react-router";
import { MahinOS } from "@/os/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahin OS | Raihan Mahin — Brand Marketing & Creative Portfolio" },
      { name: "description", content: "Raihan Mahin — brand marketer, creative strategist and AI content creator in Dhaka. GTM launches, Pureit brand transition, AI reels and 8 case competition results." },
      { property: "og:title", content: "Mahin OS | Raihan Mahin — Brand Marketing & Creative Portfolio" },
      { property: "og:description", content: "A macOS-style portfolio of Raihan Mahin: brand marketing, GTM launches, AI reels and case competitions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MahinOS,
});
