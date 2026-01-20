import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// 👇 ОСЬ СЮДИ
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// 👇 інші роуты
app.post('/scan', ...)
app.post('/scan/status', ...)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Scan worker running on port ${PORT}`)
})
