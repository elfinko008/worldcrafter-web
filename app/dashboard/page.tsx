'use client';

import React, { useState } from 'react';
import { 
  Home, History, Lightbulb, Download, Users, Plus, 
  Settings, Zap, Send, Copy, CheckCircle2, Terminal, 
  Box, ChevronRight 
} from 'lucide-react';

export default function NexyraDashboard() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt || prompt.length < 3) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || "Fehler beim Empfangen des Codes.");
    } catch (err) {
      setResult("Kritischer Engine-Fehler.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#050506] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#08080a] flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer">
          <div className="w-9 h-9 bg-[#8b5cf6] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-transform group-hover:scale-110">
            <Zap size={20} fill="white" color="white" />
          </div>
          <span className="font-black italic tracking-tighter text-lg uppercase">Nexyra</span>
        </div>

        <nav className="flex-1 space-y-1">
          <button onClick={() => {setResult(''); setPrompt('');}} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white/5 rounded-xl text-sm font-bold transition-all italic">
            <Plus size={18} /> New Chat
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 text-white rounded-xl text-sm font-bold italic">
            <Home size={18} /> Home
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white/5 rounded-xl text-sm font-bold italic">
            <History size={18} /> History
          </button>

          <div className="pt-8 pb-3 px-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">Resources</div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white/5 rounded-xl text-sm font-bold italic"><Lightbulb size={18} /> Best Practices</button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white/5 rounded-xl text-sm font-bold italic"><Download size={18} /> Get Plugin</button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 p-4 rounded-2xl mb-4 flex items-center gap-2 text-[#8b5cf6] text-[10px] font-black uppercase tracking-widest">
            <Zap size={14} fill="currentColor" /> Credits: $5.00
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-black rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black italic">J</div>
              <span className="text-xs font-black uppercase italic group-hover:text-purple-400 transition-colors">Jonah</span>
            </div>
            <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
          </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col items-center justify-center relative p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050506] to-[#050506] overflow-y-auto">
        {!result ? (
          <div className="text-center mb-12 animate-in fade-in duration-1000">
            <div className="w-20 h-20 bg-[#8b5cf6] rounded-[28px] mx-auto mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.3)]">
              <Zap size={40} fill="white" color="white" />
            </div>
            <h1 className="text-4xl font-black mb-4 italic tracking-tighter uppercase">Start building your game</h1>
            <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium italic leading-relaxed">Describe what you want to create and Nexyra will build it in Roblox Studio.</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl mb-44 animate-in zoom-in duration-500">
            <div className="flex items-center justify-between p-4 bg-[#0d0d0f] border border-white/10 rounded-t-3xl shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b5cf6] flex items-center gap-2">
                <Terminal size={14} /> Neural Output
              </span>
              <button onClick={copyCode} className="text-[10px] font-black uppercase bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <pre className="bg-black/40 p-8 rounded-b-3xl text-sm font-mono overflow-x-auto border-x border-b border-white/10 text-purple-50 italic shadow-2xl">
              {result}
            </pre>
          </div>
        )}

        {/* FLOATING INPUT */}
        <div className="absolute bottom-10 w-full max-w-2xl px-6">
          <div className="bg-[#0d0d0f] border border-white/10 rounded-[32px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] focus-within:border-purple-500/40 transition-all duration-500">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What system should Nexyra build for you?"
              className="nexyra-input h-20 px-2"
            />
            <div className="flex justify-between items-center mt-3 pt-4 border-t border-white/5">
              <button className="p-2 text-gray-700 hover:text-white transition-colors"><Settings size={20} /></button>
              <button 
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className={`px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${loading ? 'bg-gray-800 animate-pulse' : 'bg-white text-black hover:bg-[#8b5cf6] hover:text-white shadow-xl shadow-purple-500/10'}`}
              >
                {loading ? 'Initializing...' : 'Initialize'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}