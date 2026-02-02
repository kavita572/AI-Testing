import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShieldCheck, Download, Trash2, Cpu, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface TestCase {
  id: string;
  title: string;
  preconditions: string;
  steps: string[];
  expected_result: string;
  priority: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  testCases?: TestCase[];
  isLoading?: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your Local LLM Test Case Generator. Paste your requirements below and I will help you build a robust test suite using llama3.2.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    const assistantId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: 'Analyzing requirements and generating test cases...',
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // In a real scenario, this calls our backend proxy
      // For now, we mock the call logic for the UI demonstration
      // We'll connect the actual tools in the Trigger phase
      const response = await axios.post('http://localhost:3001/api/generate', {
        requirement: input
      });

      setMessages(prev => prev.map(msg =>
        msg.id === assistantId
          ? {
            ...msg,
            content: 'I have generated the following test cases based on your requirements:',
            isLoading: false,
            testCases: response.data.test_cases
          }
          : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg =>
        msg.id === assistantId
          ? {
            ...msg,
            content: 'Failed to generate test cases. Please ensure Ollama is running and the llama3.2 model is pulled.',
            isLoading: false
          }
          : msg
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center px-6 justify-between glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center animate-glow">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            BLAST <span className="text-slate-500 font-normal">TestGen</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-500">Ollama Connected</span>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Cpu size={18} className="text-slate-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar - Optional for later phases */}
        <div className="w-64 border-r border-white/5 bg-black/20 p-4 hidden lg:block">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 px-2">Recent Sessions</h2>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-2 text-sm">
              <Layers size={14} />
              Login Page Logic
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-2 text-sm transition-colors">
              <Layers size={14} />
              Shopping Cart E2E
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar scroll-smooth"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-indigo-400" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-4 ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`
                      p-4 rounded-2xl border
                      ${msg.role === 'user'
                        ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-50'
                        : 'bg-white/5 border-white/10 text-slate-200'
                      }
                    `}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>

                      {msg.isLoading && (
                        <div className="mt-3 flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                        </div>
                      )}
                    </div>

                    {msg.testCases && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {msg.testCases.map((tc, idx) => (
                          <motion.div
                            key={tc.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-5 group hover:border-indigo-500/50 transition-all duration-300"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30 uppercase tracking-tighter">
                                {tc.id}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-tighter ${tc.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                                  tc.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                }`}>
                                {tc.priority}
                              </span>
                            </div>
                            <h3 className="font-semibold text-sm mb-3 group-hover:text-indigo-300 transition-colors uppercase tracking-tight">
                              {tc.title}
                            </h3>
                            <div className="space-y-2 mb-4">
                              <div className="text-[11px] text-slate-500 font-medium">STEPS:</div>
                              <ul className="text-xs space-y-1.5 pl-1">
                                {tc.steps.map((step, i) => (
                                  <li key={i} className="flex gap-2 text-slate-400 leading-tight">
                                    <span className="text-indigo-500 font-bold shrink-0">{i + 1}.</span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Expected</span>
                                <span className="text-xs text-emerald-400/90 font-medium">{tc.expected_result}</span>
                              </div>
                              <ChevronRight size={14} className="text-white/20 group-hover:text-indigo-400 transition-colors" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-8 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative glass-card flex flex-col p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Describe your requirement or paste user stories here..."
                  className="w-full bg-transparent border-none focus:ring-0 text-sm p-3 min-h-[100px] resize-none text-slate-200 placeholder-slate-600"
                />
                <div className="flex items-center justify-between px-3 py-2 border-t border-white/5">
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-white/5 rounded-md text-slate-500 transition-colors" title="Clear Chat">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded-md text-slate-500 transition-colors" title="Export to CSV">
                      <Download size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isGenerating}
                    className={`
                      flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-sm transition-all
                      ${!input.trim() || isGenerating
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95'
                      }
                    `}
                  >
                    <span>{isGenerating ? 'Generating...' : 'Generate Test Cases'}</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="h-8 border-t border-white/5 flex items-center justify-center px-6 gap-6 text-[10px] text-slate-600 tracking-widest font-bold uppercase">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={10} className="text-indigo-500/50" />
          Deterministic Logic
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={10} className="text-indigo-500/50" />
          Self-Healing Architecture
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={10} className="text-indigo-500/50" />
          Blast Protocol v1.0
        </div>
      </footer>
    </div>
  );
}

export default App;
