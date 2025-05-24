import {CSSProperties, ReactNode, useRef} from "react";
import {motion, useInView} from "framer-motion";

interface AnimatedSectionProps{
    children: ReactNode;
    delay?: number;
    className?: string;
    id?: string;
    style?: CSSProperties;

}
export const AnimatedSection = ({ children, delay = 0, className = "", id = "", style = {} }:AnimatedSectionProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

    return (
        <motion.section
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay }}
            className={`relative w-full py-24 md:py-32 ${className}`}
            style={style}
        >
            {children}
        </motion.section>
    )
}
