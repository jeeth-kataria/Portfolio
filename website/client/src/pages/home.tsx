import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Brain,
  Cpu,
  Waves,
  Terminal,
  Zap,
  Shield,
  Eye,
  Factory,
  GraduationCap,
  Sparkles,
  Briefcase,
} from "lucide-react";
import {
  SiPython,
  SiCplusplus,
  SiPytorch,
  SiNvidia,
  SiNextdotjs,
  SiDocker,
  SiTensorflow,
  SiGit,
  SiLinux,
  SiRust,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const LIME = "#D2FF00";
const LIME_RGB = "210,255,0";

function GlowCard({
  children,
  className = "",
  glowColor = `rgba(${LIME_RGB},0.06)`,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const background = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
  );

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      variants={item}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111112] transition-colors duration-300 hover:border-white/[0.12] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

function HeroCard() {
  return (
    <GlowCard
      className="md:col-span-2 lg:col-span-3 row-span-1 min-h-[340px] md:min-h-[400px]"
      glowColor={`rgba(${LIME_RGB},0.05)`}
    >
      <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              `radial-gradient(ellipse 80% 60% at 70% 0%, rgba(${LIME_RGB},0.06), transparent), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(${LIME_RGB},0.03), transparent)`,
          }}
        />

        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="white" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative flex items-center justify-between flex-wrap gap-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" style={{ color: `${LIME}99` }} />
            <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: `${LIME}99` }}>
              portfolio.exe
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-center gap-1.5"
          >
            <span className="h-2 w-2 rounded-full animate-pulse-glow" style={{ backgroundColor: LIME }} />
            <span className="font-mono text-[11px] text-white/30">open to opportunities</span>
          </motion.div>
        </div>

        <div className="relative flex flex-col gap-5 mt-auto">
          <div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95] text-white"
              data-testid="text-hero-headline"
            >
              I build
              <br />
              high-performance
              <br />
              <span style={{ color: LIME }}>
                AI systems.
              </span>
            </h1>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <p className="text-base md:text-lg text-white/40 max-w-sm leading-relaxed" data-testid="text-hero-subtitle">
              Jeeth Bhavesh Kataria
              <br />
              <span className="text-white/25">Researcher & Systems Engineer</span>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/jeeth-kataria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white/50 transition-all duration-200 hover:text-white/80"
                style={{ borderColor: undefined }}
                data-testid="link-hero-github"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href="mailto:jeetbkataria@gmail.com"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: LIME }}
                data-testid="link-hero-email"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function StatsCard() {
  return (
    <GlowCard className="lg:col-span-1 min-h-[200px]" glowColor={`rgba(${LIME_RGB},0.04)`}>
      <div className="p-6 md:p-7 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
            <Brain className="w-3.5 h-3.5" style={{ color: LIME }} />
          </div>
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">competitive</span>
        </div>
        <div className="space-y-5 mt-auto">
          <div>
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest mb-1.5">JEE Mains '23</p>
            <div className="flex items-baseline gap-1" data-testid="text-jee-score">
              <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">97.98</span>
              <span className="text-sm font-mono" style={{ color: LIME }}>%ile</span>
            </div>
            <p className="text-[10px] text-white/15 font-mono mt-1">AIR 23,000</p>
          </div>
          <div className="h-px bg-white/[0.04]" />
          <div>
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest mb-1.5">NEET '23</p>
            <p className="text-lg font-bold text-white font-mono" data-testid="text-neet-rank">
              AIR <span style={{ color: LIME }}>32k</span>
            </p>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function ProjectCard() {
  return (
    <GlowCard className="md:col-span-2 min-h-[200px]" glowColor={`rgba(${LIME_RGB},0.05)`}>
      <div className="p-6 md:p-7 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-[10px] font-mono" style={{ borderColor: `rgba(${LIME_RGB},0.2)`, color: LIME, backgroundColor: `rgba(${LIME_RGB},0.05)` }}>
              v0.3.0
            </Badge>
            <Badge variant="outline" className="border-white/[0.06] text-white/30 text-[10px] font-mono">
              PyPI
            </Badge>
            <Badge variant="outline" className="border-white/[0.06] text-white/30 text-[10px] font-mono">
              CUDA
            </Badge>
          </div>
          <a
            href="https://pypi.org/project/torch-kitsune/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-white/20 transition-colors font-mono"
            data-testid="link-pypi"
          >
            pypi.org <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
              <Cpu className="w-4 h-4" style={{ color: LIME }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight" data-testid="text-project-title">
              torch-kitsune
            </h2>
          </div>
          <p className="text-sm text-white/35 leading-relaxed max-w-xl">
            CUDA-accelerated dataflow scheduler for PyTorch. Optimizes memory allocation and reduces computational overhead for large-scale training pipelines.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: LIME }}>
            <rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" strokeWidth="0.3" rx="4" />
            <line x1="5" y1="35" x2="95" y2="35" stroke="currentColor" strokeWidth="0.2" />
            <line x1="5" y1="65" x2="95" y2="65" stroke="currentColor" strokeWidth="0.2" />
            <line x1="35" y1="5" x2="35" y2="95" stroke="currentColor" strokeWidth="0.2" />
            <line x1="65" y1="5" x2="65" y2="95" stroke="currentColor" strokeWidth="0.2" />
            <circle cx="35" cy="35" r="2" fill="currentColor" />
            <circle cx="65" cy="65" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </GlowCard>
  );
}

function StackCard() {
  const techStack = [
    { icon: SiPython, label: "Python", color: "#3776AB" },
    { icon: SiCplusplus, label: "C++", color: "#00599C" },
    { icon: SiPytorch, label: "PyTorch", color: "#EE4C2C" },
    { icon: SiNvidia, label: "CUDA", color: "#76B900" },
    { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
    { icon: SiDocker, label: "Docker", color: "#2496ED" },
    { icon: SiTensorflow, label: "TensorFlow", color: "#FF6F00" },
    { icon: SiGit, label: "Git", color: "#F05032" },
    { icon: SiLinux, label: "Linux", color: "#FCC624" },
    { icon: SiRust, label: "Rust", color: "#CE422B" },
  ];

  const duplicated = [...techStack, ...techStack];

  return (
    <GlowCard className="md:col-span-1 lg:col-span-2 min-h-[160px]" glowColor={`rgba(${LIME_RGB},0.04)`}>
      <div className="p-6 md:p-7 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
            <Zap className="w-3.5 h-3.5" style={{ color: LIME }} />
          </div>
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">tech stack</span>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#111112] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#111112] to-transparent z-10" />
          <div className="flex gap-5 animate-marquee w-max">
            {duplicated.map((tech, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 shrink-0"
                data-testid={`icon-tech-${tech.label.toLowerCase().replace('.', '')}-${i}`}
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.04] transition-colors duration-200">
                  <tech.icon className="w-5 h-5" style={{ color: tech.color }} />
                </div>
                <span className="text-[9px] font-mono text-white/20">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function LocationCard() {
  return (
    <GlowCard className="min-h-[160px]" glowColor={`rgba(${LIME_RGB},0.04)`}>
      <div className="p-6 md:p-7 flex flex-col justify-between h-full relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: LIME }} />
          </div>
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">location</span>
        </div>
        <div className="mt-auto">
          <p className="text-lg font-semibold text-white" data-testid="text-location">Bengaluru</p>
          <p className="text-sm text-white/30">India</p>
          <p className="text-[10px] text-white/10 font-mono mt-2">12.97&#176;N, 77.59&#176;E</p>
        </div>
        <div className="absolute top-6 right-6 w-16 h-16 opacity-[0.08]">
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: LIME }}>
            <circle cx="50" cy="50" r="4" fill="currentColor" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
          </svg>
        </div>
      </div>
    </GlowCard>
  );
}

function EducationCard() {
  return (
    <GlowCard className="min-h-[160px]" glowColor={`rgba(${LIME_RGB},0.04)`}>
      <div className="p-6 md:p-7 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
            <GraduationCap className="w-3.5 h-3.5" style={{ color: LIME }} />
          </div>
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">education</span>
        </div>
        <div className="mt-auto">
          <p className="text-base font-semibold text-white" data-testid="text-education">Ramaiah Institute of Technology</p>
          <p className="text-sm text-white/40 mt-1">Bachelor of Engineering</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: LIME }} />
            <span className="text-[10px] font-mono text-white/20">Currently pursuing</span>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function TrajectoryCard() {
  const milestones = [
    { year: "2023", label: "JEE Mains - 97.98%ile", highlight: true },
    { year: "2023", label: "NEET - AIR 32k", highlight: false },
    { year: "2024", label: "DRDO - Defense Research Intern", highlight: true },
    { year: "2024", label: "Samsung PRISM - Vision Researcher", highlight: true },
    { year: "2024", label: "Metastart - AI Intern", highlight: true },
    { year: "2025", label: "CMTI (Govt) - ML Intern", highlight: false },
    { year: "2025", label: "torch-kitsune v0.3.0 - PyPI Release", highlight: true },
  ];

  return (
    <GlowCard className="md:col-span-2 min-h-[240px]" glowColor={`rgba(${LIME_RGB},0.04)`}>
      <div className="p-6 md:p-7" data-testid="card-trajectory">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: LIME }} />
          </div>
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">trajectory</span>
        </div>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-4" data-testid={`row-trajectory-${i}`}>
              <span className="font-mono text-[11px] w-10 shrink-0" style={{ color: m.highlight ? `${LIME}99` : "rgba(255,255,255,0.2)" }}>{m.year}</span>
              <div className="flex-1 h-px bg-white/[0.04]" />
              <span className={`text-sm ${m.highlight ? "text-white/70" : "text-white/30"}`}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

function ExperienceCard() {
  const experiences = [
    {
      org: "DRDO",
      sub: "Defense R&D Organization",
      role: "Research Intern",
      icon: Shield,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)",
    },
    {
      org: "Samsung Vision",
      sub: "PRISM Program",
      role: "Vision Researcher",
      icon: Eye,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.1)",
    },
    {
      org: "Metastart",
      sub: "AI Startup",
      role: "AI Intern - 3rd Sem",
      icon: Sparkles,
      color: LIME,
      bg: `rgba(${LIME_RGB},0.1)`,
    },
    {
      org: "CMTI",
      sub: "Govt. of India",
      role: "ML Intern",
      icon: Factory,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.1)",
    },
  ];

  return (
    <GlowCard
      className="md:col-span-2 lg:col-span-4 min-h-[280px]"
      glowColor={`rgba(${LIME_RGB},0.06)`}
    >
      <div className="p-6 md:p-8 relative">
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(${LIME_RGB},0.03) 0%, transparent 50%)`,
          }}
        />

        <div className="relative flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.12)` }}>
            <Briefcase className="w-4 h-4" style={{ color: LIME }} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight" data-testid="text-experience-heading">
              Research & Experience
            </h2>
            <p className="text-[11px] text-white/25 font-mono mt-0.5">Defense, AI, Computer Vision & Manufacturing</p>
          </div>
          <Badge
            variant="outline"
            className="ml-auto text-[10px] font-mono hidden sm:inline-flex"
            style={{ borderColor: `rgba(${LIME_RGB},0.2)`, color: LIME, backgroundColor: `rgba(${LIME_RGB},0.05)` }}
          >
            {experiences.length} roles
          </Badge>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-4 px-5 rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-200 hover:bg-white/[0.04] hover:border-white/[0.08] cursor-default"
              data-testid={`row-experience-${i}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: exp.bg }}>
                <exp.icon className="w-5 h-5" style={{ color: exp.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{exp.org}</p>
                <p className="text-[11px] text-white/25 font-mono">{exp.sub}</p>
              </div>
              <Badge variant="outline" className="border-white/[0.06] text-white/40 text-[9px] font-mono shrink-0 hidden sm:inline-flex">
                {exp.role}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

function MarineCard() {
  return (
    <GlowCard className="md:col-span-2 min-h-[200px]" glowColor={`rgba(${LIME_RGB},0.04)`}>
      <div className="p-6 md:p-7 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.1)` }}>
              <Waves className="w-3.5 h-3.5" style={{ color: LIME }} />
            </div>
            <Badge variant="outline" className="text-[10px] font-mono" style={{ borderColor: `rgba(${LIME_RGB},0.15)`, color: `${LIME}cc`, backgroundColor: `rgba(${LIME_RGB},0.05)` }}>
              SIH Project
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mb-2" data-testid="text-marine-title">
            Marine Intelligence
          </h3>
          <p className="text-sm text-white/30 leading-relaxed max-w-lg">
            Multi-Agent Reinforcement Learning system for real-time ocean anomaly detection. Processes satellite imagery and AIS data for maritime security.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-60 h-24 opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 240 80" className="w-full h-full" style={{ color: LIME }}>
            <path d="M0,40 Q30,20 60,40 T120,40 T180,40 T240,40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0,50 Q30,30 60,50 T120,50 T180,50 T240,50" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0,60 Q30,40 60,60 T120,60 T180,60 T240,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </GlowCard>
  );
}

