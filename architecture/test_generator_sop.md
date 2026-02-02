# SOP: Local Test Case Generator

## 🎯 Goal
Develop a deterministic, self-healing system to generate structured test cases using a local Ollama instance (`llama3.2`) based on user-provided requirements.

---

## 🏗️ Layer 1: Architecture

### 📥 Inputs
- **User Requirement String**: Raw text describing a feature OR a structured prompt.
- **Model Configuration**: Defaults to `llama3.2`.
- **Schema Template**: JSON schema for test cases (defined in `gemini.md`).

### ⚙️ Tool Logic
1. **Validation Tool**: Validates if Ollama service is reachable.
2. **Generation Tool**: Sends prompt to Ollama with `format: "json"` to ensure structured output.
3. **Parsing Tool**: Validates the output JSON against the target schema.
4. **Export Tool**: Formats the JSON into Markdown/Table/CSV for the UI.

### 🛡️ Edge Cases & Handling
- **Invalid Model**: Check if model exists; if not, suggest pulling or fallback.
- **Unstructured Response**: If Ollama fails to return valid JSON, the system must retry once with a "correction" prompt.
- **Service Down**: Friendly UI error if port 11434 is blocked.

---

## 🧭 Layer 2: Navigation (Decision Logic)
1. Receive input from UI.
2. Pass to **Validation Tool**.
3. If valid, pass to **Generation Tool**.
4. Pass output to **Parsing Tool**.
5. If parsing fails, trigger **Self-Healing Loop** (one retry with explicit schema reinforcement).
6. Return final payload to UI.

---

## 🛠️ Layer 3: Tools (tools/)
- `ollama_client.js`: Low-level wrapper for API calls.
- `schema_validator.js`: Atomic check for JSON shapes.
- `formatter.js`: Converts raw AI data to display-ready formats.
