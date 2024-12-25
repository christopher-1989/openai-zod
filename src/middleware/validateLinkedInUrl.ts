import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
export const validateLinkedInUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const linkedInUrl = req.body.url

  const linkedInPattern = /^https:\/\/www\.linkedin\.com\/in\//

  if (!z.string().safeParse(linkedInUrl).success) {
    res
      .status(400)
      .json({ error: 'URL param is required and must be a string' })
    return
  }

  if (!linkedInPattern.test(linkedInUrl)) {
    res.status(400).json({
      error: 'Invalid URL format.',
    })
    return
  }

  next()
}
