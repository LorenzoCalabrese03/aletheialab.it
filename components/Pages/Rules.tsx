"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Newspaper,
  ArrowLeft,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";

const regulationSections = [
  {
    id: "Intro",
    title: "Introduzione",
    content:
      "Il regolamento definisce le linee guida per l'utilizzo responsabile e collaborativo del Laboratorio per l’Inclusione. Ogni membro del Team è tenuto a rispettarne i principi per garantire un ambiente produttivo e sicuro.",
  },
  {
    id: "Spazi",
    title: "Spazi Comuni",
    content:
      "Il Team si impegna a mantenere puliti gli spazi comuni e a non arrecare disturbo alle attività didattiche e di studio che si svolgono al piano terra dell’edificio.",
  },
  {
    id: "orari",
    title: "Apertura Lab",
    content:
      "Il laboratorio sarà aperto almeno due volte a settimana in orario pomeridiano, salvo durante i periodi di esame in cui la frequenza potrebbe variare.",
  },
  {
    id: "Presidio",
    title: "Presenza Team",
    content:
      "Durante gli orari di apertura del laboratorio, è garantita la presenza di almeno un membro del Team per fornire supporto e supervisione.",
  },
  {
    id: "Gestione",
    title: "Gestione Team",
    content:
      "In caso di uscita di un componente del Team per motivi personali, il gruppo si impegna a trovare un sostituto e a comunicarlo tempestivamente al referente.",
  },
  {
    id: "Attrezzature",
    title: "Uso Attrezzature",
    content:
      "L'utilizzo delle attrezzature del laboratorio è subordinato all'autorizzazione del responsabile scientifico. Qualsiasi attività non autorizzata non è ammessa.",
  },
  {
    id: "Sicurezza",
    title: "Sicurezza Lab",
    content:
      "Sono vietate tutte le attività che prevedano l’uso di strumenti o materiali potenzialmente pericolosi, come saldatura, colla a caldo o tensioni superiori a 5V.",
  },
  {
    id: "Divulgazioni",
    title: "Eventi Annuali",
    content:
      "Il Team organizzerà almeno due eventi divulgativi o di orientamento all’anno, come workshop o crash course, anche in collaborazione con altre strutture universitarie.",
  },
];

export default function Rules() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-6">
      {/* Sezione colonna Sinistra: Indice */}
      {/* Sezione colonna Sinistra: Indice */}
      <motion.aside
        className="space-y-6 md:sticky md:top-24 md:h-[calc(100vh.rem)] md:overflow-y-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Link Home */}
        <Link href="/" className="text-lg flex items-center md:mt-3">
          <ArrowLeft />
          Torna alla Home
        </Link>

        {/* Titolo Indice */}
        <div className="hidden md:block justify-center">
          <h3 className="font-semibold text-lg md:mt-48 flex items-center gap-2 mb-3">
            <Newspaper className="text-custom-blue" />
            Indice
          </h3>

          {/* Voci dell'indice */}
          <nav className="space-y-2">
            {regulationSections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                <div
                  className={`px-3 py-1.5 rounded-xl hover:bg-[rgb(70,131,163)]/30 hover:text-custom-blue ${
                    section.id === "Intro"
                      ? "bg-[rgb(70,131,163)]/30 text-custom-blue"
                      : ""
                  }`}
                >
                  {section.title}
                </div>
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Ultimo aggiornamento */}
        <div className="mt-8 p-4 rounded-lg border-4 border-[rgb(70,131,163)]/30 ">
          <h4 className="font-medium mb-2 flex items-center">
            <CircleCheck className="mr-2 h-4 w-4 text-custom-blue" />
            Ultimo aggiornamento
          </h4>
          <p className="text-sm text-muted-foreground">28 Maggio 2025</p>
        </div>
      </motion.aside>

      {/* Sezione Regolamento Titolo */}
      <main>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center">
            Regolamento
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg text-custom-grigio text-center">
            Il nostro impegno per l'eccellenza, l'innovazione e l'integrità.
          </p>

          {/* Sezione Scarica PDF */}
          <div className="flex flex-col justify-center items-center w-full mt-4 mb-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="flex items-center gap-2 bg-[rgb(70,131,163)] hover:bg-[rgb(98,190,204)] rounded-3xl py-2 px-5">
                <span>Scarica PDF</span>
                <Download />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Sezione Titolo + Descrizione Regole */}
        {regulationSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 p-4"
          >
            {/* Mobile: Tendina */}
            <div className="md:hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex justify-between items-center w-full text-left p-4 rounded-lg bg-card border"
              >
                <h2 className="text-lg font-semibold">{section.title}</h2>
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.includes(section.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden p-4 pt-2"
                  >
                    <p className="text-muted-foreground">{section.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop: Sezione visibile con linea */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <h2 className="font-semibold text-2xl mb-2">{section.title}</h2>

                {/* Linea decorativa */}
                <motion.div
                  initial={{ width: 0, x: "10%" }}
                  animate={{ width: "10%", x: 0 }}
                  transition={{ duration: 1, ease: "easeIn" }}
                  className="w-14 h-1 bg-[rgb(116,221,238)] mt-4 mb-6"
                />

                <p className="text-muted-foreground">{section.content}</p>
              </motion.div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
