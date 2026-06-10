import {
  SkillCategory,
  TimelineItem,
  PracticalItem,
  KnowledgeCategory,
  InterestItem,
  CareerMilestone,
  CertificationItem,
  BlogPost,
  ProjectShowcase
} from "./types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Molecular Biology",
    iconName: "Dna",
    skills: [
      { name: "DNA Extraction", rating: 92, color: "bg-emerald-500 text-emerald-500" },
      { name: "PCR (Polymerase Chain Reaction)", rating: 88, color: "bg-emerald-500 text-emerald-500" },
      { name: "Gel Electrophoresis & Staining", rating: 90, color: "bg-emerald-500 text-emerald-500" },
      { name: "DNA Quantification (UV-Vis)", rating: 85, color: "bg-emerald-500 text-emerald-500" },
      { name: "Molecular Techniques", rating: 86, color: "bg-emerald-500 text-emerald-500" }
    ]
  },
  {
    title: "Microbiology",
    iconName: "FlameKindling", // Representing Bunsen burners / sterilization / aseptic
    skills: [
      { name: "Aseptic Technique & Safety", rating: 95, color: "bg-teal-500 text-teal-500" },
      { name: "Bacterial Isolation & Culturing", rating: 92, color: "bg-teal-500 text-teal-500" },
      { name: "Gram Staining", rating: 94, color: "bg-teal-500 text-teal-500" },
      { name: "Microbial Identification Tests", rating: 87, color: "bg-teal-500 text-teal-500" },
      { name: "Sterilization Procedures (Autoclave)", rating: 90, color: "bg-teal-500 text-teal-500" }
    ]
  },
  {
    title: "Analytical Chemistry",
    iconName: "Beaker",
    skills: [
      { name: "Volumetric Titrations", rating: 91, color: "bg-cyan-500 text-cyan-500" },
      { name: "Spectrophotometry (UV-Vis)", rating: 88, color: "bg-cyan-500 text-cyan-500" },
      { name: "Calibration Curve Optimization", rating: 89, color: "bg-cyan-500 text-cyan-500" },
      { name: "pH Analysis & Buffering", rating: 93, color: "bg-cyan-500 text-cyan-500" },
      { name: "quantitative Concentration Calcs", rating: 90, color: "bg-cyan-500 text-cyan-500" }
    ]
  },
  {
    title: "Laboratory Core Skills",
    iconName: "ShieldAlert", // Representing safety / accuracy
    skills: [
      { name: "Pipetting & Micropipetting Accuracy", rating: 96, color: "bg-blue-600 text-blue-600" },
      { name: "Sample & Solution Preparation", rating: 93, color: "bg-blue-600 text-blue-600" },
      { name: "Laboratory Safety & Protocols", rating: 95, color: "bg-blue-600 text-blue-600" },
      { name: "Good Laboratory Practice (GLP)", rating: 94, color: "bg-blue-600 text-blue-600" },
      { name: "Scientific Documentation (Notebook)", rating: 92, color: "bg-blue-600 text-blue-600" }
    ]
  },
  {
    title: "Data Analysis & Software",
    iconName: "BarChart3",
    skills: [
      { name: "Microsoft Excel (Data Graphics)", rating: 90, color: "bg-indigo-500 text-indigo-500" },
      { name: "Statistical Bio-Data Interpretation", rating: 84, color: "bg-indigo-500 text-indigo-500" },
      { name: "Graph Interpretation & Slopes", rating: 89, color: "bg-indigo-500 text-indigo-500" },
      { name: "Structured Scientific Reporting", rating: 91, color: "bg-indigo-500 text-indigo-500" }
    ]
  }
];

