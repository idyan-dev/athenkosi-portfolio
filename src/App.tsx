import React, { useState, useEffect, useRef } from "react";
import {
  Dna,
  Microscope,
  Award,
  BookOpen,
  Terminal,
  Calculator,
  Compass,
  FileText,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Send,
  Loader2,
  Moon,
  Sun,
  Download,
  ExternalLink,
  MessageSquare,
  Filter,
  ArrowUpRight,
  Beaker,
  Brain,
  X,
  Database,
  Briefcase,
  Layers,
  Fingerprint,
  Workflow,
  Check,
  Menu,
  Activity,
  Globe,
  GraduationCap
} from "lucide-react";

import {
  SKILL_CATEGORIES,
  EDUCATION_TIMELINE,
  PRACTICALS_DATA,
  KNOWLEDGE_HUB_CATEGORIES,
  RESEARCH_INTERESTS,
  CAREER_ROADMAP,
  CERTIFICATIONS_ACHIEVEMENTS,
  PROJECT_SHOWCASE_DATA,
  BLOG_POSTS
} from "./data";
import { PracticalItem, CourseCard, BlogPost, ProjectShowcase } from "./types";
import ScientificCalculator from "./components/ScientificCalculator";

export default function App() {
  // Navigation & System States
  const [activeSection, setActiveSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal State for Laboratory Practicals
  const [selectedPractical, setSelectedPractical] = useState<PracticalItem | null>(null);

  // State for expanding/collapsing educational modules
  const [expandedCourse, setExpandedCourse] = useState<string | null>("MCB3");

  // State for active category filters
  const [skillsFilter, setSkillsFilter] = useState<string>("All");
  const [projectFilter, setProjectFilter] = useState<string>("All");

  // Blog states
  const [activeBlogId, setActiveBlogId] = useState<string>("blog-1");

  // CV PDF mockup viewer state
  const [cvViewerOpen, setCvViewerOpen] = useState(false);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! I am Athenkosi's Portfolio AI Assistant, trained on his Diploma in Biotechnology background at UJ. Ask me about his practical lab techniques, core coursework, South African language fluency, or availability for WIL!"
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("WIL Opportunities / Lab Internship Placement");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Typing effect variables
  const typingTitles = [
    "Biotechnology Student",
    "Future Research Scientist",
    "Laboratory Specialist",
    "Molecular Biology Enthusiast",
    "Microbiology Researcher",
    "University of Johannesburg Talent"
  ];
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // State for dynamic interactive DNA Base Pair constructor
  const [userDNAChain, setUserDNAChain] = useState<string[]>(["A", "T", "C", "G", "C", "A"]);
  const [complements, setComplements] = useState<string[]>(["T", "A", "G", "C", "G", "T"]);
  const [dnaBuilderScore, setDnaBuilderScore] = useState(100);

  // Typing effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = typingTitles[typingIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, typedText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, typedText.length + 1));
      }, 100);
    }

    if (!isDeleting && typedText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % typingTitles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typingIndex]);

  // Handle dark mode side effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  // DNA interactive builder
  const handleAddNewBase = (base: string) => {
    if (userDNAChain.length >= 10) {
      // Rotate out oldest
      const newChain = [...userDNAChain.slice(1), base];
      setUserDNAChain(newChain);
      const pairing: Record<string, string> = { A: "T", T: "A", C: "G", G: "C" };
      setComplements(newChain.map(b => pairing[b]));
    } else {
      const newChain = [...userDNAChain, base];
      setUserDNAChain(newChain);
      const pairing: Record<string, string> = { A: "T", T: "A", C: "G", G: "C" };
      setComplements(newChain.map(b => pairing[b]));
    }
    setDnaBuilderScore(prev => Math.min(prev + 10, 100));
  };

  const handleClearBase = () => {
    setUserDNAChain([]);
    setComplements([]);
  };

  // Submit contact form (local demo persistence)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4000);
  };

  // Post questions to backend Gemini API
  const handleSendChatMessage = async (presetText?: string) => {
    const messageToSend = presetText || chatInput;
    if (!messageToSend.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: messageToSend }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: messageToSend }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
      } else {
        throw new Error("Failed to receive corporate response.");
      }
    } catch (error) {
      console.error(error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I encountered an integration issue. However, Athenkosi is readily available to reply personally! Please reach out directly to his verified email address: athenkosimkumbuzi02@gmail.com, or phone him at 067 224 0761."
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Map icons helper based on data keys
  const getIconComponent = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case "Dna": return <Dna className={className} />;
      case "Microscope": return <Microscope className={className} />;
      case "Beaker": return <Beaker className={className} />;
      case "BarChart3": return <Activity className={className} />;
      case "FlameKindling": return <Activity className={className} />;
      case "ShieldAlert": return <ShieldCheck className={className} />;
      case "Binary": return <Layers className={className} />;
      case "Grid": return <Layers className={className} />;
      case "Thermometer": return <Calculator className={className} />;
      case "Atom": return <Dna className={className} />;
      case "GlassWater": return <Beaker className={className} />;
      case "Workflow": return <Workflow className={className} />;
      case "Utensils": return <Check className={className} />;
      case "GraduationCap": return <GraduationCap className={className} />;
      case "SearchCode": return <Microscope className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Compass": return <Compass className={className} />;
      case "Cpu": return <Brain className={className} />;
      case "Award": return <Award className={className} />;
      case "Activity": return <Activity className={className} />;
      case "Fingerprint": return <Fingerprint className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Preset prompts for recruiters to quickly ask
  const presetPrompts = [
    { label: "Is Athenkosi seeking placements?", text: "Is Athenkosi currently available for Work Integrated Learning (WIL) or internships?" },
    { label: "What are his Lab experience skills?", text: "Can you summarize Athenkosi's genetics, molecular biology, and microbiology lab skills?" },
    { label: "What languages does he speak?", text: "What official languages does Athenkosi speak fluently, and where is he based?" },
    { label: "Tell me about his UJ modules.", text: "What academic modules has Athenkosi completed at the University of Johannesburg?" }
  ];

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50 flex flex-col transition-colors duration-200">
      
      {/* Header Navigation - Premium Modern Corporate Biotech branding */}
      <nav id="header-navbar" className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              {/* Animated Bio-Badge */}
              <div className="w-10 h-10 bg-[#001F3F] dark:bg-emerald-950/50 flex items-center justify-center rounded-lg border border-emerald-500/20 shadow-md">
                <Dna className="h-6 w-6 text-[#2ECC71] animate-pulse-soft" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold tracking-tighter text-[#001F3F] dark:text-white text-lg sm:text-2xl">
                  AMM <span className="text-[#2ECC71]">BIOTECH</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#2ECC71] dark:text-emerald-400 font-semibold uppercase">
                  Future Biotechnologist
                </span>
              </div>
            </div>

            {/* Desktop Navigation Link Menu */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-[#001F3F] dark:hover:text-[#2ECC71] transition-colors py-2 border-b-2 border-transparent hover:border-[#2ECC71]">About</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-[#001F3F] dark:hover:text-[#2ECC71] transition-colors py-2 border-b-2 border-transparent hover:border-[#2ECC71]">Skills</a>
              <a href="#research" className="text-slate-600 dark:text-slate-300 hover:text-[#001F3F] dark:hover:text-[#2ECC71] transition-colors py-2 border-b-2 border-transparent hover:border-[#2ECC71]">Interests</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-[#001F3F] dark:hover:text-[#2ECC71] transition-colors py-2 border-b-2 border-transparent hover:border-[#2ECC71]">Contact</a>
            </div>

            {/* Quick Action Bar (Theme, Mobil trigger, WIL Availability Indicator) */}
            <div className="flex items-center gap-4">
              <span className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-[#2ECC71] text-[10px] font-bold tracking-widest uppercase border border-emerald-250/30 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] animate-ping"></span>
                Seeking Placement (WIL)
              </span>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                title="Toggle Mode"
                id="theme-toggler"
              >
                {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 md:hidden rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                id="mobile-menu-toggler"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-4 px-4 space-y-3">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#2ECC71]">About Athenkosi</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#2ECC71]">Skills Dashboard</a>
            <a href="#research" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#2ECC71]">Research Interests</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#2ECC71]">Contact</a>
            
            <div className="pt-2 border-t border-slate-250 dark:border-slate-800">
              <span className="flex items-center gap-2 text-xs font-bold text-[#2ECC71] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] inline-block animate-pulse"></span>
                WIL Intern Ready
              </span>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        
        {/* HERO SECTION - Implements Bold Typography display typography with floating lab elements */}
        <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-900 bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 dark:from-slate-950 dark:via-slate-950 dark:to-teal-950/20">
          
          {/* Animated DNA Helix/Interactive molecular structure inside Background */}
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2 opacity-15 dark:opacity-20 pointer-events-none select-none flex items-center justify-center">
            <div className="relative w-80 h-96 animate-dna-rotate">
              {/* SVG interactive double helix rendering */}
              <svg viewBox="0 0 100 240" className="w-full h-full text-[#001F3F] dark:text-emerald-400">
                <path d="M10,10 Q25,60 50,110 T90,210" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M90,10 Q75,60 50,110 T10,210" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1={30 + Math.sin(i) * 15}
                    y1={20 + i * 16}
                    x2={70 - Math.sin(i) * 15}
                    y2={20 + i * 16}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                ))}
                {[...Array(12)].map((_, i) => (
                  <circle key={i} cx={30 + Math.sin(i) * 15} cy={20 + i * 16} r="3" fill="#2ECC71" />
                ))}
                {[...Array(12)].map((_, i) => (
                  <circle key={i} cx={70 - Math.sin(i) * 15} cy={20 + i * 16} r="3" fill="#001F3F" className="dark:fill-white" />
                ))}
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            {/* Left structural text column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#001F3F]/5 dark:bg-emerald-950/30 text-[#001F3F] dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.25em] rounded-md border border-[#2ECC71]/30 w-fit">
                <span className="w-2 h-2 rounded bg-[#2ECC71]"></span>
                Third-Year student • University of Johannesburg
              </div>

              {/* Brand bold display name layout */}
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-[#2ECC71]">
                  ATHENKOSI MWINYI
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#001F3F] dark:text-white leading-[0.95] tracking-tight">
                  MKUMBUZI
                </h1>
                <p className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-wider">
                  Future Biotechnologist | Johannesburg, South Africa
                </p>
              </div>

              {/* Typing biological focus indicator */}
              <div className="h-10 flex items-center bg-slate-100/60 dark:bg-slate-900/40 px-3 rounded-lg border border-slate-200/50 dark:border-slate-800/80 w-fit">
                <span className="text-xs uppercase tracking-widest text-[#001F3F] dark:text-slate-300 mr-2 font-bold">
                  FOCUS AREA:
                </span>
                <span className="font-mono text-sm font-bold text-[#2ECC71] inline-block border-r-2 border-[#2ECC71] pr-1 animate-pulse">
                  {typedText || "..."}
                </span>
              </div>

              {/* Subheadline and Bio synopsis */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                "Transforming Scientific Knowledge into Real-World Solutions"
                <br />
                <span className="text-sm block mt-2 font-normal text-slate-500 dark:text-slate-400">
                  Third-year Biotechnology candidate trained in advanced Genetics, Microbiology systems, Analytical Quantitative instrumentation, and Good Laboratory Practice (GLP) protocols.
                </span>
              </p>

              {/* CTA call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#cv-section"
                  className="px-8 py-4 bg-[#001F3F] hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm text-center transition-all shadow-xl hover:shadow-2xl border border-transparent dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  View Interactive CV
                </a>
                <a
                  href="#practicals"
                  className="px-8 py-4 border-2 border-[#001F3F] hover:bg-[#001F3F]/10 dark:border-slate-800 dark:hover:bg-slate-900 hover:text-[#001F3F] dark:hover:text-white text-[#001F3F] dark:text-slate-300 text-xs font-bold uppercase tracking-widest rounded-sm text-center transition-all"
                >
                  Explore Practice Labs
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-[#2ECC71] hover:bg-[#209C53] text-[#001F3F] font-bold text-xs uppercase tracking-widest rounded-sm text-center transition-all shadow-lg"
                >
                  Contact Me
                </a>
              </div>

              {/* Quick credentials details bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8 mt-4 font-sans">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">University</p>
                  <p className="text-xs font-extrabold text-[#001F3F] dark:text-white">UJ (Apk Campus)</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Current Degree</p>
                  <p className="text-xs font-extrabold text-[#001F3F] dark:text-white">Diploma in Biotechnology</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Status Enrolled</p>
                  <p className="text-xs font-extrabold text-[#2ECC71]">Seeking WIL Placement</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">South Africa Phone</p>
                  <p className="text-xs font-extrabold text-[#001F3F] dark:text-white">067 224 0761</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Dashboard element featuring UJ statistics & live interactive DNA builder */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Profile Card Mockup with mini facts */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"></div>
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-250 dark:border-slate-700 flex items-center justify-center font-bold text-2xl text-[#001F3F] dark:text-[#2ECC71]">
                    AM
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Athenkosi Mkumbuzi</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">University of Johannesburg 3rd Year</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="h-3 w-3 text-red-500" />
                      <span className="text-[10px] font-mono text-slate-400">Johannesburg, GP, ZA</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#001F3F] dark:bg-slate-950 p-4 rounded-xl text-white space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold block">CAREER OBJECTIVE</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                    Seeking Work Integrated Learning (WIL) where I can apply my genetics and microbiological diagnostics knowledge, contribute to active laboratory runs, and grow under expert scientists.
                  </p>
                </div>
              </div>

              {/* INTERACTIVE COMPONENT - Live interactive DNA strand sequence designer */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xs font-black text-[#001F3F] dark:text-white uppercase tracking-widest">
                      Interactive DNA Sequence Builder
                    </h3>
                    <p className="text-[10px] text-slate-500">Tap bases to assemble a custom coding strand</p>
                  </div>
                  <span className="text-[9px] font-mono bg-[#2ECC71]/15 text-[#2ECC71] px-2 py-0.5 rounded border border-[#2ECC71]/30">
                    Perfect Pair score: {dnaBuilderScore}%
                  </span>
                </div>

                {/* Base Pair graphic grid representation */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 mb-4 overflow-x-auto">
                  <div className="flex flex-col gap-3 min-w-[280px]">
                    
                    {/* Primary Strand (user) */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 w-8 pr-1">5'-3'</span>
                      {userDNAChain.map((base, idx) => (
                        <div
                          key={idx}
                          className={`w-7 h-7 flex items-center justify-center font-mono font-bold text-xs rounded transition-all shadow-sm ${
                            base === "A" ? "bg-emerald-500 text-white" :
                            base === "T" ? "bg-teal-500 text-white" :
                            base === "C" ? "bg-indigo-600 text-white" : "bg-cyan-500 text-white"
                          }`}
                        >
                          {base}
                        </div>
                      ))}
                    </div>

                    {/* Hydrogen bonds */}
                    <div className="flex gap-1 pl-8">
                      {userDNAChain.map((_, idx) => (
                        <div key={idx} className="w-7 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 font-bold text-[8px] leading-3 h-3">
                          |||
                        </div>
                      ))}
                    </div>

                    {/* Complementary Strand (auto generated with check) */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 w-8 pr-1">3'-5'</span>
                      {complements.map((base, idx) => (
                        <div
                          key={idx}
                          className={`w-7 h-7 flex items-center justify-center font-mono font-bold text-xs rounded opacity-90 ${
                            base === "T" ? "bg-teal-500 text-white" :
                            base === "A" ? "bg-emerald-500 text-white" :
                            base === "G" ? "bg-cyan-500 text-white" : "bg-indigo-600 text-white"
                          }`}
                        >
                          {base}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Input builders */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <button onClick={() => handleAddNewBase("A")} className="bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold font-mono py-1.5 rounded transition-all shadow">
                    + Adenine
                  </button>
                  <button onClick={() => handleAddNewBase("T")} className="bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-bold font-mono py-1.5 rounded transition-all shadow">
                    + Thymine
                  </button>
                  <button onClick={() => handleAddNewBase("C")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold font-mono py-1.5 rounded transition-all shadow">
                    + Cytosine
                  </button>
                  <button onClick={() => handleAddNewBase("G")} className="bg-cyan-500 hover:bg-cyan-600 text-white text-[11px] font-bold font-mono py-1.5 rounded transition-all shadow">
                    + Guanine
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">Pairs: A=T, C≡G</span>
                  <button onClick={handleClearBase} className="text-red-500 hover:underline">
                    Reset Chain
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS COUNTDOWN OR COUNTER SECTION */}
        <section className="bg-[#001F3F] text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-emerald-950/45">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#2ECC71]">3+ Years</span>
              <span className="block text-xs uppercase tracking-widest text-slate-300">Biotechnology Education</span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Structured at UJ APK campus</p>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#2ECC71]">100%</span>
              <span className="block text-xs uppercase tracking-widest text-slate-300">Lab Practicals Executed</span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">SOP compliant pipetting</p>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#2ECC71]">5 South African</span>
              <span className="block text-xs uppercase tracking-widest text-slate-300">Languages Spoken</span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">English, IsiXhosa, IsiZulu, Sesotho, Sepedi</p>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#2ECC71]">GLP Standard</span>
              <span className="block text-xs uppercase tracking-widest text-slate-300">Laboratory Safety Ready</span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Fully trained on safe bio containment</p>
            </div>

          </div>
        </section>

        {/* STORY-DRIVEN ABOUT ME SECTION */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              {/* Photo placeholder or stylish science outline card representation */}
              <div className="relative border-4 border-[#001F3F] dark:border-slate-800 p-3 rounded bg-slate-100 dark:bg-slate-900 shadow-2xl overflow-hidden aspect-[4/5] flex flex-col justify-end">
                {/* Simulated microscope view in background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                
                {/* Biotech grid art */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 opacity-10 pointer-events-none select-none">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="border border-indigo-900/40"></div>
                  ))}
                </div>

                {/* Floating laboratory cells icons */}
                <div className="absolute top-8 left-8 animate-float-slow text-teal-500/35">
                  <Dna className="h-16 w-16" />
                </div>
                <div className="absolute top-24 right-12 animate-pulse text-emerald-500/30">
                  <Microscope className="h-20 w-20" />
                </div>

                <div className="z-20 text-white space-y-2 p-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#2ECC71] font-mono leading-tight font-bold">
                    BIOGRAPHY OUTLINE
                  </span>
                  <p className="text-xl font-black tracking-tight leading-tight uppercase font-display">
                    Athenkosi Mwinyi Mkumbuzi
                  </p>
                  <p className="text-xs text-slate-300">
                    Diploma in Biotechnology Student | University of Johannesburg APK Campus
                  </p>
                </div>
              </div>
            </div>

            {/* Stories Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                  My Education & Dedication
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white tracking-tight">
                  Who is the Future Biotechnologist?
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a third-year Biotechnology student at the University of Johannesburg with a strong passion for genetics, microbiology, molecular biology, and analytical chemistry. Through practical laboratory training and scientific coursework, I have developed technical and analytical skills that prepare me for research, quality control, and biotechnology industry environments.
                </p>
                <p>
                  My educational goal revolves around applying robust scientific methods to real-world industrial questions, food safety diagnostic systems, genomic isolation protocols, or clinical investigations.
                </p>
                <p className="font-bold text-[#001F3F] dark:text-[#2ECC71]">
                  I am actively seeking Work Integrated Learning (WIL) opportunities starting soon, where I can contribute actively, learn from industry professionals, and further develop my scientific expertise.
                </p>
              </div>

              {/* Dynamic Expandable Multi-lingual detail card */}
              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono font-semibold text-slate-500 block uppercase tracking-wider">
                  South African Language & Cultural Fluency (5 Languages)
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Highly collaborative team-player. Fluent communication in several languages ensures perfect coordination inside laboratory settings and diverse medical environments.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["English (Fluent)", "IsiXhosa (Fluent)", "IsiZulu (Fluent)", "Sesotho (Fluent)", "Sepedi (Fluent)"].map((lang, i) => (
                    <span key={i} className="text-xs bg-white dark:bg-slate-950 px-3 py-1 border border-slate-200 dark:border-slate-800 rounded font-semibold text-[#001F3F] dark:text-white">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE SKILLS DASHBOARD */}
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                  Technical Skill Level Assessments
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                  Interactive Lab Skills Dashboard
                </h2>
              </div>

              {/* Filtering mechanism for technical areas */}
              <div className="flex flex-wrap gap-2">
                {["All", "Molecular Biology", "Microbiology", "Analytical Chemistry", "Laboratory Core Skills", "Data Analysis & Software"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSkillsFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      skillsFilter === cat
                        ? "bg-[#001F3F] text-white dark:bg-emerald-500 dark:text-[#001F3F] shadow-md"
                        : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {cat === "Laboratory Core Skills" ? "Lab Core" : cat === "Data Analysis & Software" ? "Data/Excel" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Category Cards Loop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SKILL_CATEGORIES.map((category, catIdx) => {
                // Determine if category should show based on current filter state
                if (skillsFilter !== "All" && category.title !== skillsFilter) return null;

                return (
                  <div
                    key={catIdx}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Category Title Header */}
                      <div className="flex items-center gap-3 border-b border-slate-150 dark:border-slate-800 pb-4 mb-4">
                        <div className="p-2.5 rounded-lg bg-[#001F3F]/5 dark:bg-emerald-950/25 text-[#2ECC71] dark:text-emerald-400">
                          {getIconComponent(category.iconName)}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {category.title}
                        </h3>
                      </div>

                      {/* Animated Progress Bars */}
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIdx) => (
                          <div key={skillIdx} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{skill.name}</span>
                              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{skill.rating}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${skill.rating}%` }}
                                className={`h-full rounded-full bg-[#001F3F] dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-500 transition-all duration-1000`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400 font-mono text-right">
                      VERIFIED VIA PRACTICAL MODULES
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Alert */}
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-[#2ECC71]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#2ECC71] shrink-0" />
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-[#001F3F] dark:text-emerald-400">Looking for custom competency verification?</strong> Athenkosi is ready to execute direct skills tests or diagnostic mock procedures in your facility as part of structural interviews.
                </p>
              </div>
              <a href="#contact" className="text-xs font-black text-[#2ECC71] hover:underline uppercase tracking-wider shrink-0">
                Inquire now →
              </a>
            </div>

          </div>
        </section>

        {/* ACADEMIC COURSEWORK & ROADMAP */}
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="space-y-2 text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                Academic Timeline & Module breakdown
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                Curriculum Syllabus at University of Johannesburg
              </h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Diploma in Biotechnology course progression. Tap cards below to review specific competencies, techniques gained, and modules covered.
              </p>
            </div>

            {/* University of Johannesburg Timeline Structure */}
            {EDUCATION_TIMELINE.map((timeline, tIdx) => (
              <div key={tIdx} className="space-y-8">
                
                {/* Institution banner */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#001F3F] dark:bg-slate-950 text-[#2ECC71]">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#001F3F] dark:text-white uppercase font-sans">
                        {timeline.institution}
                      </h3>
                      <p className="text-xs text-[#2ECC71] font-bold tracking-wider">{timeline.degreeName}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right font-mono text-xs">
                    <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                      {timeline.status}
                    </span>
                    <p className="text-slate-400 mt-2 font-semibold">Active Years: {timeline.year}</p>
                  </div>
                </div>

                {/* Grid layout of course cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {timeline.courses.map((course) => {
                    const isExpanded = expandedCourse === course.code;
                    return (
                      <div
                        key={course.code}
                        onClick={() => setExpandedCourse(isExpanded ? null : course.code)}
                        className={`border rounded-xl p-5 transition-all text-left cursor-pointer hover:shadow-md ${
                          isExpanded
                            ? "bg-slate-50 dark:bg-slate-900 border-[#2ECC71] ring-1 ring-[#2ECC71]/35 scale-[1.01]"
                            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-mono font-bold bg-[#001F3F] text-white px-2 py-0.5 rounded">
                            {course.code}
                          </span>
                          <span
                            className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                              course.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide flex items-center justify-between">
                          {course.name}
                          {isExpanded ? <ChevronDown className="h-4 w-4 text-[#2ECC71]" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                        </h4>
                        
                        <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Term: {course.term}</p>

                        {/* Collapsible Syllabus Block */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-normal animate-fade-in">
                            <div>
                              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold mb-1">
                                Module Focus
                              </span>
                              <p className="text-slate-600 dark:text-slate-300">
                                {course.description}
                              </p>
                            </div>

                            <div>
                              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold mb-1">
                                Competencies Gained
                              </span>
                              <ul className="grid grid-cols-1 gap-1">
                                {course.skillsGained.map((skill, idx) => (
                                  <li key={idx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                    <span className="w-1 h-1 rounded-full bg-[#2ECC71]"></span>
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* LABORATORY EXPERIENCE SHOWCASE */}
        <section id="practicals" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="space-y-2 text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                Technical Laboratory Portfolio Logs
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                Hands-On Laboratory Practicals Showroom
              </h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                These cards represent intensive multi-week series executed individually in UJ APK laboratories. Click "View Complete Protocol" on any item to read full checklists, methodologies, safety controls, and equipment.
              </p>
            </div>

            {/* Practical Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PRACTICALS_DATA.map((prac) => (
                <div
                  key={prac.id}
                  className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-[#2ECC71] px-2 py-1 rounded border border-[#2ECC71]/35 font-bold uppercase tracking-widest">
                        {prac.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{prac.duration}</span>
                    </div>

                    <h3 className="font-sans font-bold text-slate-900 dark:text-white text-lg mb-2">
                      {prac.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal mb-4">
                      {prac.summary}
                    </p>

                    <div>
                      <span className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block mb-2 font-semibold">
                        Core Skills Highlight
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prac.skillsLearned.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] bg-slate-50 dark:bg-slate-950 px-2 py-0.5 border border-slate-200 dark:border-slate-850 rounded font-semibold text-slate-700 dark:text-white">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-150 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedPractical(prac)}
                      className="w-full bg-[#001F3F] hover:bg-slate-900 dark:bg-slate-950 dark:hover:bg-slate-800 border-2 border-transparent dark:border-slate-800 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded transition-all"
                    >
                      View Complete Protocol
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* LABORATORY METHOD MODAL MODIFIER */}
        {selectedPractical && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-250 dark:border-slate-850 shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col justify-between">
              
              {/* Header */}
              <div className="bg-[#001F3F] text-white p-6 flex justify-between items-center shrink-0">
                <div>
                  <span className="text-[10px] font-mono text-[#2ECC71] tracking-widest uppercase block font-bold">
                    UJ LABORATORY SPECIFICATION DIARY
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">{selectedPractical.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedPractical(null)}
                  className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable specs */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm">
                
                <div>
                  <h4 className="text-xs font-black text-[#001F3F] dark:text-white uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedPractical.objectives.map((obj, oIdx) => (
                      <li key={oIdx} className="flex gap-2.5 items-start text-slate-650 dark:text-slate-350">
                        <CheckCircle2 className="h-4 w-4 text-[#2ECC71] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-black text-[#001F3F] dark:text-white uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                    Methodologies & Isolation Steps
                  </h4>
                  <ol className="space-y-2 list-decimal list-inside pl-1 text-slate-600 dark:text-slate-300">
                    {selectedPractical.methodologies.map((met, mIdx) => (
                      <li key={mIdx} className="pl-1">
                        {met}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-black text-[#001F3F] dark:text-white uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                      Equipment Checklist
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-605 dark:text-slate-305 font-mono">
                      {selectedPractical.equipmentUsed.map((eq, eIdx) => (
                        <li key={eIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full inline-block"></span>
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-[#001F3F] dark:text-white uppercase tracking-widest border-b border-slate-250 dark:border-slate-800 pb-1 mb-2 text-red-600 dark:text-red-400">
                      Biosafety Controls & Precautions
                    </h4>
                    <ul className="space-y-1 text-xs text-red-700 dark:text-red-400/90 font-mono">
                      {selectedPractical.safetyPrecautions.map((saf, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 shrink-0">⚠️</span>
                          <span>{saf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-850 text-right shrink-0">
                <button
                  onClick={() => setSelectedPractical(null)}
                  className="px-6 py-2 bg-[#001F3F] dark:bg-slate-850 text-white font-bold text-xs uppercase tracking-widest rounded"
                >
                  Dismiss Protocol view
                </button>
              </div>

            </div>
          </div>
        )}

        {/* SCIENTIFIC LAB CALCULATOR WIDGET AREA */}
        <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                  Biomolecular calculations toolbox
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                  Bio-Analytical Calculator Suite
                </h2>
              </div>

              <div className="space-y-4 text-slate-650 dark:text-slate-350">
                <p>
                  To highlight my scientific commitment and mathematical accuracy in practical environments, I implemented an embedding <strong>Bio-Analytical Calculator Widget</strong>.
                </p>
                <p>
                  This toolbox is extremely handy for quick, real-time recalculations of dilution setups, reagent concentrations, and target assay models inside labs. Choose tabs to solve:
                </p>
                <ul className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-emerald-500"></span>
                    Molarity mass requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-indigo-500"></span>
                    C₁V₁ = C₂V₂ Serial dilution
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-teal-500"></span>
                    DNA oligonucleotide primer Tm
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-500"></span>
                    Beer-Lambert Absorbance
                  </li>
                </ul>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <p className="italic font-mono">
                    "Accuracy isn't an accident in biotechnology; it's a structural requirement mapped through robust dilutions."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ScientificCalculator />
            </div>

          </div>
        </section>

        {/* KNOWLEDGE HUB SECTION - HEXAGON STYLE OR HIGHLIGHT MODULAR GRID */}
        <section id="knowledge-hub" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="space-y-2 text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                Scientific Expertise Mapping
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                Biotechnology Knowledge Domain
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Theoretical and conceptual models mastered during three years of university level academic studies.
              </p>
            </div>

            {/* Hexagonal Concept Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {KNOWLEDGE_HUB_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-220 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#001F3F]/5 dark:bg-emerald-950/30 text-[#2ECC71] rounded-lg">
                      {getIconComponent(cat.iconName)}
                    </div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base font-sans">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-normal">
                    {cat.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {cat.topics.map((top, tIdx) => (
                      <div key={tIdx} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-850 text-xs">
                        <strong className="block text-[#001F3F] dark:text-emerald-400 text-xs font-bold leading-tight uppercase font-sans mb-1">
                          {top.title}
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                          {top.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {top.subtopics.map((sub, sIdx) => (
                            <span key={sIdx} className="text-[9px] font-mono select-none bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">
                              #{sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* RESEARCH INTERESTS SECTION - Interactive cards that expand with descriptions */}
        <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="space-y-2 text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                Areas of intense scientific curiosity
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                Biotechnology Research Interests
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Hover over or toggle cards to view details regarding applicability and localized importance.
              </p>
            </div>

            {/* Interest Grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RESEARCH_INTERESTS.map((int, idx) => (
                <div
                  key={idx}
                  className="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:bg-white dark:hover:bg-slate-950 hover:border-[#2ECC71] dark:hover:border-[#2ECC71] hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-[#2ECC71] border border-slate-100 dark:border-slate-850 w-fit">
                      {getIconComponent(int.iconName)}
                    </div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                      {int.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                      {int.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-250 dark:border-slate-800 pt-3 mt-4 text-[10px]">
                    <span className="font-mono text-slate-400 block font-bold">REGIONAL RELEVANCE</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{int.importance}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* RECRUITER & RESEARCH HUB: Projects, Blog and Careers */}
        <section id="recruiter-hub" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Research Project Showcases and CV chatbot */}
            <div className="lg:col-span-7 space-y-12">
              
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                  Laboratory work documentation
                </span>
                <h3 className="text-3xl font-extrabold text-[#001F3F] dark:text-white uppercase">
                  Academic Project Showcase
                </h3>
              </div>

              <div className="space-y-6">
                {PROJECT_SHOWCASE_DATA.map((proj, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-220 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] font-mono bg-[#001F3F]/5 text-[#001F3F] dark:bg-emerald-950 dark:text-[#2ECC71] px-2.5 py-0.5 rounded border border-[#2ECC71]/20">
                        {proj.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.keywords.map((kw, kIdx) => (
                        <span key={kIdx} className="text-[10px] bg-slate-50 dark:bg-slate-950 px-2 py-0.5 border border-slate-200 dark:border-slate-850 rounded font-semibold text-slate-500 font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="bg-emerald-500/10 p-3 rounded-lg border border-[#2ECC71]/30">
                      <span className="text-[9px] font-mono font-bold text-[#2ECC71] uppercase block mb-0.5">Project Outcome</span>
                      <p className="text-xs text-slate-700 dark:text-emerald-300">
                        {proj.outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Blog Reader */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                    Scientist's perspective notes
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#001F3F] dark:text-white uppercase">
                    Biotechnology Insights & Blogs
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BLOG_POSTS.map((bp) => (
                    <button
                      key={bp.id}
                      onClick={() => setActiveBlogId(bp.id)}
                      className={`p-3 text-left border rounded-lg transition-all flex flex-col justify-between ${
                        activeBlogId === bp.id
                          ? "bg-white dark:bg-slate-900 border-[#2ECC71] ring-1 ring-[#2ECC71]/30"
                          : "bg-white/60 dark:bg-slate-950/40 border-slate-220 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900"
                      }`}
                    >
                      <div>
                        <span className="text-[8px] font-mono text-slate-400 block mb-1 font-bold tracking-widest uppercase">{bp.category}</span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2 uppercase">
                          {bp.title}
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-2 block">{bp.date}</span>
                    </button>
                  ))}
                </div>

                {/* Display active post */}
                {BLOG_POSTS.map((bp) => {
                  if (bp.id !== activeBlogId) return null;
                  return (
                    <article key={bp.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-220 dark:border-slate-800 space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span>Category: <strong className="text-[#2ECC71] uppercase font-mono">{bp.category}</strong></span>
                        <span>Published: <strong className="font-mono">{bp.date}</strong></span>
                      </div>
                      <h4 className="text-lg font-black text-[#001F3F] dark:text-white uppercase">
                        {bp.title}
                      </h4>
                      <p className="text-xs italic text-slate-500 bg-slate-50 dark:bg-slate-950 p-3 rounded border-l-4 border-emerald-500">
                        "{bp.excerpt}"
                      </p>
                      <div className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-wrap space-y-3 font-sans">
                        {bp.content}
                      </div>
                      <div className="text-[10px] text-right font-mono text-slate-400">
                        AUTHOR: ATHENKOSI MWINYI MKUMBUZI
                      </div>
                    </article>
                  );
                })}
              </div>

            </div>

            {/* Right Column: AI Chat Assistant & Timeline roadmap */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Career trajectory timeline roadmap */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71] block">
                    Strategic Career Path
                  </span>
                  <h3 className="text-2xl font-black text-[#001F3F] dark:text-white uppercase">
                    Professional Roadmap
                  </h3>
                </div>

                <div className="relative pl-6 border-l-2 border-[#001F3F]/30 dark:border-slate-800 space-y-6">
                  {CAREER_ROADMAP.map((mile, mIdx) => (
                    <div key={mIdx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-[#2ECC71] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#001F3F] dark:bg-emerald-500"></span>
                      </span>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="font-bold text-[#2ECC71] bg-[#2ECC71]/10 px-2 rounded-full uppercase">
                            {mile.title}
                          </span>
                          <span className="text-slate-400 font-semibold">{mile.timeframe}</span>
                        </div>

                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {mile.milestone}
                        </h4>
                        
                        <p className="text-slate-500 dark:text-slate-400 leading-normal">
                          {mile.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {mile.skillsToAcquire.map((sk, sIdx) => (
                            <span key={sIdx} className="text-[9px] font-mono bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-[#001F3F] dark:text-slate-300 font-bold">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTEGRATED RECRUITER AI CHAT COMPONENT */}
              <div id="ai-chat-assistant-cv" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between h-[520px]">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#001F3F] to-indigo-950 p-4 text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
                      <Brain className="h-5 w-5 text-[#2ECC71]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-extrabold text-xs tracking-wider uppercase">
                        Lab Recruiter AI Assistant
                      </h4>
                      <p className="text-[9px] font-mono text-emerald-400 leading-tight">UJ Biotechnology specialist core model</p>
                    </div>
                  </div>
                  <Sparkles className="h-4 w-4 text-[#2ECC71]/60" />
                </div>

                {/* Pre-prompt Quick Action Options */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-2.5 border-b border-slate-100 dark:border-slate-850 shrink-0">
                  <p className="text-[10px] font-bold text-slate-400 mb-1.5 font-mono uppercase">Quick click prompts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {presetPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendChatMessage(p.text)}
                        className="text-[9px] font-medium bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 hover:border-[#2ECC71] transition-all"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Screen Area */}
                <div className="p-4 overflow-y-auto flex-grow space-y-4 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl leading-relaxed font-sans ${
                          msg.sender === "user"
                            ? "bg-[#001F3F] text-white rounded-br-none dark:bg-slate-800"
                            : "bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-250 rounded-bl-none border border-slate-200/50 dark:border-slate-850"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start items-center gap-2 text-slate-450 font-mono">
                      <Loader2 className="h-3 w-3 animate-spin text-[#2ECC71]" />
                      <span>Gemini is thinking...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Send action bar */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-850 shrink-0 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                    placeholder="Ask about my PCR experience, UJ degree status, etc..."
                    className="flex-grow text-xs bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-[#2ECC71]"
                  />
                  <button
                    onClick={() => handleSendChatMessage()}
                    disabled={isChatLoading}
                    className="p-2.5 bg-[#001F3F] dark:bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-700 text-white rounded-lg transition-all shadow"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS SECTION */}
        <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="space-y-2 text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                Competency markers & Badges
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                Certifications & Achievements System
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Official competencies validated through structured laboratory reviews, academic performance markers, and good clinical documentation compliance checks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {CERTIFICATIONS_ACHIEVEMENTS.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-xs hover:shadow-md transition-all text-center flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#001F3F] dark:bg-slate-950 text-[#2ECC71] flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
                      <Award className="h-6 w-6 animate-pulse-soft" />
                    </div>
                    
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide leading-tight">
                        {cert.title}
                      </h4>
                      <p className="text-[10px] text-[#2ECC71] mt-0.5 font-bold">{cert.issuedBy}</p>
                    </div>

                    <span className="text-[9px] font-mono text-slate-400 block">{cert.date}</span>
                  </div>

                  <div className="pt-4 border-t border-slate-200/50 dark:border-slate-850 mt-4">
                    <span className="text-[9px] font-mono bg-[#2ECC71]/15 text-[#2ECC71] border border-[#2ECC71]/20 px-2 py-0.5 rounded font-bold uppercase block">
                      {cert.badgeName}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* INTERACTIVE CV SIMULATOR & RESUME DOWNLOAD SECTION */}
        <section id="cv-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-220 dark:border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#2ECC71] font-bold tracking-widest uppercase block">
                    Vetted Profile Dossier
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                    Curriculum Vitae Viewer
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Print ready structure optimized for HR managers, research institutes, and biopharma recruiters.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCvViewerOpen(!cvViewerOpen)}
                    className="px-5 py-2.5 bg-[#001F3F] text-white dark:bg-slate-950 dark:hover:bg-slate-850 text-xs font-bold uppercase tracking-widest rounded transition-all shadow-sm flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-[#2ECC71]" />
                    {cvViewerOpen ? "Hide Print View" : "Show Resume Online"}
                  </button>
                  <a
                    href="mailto:athenkosimkumbuzi02@gmail.com?subject=Requesting official PDF CV of Athenkosi Mkumbuzi"
                    className="px-5 py-2.5 bg-[#2ECC71] text-[#001F3F] hover:bg-[#209C53] text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Request Direct PDF
                  </a>
                </div>
              </div>

              {/* simulated PDF frame */}
              {cvViewerOpen && (
                <div className="border border-slate-300 dark:border-slate-800 rounded-lg p-6 sm:p-10 bg-white text-slate-900 space-y-8 shadow-inner font-sans text-xs sm:text-sm animate-fade-in transition-all">
                  
                  {/* CV Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-4">
                    <div className="space-y-1.5">
                      <h4 className="text-2xl font-black text-slate-950 tracking-tighter">
                        ATHENKOSI MWINYI MKUMBUZI
                      </h4>
                      <span className="text-xs bg-[#001F3F] text-white px-3 py-1 font-bold uppercase tracking-wider block rounded w-fit">
                        Biotechnology Student (3rd Year)
                      </span>
                      <p className="text-slate-500 font-medium">University of Johannesburg, APK Campus</p>
                    </div>

                    <div className="space-y-1 font-mono text-xs text-slate-700">
                      <p className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        <span>athenkosimkumbuzi02@gmail.com</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        <span>067 224 0761</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Linkedin className="h-3.5 w-3.5" />
                        <span>linkedin.com/in/athenkosimkumbuzi</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-red-500" />
                        <span>Johannesburg, GP, South Africa</span>
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2 text-left">
                    <h5 className="font-sans font-bold text-slate-950 border-b border-slate-400 uppercase tracking-widest text-xs">
                      PROFESSIONAL SUMMARY
                    </h5>
                    <p className="leading-relaxed text-slate-700">
                      Motivated and highly capable third-year Diploma in Biotechnology student at the University of Johannesburg. Backed by solid technical execution across genetics extraction protocols, microbiological stain diagnostics, and quantitative spectrophotometric chemistry courses. Fluent in 5 official South African languages, facilitating superb interdisciplinary coordination inside collaborative clinical and food-science diagnostics research settings.
                    </p>
                  </div>

                  {/* Skills Grid table */}
                  <div className="space-y-2 text-left">
                    <h5 className="font-sans font-bold text-slate-950 border-b border-slate-400 uppercase tracking-widest text-xs">
                      CORE COMPETENCY PROFILE
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <strong>Molecular & Genetics:</strong>
                        <p className="text-slate-650">DNA Extraction, Polymerase Chain Reaction amplification (PCR), Agarose Gel electrophoresis, nucleic-acid quantification.</p>
                      </div>
                      <div>
                        <strong>Microbiology:</strong>
                        <p className="text-slate-650">Aseptic sterilization safety controls, streak plating, bacterial culturing, Gram reactions, metabolic testing.</p>
                      </div>
                      <div>
                        <strong>Analytical Chemistry:</strong>
                        <p className="text-slate-650">Spectrophotometry (UV-Vis range), calibration curve math linear coefficients, quantitative titrations.</p>
                      </div>
                      <div>
                        <strong>Data & Lab Support:</strong>
                        <p className="text-slate-650">Good Laboratory Practice (GLP) documentation compliance, Microsoft Excel graphing structures, pipetting calibration accuracy.</p>
                      </div>
                    </div>
                  </div>

                  {/* Education & Syllabus */}
                  <div className="space-y-3 text-left">
                    <h5 className="font-sans font-bold text-slate-950 border-b border-slate-400 uppercase tracking-widest text-xs">
                      EDUCATION HISTORY
                    </h5>
                    <div>
                      <div className="flex justify-between font-bold">
                        <span>DIPLOMA IN BIOTECHNOLOGY</span>
                        <span>2024 - PRESENT</span>
                      </div>
                      <p className="text-slate-700 font-semibold">University of Johannesburg, South Africa</p>
                      <p className="text-xs text-slate-500 mt-1">
                        <strong>Completed Modules:</strong> Molecular Biology, Genetics, Microbiology, Cell Biology, Biochemistry, Analytical Chemistry, Bioprocess Principles.
                        <br />
                        <strong>Enrolled & Current:</strong> Food Microbiology, Process Engineering.
                      </p>
                    </div>
                  </div>

                  {/* Languages section inside PDF */}
                  <div className="space-y-2 text-left">
                    <h5 className="font-sans font-bold text-slate-950 border-b border-slate-400 uppercase tracking-widest text-xs">
                      LANGUAGES SPOKEN
                    </h5>
                    <p className="font-semibold text-slate-800">
                      English (Fluent), IsiXhosa (Fluent), IsiZulu (Fluent), Sesotho (Fluent), Sepedi (Fluent)
                    </p>
                  </div>

                  {/* references */}
                  <div className="space-y-4 text-left pt-3 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <p className="text-slate-500 font-mono text-[10px]">
                        *References available upon request via University of Johannesburg science department coordinators.
                      </p>
                      <span className="text-[10px] font-bold text-emerald-600">
                        UJ LOG ENTRY AP02-BIOTECH
                      </span>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        </section>

        {/* COMPREHENSIVE CONTACT SECTION */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Coordinates details & Quick Email triggers */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2ECC71]">
                  Connect with Athenkosi
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] dark:text-white uppercase tracking-tight">
                  Contact Coordinates
                </h2>
                <p className="text-xs text-slate-500">
                  Ready to schedule interviews, review credentials, or issue diagnostic placements. Based in Johannesburg, South Africa.
                </p>
              </div>

              {/* Direct coordinates cards */}
              <div className="space-y-4">
                
                <a
                  href="mailto:athenkosimkumbuzi02@gmail.com"
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-[#2ECC71] transition-all"
                >
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-[#2ECC71]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Email Address</span>
                    <strong className="text-sm text-slate-900 dark:text-white hover:underline break-all">
                      athenkosimkumbuzi02@gmail.com
                    </strong>
                  </div>
                </a>

                <a
                  href="tel:0672240761"
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-[#2ECC71] transition-all"
                >
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Phone Connection</span>
                    <strong className="text-sm text-slate-900 dark:text-white">
                      067 224 0761
                    </strong>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/athenkosimkumbuzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-[#2ECC71] transition-all"
                >
                  <div className="p-3 rounded-lg bg-blue-600/10 text-blue-650">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">LinkedIn Profile</span>
                    <strong className="text-sm text-slate-900 dark:text-white flex items-center gap-1 hover:underline">
                      linkedin.com/in/athenkosimkumbuzi
                      <ArrowUpRight className="h-3 w-3" />
                    </strong>
                  </div>
                </a>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Current Base</span>
                    <strong className="text-sm text-slate-900 dark:text-white">
                      Johannesburg, Gauteng, South Africa
                    </strong>
                    <p className="text-xs text-slate-500 mt-1">
                      Willing to relocate for compelling laboratory or diagnostics placements across Africa or overseas locations.
                    </p>
                  </div>
                </div>

              </div>

              {/* RSA map outline mockup */}
              <div className="p-6 bg-[#001F3F] text-white rounded-xl border border-emerald-950 flex flex-col justify-between h-40 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                <div>
                  <span className="text-[9px] font-mono text-[#2ECC71] uppercase tracking-widest block font-bold">GEO POSITION AT UJ</span>
                  <h4 className="text-sm font-bold mt-1">UJ APK Scientific Department Grid</h4>
                  <p className="text-xs text-slate-300 font-light mt-1">
                    Kingsway Road & University Road, Auckland Park, Johannesburg
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2ECC71]">
                  <Globe className="h-4 w-4 animate-spin" />
                  UTC+2 South African Standard Time
                </div>
              </div>

            </div>

            {/* Right Column: Interactive contact form */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black text-[#001F3F] dark:text-white uppercase tracking-widest mb-4">
                Submit Inquiry / WIL Request
              </h3>

              {formSubmitted ? (
                <div className="p-8 text-center bg-emerald-500/10 border border-[#2ECC71]/30 rounded-xl space-y-3 animate-fade-in">
                  <Check className="h-12 w-12 text-[#2ECC71] mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase">Inquiry Received Successfully</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Athenkosi will follow up with complete credentials via email (athenkosimkumbuzi02@gmail.com) promptly. Thank you for viewing his clinical and molecular portfolio!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Your Name / Institution
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. QC Lab Coordinator / NHLS Representative"
                        className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded outline-none text-slate-900 dark:text-white focus:ring-1 focus:ring-[#2ECC71]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Official Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. manager@labdiagnostics.co.za"
                        className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded outline-none text-slate-900 dark:text-white focus:ring-1 focus:ring-[#2ECC71]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded outline-none text-slate-900 dark:text-white focus:ring-1 focus:ring-[#2ECC71]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Message / WIL Opportunity Details
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Specify placement duration, laboratory focus, or questions about Athenkosi's genetic, microbiological and chemical titration background..."
                      className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded outline-none text-slate-900 dark:text-white focus:ring-1 focus:ring-[#2ECC71]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#001F3F] hover:bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded transition-all shadow-md"
                  >
                    Submit Secure Lab Inquiry
                  </button>

                  <p className="text-[10px] text-center text-slate-500 font-mono">
                    All forms compile securely to athenkosimkumbuzi02@gmail.com
                  </p>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER BAR */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-905 py-12 px-4 sm:px-6 lg:px-8 text-xs font-semibold uppercase tracking-wider transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-6 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] inline-block"></span>
              AVAILABLE FOR PLACEMENTS (WIL)
            </div>
            <div>athenkosimkumbuzi02@gmail.com</div>
            <div>+27 67 224 0761</div>
          </div>

          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/athenkosimkumbuzi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-slate-200 dark:border-slate-800 rounded text-slate-600 hover:text-[#2ECC71]"
            >
              LINKEDIN
            </a>
            <span className="p-2 border border-slate-200 dark:border-slate-800 rounded text-slate-400">
              UNIVERSITY OF JOHANNESBURG
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-900 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400">
          <p>© 2026 Athenkosi Mwinyi Mkumbuzi. Designed for UJ Work Integrated Learning Program.</p>
          <p className="font-mono">CRAFTED FOR BIOTECHNOLOGY EXCELLENCE IP-BPP-U5</p>
        </div>
      </footer>

    </div>
  );
}
