import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Identify 6 high-performing content trends for social media today (Instagram, LinkedIn, YouTube, TikTok).
      For each trend, provide:
      1. A short catchy name.
      2. A "Trend Score" percentage (e.g., 95%).
      3. The primary platform.
      
      Return the data strictly as a JSON array of objects with keys: name, score, platform.
      Example format: [{"name": "AI Productivity", "score": "98%", "platform": "Instagram"}]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const trendsData = JSON.parse(cleanJson);

    res.json(trendsData);
  } catch (error) {
    console.error("TRENDS ERROR:", error);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
});

export default router;