export const EDUCATION_TIMELINE: TimelineItem[] = [
  {
    year: "2024 - Present",
    institution: "University of Johannesburg",
    degreeName: "Diploma in Biotechnology",
    status: "Third-Year Student (WIL Seek Mode)",
    detail: "Enrolled in standard modules covering molecular levels, bioprocess structures, biochemical pathways, and intensive microbiology labs. Gained a cumulative strong academic posture and extensive hands-on laboratory capabilities.",
    courses: [
      {
        code: "MCB3",
        name: "Molecular Biology",
        status: "Completed",
        term: "Semester 1",
        description: "Explored DNA structure, gene replication, translation, transcription mechanisms, and prokaryotic vs eukaryotic gene structures under South African biosafety conventions.",
        skillsGained: ["Gene cloning concept", "Recombinant expression principles", "Genomic sequencing overview"]
      },
      {
        code: "GEN3",
        name: "Genetics",
        status: "Completed",
        term: "Semester 1",
        description: "Studied Mendelian inheritance, population genetics, PCR testing loops, linkage mapping, genomic mutations, and practical extraction procedures.",
        skillsGained: ["DNA Extraction", "PCR design", "Gel visual analysis"]
      },
      {
        code: "MIC3",
        name: "Microbiology",
        status: "Completed",
        term: "Semester 2",
        description: "Focus on isolation of microbial colonies, physiological profiling, Gram stain identification, fermentation methods, biocides, and aseptic isolation practices.",
        skillsGained: ["Aseptic culturing", "Staining classification", "Media optimization"]
      },
      {
        code: "CEB2",
        name: "Cell Biology",
        status: "Completed",
        term: "Semester 2",
        description: "Core study of cellular organelles, signaling receptors, membrane mechanics, cellular division control, apoptosis, and staining assays.",
        skillsGained: ["Microscope calibration", "Viability assays", "Target stains"]
      },
      {
        code: "BIC2",
        name: "Biochemistry",
        status: "Completed",
        term: "Semester 1",
        description: "Studied protein configurations, enzyme kinetics, carbohydrate catalytic routes, lipids, and thermodynamic calculations of intracellular respiration.",
        skillsGained: ["Enzymatic rate calculation", "Protein assay tests"]
      },
      {
        code: "ANC2",
        name: "Analytical Chemistry",
        status: "Completed",
        term: "Semester 2",
        description: "Focused on quantitative chemical testing, titration loops, absorbance assays via Spectrophotometry, and precision measurement standard controls.",
        skillsGained: ["Spectroscopy", "Burette accuracy", "Calibration slopes"]
      },
      {
        code: "BPP3",
        name: "Bioprocess Principles",
        status: "Completed",
        term: "Semester 1",
        description: "Studied industrial bioreactor systems, mass transfers, biological reaction rates, scale-up configurations, and downstream processing.",
        skillsGained: ["Fermentation balancing", "Bioreactor parameters"]
      },
      {
        code: "FOM3",
        name: "Food Microbiology",
        status: "Upcoming",
        term: "Semester 2",
        description: "Advanced safety analysis, foodborne pathogens, contamination controls, HACCP implementation, and industrial hygiene protocols.",
        skillsGained: ["HACCP", "Pathogen tracking", "QC standards"]
      },
      {
        code: "PRE3",
        name: "Process Engineering",
        status: "Upcoming",
        term: "Semester 2",
        description: "Engineering concepts within biological factories, fluid dynamics, heat exchanges, separating procedures, and plant scaling calculations.",
        skillsGained: ["Fluid equations", "Mass-energy balance"]
      }
    ]
  }
];

