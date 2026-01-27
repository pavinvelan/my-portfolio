import express from 'express'
import cors from 'cors'
import axios from 'axios'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Default route
app.get('/', (req, res) => {
  res.send('Portfolio API is running. Use /api/contact for form submissions.')
})

// Helper to create transporter when credentials exist
function createTransporter() {
  const user = process.env.EMAIL_ADDRESS
  const pass = process.env.GMAIL_PASSKEY
  if (!user || !pass) return null

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  })
}

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    })
    return res.data.ok
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message)
    return false
  }
}

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message, transporter) {
  const { name, email, message: userMessage } = payload

  if (!transporter) return false

  const mailOptions = {
    from: "Portfolio",
    to: process.env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: message,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error while sending email:', error.message)
    return false
  }
}

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const payload = req.body
    const { name, email, message: userMessage } = payload
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chat_id = process.env.TELEGRAM_CHAT_ID

    // Build message
    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`

    // Try Telegram if configured
    let telegramSuccess = true
    if (token && chat_id) {
      telegramSuccess = await sendTelegramMessage(token, chat_id, message)
    }

    // Try Email if configured
    const transporter = createTransporter()
    let emailSuccess = true
    if (transporter) {
      emailSuccess = await sendEmail(payload, message, transporter)
    } else {
      // If neither Telegram nor Email is configured, return helpful error
      if (!token || !chat_id) {
        return res.status(500).json({
          success: false,
          message: 'Contact form not configured. Please set up email or Telegram credentials.',
        })
      }
    }

    if (telegramSuccess || emailSuccess) {
      return res.json({
        success: true,
        message: 'Message sent successfully!',
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      })
    }
  } catch (error) {
    console.error('Contact API Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
    hint: 'If you are looking for the frontend, you are hitting the backend port (5000). Use the frontend port (80/3000) instead.'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})
