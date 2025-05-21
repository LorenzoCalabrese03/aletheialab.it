"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { BookText } from "lucide-react";

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
    <div className="container px-4 md:px-6 items-center py-12 relative">
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

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
        {/* Sezione Immagine*/}

        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/Logo_trasparente.png"
              alt="Logo Trasparente"
              height={500}
              width={500}
              className="max-w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Sezione Chi siamo  */}

        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Chi Siamo
            </h2>
          </motion.div>
          {/* Sezione Linea  */}
          <motion.div
            initial={{ width: 0, x: "10%" }}
            animate={{ width: "30%", x: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="w-20 h-1 bg-blue-500 mt-4 mb-6"
          ></motion.div>
          {/* Sezione Descrizione  */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="w-20 h-1 bg-primary mt-4 mb-6"></div>
            <p className="text-muted-foreground md:text-lg">
              Aletheia è una startup innovativa fondata nel 2023 con l'obiettivo
              di rivoluzionare il modo in cui le aziende affrontano le sfide
              tecnologiche del futuro.
            </p>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Il nostro team di esperti combina competenze tecniche
              all'avanguardia con una profonda comprensione delle dinamiche di
              business per offrire soluzioni che non solo risolvono problemi, ma
              creano nuove opportunità.
            </p>
          </motion.div>
          {/* Sezione Numeri  */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-4xl font-bold text-primary"
                >
                  <CountUp end={50} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">
                  Progetti Completati
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-4xl font-bold text-primary"
                >
                  <CountUp end={2} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">
                  Clienti Soddisfatti
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-4xl font-bold text-primary"
                >
                  <CountUp end={10} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">
                  Esperti nel Team
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-4xl font-bold text-primary"
                >
                  <CountUp end={5} />+
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">
                  Anni di Esperienza
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <motion.div
              initial={{ width: 0, x: "10%" }}
              animate={{ width: "100%", x: 0 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="w-30 h-25 bg-blue-500 mt-4 mb-6 flex rounded-lg"
            >
              <div>
                <h2 className="text-xl font-bold tracking-tighter md:text-xl/tight flex items-center gap-4">
                  <BookText />
                  Il nostro regolamento
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Scopri i principi e i valori che guidano il nostro lavoro e il
                  nostro impegno verso l'eccellenza e l'innovazione.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