export const PRACTICALS_DATA: PracticalItem[] = [
  {
    id: "genetics",
    title: "Genetics Laboratory Practical",
    category: "Genetics",
    summary: "Hands-on molecular sequencing prep from raw tissue extraction to sequence visualization.",
    duration: "6 Weeks Core Lab Cycles",
    objectives: [
      "Successfully extract high-purity genomic DNA without enzyme contamination.",
      "Design primers and optimize thermal cycler conditions to amplify target genes.",
      "Diagnose DNA molecular weights and purity scores via gel electrophoresis lanes."
    ],
    skillsLearned: ["DNA Extraction", "PCR (Polymerase Chain Reaction)", "Agarose Gel Electrophoresis", "Absorbance Ratios", "Scientific Analysis"],
    methodologies: [
      "Cellular lysis using specific detergents and enzymes.",
      "Ethanol precipitation and centrifugation cycles.",
      "Amplification of 16S/specific regions in thermocyclers.",
      "Preparation of 1.5% Agarose gels with intercalating dyes.",
      "Imaging using ultraviolet imaging documentation chambers."
    ],
    equipmentUsed: [
      "Digital Thermocyclers (PCR machine)",
      "High-speed microcentrifuges",
      "UV-Vis Spectrophotometer",
      "Horizontal Electrophoresis Baths & Power Supply Packers",
      "Adjustable volume micropipettes"
    ],
    safetyPrecautions: [
      "Wearing of flame-resistant protective lab coats and goggles.",
      "Absolute aseptic handling of chemicals.",
      "Strict precautions while handling nucleic-acid stains with protective orange shields."
    ]
  },
  {
    id: "microbiology",
    title: "Microbiology Practical Series",
    category: "Microbiology",
    summary: "Complete study of clinical and environmental isolation, stain classification, and purity maintenance.",
    duration: "8 Weeks Integrated Lab",
    objectives: [
      "Perfect sterile workspace operations under continuous Bunsen flame shielding.",
      "Isolate individual pure colonies from mixed flora on agar grids.",
      "Perform high-resolution standard Gram staining for cellular classification."
    ],
    skillsLearned: ["Aseptic Culturing", "Streak Plate Colony Isolation", "Gram Stain Diagnostics", "Biochemical Media Testing", "Autoclave Sterilization"],
    methodologies: [
      "Incubator configuration and moisture parameters.",
      "Aseptic looping under laminar hoods or Bunsen burners.",
      "Gram Stain: Crystal violet, iodine mordant, ethanol decolorizer, and safranin counterstain process.",
      "Catalase and oxidase profiling of isolated cells."
    ],
    equipmentUsed: [
      "Laminar flow biosafety hoods",
      "Precision bacterial incubators",
      "Light Microscopes (100x Oil Immersion objectives)",
      "Inoculation loops and Bunsen burners",
      "Autoclave pressure chambers"
    ],
    safetyPrecautions: [
      "Zero-exposure containment protocols for active biological agents.",
      "Chemical surface decontamination before and after activities.",
      "Proper waste disposal in dedicated hazardous biological hazard safety baskets."
    ]
  },
  {
    id: "analytical-chemistry",
    title: "Analytical Chemistry Instrumentation Practical",
    category: "Analytical Chemistry",
    summary: "Precise volumetric, diagnostic, and optical molecular mapping using quantitative chemical tools.",
    duration: "5 Practical Modules",
    objectives: [
      "Configure chemical concentration levels with minor volumetric tolerances.",
      "Map absorption rates of molecules to establish linear standard slopes.",
      "Solve quantitative concentration levels of unknown aqueous samples."
    ],
    skillsLearned: ["Spectrophotometry", "Calibration curves (Beer-Lambert Law)", "Acid-Base volumetric titrations", "pH optimization", "Data interpolation"],
    methodologies: [
      "Stock solution preparation and dilution serial calculations.",
      "Tuning UV-Vis spectrophotometers on target wavelengths.",
      "Mapping absorption metrics vs standard concentrations.",
      "Performing triplicate volumetric titrations with precise colorimetric indicators."
    ],
    equipmentUsed: [
      "Single and double-beam UV-Vis spectrophotometers",
      "Volumetric flasks and high-precision burettes",
      "Digital pH-meters (multi-point calibration)",
      "Analytical analytical microbalances"
    ],
    safetyPrecautions: [
      "Strict personal protective equipment (goggles, heat gloves for stock preparation).",
      "Acid spill control protocols using sodium bicarbonate buffers."
    ]
  }
];

