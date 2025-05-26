"use client";
import CodingInProgress from "@/components/CodingInPrograss/CodingInProgress";
import Hero from "@/components/HomePage/Hero";
import About from "@/components/HomePage/About";
import { Organigramma } from "@/components/HomePage/Organigramma";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/*Hero section*/}
      <section>
        <Hero />
      </section>

      {/*About section*/}
      <section className="bg-[rgb(39,39,42)]">
        <About />
      </section>

      {/*Organigramma*/}
      <AnimatedSection
        id={"organigramma"}
        delay={0.15}
        className="bg-background section-transition"
        style={{
          height: 200,
        }}
      >
        <div className="container px-4 md:px-6 relative z-10">
          <div>
            <Organigramma />
          </div>
        </div>
      </AnimatedSection>

      {/*Service section*/}
      <section></section>

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
