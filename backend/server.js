import express from 'express'
import cors from 'cors'
import clockwork from './api/clockwork.route.js'

const app = express()
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}
app.use(cors())
app.use(express.json())

// routing
app.use('/api/v1/clockwork', clockwork)
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

export default app