export const KNOWLEDGE_HUB_CATEGORIES: KnowledgeCategory[] = [
  {
    title: "Genetics Knowledge Core",
    iconName: "Binary",
    description: "Deep mastery of the genetic blueprint, transcriptional patterns, and engineering technologies.",
    topics: [
      {
        title: "DNA Replication & Repair",
        description: "Polymerase complexes, fidelity regulation, mismatch correction channels, and chromatin remodeling.",
        subtopics: ["Okazaki Processing", "Helicase/Topoisomerase mechanics", "Excision repair loops"]
      },
      {
        title: "Gene Expression & Regulation",
        description: "Operons, promoters, transcription factors, splicing events, post-translational modifiers.",
        subtopics: ["Lac/Trp Operon systems", "Alternative Splicing", "Histone Methylation"]
      },
      {
        title: "PCR & Quantitative Technologies",
        description: "Primer designs, annealing math, hot-start PCR configurations, qPCR quantification, and profiling.",
        subtopics: ["Tm calculations", "Cycle Threshold metrics", "Multiplex PCR setups"]
      },
      {
        title: "Genetic Engineering Methods",
        description: "Restrictional enzyme mapping, plasmids, transformation protocols, CRISPR-Cas targeting.",
        subtopics: ["Vector selection", "Heat shock protocol", "Recombinant verification"]
      }
    ]
  },
  {
    title: "Microbiology Systems Hub",
    iconName: "Grid",
    description: "In-depth understanding of bacterial biology, environmental dynamics, and industrial processes.",
    topics: [
      {
        title: "Bacterial Classification",
        description: "Morphological profiling, cell wall structural configurations, evolutionary classifications, metabolic pathways.",
        subtopics: ["Gram-Positive vs Negative envelopes", "Acid-fast structural differences", "16S rRNA identification"]
      },
      {
        title: "Industrial & Food Microbiology",
        description: "Growth models in bioreactors, contamination preventions, food preservation techniques, HACCP safety grids.",
        subtopics: ["HACCP principles", "Decimal reduction values (D-value)", "Logarithmic phase parameters"]
      },
      {
        title: "Microbial Growth Dynamics",
        description: "Generation rates, growth limitations, batch vs fed-batch systems, environmental stressors.",
        subtopics: ["Specific growth rate calculations", "Turbidimetric estimations", "Chemostat controls"]
      },
      {
        title: "Fermentation & Bio-materials",
        description: "Metabolic fermenters, primary vs secondary metabolites, media formulation, solvent recovery.",
        subtopics: ["Ethanol/Lactic acid pathways", "Bioreactor scaling", "Downstream isolation"]
      }
    ]
  },
  {
    title: "Analytical Chemistry & Instrumentation",
    iconName: "Thermometer",
    description: "Mastery of chemical measurements, concentration checks, optical sensors, and quality control systems.",
    topics: [
      {
        title: "Absorption Spectroscopy",
        description: "Absorbance rules, transition states, Beer-Lambert calculations, monochromatic pathways, chromophores.",
        subtopics: ["Beer-Lambert optimization", "Chromophore excitation", "Wavelength scans"]
      },
      {
        title: "Quantitative Wet Chemistry",
        description: "Volumetric titrations, standard preparation, gravimetric techniques, system errors, statistics.",
        subtopics: ["Triplicate analysis statistics", "Indicator pH thresholds", "Serial dilution scaling"]
      },
      {
        title: "Instrumentation Diagnostics",
        description: "Sensory calibration, instrument limits, noise reduction strategies, reproducibility controls.",
        subtopics: ["Detection limits (LOD/LOQ)", "Electrode calibrations", "Blank deductions"]
      },
      {
        title: "Quality Control Protocols",
        description: "Standard operating procedures (SOP), validation protocols, traceability trails, ISO lab rules.",
        subtopics: ["GLP standard guidelines", "SOP composition", "Drift adjustments"]
      }
    ]
  }
];

export const RESEARCH_INTERESTS: InterestItem[] = [
  {
    title: "Molecular Biology",
    iconName: "Atom",
    description: "Investigating the fundamental mechanisms of gene replication, transcription, and translation to unlock molecular secrets.",
    importance: "Core base for synthetic biological advancements."
  },
  {
    title: "Medical Biotechnology",
    iconName: "GlassWater",
    description: "Focusing on diagnostic assays, vaccine engineering, monoclonal antibody tech, and personalized genomic therapeutics.",
    importance: "Critical for healthcare challenges in Sub-Saharan Africa."
  },
  {
    title: "Industrial Biotechnology & Bioprocess",
    iconName: "Workflow",
    description: "Scaling cellular factories for renewable chemicals, biocatalysts, and high-yield therapeutic proteins.",
    importance: "Supports circular economies with sustainable outputs."
  },
  {
    title: "Food Biotechnology & Safety",
    iconName: "Utensils",
    description: "Using biotechnology to optimize nutrient density, prevent pathogen propagation, and engineer biological food safety tests.",
    importance: "Key to food security and shelf-life optimization."
  },
  {
    title: "Microbiology Research",
    iconName: "Dna",
    description: "Exploring antimicrobial resistance, bacteriophage therapy, and microbiome dynamics in diverse ecosystems.",
    importance: "Combats multidrug-resistant pathogen threats."
  },
  {
    title: "Genetic Engineering",
    iconName: "ShieldAlert",
    description: "Utilizing genetic edit tools like CRISPR-Cas systems to repair gene defects and customize organism resilience.",
    importance: "Paves the way for gene therapies."
  },
  {
    title: "Pharmaceutical Biotechnology",
    iconName: "Activity",
    description: "Optimizing therapeutic proteins, recombinant enzymes, biosimilars, and lipid nanoparticle vaccine carriers.",
    importance: "Enhances localized African drug production capacities."
  },
  {
    title: "Forensic Biotechnology",
    iconName: "Fingerprint",
    description: "Applying STR mapping, DNA profiling, and genetic chromatography databases for high-fidelity criminal identity forensics.",
    importance: "Promotes precision and accountability in justice systems."
  }
];

