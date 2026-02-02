import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are a Senior QA Automation Engineer. Your task is to generate high-quality, professional test cases based on the user's requirements.
Follow these rules strictly:
1. Return ONLY a valid JSON object.
2. The JSON structure MUST be: 
{
  "test_cases": [
    {
      "id": "TC-001",
      "title": "Clear and concise title",
      "preconditions": "What must be true before testing",
      "steps": ["Step 1", "Step 2", "Step 3"],
      "expected_result": "The final positive outcome",
      "priority": "High" | "Medium" | "Low"
    }
  ]
}
3. Include functional, edge case, and negative tests.
4. Language should be professional and technical.
`;

app.post('/api/generate', async (req, res) => {
    const { requirement } = req.body;
    console.log("📥 Received Requirement:", requirement);

    if (!requirement) {
        return res.status(400).json({ error: "Requirement is required" });
    }

    try {
        const prompt = `${SYSTEM_PROMPT}\n\nUSER REQUIREMENT:\n${requirement}\n\nStrict JSON Output:`;

        console.log("🚀 Sending to Ollama (llama3.2)...");
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2',
                prompt: prompt,
                format: 'json',
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }

        const data = await response.json();
        const result = JSON.parse(data.response);

        console.log("✅ Successfully generated", result.test_cases?.length || 0, "test cases.");
        res.json(result);

    } catch (error) {
        console.error("❌ Generation Error:", error.message);
        res.status(500).json({ error: "Failed to generate test cases", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 BLAST Backend listening at http://localhost:${PORT}`);
});
