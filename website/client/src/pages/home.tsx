import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Zap,
  Shield,
  ExternalLink,
  BarChart3,
  Search,
  Binary,
  Trophy,
  Rocket,
  Activity,
  HardDrive,
  Network,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import NeuralMatrix from "@/components/NeuralMatrix";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import GlitchCard from "@/components/GlitchCard";

// --- Animation Variants ---

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const BOOT_LOGS = [
  "INITIALIZING KITSUNE_CORE v0.7.0...",
  "MOUNTING /dev/research_volumes (ACL_ARR)...",
  "LOADING CUDA_RUNTIME... 24 GPUs DETECTED",
  "VALIDATING SYSTEM_SPECS... [97.98%le]",
  "AUTHENTICATING YC_STARTUP_SCHOOL_26...",
  "INITIALIZING SIH_FINALS_ENV... [OK]",
  "LOADING KERNEL_MODULES (PyTorch, QLoRA, GRPO)...",
  "CHECKING DISCOURSE_COHERENCE_BENCHMARK...",
  "DECRYPTING ALIGNMENT_TAXONOMY...",
  "ESTABLISHING NEURAL_LINK... [READY]",
  "BOOTING BLUEPRINT_GUI...",
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "anticipate" } }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 font-mono overflow-hidden"
    >
      <div className="max-w-2xl w-full relative">
        <div className="flex items-center gap-3 mb-10 text-primary">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Activity size={24} />
          </motion.div>
          <span className="text-lg font-bold tracking-[0.3em] uppercase terminal-flicker">System Boot Sequence</span>
        </div>
        
        <div className="space-y-2 border-l border-primary/20 pl-6 relative">
          <div className="absolute top-0 left-[-1px] w-[1px] h-full bg-gradient-to-b from-primary/60 to-transparent" />
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs md:text-sm flex items-start gap-4"
            >
              <span className="text-white/20 tabular-nums">[{ (i * 0.187).toFixed(3) }]</span>
              <span className={log && (log.includes('[OK]') || log.includes('[READY]')) ? 'text-primary font-bold' : 'text-white/70'}>
                {log}
              </span>
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-primary inline-block ml-1"
          />
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Page ---

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const containerRef = useRef(null);
  
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-black bg-black font-mono">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
            ref={containerRef}
          >
            {/* 3D Neural Matrix Layer */}
            <NeuralMatrix />

            {/* Hyper-Technical Overlays */}
            <div className="scanline" />
            
            {/* Global Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
              style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24 relative z-10">
              {/* Header Metadata */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-primary/20 pb-10 relative"
              >
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-primary uppercase tracking-[0.5em] mb-4 terminal-flicker">
                    <span className="w-2 h-2 bg-primary animate-pulse" />
                    System Status: Operational // Neural_Link Active
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none glitch-text" data-text="Jeeth Kataria.systems">
                    Jeeth Kataria<span className="text-primary/60">.</span>systems
                  </h2>
                </div>
                <div className="flex flex-wrap gap-8 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/30">Location</span>
                    <span className="rgb-split">Bangalore // IN</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/30">Protocol</span>
                    <span>NEURAL_NET_V2</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/30">Optimizer</span>
                    <span className="text-primary/80 underline decoration-dotted">TORCH_KITSUNE</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <GlitchCard className="md:col-span-2 lg:col-span-3 min-h-[350px]" title="Neural Interface" label="CORE_TERMINAL" delay={0.1}>
                  <InteractiveTerminal />
                </GlitchCard>

                <GlitchCard className="lg:col-span-1" title="System Specs" label="BIOS_INFO" delay={0.2}>
                  <div className="space-y-8 py-4 h-full flex flex-col justify-center">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-white/30">
                        <Binary size={14} className="text-primary/60" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">JEE Mains '23</span>
                      </div>
                      <div className="text-4xl font-bold text-white tracking-tighter">
                        97.98<span className="text-primary text-base ml-1">%ile</span>
                      </div>
                    </div>
                    <div className="h-px bg-primary/10" />
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-white/30">
                        <Cpu size={14} className="text-primary/60" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Academic Core</span>
                      </div>
                      <div className="text-3xl font-bold text-white tracking-tighter">
                        8.5<span className="text-primary text-base ml-1">CGPA</span>
                      </div>
                    </div>
                  </div>
                </GlitchCard>
                
                <GlitchCard className="md:col-span-1" title="Core Identity" label="ROOT_USER" delay={0.3}>
                  <div className="py-2">
                    <p className="text-xl font-bold text-white tracking-tighter mb-4">Jeeth Kataria</p>
                    <p className="text-xs text-white/50 font-mono leading-relaxed mb-6">
                      Systems Engineer & ML Researcher specializing in high-performance AI infrastructure and GPU memory optimization.
                    </p>
                    <div className="space-y-3">
                      {["2x ACL ARR Papers", "1x Published PyPI", "1x National ICPC Org"].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 group/item">
                          <div className="w-1 h-1 bg-primary group-hover:scale-150 transition-transform" />
                          <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold group-hover:text-primary transition-colors">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlitchCard>

                <GlitchCard className="md:col-span-2" title="Research Output" label="ACL ARR MAY_26" delay={0.4}>
                  <div className="py-2">
                    <div className="flex items-start justify-between gap-6 mb-5">
                      <h4 className="text-2xl font-bold text-white tracking-tighter leading-tight group-hover:text-primary transition-colors">CoherenceBench-IN</h4>
                      <a href="https://anonymous.4open.science/r/coherencebench-in-0EBB" target="_blank" rel="noopener" className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition-all shrink-0">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
                      <span className="text-[10px] text-primary uppercase font-black tracking-[0.3em] block mb-2">Key Finding</span>
                      <p className="text-sm text-white/80 italic font-mono leading-relaxed">"Causal chain reasoning is a capability threshold."</p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 size={14} className="text-primary/60" />
                        <span>584 Instances / Qwen2.5</span>
                      </div>
                    </div>
                  </div>
                </GlitchCard>

                <GlitchCard className="md:col-span-1" title="Recognitions" label="MILESTONES" delay={0.5}>
                  <div className="space-y-5 py-2">
                    {[
                      { title: "YC Startup School '26", icon: Rocket, label: "Batch '26" },
                      { title: "Smart India Hackathon", icon: Trophy, label: "National Finalist" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center gap-4 group/m">
                        <div className="w-10 h-10 bg-primary/5 border border-primary/10 flex items-center justify-center transition-all group-hover/m:border-primary/60 group-hover/m:bg-primary/10">
                          <m.icon size={16} className="text-primary/40 group-hover/m:text-primary transition-colors" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white leading-tight mb-1">{m.title}</div>
                          <div className="text-[8px] text-primary/40 uppercase tracking-[0.2em] font-bold">{m.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlitchCard>

                <GlitchCard className="md:col-span-1" title="Kernel Modules" label="SYS_CAPABILITIES" delay={0.6}>
                  <div className="grid grid-cols-2 gap-2 py-2">
                    {["PyTorch", "CUDA", "HuggingFace", "QLoRA", "GRPO", "Python"].map((s, i) => (
                      <div key={i} className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-2 text-white/50 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all text-center uppercase tracking-tighter">
                        {s}
                      </div>
                    ))}
                  </div>
                </GlitchCard>

                <GlitchCard className="md:col-span-2" title="System Log" label="EXPERIENCE" delay={0.7}>
                  <div className="space-y-4 py-2">
                    {[
                      { org: "Samsung R&D", role: "PRISM Intern" },
                      { org: "DRDO", role: "Research Intern" },
                      { org: "CMTI", role: "ML Intern" },
                    ].map((exp, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-5">
                          <span className="text-[10px] font-mono text-primary/30 font-bold">0{i+1}</span>
                          <div>
                            <div className="text-sm font-bold text-white tracking-tight">{exp.org}</div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono">{exp.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlitchCard>

                <GlitchCard className="md:col-span-1" title="Active Thread" label="IN_PROGRESS" delay={0.8}>
                  <div className="py-2">
                    <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-primary terminal-flicker" />
                      Anti-Reward RL
                    </h4>
                    <div className="w-full h-[6px] bg-white/5 overflow-hidden border border-white/10 mt-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "72.4%" }}
                        transition={{ duration: 2.5, delay: 1, ease: "circOut" }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(255,176,0,0.4)]" 
                      />
                    </div>
                    <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest text-center mt-2">
                      Training: 72.4%
                    </div>
                  </div>
                </GlitchCard>

                {/* Social Row */}
                <div className="md:col-span-2 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {[
                    { label: "GitHub", href: "https://github.com/jeeth-kataria", icon: ExternalLink },
                    { label: "LinkedIn", href: "https://linkedin.com/in/jeeth-kataria", icon: Network },
                    { label: "PyPI", href: "https://pypi.org/project/torch-kitsune/", icon: HardDrive },
                    { label: "Email", href: "mailto:jeetbkataria@gmail.com", icon: Rocket },
                  ].map((link, i) => (
                    <motion.a 
                      key={i}
                      href={link.href} 
                      target="_blank" 
                      rel="noopener"
                      whileHover={{ y: -5 }}
                      className="wireframe bg-card/20 p-5 flex flex-col items-center justify-center gap-4 hover:bg-primary/10 hover:border-primary transition-all group"
                    >
                      <div className="w-12 h-12 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-colors bg-white/5">
                        <link.icon size={24} className="text-white/20 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-black group-hover:text-primary transition-colors">{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* System Telemetry Footer */}
              <footer className="mt-32 pt-10 border-t border-white/5 relative">
                <div className="absolute top-0 left-0 w-20 h-[1px] bg-primary" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] font-black italic">
                    &copy; 2026 JEETH_KATARIA_ARCHIVE
                  </p>
                  <div className="flex gap-10">
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Commit_Hash</div>
                      <div className="text-[10px] font-mono text-primary/40 uppercase">7F2E4A1 // HEAD</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Build_Type</div>
                      <div className="text-[10px] font-mono text-primary/40 uppercase">CYBER_ARCHITECT</div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
