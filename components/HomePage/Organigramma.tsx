"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Users, ChevronDown, ChevronUp, User, Mail, Phone, Github, Linkedin } from "lucide-react"
//import { Button } from "@/components/ui/button"

// Dati dell'organigramma
const teamMembers = [
    {
        id: "lorenzo",
        name: "Lorenzo Calabrese",
        role: "CEO & Founder",
        image: "/placeholder.svg?height=300&width=300&text=LC",
        bio: "Visionario e stratega, Lorenzo guida Aletheia con passione e determinazione verso nuovi orizzonti di innovazione.",
        email: "lorenzo.calabrese@aletheia.com",
        phone: "+39 123 456 7890",
        social: {
            linkedin: "https://linkedin.com/in/lorenzo-calabrese",
            github: "https://github.com/lorenzocalabrese",
        },
        skills: ["Leadership", "Strategia", "Innovazione", "Business Development"],
    },
    {
        id: "francesco",
        name: "Francesco Conforti",
        role: "CTO",
        image: "/placeholder.svg?height=300&width=300&text=FC",
        bio: "Esperto tecnologico con una profonda conoscenza delle ultime innovazioni, Francesco supervisiona tutti gli aspetti tecnici dei nostri progetti.",
        email: "francesco.conforti@aletheia.com",
        phone: "+39 123 456 7891",
        social: {
            linkedin: "https://linkedin.com/in/francesco-conforti",
            github: "https://github.com/francescoconforti",
        },
        skills: ["Architettura Software", "AI", "Cloud Computing", "DevOps"],
    },
    {
        id: "giuseppe",
        name: "Giuseppe Pio De Biase",
        role: "COO",
        image: "/placeholder.svg?height=300&width=300&text=GD",
        bio: "Con un occhio attento ai dettagli e una mente orientata all'efficienza, Giuseppe coordina le operazioni quotidiane garantendo eccellenza in ogni progetto.",
        email: "giuseppe.debiase@aletheia.com",
        phone: "+39 123 456 7892",
        social: {
            linkedin: "https://linkedin.com/in/giuseppe-debiase",
            github: "https://github.com/giuseppedebiase",
        },
        skills: ["Project Management", "Operational Excellence", "Team Leadership", "Process Optimization"],
    },
    {
        id: "alexandru",
        name: "Alexandru Zaharia",
        role: "CMO",
        image: "/placeholder.svg?height=300&width=300&text=AZ",
        bio: "Creativo e innovativo, Alexandru sviluppa strategie di marketing che amplificano la visione di Aletheia e la connettono con il mondo.",
        email: "alexandru.zaharia@aletheia.com",
        phone: "+39 123 456 7893",
        social: {
            linkedin: "https://linkedin.com/in/alexandru-zaharia",
            github: "https://github.com/alexandruzaharia",
        },
        skills: ["Digital Marketing", "Brand Strategy", "Content Creation", "Market Analysis"],
    },
]

