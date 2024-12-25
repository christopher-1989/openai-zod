import bodyParser from 'body-parser'
import express from 'express'
import { createFromUrlRouter } from './routes/createFromUrlRouter'
import { validateLinkedInUrl } from './middleware/validateLinkedInUrl'

const port = process.env.SERVER_PORT || 3000
const app = express()

app.use(bodyParser.json())

app.use('/get-profile-summary', validateLinkedInUrl, createFromUrlRouter)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
