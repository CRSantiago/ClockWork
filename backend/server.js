import express from 'express'
import cors from 'cors'
import clockwork from './api/clockwork.route.js'
import path from 'path'

const app = express()
if (process.env.NODE_ENV === 'production') {
  // // Set static folder
  // app.use(express.static('frontend/build'))
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  // })
  // Serve static files from the build directory
  const buildPath = process.env.BUILD_PATH || 'frontend/build'
  app.use(express.static(path.join(process.cwd(), buildPath)))

  // Serve the index.html file for all other requests
  // app.get('*', (req, res) => {
  //   const indexPath = path.join(process.cwd(), buildPath, 'index.html')
  //   res.sendFile(indexPath)
  // })
}
app.use(cors())
app.use(express.json())

// routing
app.use('/api/v1/clockwork', clockwork)
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

export default app
