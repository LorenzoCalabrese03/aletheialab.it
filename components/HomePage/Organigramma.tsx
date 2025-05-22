"use client"
import {useState, useRef, useEffect} from "react"
import Image from "next/image"
import { motion} from "framer-motion"
import { Users, ChevronDown, ChevronUp, User, Mail, Phone, Github, Linkedin } from "lucide-react"

//import { Button } from "@/components/ui/button"
import {InfoTeam} from "@/type/Team"
// Dati dell'organigramma


export function Organigramma() {

    const containerRef = useRef(null)
    const [teamMembers,setTeamMembers] = useState<InfoTeam[]>([]);
    const [infoMobile, setInfoMobile] = useState(false);
    const [selectedMember, setSelectedMember] = useState<InfoTeam>();

    const [isMobile, setIsMobile] = useState(false);




    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // chiamata iniziale

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


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
                                <div className="group [perspective:1000px] w-[300px] h-[450px] cursor-pointer" key={index}>
                                    <div className="relative w-full h-full border border-gray-300 rounded-2xl flip-card">

                                        {/* Front */}
                                        <div className="absolute w-full h-full rounded-2xl bg-[#4683a3] flip-card-front">
                                            <div
                                                className="h-2/3 bg-cover bg-center rounded-t-2xl"
                                                style={{ backgroundImage: "url('Logo_trasparente.png')" }}
                                            />
                                            <div className="h-1/3 bg-white flex flex-col justify-center items-center px-4 rounded-b-2xl">
                                                <h2 className="text-xl font-bold text-black">{member.name}</h2>
                                                <h3 className="text-sm text-[#17283a] mt-1">{member.role}</h3>
                                            </div>
                                        </div>

                                        {/* Back */}
                                        <div className="absolute w-full h-full rounded-2xl bg-[#ededed] text-black flex justify-center items-center flip-card-back">
                                            <div className="text-center p-5 max-w-[280px] flex flex-col items-center">
                                                <p className="text-base mb-4 leading-relaxed">{member.bio}</p>
                                                <div className="flex gap-4 mb-3 mt-2">
                                                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-6 h-6 hover:text-[#333]" />
                                                    </a>
                                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <Linkedin className="w-6 h-6 hover:text-[#0077b5]" />
                                                    </a>
                                                </div>
                                                <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline">
                                                    {member.email}
                                                </a>
                                                <a href={`tel:${member.phone}`} className="text-sm text-gray-600 mt-1">
                                                    {member.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            </div>
            {infoMobile && selectedMember && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setInfoMobile(false)}
                >

                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative" onClick={(e) => e.stopPropagation()}>
                        {/* Pulsante per chiudere */}
                        <button
                            onClick={() => setInfoMobile(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div
                                className="w-24 h-24 bg-gray-200 rounded-full mb-4 bg-cover bg-center"
                                style={{ backgroundImage: "url('Logo_trasparente.png')" }}
                            />
                            <h2 className="text-xl font-semibold text-gray-800">{selectedMember.name}</h2>
                            <h3 className="text-sm text-gray-500 mb-3">{selectedMember.role}</h3>
                            <p className="text-sm text-gray-700 mb-4">{selectedMember.bio}</p>
                            <div className="flex gap-4 mb-3">
                                <a href={selectedMember.social.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-6 h-6 text-gray-700 hover:text-black" />
                                </a>
                                <a href={selectedMember.social.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" />
                                </a>
                            </div>
                            <a href={`mailto:${selectedMember.email}`} className="text-sm text-blue-600 hover:underline">
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