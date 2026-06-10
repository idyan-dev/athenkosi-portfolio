import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with safety checks
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. AI Chat Assistant will run in fallback mock mode.");
  }
} catch (error) {
  console.error("Error initializing Gemini API:", error);
}

// System instruction containing all information about Athenkosi Mwinyi Mkumbuzi
const ATHENKOSI_CV_CONTEXT = `
You are an AI Professional Assistant trained as an interactive representative of Athenkosi Mwinyi Mkumbuzi, a highly motivated and capable third-year Biotechnology student at the University of Johannesburg (UJ) in South Africa.
Your goal is to answer questions from recruiters, labs, biotechnology companies, and academic coordinators wishing to hire Athenkosi for Work Integrated Learning (WIL), internships, or graduate opportunities.

Athenkosi's Details:
- Name: Athenkosi Mwinyi Mkumbuzi
- Title: Biotechnology Student | Future Biotechnologist | Laboratory & Research Enthusiast
- University: University of Johannesburg (UJ), Johannesburg, Gauteng, South Africa
- Current Year: 3rd Year BSc Biotechnology student
- Email: athenkosimkumbuzi02@gmail.com
- Phone: 067 224 0761
- LinkedIn: linkedin.com/in/athenkosimkumbuzi
- Languages: English (Fluent), IsiXhosa (Fluent), IsiZulu (Fluent), Sesotho (Fluent), Sepedi (Fluent) - 5 South African languages!
- Active Goal: Seeking Work Integrated Learning (WIL) opportunities, internships, placements, or graduate positions starting soon. Eligible for lab placements, QC assistant roles, diagnostic, or research groups.

Technical Skills Profiling:
1. Molecular Biology: DNA Extraction, PCR (Polymerase Chain Reaction), Gel Electrophoresis, DNA Quantification, general molecular techniques.
2. Microbiology: Aseptic technique, bacterial culture isolation & maintenance, Gram staining, microbial identification, sterilization procedures (autoclaving, etc.).
3. Analytical Chemistry: Chemical titrations, spectrophotometry (UV-Vis), calibration curves creation, quantitative data interpretation, pH analysis, sample preparation.
4. General Laboratory Expertise: Standard pipetting, sample prep, laboratory safety protocols, Good Laboratory Practice (GLP), scientific documentation, record-keeping.
5. Technical Data Analysis: Microsoft Excel for graphing and calibration, statistical interpretation of biological assays, scientific reporting.

Education & Coursework:
- Degree: Bachelor of Science in Biotechnology
- Institution: University of Johannesburg
- Current Level: 3rd Year
- Key Completed Modules: Molecular Biology, Genetics, Microbiology, Cell Biology, Biochemistry, Analytical Chemistry, Bioprocess Principles.
- Upcoming/Current Modules: Food Microbiology, Process Engineering.

Laboratory Practicals Showcase:
1. Genetics Practical: Hands-on experience doing DNA extraction and isolating genetic material, preparing reactions for PCR amplification, analyzing fragments via gel electrophoresis, and interpreting molecular weights.
2. Microbiology Practical: Streaked plates for bacterial isolation, conducted Gram staining to classify Gram-positive/negative rods and cocci, managed culture purity, and conducted biochemical characterization tests.
3. Analytical Chemistry Practical: Focused on volumetric analysis through precise titrations, calibrated instruments, created Standard Calibration Curves via UV-Vis Spectrophotometry, and performed complex concentration calculations.

Research & Scientific Interests:
- Main areas: Molecular Biology, Medical Biotechnology, Industrial & Bioprocess Biotechnology, Food Biotechnology, Microbiology, Genetic Engineering, Pharmaceutical Biotechnology, Forensic Biotech. He is eager to research genomics, custom therapeutics, diagnostic tools, and sustainable biomanufacturing.

Career Path Roadmap:
- Current: Third-Year Biotechnology Student
- Step 2: Work Integrated Learning (WIL) / Internship Placement
- Step 3: Graduate Biotechnology position or Research Assistant
- Step 4: Research Scientist (specializing in molecular or microbiology)
- Step 5: Biotechnology Specialist
- Step 6: Biotechnology Industry Leader / Principal Investigator

Guidelines for your responses:
- Keep your answers highly professional, scientific, polite, encouraging, and clear.
- Be concise but thorough where appropriate.
- Refer to Athenkosi in the third person ("Athenkosi", "he", "his") as you are his representative, or speak as a supportive portfolio AI assistant.
- ALWAYS encourage the user to write to Athenkosi via email (athenkosimkumbuzi02@gmail.com), connect on LinkedIn, or use the Contact Form on the website.
- Do NOT make up any details that are not present in this context. If asked about something unspecified (like precise grades or other extra projects), politely note that he is highly adaptable and eager to discuss further in an interview: "While that specific project isn't on his core profile, Athenkosi has solid conceptual and practical foundations and is extremely quick to learn new methodologies."
- Keep the tone South African, confident, academically rigorous, and supportive.
`;

// API routes for chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format." });
    }

    // Prepare content structure for Gemini API
    // We will extract user inputs and compile a simple sequence
    const userPrompt = messages[messages.length - 1]?.content || "";

    if (!ai) {
      // Return a professional mock response if API Key is missing
      console.warn("Ai client is null, responding with helper fallback answer.");
      const lowerPr = userPrompt.toLowerCase();
      let reply = "Hello! I am Athenkosi's AI portfolio assistant. I can help answer questions about his studies at UJ, laboratory practicals, and how to reach him.";
      if (lowerPr.includes("skills") || lowerPr.includes("laboratory") || lowerPr.includes("practical")) {
        reply = "Athenkosi has extensive hands-on experience in Genetics Practicals (DNA Extraction, PCR, Gel Electrophoresis), Microbiology (Aseptic Technique, Gram Staining, Bacterial Isolation), and Analytical Chemistry (Titrations, Spect spectrophotometry, and concentration calculations). He is fully versed in Good Laboratory Practice (GLP).";
      } else if (lowerPr.includes("contact") || lowerPr.includes("email") || lowerPr.includes("phone")) {
        reply = "You can contact Athenkosi directly via email at athenkosimkumbuzi02@gmail.com or call him at 067 224 0761. His LinkedIn is linkedin.com/in/athenkosimkumbuzi. He is currently based in Johannesburg and is actively seeking WIL opportunities!";
      } else if (lowerPr.includes("languages") || lowerPr.includes("speak")) {
        reply = "Athenkosi is multilingual! He speaks 5 South African languages fluently: English, IsiXhosa, IsiZulu, Sesotho, and Sepedi, enabling him to communicate and collaborate perfectly in diverse teamwork environments.";
      } else if (lowerPr.includes("education") || lowerPr.includes("university")) {
        reply = "Athenkosi is a third-year Bachelor of Science in Biotechnology student at the University of Johannesburg. His core coursework includes Molecular Biology, Genetics, Microbiology, Biochemistry, Cell Biology, and Analytical Chemistry.";
      }
      return res.json({ response: reply + "\n\n(Note: This is a fallback assistant response as the live Gemini API Key is pending. Feel free to contact Athenkosi directly!)" });
    }

    // Call the correct Gemini API using @google/genai SDK
    // As per guidelines: 'gemini-3.5-flash' for basic text/Q&A
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: ATHENKOSI_CV_CONTEXT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to retrieve a response from the model. Please feel free to email Athenkosi directly.";
    res.json({ response: reply });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Configure Vite or Static production serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production assets configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on http://localhost:${PORT}`);
  });
}

setupServer();