export const CAREER_ROADMAP: CareerMilestone[] = [
  {
    title: "CURRENT STATUS",
    milestone: "Third-Year Biotechnology Student",
    timeframe: "2024 - 2026",
    description: "Completing academic coursework at the University of Johannesburg (UJ). Mastering laboratory protocols, DNA assays, and analytical methods.",
    skillsToAcquire: ["Academic excellence", "GLP practices", "Diploma background"],
    iconName: "GraduationCap"
  },
  {
    title: "URGENT TARGET",
    milestone: "Work Integrated Learning (WIL) Placement",
    timeframe: "Immediate Seek Model",
    description: "Bridging University training with industry. Seeking laboratory placements, internships, or QC diagnostic roles under professional supervision.",
    skillsToAcquire: ["Industry workflows", "SOP execution", "Diagnostic machinery familiarity"],
    iconName: "SearchCode"
  },
  {
    title: "IMMEDIATE POST-GRADUATE",
    milestone: "Graduate Biotechnology Position",
    timeframe: "Future - Step 1",
    description: "Securing fulltime role in research groups, pharmaceutical operations, diagnostic labs, or bioreactor maintenance teams.",
    skillsToAcquire: ["Team leadership", "High-throughput labs", "Regulatory biosafety pathways"],
    iconName: "Briefcase"
  },
  {
    title: "MID-TERM GOAL",
    milestone: "Research Scientist / Officer",
    timeframe: "Future - Step 2",
    description: "Conducting diagnostic research, biological optimization, pathogen mapping, or molecular engineering projects.",
    skillsToAcquire: ["Project design", "Grant compiling", "Advanced publication standard writeups"],
    iconName: "Compass"
  },
  {
    title: "LONG-TERM ADVANCEMENT",
    milestone: "Biotechnology Specialist",
    timeframe: "Future - Step 3",
    description: "Acting as technical authority on genetic platforms, process validations, assay custom designs, and lab calibrations.",
    skillsToAcquire: ["System architectures", "Laboratory auditing", "Novel platform creation"],
    iconName: "Cpu"
  },
  {
    title: "ULTIMATE CONTRIBUTION",
    milestone: "Biotechnology Industry Leader",
    timeframe: "Executive Horizon",
    description: "Directing biotechnology setups, steering regional drug formulation, advising science departments, or heading leading research groups.",
    skillsToAcquire: ["Strategic innovation", "Science commercialization", "Regional biotech policy leadership"],
    iconName: "Award"
  }
];

export const CERTIFICATIONS_ACHIEVEMENTS: CertificationItem[] = [
  {
    title: "Expert Laboratory Practical Training",
    issuedBy: "University of Johannesburg",
    date: "2024-2025 Completed",
    badgeName: "Genetics & Microbiology Badges",
    status: "Earned"
  },
  {
    title: "Molecular Assays & PCR Optimization",
    issuedBy: "Academic Lab Projects",
    date: "2025 Completed",
    badgeName: "Molecular Biology badge",
    status: "Earned"
  },
  {
    title: "Good Laboratory Practice (GLP) Assurance",
    issuedBy: "University Training Courses",
    date: "2025 Certified",
    badgeName: "GLP Standard Badge",
    status: "Earned"
  },
  {
    title: "Quantitative Absorption Curves",
    issuedBy: "Analytical Chemistry Practicals",
    date: "2025 Completed",
    badgeName: "Spectrophotometry Badge",
    status: "Earned"
  },
  {
    title: "Food Safety & Quality Assurance Coursework",
    issuedBy: "Food Science Core Labs",
    date: "Upcoming Nov 2026",
    badgeName: "Future HACCP Assessor Badge",
    status: "In Progress"
  }
];

