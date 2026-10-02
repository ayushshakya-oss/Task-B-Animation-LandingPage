import { TickerLineItem, PartnerItem } from "./types";

export const TICKER_LINES: TickerLineItem[] = [
  {
    id: "line-1",
    items: ["UI & UX", "Development", "Blockchain"],
  },
  {
    id: "line-2",
    items: ["Development", "Blockchain", "UI & UX"],
  },
  {
    id: "line-3",
    items: ["Blockchain", "UI & UX", "Development"],
  },
];

export const IMAGES: string[] = [
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
];

export const PARTNERS: PartnerItem[] = [
  { name: "Cloud Education", src: "/Images/partner1.png" },
  { name: "CMC", src: "/Images/partner2.png" },
  { name: "IT SNP", src: "/Images/partner3.png" },
  { name: "Zebec", src: "/Images/partner4.png" },
];
