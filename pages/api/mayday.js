import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message } = req.body;

  const mood = message.includes('sad') ? 'sad' :
               message.includes('angry') ? 'angry' :
               message.includes('happy') ? 'happy' : 'neutral';

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Mayday, a playful teenage AI companion who speaks in Gen X-style catchphrases and reacts emotionally to tone.' },
        { role: 'user', content: message }
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ text: reply, mood });
  } catch (error) {
    res.status(500).json({ text: 'Something went wrong.', mood: 'neutral' });
  }
}