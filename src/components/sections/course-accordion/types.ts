export interface TechIconItem {
  name: string;
  src: string;
}

export interface CardItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

export interface CourseAccordionProps {
  items?: CardItem[];
  icons?: TechIconItem[];
  defaultActiveId?: string;
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
}
