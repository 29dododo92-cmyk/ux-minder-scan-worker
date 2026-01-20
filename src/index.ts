import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(express.json());
app.use(cors()); // дозволяємо запити з будь-якого фронтенду

// 🟢 ЗДОРОВ'Я
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🌐 ПАМ'ЯТЬ ДЛЯ JOB
const jobs: Record<
  string,
  { status: "queued" | "scanning" | "completed" | "failed" }
> = {};

// POST /scan — створюємо новий скан
app.post("/scan", (req, res) => {
  const { domain } = req.body;
  if (!domain) return res.status(400).json({ error: "Domain is required" });

  const jobId = crypto.randomUUID();
  jobs[jobId] = { status: "queued" };

  // симулюємо прогрес сканування
  setTimeout(() => {
    if (jobs[jobId]) jobs[jobId].status = "scanning";
  }, 2000); // через 2 секунди — сканування почалося

  setTimeout(() => {
    if (jobs[jobId]) jobs[jobId].status = "completed";
  }, 7000); // через 7 секунд — сканування завершено

  res.json({ jobId, status: "queued" });
});

// GET /scan-status/:jobId — повертаємо статус скану
app.get("/scan-status/:jobId", (req, res) => {
  const { jobId } = req.params;
  if (!jobs[jobId]) return res.status(404).json({ error: "Job not found" });

  res.json({ status: jobs[jobId].status });
});

// 🚀 Старт сервера
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Scan worker running on port ${port}`));
