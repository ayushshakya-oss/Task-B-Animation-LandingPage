import { HeroTickerAndGallery } from "@/components/sections/HeroTickerAndGallery";
import { CourseAccordion } from "@/components/sections/CourseAccordion";
import { FontTester } from "@/components/ui/FontTester";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <main className="flex flex-col">
        {/* Section 1: Rolling Ticker and Draggable Gallery */}
        <section id="services-gallery">
          <HeroTickerAndGallery />
        </section>

        {/* Section Divider */}
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <hr className="border-slate-100" />
        </div>

        {/* Section 2: Course Expanding Accordion */}
        <section id="courses-accordion">
          <CourseAccordion />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 py-12 text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12 lg:px-20">
          <p className="text-xs text-slate-400">
            Interactive Animation Landing &copy; {new Date().getFullYear()} Task
            B Showcase
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span>Next.js 16</span>
            <span>Tailwind CSS</span>
            <span>GSAP (@gsap/react)</span>
            <span>Lucide Icons</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
