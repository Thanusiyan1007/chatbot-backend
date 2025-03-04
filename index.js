require('dotenv').config(); // Load environment variables from .env file
const { OpenAI } = require('openai');
const readline = require('readline');

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

// Create an interactive CLI for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question('Enter your prompt: ', async (prompt) => {
    if (prompt.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    const response = await getChatGPTResponse(prompt);
    console.log('ChatGPT:', response);
    
    // Ask for another prompt
    askQuestion();
  });
}

// Start the chat loop
console.log("Welcome to ChatGPT CLI! Type 'exit' to quit.");
askQuestion();
