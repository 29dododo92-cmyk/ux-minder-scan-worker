import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/scan", async (req, res) => {
  const { domain } = req.body;
  if (!domain) return res.status(400).json({ error: "Domain is required" });

  res.json({ jobId: crypto.randomUUID(), status: "queued" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Scan worker running on port ${port}`);
});
