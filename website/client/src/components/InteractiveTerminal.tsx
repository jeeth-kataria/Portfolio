import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Check, Copy } from "lucide-react";

interface TerminalLine {
  type: "input" | "output";
  content: string | React.ReactNode;
}

const COMMANDS = {
  help: "Available commands: help, whoami, ls, clear, pip install torch-kitsune",
  whoami: "Jeeth Kataria - Systems Engineer & ML Researcher. Specializing in high-performance AI infrastructure and GPU memory optimization.",
  ls: "research_projects/  software/  experience/  artifacts/",
  "ls projects": "CoherenceBench-IN, AlignTax, Anti-Reward RL",
  clear: "CLEAR",
  "pip install torch-kitsune": "BOOT_ANIMATION",
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "KITSUNE_OS v0.7.0 initialized. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: "input", content: cmd }];

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedCmd === "pip install torch-kitsune") {
      setIsBooting(true);
      setTimeout(() => setIsBooting(false), 2000);
      newHistory.push({ type: "output", content: "Installing torch-kitsune... [OK]" });
      newHistory.push({ type: "output", content: "Memory optimizer successfully integrated." });
    } else if (trimmedCmd in COMMANDS) {
      newHistory.push({ type: "output", content: COMMANDS[trimmedCmd as keyof typeof COMMANDS] });
    } else if (trimmedCmd !== "") {
      newHistory.push({ type: "output", content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.` });
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div 
      className="h-full flex flex-col font-mono text-sm md:text-base relative group"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 mb-4 text-primary/60 border-b border-primary/10 pb-2">
        <Terminal size={14} />
        <span className="text-[9px] md:text-[10px] tracking-widest uppercase">kitsune_terminal --session=active</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-primary/20 pr-2"
        style={{ maxHeight: "250px" }}
      >
        <AnimatePresence>
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-2 ${line.type === "input" ? "text-primary" : "text-white/70"}`}
            >
              {line.type === "input" && <span className="opacity-50">$</span>}
              <div className="whitespace-pre-wrap">{line.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isBooting && (
          <motion.div 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-primary font-bold"
          >
            &gt; SYSTEM_BOOTING_CORE_SYNC...
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-primary/10 pt-4">
        <span className="text-primary font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-primary caret-primary font-mono"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-primary/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
