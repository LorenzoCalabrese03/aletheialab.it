"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { InfoLab } from "@/type/InfoGenerali";

export default function Contact() {
    const [infoLab, setInfoLab] = useState<InfoLab>();

    useEffect(() => {
        fetch("http://10.0.2.30:8000/api/getJSON?item=InfoLab")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore nel caricamento dei dati: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setInfoLab(data.infoLab); // ✅ CORRETTO
            })
            .catch((error) => {
                console.error("Errore nel caricamento dei dati:", error);
            });
    }, []);

    return (
        <div className="flex flex-col px-4 md:px-8 lg:px-16 xl:px-32 space-y-16">

            {/* Header */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Contattaci</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                    <p className="max-w-3xl mx-auto text-muted-foreground text-base md:text-lg">
                        Siamo qui per rispondere alle tue domande e aiutarti a trovare la soluzione migliore per le tue esigenze.
                    </p>
                </motion.div>
            </div>

            {/* Info + Mappa */}
            <div className="max-w-5xl mx-auto w-full">
            <div className="grid gap-y-10 lg:grid-cols-2 items-start">
                {/* Info contatti */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="flex gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="text-lg font-semibold">Indirizzo</h3>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(infoLab?.indirizzo ?? "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p className="text-muted-foreground hover:underline cursor-pointer hover:text-custom-blue">
                                    {infoLab?.indirizzo}
                                </p>
                            </a>



                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <a href={`mailto:${infoLab?.email}`} className="text-sm  hover:underline hover:text-custom-blue">
                            <p className="text-muted-foreground">{infoLab?.email}</p>
                            </a>
                        </div>
                    </div>
                    {/*<div className="flex gap-4">*/}
                    {/*    <Phone className="h-6 w-6 text-primary" />*/}
                    {/*    <div>*/}
                    {/*        <h3 className="text-lg font-semibold">Telefono</h3>*/}
                    {/*        <p className="text-muted-foreground">+39 123 456 7890</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </motion.div>

                {/* Mappa */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="rounded-lg border bg-muted h-64 md:h-80 w-full overflow-hidden">
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <img src={"./mappa.png"} alt={"mappa"}/>
                        </div>
                    </div>
                </motion.div>
            </div>
            </div>

            {/* Form contatto */}
            {/*<motion.div*/}
            {/*    initial={{ opacity: 0, y: 40 }}*/}
            {/*    whileInView={{ opacity: 1, y: 0 }}*/}
            {/*    transition={{ duration: 0.8 }}*/}
            {/*    viewport={{ once: true }}*/}
            {/*>*/}
            {/*    <div className="max-w-5xl mx-auto w-full">*/}
            {/*        <form className="grid gap-6 md:grid-cols-2">*/}
            {/*            /!* Campi input *!/*/}
            {/*            <div className="flex flex-col gap-5">*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    placeholder="Nome"*/}
            {/*                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
            {/*                />*/}
            {/*                <input*/}
            {/*                    type="email"*/}
            {/*                    placeholder="Email"*/}
            {/*                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
            {/*                />*/}
            {/*                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>*/}
            {/*                    <button*/}
            {/*                        type="submit"*/}
            {/*                        className="w-full py-3 px-6 rounded-md bg-gradient-to-r from-blue-600 via-purple-600 to-gray-600 text-white font-semibold transition hover:brightness-110 hover:shadow-[0_0_10px_rgba(99,102,241,0.6)] border border-transparent"*/}
            {/*                    >*/}
            {/*                        Invia messaggio*/}
            {/*                    </button>*/}
            {/*                </motion.div>*/}
            {/*            </div>*/}

            {/*            /!* Textarea *!/*/}
            {/*            <div className="rounded-lg border border-gray-300 bg-muted h-64">*/}
            {/*  <textarea*/}
            {/*      placeholder="Messaggio"*/}
            {/*      className="h-full w-full resize-none p-4 rounded-md bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"*/}
            {/*  ></textarea>*/}
            {/*            </div>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</motion.div>*/}
        </div>
    );
}
