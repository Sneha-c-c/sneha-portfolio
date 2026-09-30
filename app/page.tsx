import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Projects } from "@/sections/Projects";
import { Highlights } from "@/sections/Highlights";
import { Contact } from "@/sections/Contact";
import { HashScroll } from "@/components/layout/HashScroll";

export default function Home() {
  return (
    <>
      <HashScroll />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Highlights />
      <Contact />
    </>
  );
}
