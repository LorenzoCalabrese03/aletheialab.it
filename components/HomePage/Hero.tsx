"use client"
import { motion } from "framer-motion";



export default function Hero() {
    return (
        <motion.section
            id="hero"
            className="w-full py-32 md:py-40 lg:py-48 xl:py-56 relative overflow-hidden bg-background section-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div>
                Contenuto Hero
            </div>
        </motion.section>
    );
}
