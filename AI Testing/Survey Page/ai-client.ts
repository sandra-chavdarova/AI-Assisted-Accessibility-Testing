import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT =
  'You are a senior accessibility consultant specialising in WCAG 2.1 compliance. ' +
  'You evaluate web interfaces for barriers affecting users with visual, motor, cognitive, ' +
  'and auditory disabilities.';

// Text-only prompt 
export async function sendPrompt(prompt: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-5.5',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
  });
  return response.choices[0].message.content ?? '';
}

// Vision prompt
export async function sendPromptWithImage(
  prompt: string,
  base64: string,
  mediaType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' = 'image/png'
): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:${mediaType};base64,${base64}` },
          },
          { type: 'text', text: prompt },
        ],
      },
    ],
  });
  return response.choices[0].message.content ?? '';
}