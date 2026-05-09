import dotenv from "dotenv";
dotenv.config(); // Must stay at the top

import express from "express";
import cors from "cors";

import captionRoute from "./routes/caption.js";
import hashtagRoute from "./routes/hashtags.js";
import ideasRoute from "./routes/ideas.js";
import trendingRoute from "./routes/trending.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/caption", captionRoute);
app.use("/api/hashtags", hashtagRoute);
app.use("/api/ideas", ideasRoute);
app.use("/api/trending", trendingRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});