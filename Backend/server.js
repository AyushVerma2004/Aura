import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import axios from "axios";

import authRoutes from "./routes/authRoutes.js";
import captionRoute from "./routes/caption.js";
import hashtagRoute from "./routes/hashtags.js";
import ideasRoute from "./routes/ideas.js";
import trendingRoute from "./routes/trending.js";

const app = express();

const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────────────

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ─────────────────────────────────────────────
// BODY PARSERS
// ─────────────────────────────────────────────

app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

app.use("/api/auth", authRoutes);

app.use("/api/caption", captionRoute);

app.use("/api/hashtags", hashtagRoute);

app.use("/api/ideas", ideasRoute);

app.use("/api/trending", trendingRoute);

// ─────────────────────────────────────────────
// INSTAGRAM ANALYTICS ROUTE
// ─────────────────────────────────────────────

app.get(
  "/api/instagram/analytics",
  async (_req, res) => {

    try {

      const ACCESS_TOKEN =
        process.env.INSTAGRAM_ACCESS_TOKEN;

      const IG_USER_ID =
        process.env.INSTAGRAM_ACCOUNT_ID;

      // =====================================
      // VALIDATION
      // =====================================

      if (!ACCESS_TOKEN || !IG_USER_ID) {

        return res.status(500).json({

          success: false,

          message:
            "Instagram credentials missing.",
        });
      }

      // =====================================
      // PROFILE DATA
      // =====================================

      const profileResponse =
        await axios.get(
          `https://graph.facebook.com/v22.0/${IG_USER_ID}`,
          {
            params: {

              fields:
                "id,username,followers_count,follows_count,media_count",

              access_token:
                ACCESS_TOKEN,
            },
          }
        );

      // =====================================
      // MEDIA POSTS
      // =====================================

      const mediaResponse =
        await axios.get(
          `https://graph.facebook.com/v22.0/${IG_USER_ID}/media`,
          {
            params: {

              fields:
                "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",

              access_token:
                ACCESS_TOKEN,
            },
          }
        );

      // =====================================
      // ACCOUNT INSIGHTS
      // =====================================

      const insightsResponse =
        await axios.get(
          `https://graph.facebook.com/v22.0/${IG_USER_ID}/insights`,
          {
            params: {

              metric:
                "reach",

              period:
                "day",

              access_token:
                ACCESS_TOKEN,
            },
          }
        );

      // =====================================
      // POSTS DATA
      // =====================================

      const posts =
        mediaResponse.data.data || [];

      // =====================================
      // ENGAGEMENT CALCULATION
      // =====================================

      let totalLikes = 0;

      let totalComments = 0;

      posts.forEach((post) => {

        totalLikes +=
          post.like_count || 0;

        totalComments +=
          post.comments_count || 0;
      });

      const followers =
        profileResponse.data
          .followers_count || 1;

      const engagementRate =
        (
          (
            (
              totalLikes +
              totalComments
            ) / followers
          ) * 100
        ).toFixed(2);

      // =====================================
      // FINAL RESPONSE
      // =====================================

      res.status(200).json({

        success: true,

        profile:
          profileResponse.data,

        insights:
          insightsResponse.data.data,

        engagement: {

          totalLikes,

          totalComments,

          engagementRate:
            `${engagementRate}%`,
        },

        posts,
      });

    } catch (error) {

      console.error(
        "❌ Instagram Analytics Error:",
        error.response?.data ||
        error.message
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch Instagram analytics.",

        error:
          error.response?.data ||
          error.message,
      });
    }
  }
);

// ─────────────────────────────────────────────
// HEALTH ROUTE
// ─────────────────────────────────────────────

app.get("/api/health", (_req, res) => {

  res.json({

    status: "ok",

    env:
      process.env.NODE_ENV,

    time:
      new Date().toISOString(),

    db:
      mongoose.connection
        .readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// ─────────────────────────────────────────────
// 404 HANDLER
// ─────────────────────────────────────────────

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      `Route ${req.originalUrl} not found.`,
  });
});

// ─────────────────────────────────────────────
// GLOBAL ERROR HANDLER
// ─────────────────────────────────────────────

app.use(
  (err, _req, res, _next) => {

    console.error("❌", err);

    // =====================================
    // MONGOOSE VALIDATION ERROR
    // =====================================

    if (
      err.name ===
      "ValidationError"
    ) {

      const messages =
        Object.values(
          err.errors
        ).map(
          (e) => e.message
        );

      return res.status(400).json({

        success: false,

        message:
          messages.join(". "),
      });
    }

    // =====================================
    // DUPLICATE KEY ERROR
    // =====================================

    if (err.code === 11000) {

      const field =
        Object.keys(
          err.keyValue
        )[0];

      return res.status(409).json({

        success: false,

        message:
          `${field} is already in use.`,
      });
    }

    // =====================================
    // JWT ERRORS
    // =====================================

    if (
      err.name ===
      "JsonWebTokenError"
    ) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid token.",
      });
    }

    if (
      err.name ===
      "TokenExpiredError"
    ) {

      return res.status(401).json({

        success: false,

        message:
          "Token has expired.",
      });
    }

    // =====================================
    // DEFAULT ERROR
    // =====================================

    res
      .status(err.status || 500)
      .json({

        success: false,

        message:
          err.message ||
          "Something went wrong. Please try again.",
      });
  }
);

// ─────────────────────────────────────────────
// MONGODB CONNECTION
// ─────────────────────────────────────────────

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "✅ MongoDB connected"
    );

    app.listen(PORT, () => {

      console.log(
        `🚀 AURA API running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {

    console.error(
      "❌ MongoDB connection failed:",
      err.message
    );

    process.exit(1);
  });