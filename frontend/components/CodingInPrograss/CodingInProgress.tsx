"use client";

import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "./CodingInProgress.css";

export default function CodingInProgress  ()  {
    const router = useRouter();

    const handleClick = () => {
        router.push(`./`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen
    bg-gradient-to-r from-blue-50 to-blue-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-900
    text-black dark:text-white">
            <motion.div
                className="text-4xl font-extrabold mb-4 "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={"/Logo_trasparente.png"} alt={"Aletheia"} style={{width:200,height:200}}/>
            </motion.div>
            <motion.div
                className="text-4xl font-extrabold mb-4 text-blue-600 dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay:0.5, duration: 0.5 }}
            >
                Coding in Progress...
            </motion.div>

            {/* Icona ingranaggio con animazione CSS */}
            <motion.div
                className="text-4xl font-extrabold mb-4  dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay:0.5, duration: 0.5 }}
            >

                    <FaCog className="w-16 h-16 text-custom-blue inline-block icon-spin dark:text-custom-blue" />
            </motion.div>


            <motion.p
                className="mt-4 text-gray-800 font-medium text-center dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Stiamo lavorando per te, torna presto!
            </motion.p>

            <motion.div
                onClick={handleClick}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer dark:bg-blue-900"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                Grazie per la pazienza!
            </motion.div>
        </div>
    );
};

