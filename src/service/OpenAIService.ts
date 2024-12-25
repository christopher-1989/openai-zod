import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import 'dotenv/config'
import { z } from 'zod'

const openai = new OpenAI()

const ProfileSchema = z.object({
  firstName: z.string(),
  summary: z.string(),
  profession: z.string(),
  yearsOfExperience: z.string(),
})

function OpenAIService() {
  return {
    linkedInProfileSummaryFromUrl: async (url: string) =>
      await openai.beta.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You find specific data on a LinkedIn user from a given URL and return it in the given response format. If the URL does not contain all of the expected data, return null.',
          },
          {
            role: 'user',
            content: url,
          },
        ],
        response_format: zodResponseFormat(ProfileSchema, 'profile'),
      }),
  }
}

export default OpenAIService
