require('dotenv').config(); // Load environment variables from .env file
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Read API key from .env file
});

// Function to get ChatGPT response
async function getChatGPTResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the appropriate model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while fetching the response.';
  }
}

// Export a serverless function for Vercel
module.exports = async (req, res) => {
  const { prompt } = req.query; // Get the prompt from the query string

  if (!prompt) {
    return res.status(400).json({ error: 'Please provide a prompt.' });
  }

  const response = await getChatGPTResponse(prompt);
  res.status(200).json({ response });
};