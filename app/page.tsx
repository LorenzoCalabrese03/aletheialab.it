"use client";
import CodingInProgress from "@/components/CodingInPrograss/CodingInProgress";
import Hero from "@/components/HomePage/Hero";
import About from "@/components/HomePage/About";
import { Organigramma } from "@/components/HomePage/Organigramma";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import Contact from "@/components/HomePage/Contact";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center bg-grid">
      {/*Hero section*/}
      <section>
        <Hero />
      </section>

      {/*About section*/}
      <section className="bg-[rgb(39,39,42)]">
        <About />
      </section>

      {/*Organigramma section*/}
      <AnimatedSection
        id={"organigramma"}
        delay={0.15}
        className=" section-transition"

      >
            <Organigramma />
      </AnimatedSection>

        {/*Service section*/}
        <AnimatedSection
            id="service"
            delay={1.0}
            className="bg-muted section-transition"
        >
            <></>
        </AnimatedSection>

        {/* Contact section */}
        <AnimatedSection
            id="contact"
            delay={1.0}
            className="bg-muted section-transition"
        >
            <Contact/>
        </AnimatedSection>



      {/*Calendar section*/}
      <section></section>

      {/*Team Highlights*/}
      <section></section>

      {/*Referenze*/}
      <section></section>

      {/*Events*/}
      <section></section>

      {/*Awards*/}
      <section></section>

      {/**/}
      {/*<CodingInProgress/>*/}
    </div>
  );
}
