import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

interface GlitchCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  label?: string;
  delay?: number;
}

export default function GlitchCard({
  children,
  className = "",
  title,
  label,
  delay = 0,
}: GlitchCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`wireframe bg-card/40 backdrop-blur-md p-6 flex flex-col group relative overflow-hidden ${className}`}
    >
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Animated Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <motion.rect
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/20 group-hover:text-primary/50 transition-colors"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 + delay, ease: "easeInOut" }}
        />
      </svg>

      <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-2">
          {title && (
            <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold terminal-flicker">
              {title}
            </h3>
          )}
        </div>
        {label && <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.15em]">{label}</span>}
      </div>
      
      <div className="flex-1 relative z-10" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
      
      {/* Corner Crosshairs */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* HUD Scanner Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 blur-[2px] -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none" />
    </motion.div>
  );
}
