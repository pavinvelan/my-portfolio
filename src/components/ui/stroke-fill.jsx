import React from "react";
import { motion } from "framer-motion";

export const StrokeFill = ({
    text = "Elegance",
    duration = 3,
}) => {
    return (
        <div className="w-full flex items-center justify-start overflow-visible py-2">
            <svg viewBox="0 0 800 120" className="w-full max-w-4xl h-auto overflow-visible">
                <motion.text
                    x="0%"
                    y="50%"
                    textAnchor="start"
                    dominantBaseline="middle"
                    strokeWidth="1.5"
                    className="font-[900] text-7xl uppercase tracking-widest stroke-[#00F0FF] fill-transparent"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0, fill: "#00F0FF" }}
                    transition={{
                        duration,
                        ease: "easeInOut",
                        fill: { delay: duration * 0.67, duration: duration * 0.33, ease: "easeIn" },
                    }}
                >
                    {text}
                </motion.text>
            </svg>
        </div>
    );
};
