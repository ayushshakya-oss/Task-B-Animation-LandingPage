export interface TickerLineItem {
  id: string;
  items: string[];
}

export interface PartnerItem {
  name: string;
  src: string;
}

export interface HeroTickerAndGalleryProps {
  tickerLines?: TickerLineItem[];
  images?: string[];
  partners?: PartnerItem[];
  className?: string;
}
