'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react'

/* ── Supabase Client (Auth, no helpers) ───────────────────── */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type AuthMode = 'signin' | 'signup'

export default function LoginPage() {
  const router = useRouter()

  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        })
        if (signUpError) throw signUpError
        setMessage('Check your email to confirm your account.')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Card */}
      <div
        className="glass-card-strong animate-fade-in-up"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.75rem',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <div
            className="animate-float"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 0 30px rgba(139, 92, 246, 0.5), 0 8px 20px rgba(0,0,0,0.5)',
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={24} color="#fff" />
          </div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '0.375rem',
            }}
          >
            Nexyra Engine
          </h1>
          <p
            style={{
              fontSize: '0.825rem',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            {mode === 'signin'
              ? 'Sign in to your workspace'
              : 'Create your account'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '1.75rem',
          }}
        >
          {(['signin', 'signup'] as AuthMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m)
                setError(null)
                setMessage(null)
              }}
              style={{
                flex: 1,
                padding: '0.625rem',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                background:
                  mode === m
                    ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
                    : 'transparent',
                color: mode === m ? '#ffffff' : 'rgba(255,255,255,0.4)',
                boxShadow:
                  mode === m
                    ? '0 2px 12px rgba(139, 92, 246, 0.4)'
                    : 'none',
              }}
            >
              {m === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Email */}
          <div style={{ position: 'relative' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.775rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={15}
                color="rgba(255,255,255,0.25)"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.775rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={15}
                color="rgba(255,255,255,0.25)"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={8}
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                  fontSize: '0.9rem',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.25)',
                  display: 'flex',
                  padding: 0,
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
              }}
            >
              <AlertCircle
                size={15}
                color="#F87171"
                style={{ flexShrink: 0, marginTop: '1px' }}
              />
              <p
                style={{
                  fontSize: '0.825rem',
                  color: '#F87171',
                  lineHeight: 1.5,
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
              }}
            >
              <Sparkles size={15} color="#4ADE80" style={{ flexShrink: 0 }} />
              <p
                style={{
                  fontSize: '0.825rem',
                  color: '#4ADE80',
                  lineHeight: 1.5,
                }}
              >
                {message}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              padding: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }}
                />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {mode === 'signin' ? 'Enter Studio' : 'Create Account'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.2)',
            marginTop: '1.75rem',
          }}
        >
          By continuing, you agree to Nexyra Labs&apos; Terms of Service.
        </p>
      </div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}