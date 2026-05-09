import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { niche, type } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Generate 5 high-converting content ideas for a content creator.
      Niche: ${niche || 'General Lifestyle/Growth'}
      Content Format: ${type}

      For each idea, provide:
      1. A viral-style title (Hook).
      2. A brief description of the storytelling angle or visual style.
      3. A tag (e.g., Viral, High-Retention, Transformation, Educational).

      Return the data strictly as a JSON array of objects with keys: title, description, tag.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("IDEAS ERROR:", error);
    res.status(500).json({ error: "Failed to generate ideas" });
  }
});

export default router;