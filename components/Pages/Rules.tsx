"use client";
import { motion } from "framer-motion";
import { section } from "framer-motion/client";
import { Download } from "lucide-react";
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
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-6">
      {/*Sezione colonna Sinistra:Indice */}

      <aside className="space-y-6 md:sticky md:top-24 md:h-[calc(100vh.rem)] md:overflow-y-auto">
        <Link href="/" className="text-sm underline">
          Torna alla Home
        </Link>

        <h3 className="font-semibold text-lg  md:mt-48">Indice</h3>

        <nav className="space-y-2 ">
          {regulationSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-sm text text-muted-foregorund hover:text-foreground"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-red-400 hover:bg-red-600 px-1 py-1.5 rounded-xl">
                  {section.title}
                </div>
              </motion.div>
            </a>
          ))}
        </nav>
      </aside>

      {/*Sezione Regolamento Titolo*/}
      <main>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center">
            Regolamento
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg text-custom-grigio text-center ">
            Il nostro impegno per l'eccellenza, l'innovazione e l'integrità.
          </p>

          {/*Sezione Scarica PDF */}

          <div className="flex flex-col justify-center items-center w-full mt-4 mb-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className=" flex items-center gap-2  bg-[rgb(116,221,238)]  hover:bg-[rgb(98,190,204)]  rounded-3xl py-2 px-5">
                <span>Scarica PDF</span>
                <Download />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/*Sezione Titolo+Descrizione Regole */}

        {regulationSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 ctext-center  p-4"
          >
            <h2 className="font-semibold mb-2">{section.title}</h2>

            {/*Sezione Linea */}
            <motion.div
              initial={{ width: 0, x: "10%" }}
              animate={{ width: "10%", x: 0 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="w-14 h-1  bg-[rgb(116,221,238)]  mt-4 mb-6 "
            ></motion.div>

            <p className="text-muted-foreground">{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
