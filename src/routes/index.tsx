import { createFileRoute } from "@tanstack/react-router";
import { MahinOS } from "@/os/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raihan Mahin | Brand Marketing & Strategy" },
      { name: "description", content: "Raihan Mahin — Brand Marketing & Strategy Professional in Dhaka. Pureit brand transition and launches, agency client servicing, campaign execution and 8 case competition results." },
      { property: "og:title", content: "Raihan Mahin | Brand Marketing & Strategy" },
      { property: "og:description", content: "Portfolio of Raihan Mahin: brand strategy, GTM, product launches, agency client work and case competitions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MahinOS,
});
