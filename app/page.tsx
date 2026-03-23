'use client';

import React, { useState } from 'react';
import { 
  Zap, ChevronRight, Plus, Cpu, Shield, Globe, 
  Code2, Sparkles, Rocket, Check, Minus, ShoppingCart 
} from 'lucide-react';
import Link from 'next/link';

export default function NexyraHome() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050506] text-white font-sans italic selection:bg-purple-500/30">
      
      {/* 🌌 NAVIGATION */}
      <nav className="flex items-center justify-between px-12 py-8 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8b5cf6] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <Zap size={22} fill="white" color="white" />
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase">NEXYRA</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <a href="#tutorial" className="hover:text-purple-400 transition-colors">Tutorial</a>
          <a href="#features" className="hover:text-purple-400 transition-colors">Benefits</a>
          <a href="#shop" className="hover:text-purple-400 transition-colors">Shop</a>
          <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
        </div>
        <Link href="/dashboard" className="bg-white text-black px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#8b5cf6] hover:text-white transition-all">
          Launch Engine
        </Link>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="pt-32 pb-24 px-6 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
        <h1 className="text-[100px] font-black tracking-[-0.06em] leading-[0.85] mb-12 uppercase">
          BUILD <span className="text-[#8b5cf6]">BETTER</span><br />GAMES FAST.
        </h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-16 font-medium italic">
          Nexyra Engine ist das einzige Tool, das deine Gedanken direkt in Luau-Code für Roblox Studio verwandelt.
        </p>
        <Link href="/dashboard" className="bg-[#8b5cf6] text-white px-12 py-6 rounded-[30px] font-black text-xl shadow-[0_25px_60px_rgba(139,92,246,0.4)] hover:-translate-y-2 transition-all inline-flex items-center gap-4 uppercase">
          Start Coding <Rocket size={28} />
        </Link>
      </section>

      {/* 📖 TUTORIAL: WIE GIBT MAN ANWEISUNGEN? */}
      <section id="tutorial" className="py-32 px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 uppercase tracking-tight">How to <span className="text-[#8b5cf6]">Command</span> the Engine</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Be Specific", desc: "Sag nicht 'ein Schwert', sag 'ein Katana-System mit 3 Combos und Trail-Effekt'." },
            { step: "02", title: "Define Variables", desc: "Gib Werte an wie 'Schaden: 20' oder 'Cooldown: 1.5 Sekunden'." },
            { step: "03", title: "Initialize", desc: "Klicke auf den Button und kopiere den Code direkt in dein Script-Objekt." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d0f] p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
              <div className="text-8xl font-black text-white/5 absolute -right-4 -top-4 group-hover:text-purple-500/10 transition-colors">{item.step}</div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 NUMBERS SECTION */}
      <section className="py-24 px-12 bg-[#08080a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { label: "games created with Nexyra", val: "75K+" },
            { label: "scripts generated per day", val: "5K+" },
            { label: "Robux earned by our users", val: "3M+" }
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-7xl font-black mb-4 tracking-tighter italic text-white uppercase">{stat.val}</h3>
              <p className="text-gray-600 font-black uppercase tracking-widest text-[10px] leading-relaxed italic">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 WHY NEXYRA? SECTION */}
      <section id="features" className="py-40 px-12 max-w-7xl mx-auto">
        <h2 className="text-5xl font-black mb-20 text-center uppercase tracking-tighter leading-none italic">Warum <span className="text-[#8b5cf6]">Nexyra Labs?</span></h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { title: "High-Speed-Processing", icon: <Cpu />, desc: "Keine Wartezeiten. Generiere komplexe Systeme in unter 10 Sekunden." },
            { title: "V4.0 Platinum Engine", icon: <Code2 />, desc: "Der Code ist perfekt optimiert für Roblox Studio – kein Error mehr." },
            { title: "Kein Scripting-Vorwissen", icon: <Sparkles />, desc: "Perfekt für Builder und Designer, die ihre Games zum Leben erwecken wollen." },
            { title: "24/7 Security", icon: <Shield />, desc: "Alle generierten Scripts sind sicher vor Backdoors und Exploits." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d0f] border border-white/5 p-10 rounded-[30px] flex gap-8 items-start hover:border-purple-500/20 transition-all">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-xl font-black mb-3 uppercase tracking-tighter italic">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed italic text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛒 SHOP / PRICING SECTION */}
      <section id="shop" className="py-40 px-12 bg-[#08080a]">
        <h2 className="text-5xl font-black mb-24 text-center italic text-white uppercase tracking-tighter leading-none">Choose your <span className="text-[#8b5cf6]">Power.</span></h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { plan: "Free", price: "$0", features: ["1 Credit per Day", "Standard Speed", "Community Support"], color: "bg-white/5", text: "text-white" },
            { plan: "Pro", price: "$15", features: ["50 Credits per Day", "Turbo Speed", "Priority Support", "Advanced AI"], color: "bg-[#8b5cf6]", text: "text-white" },
            { plan: "Enterprise", price: "$49", features: ["Unlimited Credits", "Instant Generation", "Custom Engine Models", "Discord Role"], color: "bg-white/5", text: "text-white" }
          ].map((item, i) => (
            <div key={i} className={`${item.color} p-12 rounded-[40px] border border-white/5 flex flex-col items-center hover:-translate-y-4 transition-all duration-500`}>
              <h3 className={`text-2xl font-black uppercase mb-4 italic ${item.plan === "Pro" ? "text-white" : "text-gray-400"}`}>{item.plan}</h3>
              <div className="text-6xl font-black mb-12 italic uppercase tracking-tighter">{item.price}</div>
              <ul className="space-y-6 w-full mb-16">
                {item.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm font-bold uppercase italic opacity-80"><Check size={18} /> {f}</li>
                ))}
              </ul>
              <button className={`w-full py-5 rounded-[24px] font-black uppercase italic tracking-widest text-sm transition-all shadow-xl ${item.plan === "Pro" ? "bg-white text-black hover:scale-105" : "bg-white/5 text-white hover:bg-white/10"}`}>
                <ShoppingCart className="inline mr-2" size={18} /> Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section id="faq" className="py-40 px-12 max-w-3xl mx-auto">
        <h2 className="text-6xl font-black mb-24 text-center italic text-[#8b5cf6] uppercase tracking-tighter">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: "Brauche ich Scripting-Vorwissen?", a: "Nein! Du beschreibst dein System einfach auf Deutsch oder Englisch und Nexyra erledigt den Rest." },
            { q: "Was sind Credits?", a: "Jedes generierte Script kostet 1 Credit. Du bekommst täglich neue oder kaufst ein Pro-Paket." },
            { q: "Ist der Code sicher?", a: "Ja, alle Scripts werden auf Sicherheitslücken geprüft, bevor sie ausgegeben werden." },
            { q: "Funktioniert es in jedem Roblox Game?", a: "Absolut. Der Code ist mit den neuesten Roblox-API Standards (Luau) kompatibel." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d0f] border border-white/5 p-8 rounded-3xl cursor-pointer group hover:bg-[#121215] transition-all" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex justify-between items-center">
                <span className="font-black uppercase text-lg group-hover:text-purple-400 italic tracking-tight">{item.q}</span>
                {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
              </div>
              {openFaq === i && (
                <p className="mt-8 text-gray-500 font-medium leading-relaxed italic animate-in fade-in slide-in-from-top-2">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🌑 FOOTER */}
      <footer className="border-t border-white/5 py-32 px-12 bg-black text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-8 h-8 bg-[#8b5cf6] rounded-lg flex items-center justify-center font-black">N</div>
          <span className="font-black italic tracking-tighter text-xl uppercase italic">NEXYRA LABS</span>
        </div>
        <p className="text-gray-700 font-black text-[10px] uppercase tracking-[0.5em] italic">© 2026 NEXYRA LABS — MASTER PROTOCOL INITIALIZED</p>
      </footer>
    </div>
  );
}