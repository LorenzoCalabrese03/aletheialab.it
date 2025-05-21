"use client"
import {useState, useRef, useEffect} from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Users, ChevronDown, ChevronUp, User, Mail, Phone, Github, Linkedin } from "lucide-react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import { Button } from "@/components/ui/button"
import {InfoTeam} from "@/type/Team"
// Dati dell'organigramma


export function Organigramma() {
    const [expandedMember, setExpandedMember] = useState<string | null>(null);
    const [hoveredMember, setHoveredMember] = useState<string | null>(null);
    const containerRef = useRef(null)
    const [teamMembers,setTeamMembers] = useState<InfoTeam[]>([]);
    const [flippedMap, setFlippedMap] = useState<Record<number, boolean>>({});
    const [isMobile, setIsMobile] = useState(false);
    const flipTimeouts = useRef<Record<number, NodeJS.Timeout>>({});

    const toggleFlip = (index: number, value?: boolean) => {
        setFlippedMap((prev) => ({
            ...prev,
            [index]: value !== undefined ? value : !prev[index],
        }));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // chiamata iniziale

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
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

    return (
        <div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-screen-xl w-full px-4">
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
                    <div className="bg-card border-2 mt-5 border-primary rounded-full p-6 shadow-lg">
                        <Users className="h-12 w-12 text-primary" />
                    </div>
                </motion.div>

                {/*Card che flippano*/}
                {isMobile?(
                    <Slider {...settings}>
                        {teamMembers.map((member,index)=>(
                            <div key={index} className="px-2">
                                <div className="group [perspective:1000px] w-[300px] mx-auto h-[530px] cursor-pointer">
                                    <div
                                        className={`relative w-full h-full transition-transform duration-[800ms] ease-in-out [transform-style:preserve-3d] border border-gray-300 rounded-[15px] ${
                                            flippedMap[index] ? "[transform:rotateY(180deg)]" : ""
                                        }`}
                                    >
                                        <div className="absolute w-full h-full backface-hidden rounded-[15px] bg-[#4683a3]">
                                            <div className="h-2/3 w-full bg-cover bg-center" style={{ backgroundImage: "url('/path/to/image.jpg')" }}>
                                                {/* oppure <img src="/path/to/image.jpg" className="w-full h-full object-cover" /> */}
                                            </div>
                                            <div className="h-1/3 bg-white flex flex-col justify-center items-center px-4">
                                                <h2 className="text-xl font-bold text-[#0a0a0a]">{member.name}</h2>
                                                <h3 className="text-sm text-[#17283a] mt-1">{member.role}</h3>
                                                <button
                                                    onClick={() => toggleFlip(index, true)}
                                                    className="mt-2 text-sm text-blue-700 underline"
                                                >
                                                    Scopri di più
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="absolute w-full h-full backface-hidden rounded-[15px] bg-[#ededed] text-[#0a0a0a] flex justify-center items-center [transform:rotateY(180deg)] shadow-[0_240px_40px_rgba(1,1,1,0.1)]"
                                        >
                                            <div className="text-center p-5 max-w-[300px] flex flex-col items-center">
                                                <p className="text-base text-[#0a0a0a] mb-5 leading-[1.6]">{member.bio}</p>

                                                <div className="flex gap-4 mb-3">
                                                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-6 h-6 text-[#0a0a0a] hover:text-[#333]" />
                                                    </a>
                                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <Linkedin className="w-6 h-6 text-[#0a0a0a] hover:text-[#0077b5]" />
                                                    </a>
                                                </div>
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {member.email}
                                                </a>
                                                <button
                                                    onClick={() => toggleFlip(index, false)}
                                                    className="mt-2 text-sm text-blue-700 underline"
                                                >
                                                    Torna indietro
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {teamMembers.map((member,index)=>(
                            <div className="group [perspective:1000px] w-[360px] h-[530px] cursor-pointer"
                                 key={index}>
                                <div className="relative w-full h-full transition-transform duration-[800ms] ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] border border-gray-300 rounded-[15px]">
                                    <div className="absolute w-full h-full backface-hidden rounded-[15px] bg-[#4683a3]">
                                        <div className="h-2/3 w-full bg-cover bg-center" style={{ backgroundImage: "url('Logo_trasparente.png')" }}>
                                            {/* oppure <img src="/path/to/image.jpg" className="w-full h-full object-cover" /> */}
                                        </div>
                                        <div className="h-1/3 bg-white flex flex-col justify-center items-center px-4">
                                            <h2 className="text-xl font-bold text-[#0a0a0a]">{member.name}</h2>
                                            <h3 className="text-sm text-[#17283a] mt-1">{member.role}</h3>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute w-full h-full backface-hidden rounded-[15px] bg-[#ededed] text-[#0a0a0a] flex justify-center items-center [transform:rotateY(180deg)] shadow-[0_240px_40px_rgba(1,1,1,0.1)]"
                                    >
                                        <div className="text-center p-5 max-w-[300px] flex flex-col items-center">
                                            <p className="text-base text-[#0a0a0a] mb-5 leading-[1.6]">{member.bio}</p>
                                            {/* Skills */}
                                            {/*{member.skills?.length > 0 && (*/}
                                            {/*    <ul className="mt-2 text-sm text-left list-disc list-inside w-full">*/}
                                            {/*        {member.skills.map((skill, i) => (*/}
                                            {/*            <li key={i}>{skill}</li>*/}
                                            {/*        ))}*/}
                                            {/*    </ul>*/}
                                            {/*)}*/}
                                            <div className="flex gap-4 mb-3 mt-4">
                                                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-6 h-6 text-[#0a0a0a] hover:text-[#333]" />
                                                </a>
                                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin className="w-6 h-6 text-[#0a0a0a] hover:text-[#0077b5]" />
                                                </a>
                                            </div>

                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {member.email}
                                                </a>
                                                <a
                                                    href={`tel:${member.email}`}>
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

            {/* Visualizzazione alternativa dell'organigramma - Struttura gerarchica */}
            {/*<motion.div*/}
            {/*    initial={{ opacity: 0, y: 30 }}*/}
            {/*    whileInView={{ opacity: 1, y: 0 }}*/}
            {/*    transition={{ duration: 0.8, delay: 0.5 }}*/}
            {/*    viewport={{ once: true }}*/}
            {/*    className="mt-20 bg-card rounded-xl border p-8 shadow-lg"*/}
            {/*>*/}
            {/*    <h3 className="text-xl font-bold mb-8 text-center">Struttura Organizzativa</h3>*/}

            {/*    <div className="relative">*/}
            {/*        /!* Linee di connessione *!/*/}
            {/*        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-1 h-16 bg-primary/30"></div>*/}
            {/*        <div className="absolute top-[76px] left-1/2 -translate-x-1/2 w-[80%] h-1 bg-primary/30"></div>*/}
            {/*        <div className="absolute top-[76px] left-[10%] w-1 h-16 bg-primary/30"></div>*/}
            {/*        <div className="absolute top-[76px] left-[30%] w-1 h-16 bg-primary/30"></div>*/}
            {/*        <div className="absolute top-[76px] left-[70%] w-1 h-16 bg-primary/30"></div>*/}
            {/*        <div className="absolute top-[76px] left-[90%] w-1 h-16 bg-primary/30"></div>*/}

            {/*        /!* CEO *!/*/}
            {/*        /!*<div className="flex justify-center mb-24">*!/*/}
            {/*        /!*    <motion.div*!/*/}
            {/*        /!*        whileHover={{ scale: 1.05 }}*!/*/}
            {/*        /!*        className="w-full max-w-xs bg-primary/10 rounded-lg p-4 text-center border border-primary/30 shadow-md"*!/*/}
            {/*        /!*    >*!/*/}
            {/*        /!*        <h4 className="font-bold">{teamMembers[0].role}</h4>*!/*/}
            {/*        /!*        <p className="text-primary">{teamMembers[0].name}</p>*!/*/}
            {/*        /!*    </motion.div>*!/*/}
            {/*        /!*</div>*!/*/}

            {/*        /!* Altri ruoli *!/*/}
            {/*        /!*<div className="grid grid-cols-1 md:grid-cols-3 gap-4">*!/*/}
            {/*        /!*    <motion.div*!/*/}
            {/*        /!*        whileHover={{ scale: 1.05 }}*!/*/}
            {/*        /!*        className="w-full bg-muted rounded-lg p-4 text-center border shadow-sm"*!/*/}
            {/*        /!*    >*!/*/}
            {/*        /!*        <h4 className="font-bold">{teamMembers[1].role}</h4>*!/*/}
            {/*        /!*        <p className="text-primary">{teamMembers[1].name}</p>*!/*/}
            {/*        /!*    </motion.div>*!/*/}
            {/*        /!*    <motion.div*!/*/}
            {/*        /!*        whileHover={{ scale: 1.05 }}*!/*/}
            {/*        /!*        className="w-full bg-muted rounded-lg p-4 text-center border shadow-sm"*!/*/}
            {/*        /!*    >*!/*/}
            {/*        /!*        <h4 className="font-bold">{teamMembers[2].role}</h4>*!/*/}
            {/*        /!*        <p className="text-primary">{teamMembers[2].name}</p>*!/*/}
            {/*        /!*    </motion.div>*!/*/}
            {/*        /!*    <motion.div*!/*/}
            {/*        /!*        whileHover={{ scale: 1.05 }}*!/*/}
            {/*        /!*        className="w-full bg-muted rounded-lg p-4 text-center border shadow-sm"*!/*/}
            {/*        /!*    >*!/*/}
            {/*        /!*        <h4 className="font-bold">{teamMembers[3].role}</h4>*!/*/}
            {/*        /!*        <p className="text-primary">{teamMembers[3].name}</p>*!/*/}
            {/*        /!*    </motion.div>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*    </div>*/}
            {/*</motion.div>*/}

            {/*/!* Visualizzazione mobile - Grafico circolare *!/*/}
            {/*<motion.div*/}
            {/*    initial={{ opacity: 0, scale: 0.9 }}*/}
            {/*    whileInView={{ opacity: 1, scale: 1 }}*/}
            {/*    transition={{ duration: 0.8, delay: 0.7 }}*/}
            {/*    viewport={{ once: true }}*/}
            {/*    className="mt-20 md:hidden"*/}
            {/*>*/}
            {/*    <h3 className="text-xl font-bold mb-8 text-center">Team Leadership</h3>*/}

            {/*    <div className="relative h-[300px] w-[300px] mx-auto">*/}
            {/*        <motion.div*/}
            {/*            className="absolute inset-0 rounded-full border-2 border-primary/30"*/}
            {/*            initial={{ scale: 0, opacity: 0 }}*/}
            {/*            whileInView={{ scale: 1, opacity: 1 }}*/}
            {/*            transition={{ duration: 0.5, delay: 0.8 }}*/}
            {/*            viewport={{ once: true }}*/}
            {/*        ></motion.div>*/}

            {/*        /!* Centro - CEO *!/*/}
            {/*        <motion.div*/}
            {/*            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"*/}
            {/*            initial={{ scale: 0 }}*/}
            {/*            whileInView={{ scale: 1 }}*/}
            {/*            transition={{ duration: 0.5, delay: 1 }}*/}
            {/*            viewport={{ once: true }}*/}
            {/*        >*/}
            {/*            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">*/}
            {/*                <div className="text-center">*/}
            {/*                    <p className="text-xs font-bold">CEO</p>*/}
            {/*                    <p className="text-xs">Lorenzo</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </motion.div>*/}

            {/*        /!* Posizioni orbitali *!/*/}
            {/*        /!*{[*!/*/}
            {/*        /!*    { angle: 0, member: teamMembers[1] },*!/*/}
            {/*        /!*    { angle: 120, member: teamMembers[2] },*!/*/}
            {/*        /!*    { angle: 240, member: teamMembers[3] },*!/*/}
            {/*        /!*].map((item, index) => {*!/*/}
            {/*        /!*    const radius = 110*!/*/}
            {/*        /!*    const x = radius * Math.cos((item.angle * Math.PI) / 180)*!/*/}
            {/*        /!*    const y = radius * Math.sin((item.angle * Math.PI) / 180)*!/*/}

            {/*        /!*    return (*!/*/}
            {/*        /!*        <motion.div*!/*/}
            {/*        /!*            key={index}*!/*/}
            {/*        /!*            className="absolute top-1/2 left-1/2 z-10"*!/*/}
            {/*        /!*            style={{*!/*/}
            {/*        /!*                translateX: `calc(-50% + ${x}px)`,*!/*/}
            {/*        /!*                translateY: `calc(-50% + ${y}px)`,*!/*/}
            {/*        /!*            }}*!/*/}
            {/*        /!*            initial={{ scale: 0 }}*!/*/}
            {/*        /!*            whileInView={{ scale: 1 }}*!/*/}
            {/*        /!*            transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}*!/*/}
            {/*        /!*            viewport={{ once: true }}*!/*/}
            {/*        /!*        >*!/*/}
            {/*        /!*            <div className="w-16 h-16 rounded-full bg-muted border flex items-center justify-center">*!/*/}
            {/*        /!*                <div className="text-center">*!/*/}
            {/*        /!*                    <p className="text-xs font-bold">{item.member.role}</p>*!/*/}
            {/*        /!*                    <p className="text-[10px]">{item.member.name.split(" ")[0]}</p>*!/*/}
            {/*        /!*                </div>*!/*/}
            {/*        /!*            </div>*!/*/}
            {/*        /!*        </motion.div>*!/*/}
            {/*        /!*    )*!/*/}
            {/*        /!*})}*!/*/}

            {/*        /!* Linee di connessione *!/*/}
            {/*        /!*{[0, 120, 240].map((angle, index) => {*!/*/}
            {/*        /!*    const startX = 0*!/*/}
            {/*        /!*    const startY = 0*!/*/}
            {/*        /!*    const endX = 110 * Math.cos((angle * Math.PI) / 180)*!/*/}
            {/*        /!*    const endY = 110 * Math.sin((angle * Math.PI) / 180)*!/*/}

            {/*        /!*    return (*!/*/}
            {/*        /!*        <motion.div*!/*/}
            {/*        /!*            key={`line-${index}`}*!/*/}
            {/*        /!*            className="absolute top-1/2 left-1/2 w-[1px] bg-primary/30 origin-bottom"*!/*/}
            {/*        /!*            style={{*!/*/}
            {/*        /!*                height: 110,*!/*/}
            {/*        /!*                translateX: "-50%",*!/*/}
            {/*        /!*                translateY: "-100%",*!/*/}
            {/*        /!*                rotate: `${angle}deg`,*!/*/}
            {/*        /!*            }}*!/*/}
            {/*        /!*            initial={{ scaleY: 0 }}*!/*/}
            {/*        /!*            whileInView={{ scaleY: 1 }}*!/*/}
            {/*        /!*            transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}*!/*/}
            {/*        /!*            viewport={{ once: true }}*!/*/}
            {/*        /!*        ></motion.div>*!/*/}
            {/*        /!*    )*!/*/}
            {/*        /!*})}*!/*/}
            {/*    </div>*/}
            {/*</motion.div>*/}
        </div>
        </div>
    )
}