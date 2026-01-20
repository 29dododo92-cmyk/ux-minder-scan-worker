import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();

// Middleware
app.use(cors());           // дозволяємо всі домени для тесту
app.use(express.json());

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// SCAN ENDPOINT
app.post("/scan", async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  // TEMP: stub response
  res.json({
    jobId: crypto.randomUUID(),
    status: "queued",
  });
});

// Запуск сервера
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Scan worker running on port ${port}`);
});
