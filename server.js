import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*", // সব frontend থেকে request গ্রহণ করবে
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Dummy variable to store API key temporarily
let apiKey = null;

// Root route
app.get("/", (req, res) => {
  res.send("✅ Anil Metadata Server Running Successfully with CORS Enabled!");
});

// API key save endpoint
app.post("/set-key", (req, res) => {
  apiKey = req.body.apiKey;
  if (!apiKey) {
    return res.status(400).json({ error: "API key is required!" });
  }
  console.log("API Key Received:", apiKey);
  res.json({ message: "✅ API key saved successfully!" });
});

// Metadata fetch endpoint
app.get("/metadata", (req, res) => {
  if (!apiKey) {
    return res.status(401).json({ error: "No API key set yet!" });
  }

  res.json({
    success: true,
    usedKey: apiKey,
    data: {
      title: "Anil Metadata Sample",
      author: "Server Deployed on Vercel",
      timestamp: new Date().toISOString()
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
