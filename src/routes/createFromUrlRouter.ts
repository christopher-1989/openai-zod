import * as express from 'express'

import OpenAIService from '../service/OpenAIService'

export const createFromUrlRouter = express.Router()

const completionClient = OpenAIService()

createFromUrlRouter.post('/', async (req, res) => {
  try {
    const result = await completionClient.linkedInProfileSummaryFromUrl(req.body.url)
    const parsedResult = result.choices.at(0)?.message.parsed
    res.send(parsedResult)
  } catch (e: any) {
    res.status(500).send(e)
  }
})
