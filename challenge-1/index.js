import express from 'express'
const app = express()
app.use(express.json())

const applications = {} // Simulate db with no application ({ [appId]: { name, description } })

// Simple middleware to simulate authentication
const authMiddleware = (req, res, next) => {
  req.user = { id: 'user' }
  Object.freeze(req.user) // Prevent modification of user object for security
  next()
}

app.get('/applications/:appId', authMiddleware, (req, res) => {
  const app = applications[req.params.appId]
  if (!app) return res.sendStatus(404) // Application not found :(

  const selectFields = req.query.select?.split(',') || ['name'] // Select fields to return
  for (const field of selectFields) app[field] ??= 'N/A'

  // Return only selected fields
  return res.json(Object.keys(app).reduce((acc, key) => {
    if (selectFields.includes(key)) acc[key] = app[key]
    return acc
  }, {}))
})

app.get('/secret', authMiddleware, (req, res) => {
  if (req.user.adminMode) return res.send(process.env.SECRET) // Only admins can see the secret...
  return res.status(403).send('NOPE')
})

app.listen(3000)
