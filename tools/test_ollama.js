
import fetch from 'node-fetch';

async function testConnection() {
  console.log("🤝 Extending Handshake to Ollama...");
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: 'Hello, are you ready for testing?',
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Handshake Accepted!");
    console.log("Response:", data.response);
  } catch (error) {
    console.error("❌ Handshake Refused:", error.message);
    process.exit(1);
  }
}

testConnection();
