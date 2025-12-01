"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function GlassCard({ children, className, delay = 0, ...props }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={cn("glass-card p-8 md:p-12 rounded-2xl max-md:!opacity-100 max-md:!transform-none", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
