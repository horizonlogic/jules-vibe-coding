import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Send, 
  ShieldCheck, 
  Zap, 
  Users, 
  ArrowRight, 
  RefreshCcw,
  AlertCircle,
  BrainCircuit,
  Info,
  Activity,
  Layers
} from 'lucide-react';
import { translateChaos, TranslationResult } from './services/aiService';

function RandomPulse({ className }: { className?: string }) {
  const duration = Math.random() * 2 + 2;
  const delay = Math.random() * 2;
  
  return (
    <motion.div
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.15, 1]
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`w-1.5 h-1.5 rounded-full bg-indigo-400 ${className}`}
    />
  );
}

function GuidanceGrid() {
  return (
    <div className="grid grid-cols-2 gap-12 mt-10 max-w-lg mx-auto border-t border-white/5 pt-10">
      <div className="text-center">
        <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400/40 mb-2">Philosophy</h5>
        <p className="text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase">The Unspoken</p>
      </div>
      <div className="text-center border-l border-white/5">
        <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400/40 mb-2">Focus</h5>
        <p className="text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase">Contextual Clarity</p>
      </div>
    </div>
  );
}

function LogicRail() {
  const indicators = [
    { label: "Decoding Static", color: "bg-indigo-400" },
    { label: "Mood Mapping", color: "bg-violet-400" },
    { label: "Ground Truth", color: "bg-cyan-400" }
  ];

  return (
    <div className="hidden lg:flex flex-col gap-12 py-12 pr-10 border-r border-white/5">
      {indicators.map((indicator, i) => (
        <div key={i} className="flex flex-col items-center gap-4 group">
          <div className="relative w-1.5 h-12 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ 
                height: ["15%", "85%", "25%", "65%", "15%"],
                opacity: [0.4, 0.9, 0.5, 0.8, 0.4]
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.7
              }}
              className={`absolute top-0 left-0 w-full ${indicator.color} blur-[1.5px] logic-indicator-flicker`}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className={`w-1 h-1 rounded-full ${indicator.color}`}
            />
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20 writing-vertical-rl group-hover:text-white transition-colors duration-500">
              {indicator.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SignalLogo() {
  return (
    <div className="relative inline-flex flex-col items-center justify-center mb-8 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center w-full"
      >
        <div className="inline-flex items-center gap-3 mb-8 px-6 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-violet-400/80 antialiased italic">[Context Mode: Listening]</span>
        </div>
        
        <h1 className="text-8xl md:text-11xl font-light tracking-tighter text-white mb-8 text-glow leading-none">
          Signal <span className="serif-italic font-normal text-indigo-100 tracking-normal text-glow-indigo">Layer</span>
        </h1>

        <GuidanceGrid />
      </motion.div>
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Guided Discovery: Ghost Templates
  const ghostTemplates = [
    "What is the actual risk in this budget memo?",
    "What do I actually need to do after this Slack thread?",
    "Is this timeline realistic or just optimistic?"
  ];
  const [ghostIndex, setGhostIndex] = useState(0);

  useEffect(() => {
    if (input.length > 0) return;
    const interval = setInterval(() => {
      setGhostIndex((prev) => (prev + 1) % ghostTemplates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [input.length]);

  // Guided Discovery: Intelligence Pulse
  const loadingStatuses = [
    "Reading between the lines...",
    "Finding the actual cost of entry...",
    "Sifting through corporate static...",
    "Locating the ground truth...",
    "Decoding the 'vision'...",
    "Distilling the signal..."
  ];
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setStatusIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % loadingStatuses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoading, loadingStatuses.length]);

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await translateChaos(input);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'The bureaucratic signal has been lost.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAmbiguityColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Moderate': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Executive': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any
      } 
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30 selection:text-white pb-20">
      {/* Dynamic Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Jules Glow: Top-right deep lavender light leak */}
        <motion.div 
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[1200px] h-[1200px] bg-[#2D1B4E] blur-[180px] rounded-full" 
        />
        
        {/* Ambient Bloom Layers */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] ambient-glow-lavender blur-[160px] opacity-25" />
        <div className="absolute bottom-[-10%] right-[10%] w-[60%] h-[60%] bg-indigo-500/15 blur-[130px] opacity-20" />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-violet-500/10 blur-[150px] opacity-15" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-500/10 blur-[140px] opacity-10" />
        <div className="absolute top-[60%] right-[10%] w-[20%] h-[20%] bg-amber-500/5 blur-[120px] opacity-5" />
        
        {/* Central Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[180px] rounded-full" />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Signal Layer Brand */}
        <motion.header 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="mb-12 text-center"
        >
          <SignalLogo />
          
          <p className="text-xl text-slate-300 max-w-xl mx-auto serif-italic font-light leading-relaxed">
            Decoding the unsaid. Finding the signal beneath the noise.
          </p>
        </motion.header>

        {/* Intelligence Input Area */}
        <section className="mb-16">
          <motion.div 
            initial={{ scale: 0.98, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="flex gap-8 group"
          >
            <LogicRail />

            <div className="flex-1">
              <div className="border-beam-container relative edge-light rounded-[40px] overflow-hidden glass-panel shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                <div className="border-beam" />
                
                {/* Ghost Templates */}
                <AnimatePresence>
                  {input.length === 0 && (
                    <motion.div
                      key={ghostIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.4, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 1 }}
                      className="absolute top-12 left-12 pointer-events-none text-2xl font-normal serif-italic text-white flex flex-col gap-4 italic"
                    >
                      <p>e.g., "{ghostTemplates[ghostIndex]}"</p>
                      <p className="text-lg opacity-70">Paste that cryptic update everyone is talking about...</p>
                      <p className="text-lg opacity-50">Decode the underlying mood of this announcement...</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <textarea
                  id="signal-input"
                  value={input}
                  readOnly={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder=""
                  className="w-full h-80 px-12 py-12 obsidian-well outline-none transition-all jules-glow-interactive
                           text-2xl font-normal text-white leading-relaxed placeholder:text-white/40 
                           focus:bg-black/60 rounded-[40px]"
                />
                
                {/* Internal Status Footer */}
                <div className="absolute bottom-10 left-12 flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,1)] animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Status: Reading the room</span>
                </div>

                {/* Scanning Animation */}
                {isLoading && <div className="scanning-line" />}

                <div className="absolute bottom-8 right-10 flex items-center gap-6">
                  <AnimatePresence>
                    {result && !isLoading && (
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => { setResult(null); setInput(''); }}
                        className="p-3 text-white/20 hover:text-white/60 transition-all hover:scale-110 active:scale-95 jules-glow-interactive rounded-xl"
                        title="Clear Context"
                      >
                        <RefreshCcw className="w-5 h-5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  
                  <button
                    id="decipher-btn"
                    disabled={isLoading || !input.trim()}
                    onClick={handleTranslate}
                    className={`group relative h-16 px-12 rounded-2xl font-bold transition-all duration-700 overflow-hidden jules-glow-interactive tracking-[0.2em] uppercase text-[11px]
                              ${isLoading || !input.trim() 
                                ? 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5' 
                                : 'cta-button-active text-white border border-white/20'}`}
                  >
                    {!isLoading && input.trim() && <div className="pulse-ring" />}
                    <div className="relative z-10 flex items-center gap-4">
                      {isLoading ? (
                        <div className="flex items-center gap-4">
                           <RefreshCcw className="w-4 h-4 animate-spin opacity-50" />
                           <span className="text-[10px] tracking-[0.4em] opacity-50">Decoding...</span>
                        </div>
                      ) : (
                        <>
                          <BrainCircuit className={`w-4 h-4 transition-transform duration-700 ${input.trim() ? 'group-hover:rotate-12' : ''}`} />
                          <span>FIND THE SIGNAL</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* System Error Notification */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="mb-12 p-8 glass-card border-rose-500/20 flex items-center gap-5 text-rose-300"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="text-sm font-medium tracking-wide italic serif-italic">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intelligence Synthesis Output */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
              className="pt-12"
            >
              <div className="relative glass-panel p-12 md:p-20 rounded-[48px] edge-light flex flex-col items-center justify-center text-center overflow-hidden min-h-[400px] executive-briefing-card">
                <div className="absolute inset-0 signal-wave opacity-50" />
                <div className="absolute inset-0 surface-glow-animate bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />
                
                <div className="relative z-10 flex flex-col items-center gap-12">
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-indigo-500/20 blur-[40px] rounded-full"
                    />
                    <div className="relative p-6 rounded-3xl glass-panel border-indigo-500/30">
                      <BrainCircuit className="w-10 h-10 text-indigo-400 pulse-dot" />
                    </div>
                  </div>
          
                  <div className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={statusIndex}
                        initial={{ opacity: 0, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(8px)' }}
                        transition={{ duration: 0.8 }}
                        className="text-xl md:text-2xl font-light text-white italic serif-italic tracking-wide"
                      >
                        {loadingStatuses[statusIndex]}
                      </motion.p>
                    </AnimatePresence>
                    
                    <div className="flex justify-center gap-3">
                       {[...Array(3)].map((_, i) => (
                         <motion.div 
                           key={i}
                           animate={{ opacity: [0.2, 1, 0.2] }}
                           transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                           className="w-1 h-1 rounded-full bg-indigo-400"
                         />
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : result && (
            <motion.div
              key="result"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="h-[1px] flex-1 bg-white/5" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/20 antialiased italic">Strategic Resolution</h2>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              {/* Tier 1: Primary Interpretation - The Central Briefing */}
              <motion.div 
                variants={itemVariants} 
                className="relative glass-panel p-8 md:p-14 rounded-[48px] edge-light group overflow-hidden shadow-2xl executive-briefing-card"
              >
                <div className="absolute top-8 right-12 px-5 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 shadow-[0_0_20px_rgba(168,85,247,0.3)] text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400">
                  [Signal Found]
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-700 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-indigo-300/80 text-glow-indigo">The Ground Reality</h3>
                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/40 mt-1">What it actually means</p>
                  </div>
                </div>
                <p className="text-3xl md:text-5xl font-extralight text-white leading-tight tracking-tight text-glow antialiased max-w-3xl">
                  {result.whatTheyAreActuallySaying}
                </p>
              </motion.div>

              {/* Tier 2: Secondary Operational Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Involvement Module - Modular tags */}
                <motion.div variants={itemVariants} className="relative glass-card p-10 rounded-[40px] edge-light group overflow-hidden executive-briefing-card">
                  <div className="absolute top-6 right-8 px-3.5 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                    [Context]
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 italic">Who's actually doing the work</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {result.likelyImpactedTeams.map((team, i) => (
                      <span 
                        key={i} 
                        className="px-5 py-2.5 rounded-xl glass-panel border border-white/5 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 hover:text-white hover:border-indigo-500/30 transition-all cursor-default group/tag"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 mr-2.5 opacity-40 group-hover/tag:opacity-100" />
                        {team}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Actionable Directives Module */}
                <motion.div variants={itemVariants} className="relative glass-card p-10 rounded-[40px] edge-light group overflow-hidden executive-briefing-card">
                  <div className="absolute top-6 right-8 px-3.5 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                    [Directives]
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 italic">Actual Next Steps</h3>
                  </div>
                  <ul className="space-y-4">
                    {result.suggestedActionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 group/item">
                        <div className="mt-1 w-4 h-4 rounded glass-panel border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-cyan-400/40 transition-all">
                          <ArrowRight className="w-2 h-2 text-white/20 group-hover/item:text-cyan-400 transition-colors" />
                        </div>
                        <span className="text-xs text-slate-300 leading-relaxed font-light group-hover/item:text-indigo-100 transition-colors antialiased max-w-[90%]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Tier 3: Utility Intelligence Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Ambiguity Level Module */}
                <motion.div variants={itemVariants} className="relative glass-card p-8 rounded-[32px] edge-light flex items-center gap-8 group overflow-hidden executive-briefing-card">
                  <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 mb-3">Turbulence</h3>
                    <div className="flex items-center gap-6">
                       <div className={`px-5 py-2 rounded-lg border text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 ${getAmbiguityColor(result.ambiguityLevel)}`}>
                        {result.ambiguityLevel}
                      </div>
                      <div className="flex-1 h-[1px] bg-white/5 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Unspoken Reality Card - Compact for Row */}
                <motion.div variants={itemVariants} className="relative glass-card p-8 rounded-[32px] edge-light group overflow-hidden executive-briefing-card bg-orange-500/[0.01]">
                  <div className="absolute top-6 right-8 px-3.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[9px] font-bold uppercase tracking-[0.3em] text-orange-400/60">
                    [The Truth]
                  </div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 mb-4 antialiased">The Subtext</h4>
                    <p className="text-xl font-light text-orange-50/80 leading-snug serif-italic tracking-tight text-glow-amber max-w-sm">
                      "{result.unspokenReality}"
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Footer */}
        <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-white/20">
          <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-all duration-700">
             <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center border-white/5 group">
               <Building2 className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/80 mb-1">Signal Layer v1.0</span>
               <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/20">Restoring Common Sense</span>
             </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-10 text-[9px] font-bold uppercase tracking-[0.4em]">
             {['Data Safety', 'Privacy', 'How it works'].map((link) => (
               <span key={link} className="hover:text-indigo-400 transition-colors cursor-pointer border-b border-transparent hover:border-indigo-400/30 pb-1 jules-glow-interactive px-2 py-1 rounded-sm">
                 {link}
               </span>
             ))}
          </nav>
        </footer>
      </div>
    </div>
  );
}
