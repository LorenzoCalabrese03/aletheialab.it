"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { BookText, ArrowBigRightDash } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MotionSection = motion("section");

type CountUpProps = {
  end: number;
  duration?: number;
};

const CountUp = ({ end, duration = 2 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function About() {
  return (
    <div className="container px-4 md:px-6 items-center py-12 relative ">
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10">
        {/* Sezione Immagine*/}

        <div className="w-full md:mt-24 md:w-7/12 flex justify-end mr-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src={"/Logo_trasparente.png"}
              alt="Logo Trasparente"
              height={600}
              width={600}
              className="max-w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Sezione Chi siamo  */}

        <div className="w-full md:w-5/12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight md:mt-8">
              Chi Siamo
            </h2>
          </motion.div>
          {/* Sezione Linea  */}
          <motion.div
            initial={{ width: 0, x: "10%" }}
            animate={{ width: "30%", x: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="w-20 h-1  bg-[rgb(116,221,238)]  mt-4 mb-6 "
          ></motion.div>
          {/* Sezione Descrizione  */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="w-20 h-1 bg-primary "></div>
            <p className="text-muted-foreground md:text-lg text-custom-grigio">
              Aletheia è un gruppo di sviluppo software e hardware innovativa fondata nel 2023 con l'obiettivo
              di rivoluzionare il mondo dell'informatica e dell'accessibilità digitale, affrontando le sfide
              tecnologiche del futuro.
            </p>
            <p className="mt-4 text-muted-foreground md:text-lg text-custom-grigio">
              Il nostro team combina competenze tecniche
              all'avanguardia con una profonda comprensione delle dinamiche di
              business per offrire soluzioni che non solo risolvono problemi, ma
              creano nuove opportunità.
            </p>
          </motion.div>
          {/* Sezione Numeri  */}
          <div className="mt-8 ">
            <div className="md:ml-20 grid grid-cols-2 gap-6">
              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-4xl font-bold text-primary text-custom-blue"
                >
                  <CountUp end={7} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2 text-custom-grigio">
                  Progetti Completati
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-4xl font-bold text-primary text-custom-blue"
                >
                  <CountUp end={7} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2 text-custom-grigio">
                  Clienti Soddisfatti
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-4xl font-bold text-primary text-custom-blue"
                >
                  <CountUp end={4} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2 text-custom-grigio">
                  Esperti nel Team
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-4xl font-bold text-primary text-custom-blue "
                >
                  <CountUp end={2} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2 text-custom-grigio">
                  Anni di Esperienza
                </p>
              </div>
            </div>
          </div>

          {/* Sezione Regolamento  */}

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="mt-10 p-6 rounded-xl  bg-card/50 bg-[rgb(24,24,27)] backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center gap-2 ">
                <BookText />
                <h3 className="text-xl font-bold">Il Nostro Regolamento</h3>
              </div>

              <p className="text-muted-foreground mb-4 text-custom-grigio">
                Scopri i principi e i valori che guidano il nostro lavoro e il
                nostro impegno verso l'eccellenza e l'innovazione.
              </p>

              <button className=" py-2 p-6 rounded-xl lg:w-1/2 sm:w-1/4  bg-[rgb(24,44,49)] backdrop-blur-sm hover:scale-105 transition">
                <Link href="./Rules" passHref>
                  <div className=" flex items-center gap-2">
                    <span className="text-custom-blue">Leggi Regolamento</span>
                    <motion.div
                      animate={{ x: 15 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowBigRightDash />
                    </motion.div>
                  </div>
                </Link>
              </button>

              <Image
                src="/Stelle.png"
                alt="Decorazione Stelle"
                height={150}
                width={150}
                className="absolute top-13 right-0 opacity-20 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