export const PROJECT_SHOWCASE_DATA: ProjectShowcase[] = [
  {
    title: "Aseptic Culturing and Multi-Stain Microscopic Identification",
    category: "Microbiology Practical",
    description: "Isolating unknown microbial colonies, purifying cell stocks through streak plate techniques, classifying cellular shapes, cell walls and flagella via Gram reaction protocols, and writing systematic scientific diagnostic log records.",
    keywords: ["Streak plate", "Gram reaction", "Pure colony isolation", "Aseptic culture maintenance"],
    outcome: "Successfully mapped and classified 100% of the given challenge species, demonstrating flawless sterile envelope controls under critical workspace conditions."
  },
  {
    title: "Spectrophotometric Concentration Modeling of Molecules",
    category: "Analytical Chemistry",
    description: "Constructing high-fidelity standard calibration curves utilizing complex dilution formulas. Performing UV-Vis absorption scanning to identify optimum lambda values and mapping linear Beer-Lambert plots.",
    keywords: ["Beer-Lambert Law", "UV-Vis Spectrophotometer", "Linear calibration regression", "Stock dilution math"],
    outcome: "Maintained a calibration regression value (R²) of 0.998, demonstrating strong volumetric accuracy and calibration precision, suitable for diagnostic and quality control environments."
  },
  {
    title: "Genetics Isolation and PCR Agarose Amplification Framework",
    category: "Genetics Lab Series",
    description: "Extracting complete DNA profiles from standard cell tissue systems under extraction buffers, preparing standard micro-liter mixtures with primers, running thermal cycling, and conducting separation visual tests.",
    keywords: ["DNA Isolation", "Thermal denaturation", "Buffer mechanics", "Gel photography"],
    outcome: "Yielded high-concentration, high-purity DNA templates free from biological inhibitor interference, yielding pristine visual gel banding."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Aseptic Technique is the Foundation of Industrial Food and Pharma",
    excerpt: "Sterile protocols prevent millions in contaminated batches and preserve patient safety. Explore how Athenkosi plans to apply this in Quality Control environments.",
    content: `In the biological sciences, contamination is the difference between a breakthrough product and a multi-million-rand batch disaster. Whether working in pharmaceutical formulation, sterile diagnostic labs, or industrial food science setups, maintaining an aseptic workspace is mathematically critical.

Aseptic workspaces depend on the **constant exclusion of airborne particles, dust, and microbes**. During our practical modules at the University of Johannesburg, of paramount focus was developing muscle memory for keeping all tubes covered, flaming inoculation loops before and after surface transfers, and operating strictly within the protective sterile zone created by Bunsen burners.

As I seek **Work Integrated Learning (WIL)** placements, I am eager to import these rigorous standard operating procedures (SOPs) directly into industrial settings, ensuring quality compliance, biological protection, and precise scientific results in corporate environments.`,
    date: "May 12, 2026",
    category: "Laboratory Practice"
  },
  {
    id: "blog-2",
    title: "Understanding the Beer-Lambert Law in Modern Medical Diagnostics",
    excerpt: "A deep dive into molecular optical absorbency and how calibration slopes define diagnostic testing output accuracy.",
    content: `Spectrophotometry is the secret powerhouse behind modern blood chemistry tests, metabolic diagnostics, and environmental toxin mapping. At its core, it relies on a beautiful physical law: the **Beer-Lambert Law** ($A = \\varepsilon c l$).

This formula states that a molecule's light absorption ($A$) is directly proportional to its concentration ($c$) and the physical distance the light travels ($l$). By building standard calibration curves of known concentrations, we can accurately solve the concentration of unknown analytes simple by shooting structured light through them.

In our **Analytical Chemistry practicals**, we built and mapped linear calibration curves. Reaching a linear correlation ($R^2$) of above 0.99 require hyper-accurate serial dilutions using micropipettes. This mathematical and physical synthesis demonstrates why biotechnologists make outstanding quality-control technicians.`,
    date: "June 02, 2026",
    category: "Analytical Instruments"
  },
  {
    id: "blog-3",
    title: "The Molecular Shift: Evolving from Classical Genetics to Precision Gene Editing",
    excerpt: "How South African biotechnology students leverage fundamental techniques to prepare for high-impact CRISPR genomic solutions.",
    content: `Genetics has traveled a tremendous path from Mendel's pea inheritance grids to the molecular scalpel of CRISPR-Cas systems. Today's biotechnologist sits at the intersection of classical mechanics and precision editing.

Before a scientist can edit genes, they must understand how to extract, amplify, and visualize DNA. Our hand-on training cover standard **polyacrylic and agarose gel electrophoresis** alongside optimized **polymerase chain reaction (PCR)** thermal steps. This gives us molecular fluency.

With South Africa seeking biological diagnostic security and personalized health programs, young biotechnologists educated under rigorous guidelines stand ready to implement these high-value workflows. Our educational goals at UJ have equipped us to become future leaders in this incredible space.`,
    date: "June 09, 2026",
    category: "Molecular Biology"
  }
];
