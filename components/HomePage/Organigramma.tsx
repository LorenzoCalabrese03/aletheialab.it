"use client"
import React, {useState, useRef, useEffect} from "react"
import Image from "next/image"
import { motion} from "framer-motion"
import { Users, ChevronDown, ChevronUp, User, Mail, Phone, Github, Linkedin } from "lucide-react"

import {InfoTeam} from "@/type/InfoGenerali"



export function Organigramma() {

    const containerRef = useRef(null)
    const [teamMembers,setTeamMembers] = useState<InfoTeam[]>([]);
    const [infoMobile, setInfoMobile] = useState(false);
    const [selectedMember, setSelectedMember] = useState<InfoTeam>();
    const [isFlipped, setIsFlipped] = React.useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    {/* Richiesta API */}
    useEffect(() => {
        fetch("/InfoTeam.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore nel caricamento dei dati: ${response.statusText}`);
                }
                return response.json();
            })
            .then(setTeamMembers)
            .catch((error) => {
                console.error("Errore nel caricamento dei dati:", error);
            });
    }, []);

    {/* Controllo se è in formato mobile */}
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // chiamata iniziale

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    {/* Funzione per prendere le informazioni dell'utente selezionato in modalità mobile */}
    const handleInfo = (member:InfoTeam) => {
        setSelectedMember(member);
        setInfoMobile(true); // Mostra la card
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 w-full max-w-screen-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-2 text-center"
            >
                {/* Header */}
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Il Nostro Organigramma
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6" />
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                    Conosciamo il team di professionisti che guida Aletheia verso l'innovazione.
                </p>
            </motion.div>

            <div ref={containerRef} className="w-full mt-10">
                <div className="relative mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-primary/30 z-0"
                    />

                    {/* Mobile layout */}
                    {isMobile ? (
                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="w-full transition-transform duration-300 cursor-pointer hover:scale-95"
                                    onClick={() => handleInfo(member)}
                                >
                                    <div className="flex items-center gap-5 border-2 border-white rounded-2xl p-4">
                                        <div className="flex-shrink-0 w-20">
                                            <div className="bg-card border-primary rounded-xl p-6 shadow-lg">
                                                <Users className="h-12 w-12 text-primary" />
                                            </div>
                                        </div>
                                        <h2 className="text-lg font-semibold">{member.name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 justify-items-center relative z-10">
                            {teamMembers.map((member, index) => (
                                <div className="group [perspective:1000px] w-[300px] h-[450px]" key={index}>
                                    {/* Animazione */}
                                    <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 rounded-2xl"
                                         style={{ transform: isFlipped === index ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                                        {/* FRONT */}
                                        <div className="absolute w-full h-full bg-[#4683a3] rounded-2xl [backface-visibility:hidden]">
                                            {/* Foto */}
                                            <div
                                                className="h-2/3 bg-cover bg-center rounded-t-2xl"
                                                style={{ backgroundImage: `url(${member.image})` }}
                                            />

                                            {/* Informazioni di base */}
                                            <div className="h-1/3 bg-white flex flex-col justify-center items-center px-4 rounded-b-2xl">
                                                <h2 className="text-xl font-bold text-black">{member.name}</h2>
                                                <h3 className="text-sm text-[#17283a] mt-1">{member.role}</h3>
                                                <button
                                                    className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer"
                                                    onClick={() => setIsFlipped(index)} // ✅ GIUSTO: imposta l'indice corrente
                                                >
                                                    Scopri di più
                                                </button>
                                            </div>
                                        </div>

                                        {/* BACK */}
                                        <div className="absolute w-full h-full bg-[#ededed] rounded-2xl [backface-visibility:hidden] rotate-y-180 text-black flex flex-col">

                                            {/* Bottone torna indietro */}
                                            <div className="flex justify-end p-3">
                                                <button
                                                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                                                    onClick={() => setIsFlipped(null)} // ✅ GIUSTO: azzera lo stato per tornare al front
                                                >
                                                    Torna indietro
                                                </button>
                                            </div>

                                            {/* Informazioni */}
                                            <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
                                                <p className="mb-4 text-sm">{member.bio}</p>
                                                <div className="flex gap-4 mb-3">
                                                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <Linkedin className="w-5 h-5" />
                                                    </a>
                                                </div>
                                                <div className="flex flex-col items-center pb-4">
                                                    <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline flex flex-row gap-2">
                                                        <Mail/>{member.email}
                                                    </a>
                                                    <a href={`tel:${member.phone}`} className="text-sm text-gray-600 mt-1">
                                                        {member.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div> {/* Fine Back */}
                                    </div>{/* Fine animazioni */}
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            </div>
            {infoMobile && selectedMember && (
                <div
                    className="fixed inset-0 bg-black flex items-center justify-center z-50"

                >
                    {/* Sfondo semi-trasparente con immagine */}
                    <div
                        className="absolute inset-0 bg-center bg-cover opacity-20"
                        style={{ backgroundImage: `url(${selectedMember.image})` }}

                        aria-hidden="true"
                    />


                    {/* Contenuto vero sopra */}
                    <div className="relative z-10 max-w-md p-6 h-full rounded-lg shadow-lg flex flex-col justify-center items-center">

                    {/* Pulsante per chiudere */}
                        <button
                            onClick={() => setInfoMobile(false)}
                            className="absolute top-3 right-3 text-white hover:text-blue-400 cursor-pointer text-xl"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col items-center text-center">

                            <h2 className="text-xl font-semibold text-white">{selectedMember.name}</h2>
                            <h3 className="text-sm text-white mb-3">{selectedMember.role}</h3>
                            <p className="text-sm text-white mb-4">{selectedMember.bio}</p>
                            <div className="flex gap-4 mb-3">
                                <a href={selectedMember.social.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-6 h-6 text-white hover:text-black" />
                                </a>
                                <a href={selectedMember.social.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" />
                                </a>
                            </div>
                            <a href={`mailto:${selectedMember.email}`} className="text-sm text-blue-400 hover:underline">
                                {selectedMember.email}
                            </a>
                            <a href={`tel:${selectedMember.phone}`} className="text-sm text-gray-600 mt-1">
                                {selectedMember.phone}
                            </a>
                        </div>
                    </div>
                </div>

            )}


        </div>

    );

}