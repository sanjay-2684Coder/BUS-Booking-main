import React from "react";
import { motion } from "framer-motion";

const TopLayout = ({ bgImg, title, classname }) => {
    const variants = {
        hidden: { opacity: 0, y: -800 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className={`relative w-full h-[100vh] bg-cover bg-center bg-no-repeat ${classname}`}
            style={{ backgroundImage: `url(${bgImg})` }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.85, ease: "easeInOut" }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content Section */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -800 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -800 }}
                    transition={{ duration: 1.85, ease: "easeOut" }}
                    className="text-5xl text-white font-bold capitalize drop-shadow-lg"
                >
                    {title}
                </motion.h1>
            </div>
        </motion.div>
    );
};

export default TopLayout;
