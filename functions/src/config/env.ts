import { defineString } from 'firebase-functions/params';

export const OPENAI_API_KEY = defineString('OPENAI_API_KEY', {
  description: 'OpenAI API key for natural language query parsing',
});

export const CUELINKS_API_KEY = defineString('CUELINKS_API_KEY', {
  description: 'Cuelinks API key for affiliate link generation',
});
