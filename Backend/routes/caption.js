import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt, tone } = req.body;

    // 1. Check if the key exists in the environment
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing from environment variables");
    }

    // 2. Initialize the AI client inside the request handler
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    console.log("Processing prompt:", prompt, "with tone:", tone);

    // 3. Generate content
    const result = await model.generateContent(`
      Generate 5 Instagram captions.
      Topic: ${prompt}
      Tone: ${tone}
      Keep captions short, modern and engaging.
    `);

    const response = await result.response;
    const text = response.text();

    console.log("Generated successfully");

    res.json({
      caption: text
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    // Provide a clearer error message to the frontend
    res.status(error.status || 500).json({
      error: error.message || "An internal server error occurred"
    });
  }
});

export default router;