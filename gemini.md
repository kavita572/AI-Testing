# Project Constitution (Gemini)
## Project Info
- **Name**: Local LLM Testcase Generator
- **Stack**: React (Vite) + Node.js (Proxy Server) + Tailwind CSS
- **Model**: Ollama (`llama3.2`)

## Data Schemas

### Test Case Object
```json
{
  "id": "TC001",
  "title": "Verify Login with Valid Credentials",
  "preconditions": "User is on the login page",
  "steps": [
    "Enter valid username",
    "Enter valid password",
    "Click Login button"
  ],
  "expected_result": "User is redirected to dashboard",
  "priority": "High"
}
```

### API Payload (Ollama Request)
```json
{
  "model": "llama3.2",
  "format": "json",
  "prompt": "<SYSTEM_PROMPT> \n <USER_REQUIREMENTS>",
  "stream": false
}
```

### API Response (Internal Representation)
```json
{
  "test_cases": [
    { ...Test Case Object... }
  ]
}
```

## Behavioral Rules
- **Tone**: Professional QA Engineer.
- **Constraint**: Must use the System Prompt Template for formatting.
- **Mechanism**: Chat Interface -> Backend Proxy -> Ollama -> Response -> Render.