function SocialLink({
  icon: Icon,
  label,
  href,
}: {
  icon: typeof Github;
  label: string;
  href: string;
}) {
  return (
    <GlowCard className="min-h-[100px]" glowColor="rgba(255,255,255,0.03)">
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        className="p-6 flex flex-col items-center justify-center gap-2.5 h-full"
        data-testid={`link-social-${label.toLowerCase()}`}
      >
        <Icon className="w-6 h-6 text-white/30 transition-colors duration-200 group-hover:text-white/60" />
        <span className="font-mono text-[10px] text-white/15 uppercase tracking-widest">{label}</span>
      </a>
    </GlowCard>
  );
}

function ContactCard() {
  return (
    <motion.a
      href="mailto:jeetbkataria@gmail.com"
      variants={item}
      className="group relative overflow-hidden rounded-2xl min-h-[100px] flex items-center justify-center gap-3 md:col-span-2 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, rgba(${LIME_RGB},0.08), rgba(${LIME_RGB},0.04))`,
        border: `1px solid rgba(${LIME_RGB},0.12)`,
      }}
      data-testid="link-email"
    >
      <div className="flex items-center gap-3 p-6">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `rgba(${LIME_RGB},0.15)` }}>
          <Mail className="w-4 h-4" style={{ color: LIME }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: LIME }}>Get in touch</p>
          <p className="text-[10px] font-mono text-white/20">jeetbkataria@gmail.com</p>
        </div>
        <ArrowUpRight className="w-4 h-4 ml-2" style={{ color: `${LIME}66` }} />
      </div>
    </motion.a>
  );
}

function FloatingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-black/60 backdrop-blur-2xl px-1.5 py-1"
      data-testid="nav-floating"
    >
      {[
        { label: "GitHub", href: "https://github.com/jeeth-kataria", icon: Github },
        { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
        { label: "Email", href: "mailto:jeetbkataria@gmail.com", icon: Mail },
      ].map((navItem) => (
        <a
          key={navItem.label}
          href={navItem.href}
          target={navItem.href.startsWith("mailto") ? undefined : "_blank"}
          rel={navItem.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          className="p-2 rounded-full text-white/25 transition-colors duration-200 hover:text-white/70"
          data-testid={`nav-link-${navItem.label.toLowerCase()}`}
        >
          <navItem.icon className="w-4 h-4" />
        </a>
      ))}
    </motion.nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <FloatingNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          <HeroCard />
          <StatsCard />

          <ProjectCard />
          <StackCard />

          <LocationCard />
          <EducationCard />
          <TrajectoryCard />

          <ExperienceCard />

          <MarineCard />

          <SocialLink icon={Github} label="GitHub" href="https://github.com/jeeth-kataria" />
          <SocialLink icon={Linkedin} label="LinkedIn" href="https://linkedin.com" />
          <ContactCard />
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-[10px] text-white/10 tracking-widest uppercase">
            Jeeth Bhavesh Kataria &mdash; 2025
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
