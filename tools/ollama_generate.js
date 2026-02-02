import fetch from 'node-fetch';

/**
 * Tool: ollama_generate
 * Input: prompt, model
 * Output: response string (JSON expected)
 */
async function generate(prompt, model = 'llama3.2') {
    try {
        const res = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                format: "json",
                stream: false
            })
        });

        if (!res.ok) throw new Error(`Ollama Error: ${res.statusText}`);
        const data = await res.json();
        return data.response;
    } catch (err) {
        console.error("Tool Failed:", err.message);
        process.exit(1);
    }
}

const args = process.argv.slice(2);
if (args.length > 0) {
    generate(args[0], args[1]).then(console.log);
}