export function Organigramma() {
    const [expandedMember, setExpandedMember] = useState<string | null>(null);
    const [hoveredMember, setHoveredMember] = useState<string | null>(null);
    const containerRef = useRef(null)

    const handleMemberClick = (memberId: string) => {
        setExpandedMember(expandedMember === memberId ? null : memberId);
    };


    return (
        <>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-2"
            >
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Il Nostro Organigramma</h2>
                <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Conosciamo il team di professionisti che guida Aletheia verso l'innovazione.
                </p>
            </motion.div>
        </div>
        <div ref={containerRef} className="w-full">
            {/* Visualizzazione principale dell'organigramma */}
            <div className="relative mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-primary/30 z-0"
                ></motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative z-10 flex justify-center mb-12"
                >
                    <div className="bg-card border-2 border-primary rounded-full p-6 shadow-lg">
                        <Users className="h-12 w-12 text-primary" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                className="w-px h-10 bg-primary/30 mb-4"
                                initial={{ height: 0 }}
                                whileInView={{ height: 40 }}
                                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                viewport={{ once: true }}
                            ></motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onHoverStart={() => setHoveredMember(member.id)}
                                onHoverEnd={() => setHoveredMember(null)}
                                onClick={() => handleMemberClick(member.id)}
                                className={`relative w-full rounded-xl border-2 ${
                                    expandedMember === member.id ? "border-primary" : "border-transparent"
                                } bg-card shadow-lg overflow-hidden cursor-pointer transition-all duration-300`}
                            >
                                <div className="p-6 text-center">
                                    <div className="relative mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                                        <Image
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-primary/20"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredMember === member.id || expandedMember === member.id ? 0.2 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-primary font-medium mb-3">{member.role}</p>

                                    <div className="flex justify-center">
                                        {expandedMember === member.id ? (
                                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedMember === member.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden bg-muted/30"
                                        >
                                            <div className="p-6 border-t">
                                                <p className="text-muted-foreground mb-4">{member.bio}</p>

                                                <div className="space-y-3 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-primary" />
                                                        <span className="text-sm font-medium">Competenze:</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {member.skills.map((skill, idx) => (
                                                            <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {skill}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">{member.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">{member.phone}</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button

                                                        className="w-full flex items-center justify-center gap-2"

                                                    >
                                                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                            <Linkedin className="h-4 w-4" />
                                                            <span className="sr-only md:not-sr-only md:text-xs">LinkedIn</span>
                                                        </a>
                                                    </button>
                                                    <button


                                                        className="w-full flex items-center justify-center gap-2"

                                                    >
                                                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                            <Github className="h-4 w-4" />
                                                            <span className="sr-only md:not-sr-only md:text-xs">GitHub</span>
                                                        </a>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Visualizzazione alternativa dell'organigramma - Struttura gerarchica */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-20 bg-card rounded-xl border p-8 shadow-lg"
            >
                <h3 className="text-xl font-bold mb-8 text-center">Struttura Organizzativa</h3>

                <div className="relative">
                    {/* Linee di connessione */}
                    <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-1 h-16 bg-primary/30"></div>
                    <div className="absolute top-[76px] left-1/2 -translate-x-1/2 w-[80%] h-1 bg-primary/30"></div>
                    <div className="absolute top-[76px] left-[10%] w-1 h-16 bg-primary/30"></div>
                    <div className="absolute top-[76px] left-[30%] w-1 h-16 bg-primary/30"></div>
                    <div className="absolute top-[76px] left-[70%] w-1 h-16 bg-primary/30"></div>
                    <div className="absolute top-[76px] left-[90%] w-1 h-16 bg-primary/30"></div>

                    {/* CEO */}
                    <div className="flex justify-center mb-24">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-full max-w-xs bg-primary/10 rounded-lg p-4 text-center border border-primary/30 shadow-md"
                        >
                            <h4 className="font-bold">{teamMembers[0].role}</h4>
                            <p className="text-primary">{teamMembers[0].name}</p>
                        </motion.div>
                    </div>

                    {/* Altri ruoli */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-full bg-muted rounded-lg p-4 text-center border shadow-sm"
                        >
                            <h4 className="font-bold">{teamMembers[1].role}</h4>
                            <p className="text-primary">{teamMembers[1].name}</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-full bg-muted rounded-lg p-4 text-center border shadow-sm"
                        >
                            <h4 className="font-bold">{teamMembers[2].role}</h4>
                            <p className="text-primary">{teamMembers[2].name}</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-full bg-muted rounded-lg p-4 text-center border shadow-sm"
                        >
                            <h4 className="font-bold">{teamMembers[3].role}</h4>
                            <p className="text-primary">{teamMembers[3].name}</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Visualizzazione mobile - Grafico circolare */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-20 md:hidden"
            >
                <h3 className="text-xl font-bold mb-8 text-center">Team Leadership</h3>

                <div className="relative h-[300px] w-[300px] mx-auto">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                    ></motion.div>

                    {/* Centro - CEO */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-xs font-bold">CEO</p>
                                <p className="text-xs">Lorenzo</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Posizioni orbitali */}
                    {[
                        { angle: 0, member: teamMembers[1] },
                        { angle: 120, member: teamMembers[2] },
                        { angle: 240, member: teamMembers[3] },
                    ].map((item, index) => {
                        const radius = 110
                        const x = radius * Math.cos((item.angle * Math.PI) / 180)
                        const y = radius * Math.sin((item.angle * Math.PI) / 180)

                        return (
                            <motion.div
                                key={index}
                                className="absolute top-1/2 left-1/2 z-10"
                                style={{
                                    translateX: `calc(-50% + ${x}px)`,
                                    translateY: `calc(-50% + ${y}px)`,
                                }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-16 h-16 rounded-full bg-muted border flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-xs font-bold">{item.member.role}</p>
                                        <p className="text-[10px]">{item.member.name.split(" ")[0]}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}

                    {/* Linee di connessione */}
                    {[0, 120, 240].map((angle, index) => {
                        const startX = 0
                        const startY = 0
                        const endX = 110 * Math.cos((angle * Math.PI) / 180)
                        const endY = 110 * Math.sin((angle * Math.PI) / 180)

                        return (
                            <motion.div
                                key={`line-${index}`}
                                className="absolute top-1/2 left-1/2 w-[1px] bg-primary/30 origin-bottom"
                                style={{
                                    height: 110,
                                    translateX: "-50%",
                                    translateY: "-100%",
                                    rotate: `${angle}deg`,
                                }}
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                                viewport={{ once: true }}
                            ></motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
        </>
    )
}