import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Ensure the key exists before initializing
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing from environment variables");
    }

    // 2. Initialize inside the route for environment variable safety
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 3. Using the updated Gemini 2.5 Flash model for the Free Tier
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const finalPrompt = `
      Generate 20 Instagram hashtags for:
      ${prompt}

      Rules:
      - Only hashtags
      - Space separated
      - No numbering
    `;

    const result = await model.generateContent(finalPrompt);

    // Note: In the latest SDK, result.response.text() is a function call
    const response = await result.response;
    const text = response.text();

    console.log("Hashtags generated successfully for:", prompt);

    res.json({
      hashtags: text
    });

  } catch (error) {
    console.error("HASHTAG ERROR:", error);

    res.status(500).json({
      error: error.message || "Failed to generate hashtags"
    });
  }
});

export default router;