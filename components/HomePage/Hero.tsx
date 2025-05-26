"use client"; // Indica che questo componente React è eseguito lato client (Next.js 13+)

import { motion } from "framer-motion"; // Importa il componente motion per animazioni fluidi
import { ChevronRight, ChevronDown } from "lucide-react"; // Importa icone da lucide-react
import React from "react"; // Importa React

// Interfaccia per i props del componente FloatingElement
interface FloatingElementProps {
    children: React.ReactNode; // Contenuto figlio da animare
    xOffset?: number; // Offset orizzontale per l'animazione (default 20)
    yOffset?: number; // Offset verticale per l'animazione (default 20)
    duration?: number; // Durata dell'animazione (default 4 secondi)
}

// Componente FloatingElement con animazione di movimento oscillante usando framer-motion
const FloatingElement = ({ children, xOffset = 20, yOffset = 20, duration = 4}: FloatingElementProps) => {
    return (
        <motion.div
            animate={{
                y: [yOffset, -yOffset, yOffset], // Movimento verticale oscillante
                x: [xOffset, -xOffset, xOffset], // Movimento orizzontale oscillante
            }}
            transition={{
                repeat: Infinity, // Ripete all'infinito
                duration, // Durata dell'animazione
                ease: "easeInOut", // Funzione di easing per transizione fluida
            }}
        >
            {children} {/* Renderizza i figli animati */}
        </motion.div>
    );
};

// Componente principale Hero che rappresenta la sezione hero della pagina
export default function Hero() {
    // Funzione per scrollare in modo fluido a una sezione della pagina dato l'id
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Scroll fino alla posizione meno 80px (per margine header)
                behavior: "smooth", // Scroll animato e fluido
            });
        }
    };

    return (
        // Sezione animata tramite framer-motion
        <motion.section
            id="hero"
            className="w-full py-32 md:py-40 lg:py-48 xl:py-56 relative overflow-hidden bg-background section-transition"
            initial={{ opacity: 0 }} // Opacità iniziale trasparente
            animate={{ opacity: 1 }} // Fade in verso opacità piena
            transition={{ duration: 0.6 }} // Durata animazione 0.6s
        >
            {/* Background blobs animati - sfondo decorativo */}
            <div className="absolute inset-0 z-0 bg-grid">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} // Animazione pulsante di scala e opacità
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} // Altro blob con animazione simile ma durata diversa
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            {/* Contenuto principale */}
            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_600px] lg:gap-12">
                    {/* Colonna testo animata */}
                    <motion.div
                        className="flex flex-col justify-center space-y-4"
                        initial={{ opacity: 0, x: -50 }} // Inizio nascosto e spostato a sinistra
                        animate={{ opacity: 1, x: 0 }} // Appare e si sposta in posizione
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="space-y-2">
                            {/* Titolo animato */}
                            <motion.h1
                                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                                initial={{ opacity: 0, y: 20 }} // Inizia sotto e trasparente
                                animate={{ opacity: 1, y: 0 }} // Appare e si sposta su
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <span className="gradient-text">Innovazione</span> e Professionalità
                            </motion.h1>
                            {/* Paragrafo animato */}
                            <motion.p
                                className="max-w-[600px] text-muted-foreground md:text-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                Aletheia trasforma le idee in realtà. Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.
                            </motion.p>
                        </div>

                        {/* Bottoni call-to-action animati */}
                        <motion.div
                            className="flex flex-col gap-4 min-[400px]:flex-row"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            {/* Bottone scopri di più con animazioni hover/tap */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex rounded-xl border-2 border-white overflow-hidden"
                            >
                                <button
                                    className="flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 w-full cursor-pointer"
                                    onClick={() => scrollToSection("about")} // Scrolla alla sezione about
                                >
                                    Scopri di più
                                    <ChevronRight className="ml-2 h-4 w-4" /> {/* Icona freccia */}
                                </button>
                            </motion.div>

                            {/* Bottone contattaci con animazioni hover/tap */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex rounded-xl border-2 border-white overflow-hidden"
                            >
                                <button
                                    onClick={() => scrollToSection("contact")} // Scrolla alla sezione contact
                                    className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300 w-full cursor-pointer"
                                >
                                    Contattaci
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Animazione scroll down */}
                        <motion.div
                            className="mt-8 hidden md:block"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <motion.button
                                onClick={() => scrollToSection("about")} // Scrolla alla sezione about
                                className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                                whileHover={{ y: 5 }} // Piccolo movimento su hover
                                animate={{ y: [0, 10, 0] }} // Movimento continuo su e giù
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                }}
                                aria-label="Scorri per esplorare"
                            >
                                <span className="text-sm mb-2">Scorri per esplorare</span>
                                <ChevronDown className="h-6 w-6" /> {/* Icona freccia giù */}
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Colonna immagine/logo animato con FloatingElement */}
                    <div className="flex items-center justify-center">
                        <FloatingElement yOffset={15} duration={6}>
                            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                                {/* Sfondo sfumato animato dietro il logo */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-[100px] opacity-50"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.4, 0.6, 0.4],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                {/* Contenitore immagine logo animato */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <div className="h-64 w-64 rounded-full bg-background flex items-center justify-center border-4 border-primary shadow-xl">
                                        <motion.img
                                            src="/Logo_trasparente.png"
                                            alt="Aletheia"
                                            className="h-40 w-40 object-contain"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </FloatingElement>
                    </div>
                </div>
            </div>

            {/* Gradiente di sfumatura in basso per effetto visivo */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent, var(--muted))",
                }}
            />
        </motion.section>
    );
}
