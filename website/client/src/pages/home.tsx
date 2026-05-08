import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Cpu,
  Zap,
  Shield,
  Eye,
  Factory,
  Sparkles,
  Briefcase,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  Search,
  Binary,
  Trophy,
  Rocket,
  Activity,
  HardDrive,
  Network,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

// --- Animation Variants ---

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const cardEntry = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Components ---

function ScanningLine() {
  return (
    <motion.div
      initial={{ top: "-10%" }}
      animate={{ top: "110%" }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="fixed left-0 right-0 h-[2px] bg-primary/20 z-[60] pointer-events-none blur-[1px]"
      style={{
        boxShadow: "0 0 15px rgba(255, 176, 0, 0.2)",
      }}
    />
  );
}

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
      
      {/* Background Grid for Boot */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(var(--primary) 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} 
      />
    </motion.div>
  );
}

function BlueprintCard({
  children,
  className = "",
  title,
  label,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  label?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={cardEntry}
      className={`wireframe bg-card/40 backdrop-blur-md p-6 flex flex-col group relative ${className}`}
    >
      {/* Animated Border Drawing Effect */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <motion.rect
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/10 group-hover:text-primary/30 transition-colors"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 + delay, ease: "easeInOut" }}
        />
      </svg>

      <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          {title && (
            <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold terminal-flicker">
              {title}
            </h3>
          )}
        </div>
        {label && <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.15em]">{label}</span>}
      </div>
      
      <div className="flex-1 relative z-10">{children}</div>
      
      {/* Corner Crosshairs */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

function HeroTerminal() {
  const [copied, setCopied] = useState(false);
  const command = "pip install torch-kitsune";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <BlueprintCard className="md:col-span-2 lg:col-span-3 min-h-[300px] md:min-h-[340px]" title="Main Module" label="KITSUNE_ENV / PRODUCTION" delay={0.1}>
      <div className="h-full flex flex-col justify-center py-4">
        <div className="mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 mb-3 text-primary/60"
          >
            <Terminal size={14} />
            <span className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase">system_init --project=kitsune --status=active</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-4 md:mb-6 leading-[0.9]">
            Never <span className="text-primary italic crt-glitch" data-text="OOM">OOM</span> again.
          </h1>
          <p className="text-xs md:text-base text-white/40 max-w-xl font-mono leading-relaxed">
            State-of-the-art GPU memory planning for PyTorch. Predict peak memory, batch size, and hardware costs before you allocate a single byte.
          </p>
        </div>

        <div className="relative">
          <motion.div 
            onClick={copyToClipboard}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="bg-primary/5 border border-primary/20 p-3 md:p-5 font-mono text-base sm:text-lg md:text-2xl flex items-center justify-between cursor-pointer group/cmd overflow-hidden transition-colors hover:bg-primary/10 hover:border-primary/40"
          >
            <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
              <span className="text-primary/40">$</span>
              <span className="text-primary font-bold tracking-tight truncate">{command}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-1.5 h-5 md:w-2 md:h-6 bg-primary/60 shrink-0"
              />
            </div>
            <div className="text-primary/40 group-hover/cmd:text-primary transition-colors shrink-0 ml-2">
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </div>
          </motion.div>
          
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-8 left-0 text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold"
              >
                &gt;&gt; COMMAND_EXECUTED: REPOSITORY_LINKED
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {["24+ GPUs", "HuggingFace", "131 Tests", "v0.7.0"].map((tag, i) => (
            <Badge key={i} variant="outline" className="border-primary/10 text-primary/60 rounded-none bg-primary/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest hover:border-primary/40 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </BlueprintCard>
  );
}

function StatsCard() {
  return (
    <BlueprintCard className="lg:col-span-1" title="System Specs" label="BIOS_INFO" delay={0.2}>
      <div className="space-y-8 py-4 h-full flex flex-col justify-center">
        <div>
          <div className="flex items-center gap-2 mb-2 text-white/30">
            <Binary size={14} className="text-primary/60" />
            <span className="text-[10px] uppercase tracking-widest font-bold">JEE Mains '23</span>
          </div>
          <div className="text-4xl font-bold text-white tracking-tighter">
            97.98<span className="text-primary text-base ml-1">%ile</span>
          </div>
          <div className="text-[9px] text-white/20 font-mono mt-2 uppercase tracking-widest">Global Rank 23,000 / Top 1%</div>
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
          <div className="text-[9px] text-white/20 font-mono mt-2 uppercase tracking-widest">RIT Bangalore / Semester 06</div>
        </div>
      </div>
    </BlueprintCard>
  );
}

function AboutCard() {
  return (
    <BlueprintCard className="md:col-span-1" title="Core Identity" label="ROOT_USER" delay={0.3}>
      <div className="py-2">
        <p className="text-xl font-bold text-white tracking-tighter mb-4">Jeeth Kataria</p>
        <p className="text-xs text-white/50 font-mono leading-relaxed mb-6">
          Systems Engineer & ML Researcher specializing in high-performance AI infrastructure, GPU memory optimization, and LLM benchmarking frameworks.
        </p>
        <div className="space-y-3">
          {[
            { text: "2x ACL ARR Papers", icon: Zap },
            { text: "1x Published PyPI", icon: Sparkles },
            { text: "1x National ICPC Org", icon: Trophy }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 group/item">
              <div className="w-1 h-1 bg-primary group-hover:scale-150 transition-transform" />
              <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold group-hover:text-primary transition-colors">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BlueprintCard>
  );
}

function MilestonesCard() {
  const milestones = [
    { title: "YC Startup School '26", icon: Rocket, label: "Batch '26" },
    { title: "Smart India Hackathon", icon: Trophy, label: "National Finalist" },
    { title: "Code Crafter Core Org", icon: Shield, label: "Lead Organizer" },
  ];

  return (
    <BlueprintCard className="md:col-span-1" title="Recognitions" label="MILESTONES" delay={0.4}>
      <div className="space-y-5 py-2">
        {milestones.map((m, i) => (
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
    </BlueprintCard>
  );
}

function ResearchProject({ 
  title, 
  status, 
  finding, 
  stats, 
  link,
  delay = 0
}: { 
  title: string; 
  status: string; 
  finding: string; 
  stats: string;
  link: string;
  delay?: number;
}) {
  return (
    <BlueprintCard className="md:col-span-2" title="Research Output" label={status} delay={delay}>
      <div className="py-2">
        <div className="flex items-start justify-between gap-6 mb-5">
          <h4 className="text-2xl font-bold text-white tracking-tighter leading-tight group-hover:text-primary transition-colors">{title}</h4>
          <motion.a 
            href={link} 
            target="_blank" 
            rel="noopener"
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition-all shrink-0"
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>
        <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 opacity-10">
            <Search size={40} className="text-primary" />
          </div>
          <span className="text-[10px] text-primary uppercase font-black tracking-[0.3em] block mb-2">Key Finding</span>
          <p className="text-sm text-white/80 italic font-mono leading-relaxed">"{finding}"</p>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-primary/60" />
            <span>{stats}</span>
          </div>
          <span className="text-primary/20">Peer_Reviewed</span>
        </div>
      </div>
    </BlueprintCard>
  );
}

function ExperienceTimeline() {
  const exps = [
    { org: "Samsung R&D", role: "PRISM Intern", tech: "Vision Researcher" },
    { org: "DRDO", role: "Research Intern", tech: "Defense R&D" },
    { org: "CMTI", role: "ML Intern", tech: "Govt of India" },
    { org: "Code Crafter", role: "Organizing Core", tech: "ICPC Competition" },
  ];

  return (
    <BlueprintCard className="md:col-span-2" title="System Log" label="EXPERIENCE_HISTORY" delay={0.5}>
      <div className="space-y-4 py-2">
        {exps.map((exp, i) => (
          <div key={i} className="flex items-center justify-between group/line border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center gap-5">
              <span className="text-[10px] font-mono text-primary/30 group-hover/line:text-primary font-bold transition-colors">0{i+1}</span>
              <div>
                <div className="text-sm font-bold text-white group-hover/line:text-primary transition-colors tracking-tight">{exp.org}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono mt-1">{exp.role}</div>
              </div>
            </div>
            <div className="text-[9px] font-mono text-primary/40 uppercase tracking-widest border border-primary/10 px-3 py-1 bg-primary/5 group-hover/line:border-primary/60 group-hover/line:text-primary transition-all">
              {exp.tech}
            </div>
          </div>
        ))}
      </div>
    </BlueprintCard>
  );
}

function KernelModules() {
  const skills = [
    "PyTorch", "CUDA", "HuggingFace", "QLoRA", "GRPO", 
    "Statistics", "GPU Optimization", "LaTeX", "Python >=3.9"
  ];

  return (
    <BlueprintCard className="md:col-span-1" title="Kernel Modules" label="SYS_CAPABILITIES" delay={0.6}>
      <div className="grid grid-cols-2 gap-2 py-2">
        {skills.map((s, i) => (
          <div key={i} className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-2 text-white/50 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all cursor-default text-center uppercase tracking-tighter">
            {s}
          </div>
        ))}
      </div>
    </BlueprintCard>
  );
}

function RLProject() {
  return (
    <BlueprintCard className="md:col-span-2 lg:col-span-1" title="Active Thread" label="IN_PROGRESS" delay={0.7}>
      <div className="py-2">
        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
          <Sparkles size={16} className="text-primary terminal-flicker" />
          Anti-Reward RL
        </h4>
        <p className="text-[11px] text-white/40 font-mono mb-6 leading-relaxed">
          Causal Progress Bonus for coding agents. Prevents gaming of reward signals during training.
        </p>
        <div className="space-y-3">
          <div className="flex justify-between text-[9px] uppercase font-bold text-white/30 tracking-widest">
            <span>Kernel_Training</span>
            <span className="text-primary font-mono">72.4%</span>
          </div>
          <div className="w-full h-[6px] bg-white/5 overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "72.4%" }}
              transition={{ duration: 2.5, delay: 1, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-primary/40 to-primary shadow-[0_0_10px_rgba(255,176,0,0.4)]" 
            />
          </div>
          <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest text-center">
            Epoch 142 / 200 · Qwen2.5-Coder
          </div>
        </div>
      </div>
    </BlueprintCard>
  );
}

function SocialLink({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener"
      whileHover={{ y: -5 }}
      className="wireframe bg-card/20 p-5 flex flex-col items-center justify-center gap-4 hover:bg-primary/10 hover:border-primary transition-all active:scale-[0.95] group"
    >
      <div className="w-12 h-12 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-colors bg-white/5">
        <Icon size={24} className="text-white/20 group-hover:text-primary transition-colors" />
      </div>
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-black group-hover:text-primary transition-colors">{label}</span>
    </motion.a>
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
            {/* Hyper-Technical Overlays */}
            <ScanningLine />
            <div className="scanline" />
            
            {/* Global Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
              style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24 relative z-10">
              {/* Header Metadata: Enhanced */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-primary/20 pb-10 relative"
              >
                <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 to-transparent hidden xl:block" />
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-primary uppercase tracking-[0.5em] mb-4 terminal-flicker">
                    <span className="w-2 h-2 bg-primary animate-pulse" />
                    System Status: Operational // 0.003ms Latency
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    Jeeth Kataria<span className="text-primary/60">.</span>systems
                  </h2>
                </div>
                <div className="flex flex-wrap gap-8 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/30">Location</span>
                    <span>Bangalore // IN</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/30">Protocol</span>
                    <span>TCP/IP_SECURE</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/30">Compiler</span>
                    <span className="text-primary/80 underline decoration-dotted">v20.19.27</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <HeroTerminal />
                <StatsCard />
                <AboutCard />
                
                <ResearchProject 
                  title="CoherenceBench-IN"
                  status="ACL ARR MAY_26"
                  finding="Causal chain reasoning is a capability threshold — sub-7B models perform near chance."
                  stats="584 Instances / 3 Dimensions / Qwen2.5 Eval"
                  link="https://anonymous.4open.science/r/coherencebench-in-0EBB"
                  delay={0.15}
                />
                
                <ResearchProject 
                  title="AlignTax"
                  status="ACL ARR MAY_26"
                  finding="The Epistemic Paradox — Aligned models increase surface hedging while suppressing commitment."
                  stats="17-Feature Taxonomy / 3,000 Matched Pairs"
                  link="https://anonymous.4open.science/r/align-tax-0C8C"
                  delay={0.3}
                />

                <KernelModules />
                <ExperienceTimeline />
                <RLProject />
                <MilestonesCard />

                {/* Social Row: Ultra Modern */}
                <div className="md:col-span-2 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  <SocialLink icon={ExternalLink} label="GitHub" href="https://github.com/jeeth-kataria" />
                  <SocialLink icon={Network} label="LinkedIn" href="https://linkedin.com/in/jeeth-kataria" />
                  <SocialLink icon={HardDrive} label="PyPI" href="https://pypi.org/project/torch-kitsune/" />
                  <SocialLink icon={Rocket} label="Email" href="mailto:jeetbkataria@gmail.com" />
                </div>
              </motion.div>

              {/* System Telemetry Footer */}
              <footer className="mt-32 pt-10 border-t border-white/5 relative">
                <div className="absolute top-0 left-0 w-20 h-[1px] bg-primary" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] font-black italic">
                      &copy; 2026 JEETH_KATARIA_ARCHIVE
                    </p>
                    <p className="text-[9px] text-white/5 leading-relaxed uppercase tracking-widest">
                      All research artifacts and codebases are distributed under the MIT License.
                      Unauthorized OOM errors are strictly prohibited.
                    </p>
                  </div>
                  <div className="hidden md:flex flex-col justify-center items-center gap-2">
                    <div className="w-full max-w-[200px] h-[2px] bg-white/5 relative overflow-hidden">
                      <motion.div 
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 w-1/2 h-full bg-primary/20 blur-[2px]"
                      />
                    </div>
                    <span className="text-[8px] text-primary/20 font-mono uppercase tracking-[0.5em]">Syncing_Telemetry...</span>
                  </div>
                  <div className="flex justify-end items-end gap-10">
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Commit_Hash</div>
                      <div className="text-[10px] font-mono text-primary/40 uppercase">7F2E4A1 // HEAD</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Build_Type</div>
                      <div className="text-[10px] font-mono text-primary/40 uppercase">PROD_STABLE</div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            {/* Decorative Blueprint elements */}
            <div className="fixed top-0 left-10 bottom-0 w-px bg-primary/5 hidden 2xl:block" />
            <div className="fixed top-0 right-10 bottom-0 w-px bg-primary/5 hidden 2xl:block" />
            <div className="fixed top-1/2 left-0 right-0 h-px bg-primary/5 -translate-y-1/2 hidden 2xl:block pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
