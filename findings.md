# Findings
- **Goal**: Create a local LLM Testcase generator with Ollama.
- **Constraints**: Local execution, Ollama integration (llama3.2).
- **Protocol**: B.L.A.S.T.
- **North Star**: Simple Web App -> User Input -> Ollama (with Tempalte) -> Test Cases.
- **Tech Stack Inference**: React/Vite (Frontend) + Node/Express (Backend to proxy Ollama) OR Direct Client-Side if CORS allows (but Proxy is safer/cleaner). *Decision: Standard Vite + Node/Express for robust integration.*
- **Schema Strategy**: Use JSON Schema in Ollama request to enforce formatting.
