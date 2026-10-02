import { CardItem, TechIconItem } from "./types";

export const TECH_ICONS: TechIconItem[] = [
  { name: "React", src: "/Icons/icon1.svg" },
  { name: "Chat", src: "/Icons/icon2.svg" },
  { name: "Vue", src: "/Icons/icon3.svg" },
  { name: "Design", src: "/Icons/icon4.svg" },
];

export const ACCORDION_DATA: CardItem[] = [
  {
    id: "all",
    number: "23",
    title: "All Courses",
    subtitle: "courses you're powering through right now.",
  },
  {
    id: "upcoming",
    number: "05",
    title: "Upcoming Courses",
    subtitle: "exciting new courses waiting to boost your skills.",
  },
  {
    id: "ongoing",
    number: "10",
    title: "Ongoing Courses",
    subtitle: "currently happening—don't miss out on the action!",
  },
];
