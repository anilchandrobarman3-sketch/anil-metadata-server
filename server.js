import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Anil Metadata Server Running Successfully");
});

app.post("/generate", async (req, res) => {
  const { title, keywords } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });

  const description = `Download high-quality ${title} vector design, perfectly optimized for SEO and stock platforms.`;
  const metaKeywords = keywords || `${title}, vector, design, illustration`;

  res.json({
    title,
    description,
    keywords: metaKeywords.split(",").map(k => k.trim())
  });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
