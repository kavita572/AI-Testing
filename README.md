# 🚀 Local LLM Test Case Generator (BLAST Framework)

A premium, local-first AI application designed to generate professional QA test cases using **Ollama** and the **B.L.A.S.T.** (Blueprint, Link, Architect, Stylize, Trigger) protocol.

---

## 🏗️ 3-Layer Architecture

This project follows the **A.N.T. Architectural Pattern**, separating concerns to ensure deterministic results from probabilistic LLMs.

### 📁 **Layer 1: Architecture (`/architecture`)**
- **SOPs (Standard Operating Procedures)**: Markdown-based technical blueprints that define "how" the AI should think.
- Contains `test_generator_sop.md` which dictates the logic for test case generation, edge cases, and self-healing retries.

### 📁 **Layer 2: Navigation (`/backend`)**
- **Engine**: Node.js & Express.
- **Role**: Acts as a secure proxy between the UI and Ollama. 
- **Enforcement**: Injects the System Prompt, enforces strict JSON verification, and handles API routing.

### 📁 **Layer 3: Tools & UI (`/frontend` & `/tools`)**
- **Frontend**: React 19 + Vite + Tailwind CSS v4.
- **Design**: Premium Glassmorphism UI with Framer Motion animations.
- **Tools**: Atomic Node scripts (`ollama_generate.js`, `verify_json.js`) for low-level verification during the "Link" phase.

---

## 🛠️ Tech Stack

- **AI Engine**: [Ollama](https://ollama.com/) (Local `llama3.2`)
- **Frontend**: React, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express, CORS
- **Animations**: Framer Motion
- **Protocol**: B.L.A.S.T. Master System

---

## 🚦 Getting Started

### 1. Prerequisites
- Install [Ollama](https://ollama.com/)
- Pull the model: `ollama pull llama3.2`

### 2. Setup
```bash
# Install root dependencies
npm install

# Setup Backend
cd backend
npm install
node server.js

# Setup Frontend
cd ../frontend
npm install
npm run dev
```

### 3. Usage
- Open `http://localhost:5173`
- Paste a feature requirement.
- Click **Generate Test Cases**.

---

## 📜 Project Memory
Following the BLAST protocol, all decision-making is recorded in:
- `gemini.md`: Project Constitution & Data Schema.
- `task_plan.md`: Roadmap and status.
- `findings.md`: Research & Discoveries.
- `progress.md`: Step-by-step execution log.
