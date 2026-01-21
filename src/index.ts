import express from "express";
import cors from "cors";  // додаємо CORS

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Додатково, щоб можна було приймати JSON у POST
app.use(express.json());

// 🔹 Дозволяємо CORS (щоб fetch з будь-якого браузера працював)
app.use(cors());

// 🔹 СТАН СКАНУ (ГЛОБАЛЬНО)
let scanStatus = "idle";
let scanResult = null;

// 🔹 ROOT (перевірка що сервер живий)
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// 🔹 START SCAN
app.post("/scan", (req, res) => {
  if (scanStatus === "in_progress") {
    return res.json({ status: "already in progress" });
  }

  scanStatus = "in_progress";
  console.log("Scan started");

  // Симуляція сканування
  setTimeout(() => {
    scanStatus = "done";
    scanResult = {
      pages: [
        {
          id: "home",
          url: "/",
          screenshot: "https://via.placeholder.com/300x200?text=Home"
        },
        {
          id: "pricing",
          url: "/pricing",
          screenshot: "https://via.placeholder.com/300x200?text=Pricing"
        }
      ],
      edges: [{ from: "home", to: "pricing" }]
    };
    console.log("Scan finished");
  }, 5000);

  res.json({ status: "started" });
});

// 🔹 SCAN STATUS
app.get("/scan-status", (req, res) => {
  res.json({ status: scanStatus });
});

// 🔹 SCAN RESULT
app.get("/scan-result", (req, res) => {
  if (scanStatus !== "done") {
    return res.status(400).json({ error: "Scan not finished" });
  }
  res.json(scanResult);
});

// 🔹 SERVER START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
