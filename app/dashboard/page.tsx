'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import {
  Sparkles,
  LogOut,
  Send,
  Copy,
  Check,
  Terminal,
  Zap,
  User,
  ChevronRight,
  RotateCcw,
  Code2,
  Command,
  Cpu,
  Shield,
  Clock,
  Settings,
  LayoutDashboard,
  ExternalLink,
  Search,
  Plus
} from 'lucide-react'

/* ── Supabase Client ──────────────────────────────────────── */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* ── Types ────────────────────────────────────────────────── */
interface Profile {
  id: string
  email: string
  credits: number
  plan: string | null
}

interface HistoryItem {
  id: string
  prompt: string
  result: string
  timestamp: string
}

/* ── Syntax Highlight Utility (Luau) ─────────────────────── */
function highlightLuau(code: string): string {
  const keywords =
    /\b(local|function|end|if|then|else|elseif|while|do|for|in|repeat|until|return|break|true|false|nil|not|and|or|require|game|workspace|script|Instance|new|FindFirstChild|GetService|Connect|Disconnect|FireServer|FireClient|FireAllClients|OnServerEvent|OnClientEvent|WaitForChild|Players|LocalPlayer|Character|Humanoid|HumanoidRootPart|DataStoreService|GetDataStore|GetAsync|SetAsync|RemoveAsync|UpdateAsync|RunService|Heartbeat|RenderStepped|Stepped)\b/g

  const strings = /(["'])(?:(?!\1)[^\\]|\\.)*\1/g
  const comments = /--[^\n]*/g
  const numbers = /\b\d+(\.\d+)?\b/g
  const functions = /\b(\w+)\s*(?=\()/g

  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(comments, '<span style="color:#6A9955">$&</span>')
    .replace(strings, '<span style="color:#CE9178">$&</span>')
    .replace(keywords, '<span style="color:#569CD6;font-weight:600">$1</span>')
    .replace(numbers, '<span style="color:#B5CEA8">$&</span>')
    .replace(functions, '<span style="color:#DCDCAA">$1</span>')
}

/* ── Component ────────────────────────────────────────────── */
export default function DashboardPage() {
  const router = useRouter()

  // State Management
  const [profile, setProfile] = useState<Profile | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('studio')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  /* ── Auth & Profile Fetch ─────────────────────────────── */
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
        return
      }

      // Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileError || !profileData) {
        setProfile({
          id: session.user.id,
          email: session.user.email ?? '',
          credits: 0,
          plan: 'Free',
        })
      } else {
        setProfile(profileData)
      }

      // Simulierter History Fetch
      setHistory([
        { id: '1', prompt: 'Kill Brick Script', result: '-- Script...', timestamp: '2h ago' },
        { id: '2', prompt: 'DataStore Manager', result: '-- DataStore...', timestamp: '5h ago' }
      ])

      setLoadingProfile(false)
    }

    init()
  }, [router])

  /* ── Auto-resize Textarea ─────────────────────────────── */
  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`
    }
  }, [])

  /* ── Generate Code ────────────────────────────────────── */
  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return
    if (!profile || profile.credits <= 0) {
      setError('Insufficient Credits. Upgrade to NEXYRA PRO.')
      return
    }

    setGenerating(true)
    setError(null)
    setOutput('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? `HTTP ${response.status}`)
      }

      const data = await response.json()
      setOutput(data.result ?? '')

      // Local Update
      setProfile((prev) => prev ? { ...prev, credits: Math.max(0, prev.credits - 1) } : prev)

      // Supabase Update
      await supabase.from('profiles').update({ credits: Math.max(0, profile.credits - 1) }).eq('id', profile.id)
      
    } catch (err: any) {
      setError(err.message || 'Neural Link Error.')
    } finally {
      setGenerating(false)
    }
  }

  /* ── UI Helpers ───────────────────────────────────────── */
  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  /* ── Loading View ─────────────────────────────────────── */
  if (loadingProfile) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(139,92,246,0.6)', animation: 'pulse 2s infinite' }}>
            <Cpu size={30} color="#fff" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Nexyra Engine</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Initializing Neural Core...</p>
        </div>
      </div>
    )
  }

  /* ── Main Dashboard View ─────────────────────────────── */
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000000', color: '#fff', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* ── SIDEBAR (LEFT) ── */}
      <aside style={{ width: '280px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(0,0,0,1) 100%)', zIndex: 10 }}>
        
        {/* Brand Header */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
            <Zap size={20} fill="white" color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXYRA ENGINE</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em' }}>BY NEXYRA LABS</div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav style={{ flex: 1, padding: '0 1rem' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0 0.75rem 0.75rem' }}>Workspace</div>
          
          <button 
            onClick={() => setActiveTab('studio')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '12px', border: 'none', background: activeTab === 'studio' ? 'rgba(139, 92, 246, 0.1)' : 'transparent', color: activeTab === 'studio' ? '#A78BFA' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.5rem' }}
          >
            <Terminal size={18} color={activeTab === 'studio' ? '#A78BFA' : 'currentColor'} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Neural Studio</span>
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: activeTab === 'studio' ? 1 : 0 }} />
          </button>

          <button 
            onClick={() => setActiveTab('history')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '12px', border: 'none', background: activeTab === 'history' ? 'rgba(139, 92, 246, 0.1)' : 'transparent', color: activeTab === 'history' ? '#A78BFA' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.5rem' }}
          >
            <Clock size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>History</span>
          </button>

          <button 
             style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '12px', border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <Settings size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Settings</span>
          </button>
        </nav>

        {/* Credits Status Card */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: '20px', padding: '1.25rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Credits Status</span>
              <Shield size={12} color="#A78BFA" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
              {profile?.credits} <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>/ 300</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${((profile?.credits || 0) / 300) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #8B5CF6, #D8B4FE)', borderRadius: '10px', transition: 'width 1s ease-out' }} />
            </div>
            <button style={{ width: '100%', marginTop: '1rem', background: '#fff', border: 'none', padding: '0.6rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, color: '#000', cursor: 'pointer' }}>UPGRADE PLAN</button>
          </div>
        </div>

        {/* User Footer */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={14} color="rgba(255,255,255,0.5)" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{profile?.email}</div>
              <div style={{ fontSize: '0.6rem', color: '#4ADE80', fontWeight: 800, textTransform: 'uppercase' }}>{profile?.plan || 'PRO'} USER</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '0.6rem', borderRadius: '10px', color: '#F87171', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
            <LogOut size={14} /> SIGN OUT
          </button>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE (RIGHT) ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        {/* Header Area */}
        <header style={{ padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Neural Studio</h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Refining ideas into Luau bytecode.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(74, 222, 128, 0.05)', border: '1px solid rgba(74, 222, 128, 0.15)', padding: '0.5rem 1rem', borderRadius: '99px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 10px #4ADE80' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#4ADE80', letterSpacing: '0.05em' }}>ENGINE ONLINE</span>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Input Box (Liquid Glass) */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '1.75rem', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)' }}>
                  <Command size={16} color="#A78BFA" />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>NEURAL PROMPT</span>
              </div>

              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe your Roblox mechanic... (e.g. A custom proximity prompt shop system)"
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 500, outline: 'none', resize: 'none', minHeight: '150px', lineHeight: '1.6' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <div style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>CTRL + ENTER</div>
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={generating || !prompt.trim()}
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(139,92,246,0.2)' }}
                >
                  {generating ? <RotateCcw size={18} className="animate-spin" /> : <Sparkles size={18} fill="white" />}
                  {generating ? 'THINKING...' : 'GENERATE SCRIPT'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ padding: '1rem 1.5rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', color: '#F87171', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Zap size={16} /> {error}
              </div>
            )}

            {/* Output Code Box (High-End Glass) */}
            {output && (
              <div style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', overflow: 'hidden', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ padding: '1rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Code2 size={18} color="#A78BFA" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>LUAU SOURCE CODE</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    style={{ background: 'transparent', border: 'none', color: copied ? '#4ADE80' : 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, transition: 'all 0.2s' }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'COPIED TO CLIPBOARD' : 'COPY CODE'}
                  </button>
                </div>
                
                <div style={{ padding: '2rem', position: 'relative' }}>
                  <pre style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.7', fontFamily: '"JetBrains Mono", "Fira Code", monospace', overflowX: 'auto' }}>
                    <code dangerouslySetInnerHTML={{ __html: highlightLuau(output) }} />
                  </pre>
                </div>

                <div style={{ padding: '1rem 1.75rem', background: 'rgba(139, 92, 246, 0.03)', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'center' }}>
                   <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>Optimized for Roblox Studio 2026</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer Info */}
        <footer style={{ padding: '1rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'center' }}>
           <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.15)', fontWeight: 700, letterSpacing: '0.2em' }}>NEXYRA ENGINE V4.2 // CLAUDE-3.5-SONNET</div>
        </footer>
      </main>

      {/* ── Global Styles ── */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  )
}