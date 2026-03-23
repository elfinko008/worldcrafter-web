'use client'

import Link from 'next/link'
import {
  Zap,
  Code2,
  Sparkles,
  Check,
  ArrowRight,
  Terminal,
  Shield,
  Clock,
} from 'lucide-react'

/* ── Pricing Data ─────────────────────────────────────────── */
const PLANS = [
  {
    id: 'hobby',
    name: 'Hobby',
    price: '8.99',
    period: 'month',
    description: 'Perfect for individual developers getting started.',
    prompts: 100,
    features: [
      '100 AI Prompts / month',
      'Claude 3.5 Sonnet powered',
      'Luau Code Generation',
      'Syntax Highlighting',
      'Community Support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '15.99',
    period: 'month',
    description: 'For serious developers building production games.',
    prompts: 300,
    features: [
      '300 AI Prompts / month',
      'Claude 3.5 Sonnet powered',
      'Luau Code Generation',
      'Syntax Highlighting',
      'Priority Founder Support',
      'Early Access Features',
      'Advanced Code Patterns',
    ],
    cta: 'Go Pro',
    featured: true,
  },
] as const

/* ── Feature Cards Data ───────────────────────────────────── */
const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description:
      'Generate production-ready Luau code in milliseconds. No boilerplate, no syntax errors.',
  },
  {
    icon: Shield,
    title: 'Studio-Ready Output',
    description:
      'Every snippet is formatted for direct paste into Roblox Studio. Zero friction.',
  },
  {
    icon: Terminal,
    title: 'Deep Luau Knowledge',
    description:
      'Trained on Roblox API patterns. Understands DataStore, RemoteEvents, and more.',
  },
  {
    icon: Clock,
    title: '10× Faster Dev Cycles',
    description:
      'What used to take hours now takes seconds. Ship your game before your competition.',
  },
]

/* ── Component ────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        overflowX: 'hidden',
      }}
    >
      {/* ── Navigation ────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(139, 92, 246, 0.5)',
            }}
          >
            <Sparkles size={16} color="#fff" />
          </div>
          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            Nexyra Engine
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/login">
            <button className="btn-ghost" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Sign In
            </button>
          </Link>
          <Link href="/login">
            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Start Building
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ──────────────────────────────────── */}
      <section
        style={{
          paddingTop: '180px',
          paddingBottom: '120px',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Badge */}
        <div
          className="animate-fade-in-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '999px',
            padding: '0.375rem 1rem',
            marginBottom: '2.5rem',
          }}
        >
          <Sparkles size={13} color="#A78BFA" />
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#A78BFA',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Powered by Claude 3.5 Sonnet
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="headline-hero animate-fade-in-up delay-100"
          style={{ marginBottom: '1rem' }}
        >
          CODE FASTER.
          <br />
          BUILD BETTER.
        </h1>

        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.55)',
            maxWidth: '560px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          The AI engine built exclusively for Roblox developers.
          Generate perfect Luau code in seconds — powered by Nexyra Labs.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up delay-300"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/login">
            <button
              className="btn-primary animate-pulse-glow"
              style={{
                padding: '0.875rem 2.25rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Launch Studio
              <ArrowRight size={16} />
            </button>
          </Link>
          <a href="#pricing">
            <button
              className="btn-ghost"
              style={{ padding: '0.875rem 2.25rem', fontSize: '0.95rem' }}
            >
              View Pricing
            </button>
          </a>
        </div>

        {/* Stats Row */}
        <div
          className="animate-fade-in-up delay-400"
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '3.5 Sonnet', label: 'AI Model' },
            { value: '< 2s', label: 'Avg Response' },
            { value: '99.9%', label: 'Uptime SLA' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#A78BFA',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────── */}
      <section
        style={{
          padding: '80px 2rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card animate-fade-in-up"
              style={{
                padding: '1.75rem',
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <feature.icon size={20} color="#A78BFA" />
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing Section ───────────────────────────────── */}
      <section
        id="pricing"
        style={{
          padding: '100px 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div className="animate-fade-in-up">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '999px',
              padding: '0.3rem 0.875rem',
              marginBottom: '1.5rem',
            }}
          >
            <Code2 size={12} color="#A78BFA" />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#A78BFA',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Pricing
            </span>
          </div>

          <h2
            className="headline-section"
            style={{ marginBottom: '1rem' }}
          >
            Simple, Transparent Pricing
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '1rem',
              marginBottom: '4rem',
              maxWidth: '480px',
              margin: '0 auto 4rem',
            }}
          >
            No hidden fees. Pay monthly, cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`animate-fade-in-up ${
                plan.featured ? 'pricing-card-featured' : 'glass-card'
              }`}
              style={{
                padding: '2.25rem',
                textAlign: 'left',
                animationDelay: `${i * 0.15}s`,
                animationFillMode: 'both',
                transform: plan.featured ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    borderRadius: '999px',
                    padding: '0.25rem 0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Sparkles size={11} color="#A78BFA" />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#A78BFA',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '0.375rem',
                }}
              >
                {plan.name}
              </h3>

              <p
                style={{
                  fontSize: '0.825rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '1.75rem',
                  lineHeight: 1.5,
                }}
              >
                {plan.description}
              </p>

              {/* Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.25rem',
                  marginBottom: '2rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.5)',
                    alignSelf: 'flex-start',
                    marginTop: '0.5rem',
                  }}
                >
                  $
                </span>
                <span
                  style={{
                    fontSize: '3.25rem',
                    fontWeight: 800,
                    color: plan.featured ? '#A78BFA' : 'rgba(255,255,255,0.95)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: '0.825rem',
                    color: 'rgba(255,255,255,0.35)',
                    fontWeight: 500,
                  }}
                >
                  / {plan.period}
                </span>
              </div>

              {/* Features List */}
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: plan.featured
                          ? 'rgba(139, 92, 246, 0.2)'
                          : 'rgba(255, 255, 255, 0.06)',
                        border: `1px solid ${
                          plan.featured
                            ? 'rgba(139, 92, 246, 0.4)'
                            : 'rgba(255, 255, 255, 0.1)'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check
                        size={10}
                        color={plan.featured ? '#A78BFA' : 'rgba(255,255,255,0.5)'}
                        strokeWidth={3}
                      />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="divider" style={{ margin: '0 0 1.5rem' }} />

              {/* CTA */}
              <Link href="/login">
                <button
                  className={plan.featured ? 'btn-primary' : 'btn-ghost'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {plan.cta}
                  <ArrowRight
                    size={14}
                    style={{ marginLeft: '0.5rem', display: 'inline' }}
                  />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '2.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={11} color="#fff" />
          </div>
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Nexyra Labs
          </span>
        </div>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.02em',
          }}
        >
          © {new Date().getFullYear()} Nexyra Labs. All rights reserved.
        </p>
      </footer>
    </main>
  )
}