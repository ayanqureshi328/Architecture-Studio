import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = Number(process.env.PORT) || 4000

app.use(express.json({ limit: '20kb' }))

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  projectType: { type: String, trim: true, maxlength: 80 },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
}, { timestamps: true })

const Inquiry = mongoose.model('Inquiry', inquirySchema)

app.get('/api/health', (_request, response) => {
  response.json({ database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

app.post('/api/contact', async (request, response) => {
  const { name, email, projectType = '', message } = request.body ?? {}
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''
  const cleanProjectType = typeof projectType === 'string' ? projectType.trim() : ''

  if (!cleanName || !cleanEmail || !cleanMessage || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return response.status(400).json({ error: 'Please provide a name, valid email and project note.' })
  }

  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({ error: 'The inquiry form is temporarily unavailable. Please email studio@forma.archi.' })
  }

  try {
    await Inquiry.create({ name: cleanName, email: cleanEmail, projectType: cleanProjectType, message: cleanMessage })
    return response.status(201).json({ message: 'Thank you. Your note is on its way to the studio.' })
  } catch (error) {
    console.error('Unable to save inquiry:', error.message)
    return response.status(500).json({ error: 'We could not send your note. Please try again.' })
  }
})

app.listen(port, () => console.log(`FORMA API listening on http://localhost:${port}`))

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection failed:', error.message))
} else {
  console.warn('MONGODB_URI is not set; contact submissions will be unavailable.')
}
