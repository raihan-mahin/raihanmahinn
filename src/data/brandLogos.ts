// Brand logo files (downloaded into public/media/logos/). Brands without an entry render as a text chip.
export type BrandLogo = { src: string; source: string; wide?: boolean };
export const brandLogos: Record<string, BrandLogo> = {
  Pureit: { src: "/media/logos/pureit.png", source: "https://bd.pureitwater.com/page/about-us" },
  "A. O. Smith": { src: "/media/logos/aosmith.png", source: "https://www.hotwater.com/company-logos.html", wide: true },
  Upay: { src: "/media/logos/upay.svg", source: "https://commons.wikimedia.org/wiki/File:Upay_logo.svg" },
  IDLC: { src: "/media/logos/idlc.svg", source: "https://commons.wikimedia.org/wiki/File:Logo_of_IDLC_Finance_PLC.svg" },
  "City Bank": { src: "/media/logos/citybank.svg", source: "https://en.wikipedia.org/wiki/File:Logo_of_City_Bank_(Bangladesh).svg" },
};
