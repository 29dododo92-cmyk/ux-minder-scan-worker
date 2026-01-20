import express from "express";

const app = express();
app.use(express.json());

app.post("/scan", async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

  
  // TEMP: stub response
  res.json({
    jobId: crypto.randomUUID(),
    status: "queued"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Scan worker running on port ${port}`);
});
