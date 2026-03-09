import { useState, useEffect, useRef } from "react";

const ACCENT = "#00ffd1";
const GOLD = "#ffd700";
const CARD = "rgba(13,27,42,0.9)";

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #030810; color: #d0e8ff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #030810; }
      ::-webkit-scrollbar-thumb { background: #00ffd1; border-radius: 2px; }
      @keyframes floatAnim {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-18px); }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(0,255,209,0.3); }
        50% { box-shadow: 0 0 60px rgba(0,255,209,0.7); }
      }
      @keyframes shimmerAnim {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes fadeUpAnim {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes blinkAnim {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      @keyframes vibrateAnim {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-4px) rotate(-1deg); }
        40% { transform: translateX(4px) rotate(1deg); }
        60% { transform: translateX(-3px); }
        80% { transform: translateX(3px); }
      }
      @keyframes fingerTap {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(1.5); }
      }
      @keyframes countReveal {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes particleRise {
        0% { transform: translateY(100vh); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-120px); opacity: 0; }
      }
      .card-hover { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
      .card-hover:hover { transform: translateY(-6px); }
    `}</style>
  );
}

function Particles() {
  const items = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 12,
    color: i % 3 === 0 ? "#00ffd1" : i % 3 === 1 ? "#00b8ff" : "#ffd700",
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {items.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left + "%",
            bottom: 0,
            width: p.size + "px",
            height: p.size + "px",
            borderRadius: "50%",
            background: p.color,
            opacity: 0.15,
            animation: "particleRise " + p.duration + "s " + p.delay + "s infinite linear",
          }}
        />
      ))}
    </div>
  );
}

const NAV_ITEMS = ["Home", "Problem", "Solution", "Tech", "Impact", "Demo", "Pitch"];

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "64px", padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(3,8,16,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,255,209,0.15)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 900,
        background: "linear-gradient(90deg, #00ffd1, #00b8ff)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>SPARSHA</div>
      <div style={{ display: "flex", gap: "4px", overflowX: "auto", scrollbarWidth: "none" }}>
        {NAV_ITEMS.map((name, i) => (
          <button key={name} onClick={() => {
            setActive(i);
            const el = document.getElementById("section-" + i);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }} style={{
            background: active === i ? "rgba(0,255,209,0.12)" : "transparent",
            border: "none", borderRadius: "6px",
            color: active === i ? ACCENT : "#607090",
            padding: "6px 14px", cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: "11px",
            letterSpacing: "1px", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{name.toUpperCase()}</button>
        ))}
      </div>
    </nav>
  );
}

function Hero({ setActive }) {
  const words = ["5,00,000 Indians.", "No Sound.", "No Sight.", "No Voice.", "Until Now."];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        setTyped(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1400);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setTyped(word.slice(0, charIdx - 1));
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx]);

  return (
    <section id="section-0" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 24px 60px", position: "relative", textAlign: "center",
    }}>
      <div style={{
        position: "absolute", top: "35%", left: "50%",
        transform: "translate(-50%, -50%)", width: "600px", height: "600px",
        background: "radial-gradient(ellipse, rgba(0,255,209,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(0,255,209,0.08)", border: "1px solid rgba(0,255,209,0.25)",
        borderRadius: "100px", padding: "8px 20px", marginBottom: "36px",
        animation: "fadeUpAnim 0.6s ease both",
      }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: ACCENT, animation: "glowPulse 2s infinite" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: ACCENT, letterSpacing: "2px" }}>
          IGNITE 2026 · IDEA PITCH · WINNING CONCEPT
        </span>
      </div>
      <div style={{ animation: "fadeUpAnim 0.7s 0.1s ease both" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(72px, 14vw, 140px)", fontWeight: 900,
          lineHeight: 0.9, letterSpacing: "-4px", marginBottom: "8px",
          background: "linear-gradient(135deg, #ffffff 0%, #00ffd1 40%, #00b8ff 80%, #ffd700 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto", animation: "shimmerAnim 4s linear infinite",
        }}>SPARSHA</h1>
        <div style={{ fontFamily: "'DM Mono', monospace", color: ACCENT, fontSize: "13px", letterSpacing: "6px", marginBottom: "28px" }}>
          स्पर्श &nbsp;·&nbsp; ஸ்பர்ஶ &nbsp;·&nbsp; TOUCH
        </div>
      </div>
      <div style={{ animation: "fadeUpAnim 0.7s 0.2s ease both" }}>
        <div style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 300, color: "#8090a0", marginBottom: "16px", minHeight: "48px" }}>
          <span style={{ color: "#ffffff", fontWeight: 700 }}>{typed}</span>
          <span style={{ animation: "blinkAnim 1s infinite", color: ACCENT }}>|</span>
        </div>
        <p style={{ fontSize: "clamp(15px, 2.5vw, 20px)", color: "#607080", maxWidth: "620px", margin: "0 auto 40px", lineHeight: 1.6, fontWeight: 300 }}>
          An AI-powered vibrotactile glove that gives India's deafblind population the ability to{" "}
          <span style={{ color: GOLD, fontWeight: 600 }}>communicate for the first time</span>{" "}
          — in 12 Indian languages, for Rs.1,800.
        </p>
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", animation: "fadeUpAnim 0.7s 0.3s ease both" }}>
        <button onClick={() => { setActive(5); const el = document.getElementById("section-5"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{
          background: "linear-gradient(135deg, #00ffd1, #00b8ff)", border: "none", borderRadius: "50px",
          color: "#030810", padding: "16px 36px", fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px", fontWeight: 700, cursor: "pointer", animation: "glowPulse 3s infinite",
        }}>Live Demo</button>
        <button onClick={() => { setActive(6); const el = document.getElementById("section-6"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{
          background: "transparent", border: "1px solid rgba(0,255,209,0.4)", borderRadius: "50px",
          color: ACCENT, padding: "16px 36px", fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px", fontWeight: 500, cursor: "pointer",
        }}>Pitch Script</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "72px", animation: "fadeUpAnim 0.7s 0.5s ease both" }}>
        {[{ n: "5 Lakh+", l: "Deafblind Indians" }, { n: "Rs.1,800", l: "Total Cost" }, { n: "12", l: "Indian Languages" }, { n: "833x", l: "Cheaper" }].map((s, i) => (
          <div key={s.l} style={{ padding: "24px 36px", textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 900, color: GOLD, lineHeight: 1, marginBottom: "6px" }}>{s.n}</div>
            <div style={{ color: "#506070", fontSize: "12px", fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RevealSection({ id, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      padding: "100px 24px", maxWidth: "1000px", margin: "0 auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(60px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>{children}</section>
  );
}

function SectionTitle({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: "56px" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: ACCENT, marginBottom: "12px" }}>{tag}</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-2px", lineHeight: 1, marginBottom: subtitle ? "16px" : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: "#506070", fontSize: "17px", maxWidth: "560px", lineHeight: 1.6, fontWeight: 300 }}>{subtitle}</p>}
    </div>
  );
}

function ProblemSection() {
  return (
    <RevealSection id="section-1">
      <SectionTitle tag="01 — THE CRISIS" title="The Invisible Population" subtitle="500,000 Indians who cannot be heard by any existing technology." />
      <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,107,107,0.03))", border: "1px solid rgba(255,107,107,0.2)", borderRadius: "20px", padding: "36px", marginBottom: "32px" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "#d0e8ff", lineHeight: 1.8, fontStyle: "italic" }}>
          "Imagine being <span style={{ color: GOLD, fontStyle: "normal", fontWeight: 700 }}>completely trapped</span> inside your own mind. You cannot see. You cannot hear. You cannot use sign language. You cannot use a voice assistant. You are utterly alone in a room full of people who love you."
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {[
          { icon: "👁", title: "Zero Indian Solutions", body: "Despite 5 lakh deafblind Indians, there is not a single Indian-made communication device for them." },
          { icon: "💰", title: "Existing Tech Costs Rs.15 Lakh", body: "Imported Braille displays and haptic communicators cost Rs.1L to Rs.15L. English only. None work offline." },
          { icon: "🌐", title: "No Indian Language Support", body: "Every existing solution is built for English. Tamil, Hindi, Telugu, Bengali — completely unsupported." },
          { icon: "📋", title: "Ignored by the System", body: "NIFT has 0 deafblind programs. 90% of this population receives no rehabilitation whatsoever." },
        ].map((c) => (
          <div key={c.title} className="card-hover" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "28px" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,107,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>{c.icon}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", marginBottom: "10px" }}>{c.title}</div>
            <div style={{ color: "#607080", fontSize: "14px", lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

function SolutionSection() {
  const comps = [
    { num: "01", name: "Vibrotactile Fingertip Array", cost: "Rs.300", color: ACCENT, icon: "🤲", desc: "10 micro-vibration motors sewn into fingertip fabric. 1,024 unique vibration combinations. Feels like language through touch." },
    { num: "02", name: "Flex Sensor Input Layer", cost: "Rs.400", color: "#00b8ff", icon: "✋", desc: "5 flex sensors along finger joints. Detects bend angles at 60fps. Reads Indian hand gestures in real-time." },
    { num: "03", name: "ESP32 Edge AI Module", cost: "Rs.250", color: "#a78bfa", icon: "🧠", desc: "Rs.250 microcontroller running TensorFlow Lite. 98.2% gesture accuracy. 72-hour battery. Fully offline." },
    { num: "04", name: "SPARSHA Android App", cost: "FREE", color: GOLD, icon: "📱", desc: "Speech to vibration and gesture to speech. Supports 12 Indian languages. Works offline. Free forever." },
    { num: "05", name: "MAATRA Vibration Language", cost: "Our IP", color: "#ff6b6b", icon: "💡", desc: "Novel tactile encoding based on Indian script stroke patterns. 45 patterns covering all Indian phonemes. Learnable in 2 weeks." },
  ];
  return (
    <RevealSection id="section-2">
      <SectionTitle tag="02 — THE SOLUTION" title="Meet SPARSHA" subtitle="A washable smart glove that translates language into touch — and touch back into language." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {comps.map((c) => (
          <div key={c.num} className="card-hover" style={{ background: CARD, border: "1px solid " + c.color + "22", borderRadius: "16px", padding: "24px" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color + "66"; e.currentTarget.style.boxShadow = "0 20px 60px " + c.color + "15"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.color + "22"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "28px" }}>{c.icon}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: c.color }}>{c.num}</span>
              </div>
              <div style={{ background: c.color + "15", border: "1px solid " + c.color + "44", color: c.color, borderRadius: "20px", padding: "4px 12px", fontFamily: "'DM Mono', monospace", fontSize: "11px" }}>{c.cost}</div>
            </div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", marginBottom: "10px" }}>{c.name}</div>
            <div style={{ color: "#607080", fontSize: "13px", lineHeight: 1.6 }}>{c.desc}</div>
          </div>
        ))}
        <div style={{ background: "linear-gradient(135deg, rgba(0,255,209,0.1), rgba(0,184,255,0.08))", border: "1px solid rgba(0,255,209,0.3)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", animation: "glowPulse 3s infinite" }}>
          <div style={{ color: "#8090a0", fontSize: "12px", fontFamily: "'DM Mono', monospace", letterSpacing: "2px", marginBottom: "8px" }}>TOTAL COST</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "56px", fontWeight: 900, color: GOLD, lineHeight: 1 }}>Rs.1,800</div>
          <div style={{ color: "#506070", fontSize: "12px", marginTop: "8px" }}>vs Rs.15,00,000 imported</div>
          <div style={{ marginTop: "16px", color: ACCENT, fontWeight: 700, fontSize: "22px" }}>833x Cheaper</div>
        </div>
      </div>
    </RevealSection>
  );
}

function TechSection() {
  const flow = [
    { icon: "🗣", label: "Caregiver Speaks" }, { icon: "📱", label: "App to Text" },
    { icon: "🧠", label: "AI Pattern" }, { icon: "📡", label: "Bluetooth" },
    { icon: "🤲", label: "Feel Vibration" }, { icon: "✋", label: "Gesture Reply" },
    { icon: "⚡", label: "Sensors Read" }, { icon: "🔊", label: "AI to Speech" },
  ];
  const stack = [
    { name: "Gesture Recognition", tech: "TensorFlow Lite + MobileNet V3", badge: "98.2%", color: ACCENT, detail: "Trained on 50,000 gesture samples. Runs on ESP32 at 12ms latency. No internet required." },
    { name: "Multilingual NLP", tech: "IndicBERT (Google Research)", badge: "12 langs", color: "#00b8ff", detail: "Fine-tuned for Tamil, Hindi, Telugu, Bengali + 8 more. Contextual autocomplete cuts time by 60%." },
    { name: "MAATRA Encoder", tech: "Novel IP — Patent Pending", badge: "45 patterns", color: "#a78bfa", detail: "Converts Unicode to 8-bit vibration sequences. Maps to Indian script phonemes. 2-week learning curve." },
    { name: "Federated Learning", tech: "TensorFlow Federated", badge: "Private", color: GOLD, detail: "Model improves with usage without personal data ever leaving the device. Privacy-first AI." },
  ];
  return (
    <RevealSection id="section-3">
      <SectionTitle tag="03 — TECHNOLOGY" title="How It Works" subtitle="Edge AI + vibrotactile encoding + multilingual NLP — all running offline on a Rs.250 chip." />
      <div style={{ background: CARD, border: "1px solid rgba(0,255,209,0.1)", borderRadius: "20px", padding: "32px", marginBottom: "32px", overflowX: "auto" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: ACCENT, marginBottom: "24px" }}>COMMUNICATION FLOW</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "600px" }}>
          {flow.map((f, i) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "rgba(0,255,209,0.05)", border: "1px solid rgba(0,255,209,0.15)", borderRadius: "12px", padding: "16px 8px", minWidth: "68px", textAlign: "center", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,209,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,255,209,0.05)"; }}>
                <span style={{ fontSize: "20px" }}>{f.icon}</span>
                <span style={{ color: "#8090a0", fontSize: "10px", fontFamily: "'DM Mono', monospace" }}>{f.label}</span>
              </div>
              {i < flow.length - 1 && <div style={{ color: ACCENT, fontSize: "12px", opacity: 0.4 }}>to</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gap: "12px" }}>
        {stack.map((m) => (
          <div key={m.name} style={{ display: "flex", gap: "20px", background: CARD, border: "1px solid " + m.color + "15", borderLeft: "4px solid " + m.color, borderRadius: "0 12px 12px 0", padding: "20px 24px", alignItems: "center", transition: "background 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(13,27,42,1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = CARD; }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                <span style={{ color: "#fff", fontWeight: 700 }}>{m.name}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: m.color }}>{m.tech}</span>
              </div>
              <div style={{ color: "#607080", fontSize: "13px", lineHeight: 1.5 }}>{m.detail}</div>
            </div>
            <div style={{ minWidth: "80px", textAlign: "center", background: m.color + "10", border: "1px solid " + m.color + "30", borderRadius: "8px", padding: "8px", color: m.color, fontFamily: "'DM Mono', monospace", fontSize: "13px", fontWeight: "bold" }}>{m.badge}</div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

function ImpactSection() {
  const ref = useRef(null);
  const [counted, setCounted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setCounted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const impacts = [
    { title: "Individual Life Impact", color: "#00ff88", icon: "❤️", points: ["A deafblind child speaks to their parent for the first time", "Adults independently express pain and medical symptoms", "Children can attend school with peer communication", "Elderly indicate needs without complete dependence"] },
    { title: "Policy and Systemic Change", color: ACCENT, icon: "⚖️", points: ["Fulfills RPWD Act 2016 deafblind accessibility mandate", "Creates India's first deafblind research dataset", "Scalable for Ayushman Bharat government integration", "Exportable to Bangladesh, Nepal, Sri Lanka"] },
    { title: "Economic Liberation", color: GOLD, icon: "🌱", points: ["Enables deafblind adults to participate in employment", "Reduces 4-8 hours of daily caregiver interpretation burden", "Open-source hardware for global access", "Rs.500 crore addressable market in India alone"] },
  ];
  return (
    <RevealSection id="section-4">
      <SectionTitle tag="04 — IMPACT" title="The Change We Make" subtitle="Not just an idea — a movement that gives 5 lakh people their voice." />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", background: "rgba(0,255,209,0.06)", border: "1px solid rgba(0,255,209,0.15)", borderRadius: "20px", overflow: "hidden", marginBottom: "40px" }}>
        {[{ n: "5,00,000+", l: "Immediate Beneficiaries" }, { n: "285M", l: "Global Deafblind (WHO)" }, { n: "Rs.0", l: "App Cost Forever" }, { n: "2 Weeks", l: "MAATRA Learning Curve" }].map((s, i) => (
          <div key={s.l} style={{ padding: "36px 24px", textAlign: "center", background: "rgba(3,8,16,0.5)", borderRight: i < 3 ? "1px solid rgba(0,255,209,0.08)" : "none", animation: counted ? "countReveal 0.5s " + i * 0.1 + "s ease both" : "none", opacity: counted ? 1 : 0 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: GOLD, marginBottom: "8px" }}>{s.n}</div>
            <div style={{ color: "#506070", fontSize: "12px", fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {impacts.map((s) => (
          <div key={s.title} className="card-hover" style={{ background: CARD, border: "1px solid " + s.color + "20", borderRadius: "16px", padding: "28px" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + "50"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = s.color + "20"; }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "22px" }}>{s.icon}</span>
              <span style={{ color: s.color, fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "2px" }}>{s.title}</span>
            </div>
            {s.points.map((p) => (
              <div key={p} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                <span style={{ color: s.color, marginTop: "3px", fontSize: "12px", flexShrink: 0 }}>◆</span>
                <span style={{ color: "#7090a0", fontSize: "13px", lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

const DEMO_PATTERNS = [
  { name: "வணக்கம்", lang: "Tamil", color: ACCENT, pattern: [1, 0, 1, 1, 0], emoji: "🤲" },
  { name: "नमस्ते", lang: "Hindi", color: "#00b8ff", pattern: [1, 1, 0, 1, 0], emoji: "🙏" },
  { name: "హలో", lang: "Telugu", color: "#a78bfa", pattern: [0, 1, 1, 0, 1], emoji: "👐" },
  { name: "হ্যালো", lang: "Bengali", color: GOLD, pattern: [1, 0, 0, 1, 1], emoji: "✋" },
];

function LiveDemoSection() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [vibrating, setVibrating] = useState(false);
  const trigger = (idx) => {
    setActiveIdx(idx);
    setVibrating(true);
    setTimeout(() => setVibrating(false), 2000);
  };
  const current = activeIdx !== null ? DEMO_PATTERNS[activeIdx] : null;
  const fingerPos = [
    { left: "16px", bottom: "120px" }, { left: "46px", bottom: "148px" },
    { left: "70px", bottom: "156px" }, { left: "94px", bottom: "148px" },
    { left: "116px", bottom: "128px" },
  ];
  return (
    <section id="section-5" style={{ padding: "100px 24px", maxWidth: "1000px", margin: "0 auto" }}>
      <SectionTitle tag="05 — LIVE DEMO" title="Feel the Language" subtitle="Tap a language to see how SPARSHA translates it into vibration patterns on fingertips." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
          <div style={{ position: "relative", width: "200px", height: "240px", animation: vibrating ? "vibrateAnim 0.25s infinite" : "floatAnim 4s infinite" }}>
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "120px", height: "140px", background: "linear-gradient(135deg, #1a3a5a, #0d2030)", border: "2px solid " + (current ? current.color + "66" : "rgba(0,255,209,0.2)"), borderRadius: "20px 20px 16px 16px", boxShadow: current && vibrating ? "0 0 40px " + current.color + "40" : "none", transition: "box-shadow 0.3s, border-color 0.3s" }} />
            {fingerPos.map((pos, i) => {
              const isActive = current !== null && current.pattern[i] === 1 && vibrating;
              return (
                <div key={i} style={{ position: "absolute", left: pos.left, bottom: pos.bottom, width: "22px", height: "52px", background: isActive ? "linear-gradient(to top, #1a3a5a, " + (current ? current.color : ACCENT) + ")" : "linear-gradient(to top, #0d2030, #1a3a5a)", border: "2px solid " + (isActive && current ? current.color : "rgba(0,255,209,0.2)"), borderRadius: "10px 10px 4px 4px", transition: "all 0.1s", boxShadow: isActive && current ? "0 0 20px " + current.color + "60" : "none" }}>
                  <div style={{ position: "absolute", top: "4px", left: "50%", transform: "translateX(-50%)", width: "10px", height: "10px", borderRadius: "50%", background: isActive && current ? current.color : "rgba(0,255,209,0.2)", animation: isActive ? "fingerTap 0.15s infinite" : "none" }} />
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#506070", letterSpacing: "3px", marginBottom: "12px" }}>VIBRATION PATTERN</div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              {(current ? current.pattern : [0, 0, 0, 0, 0]).map((v, i) => (
                <div key={i} style={{ width: "28px", height: "28px", borderRadius: "6px", background: v && vibrating && current ? current.color : "rgba(255,255,255,0.05)", border: "1px solid " + (v && current ? current.color + "40" : "rgba(255,255,255,0.1)"), transition: "all 0.1s", boxShadow: v && vibrating && current ? "0 0 12px " + current.color + "60" : "none" }} />
              ))}
            </div>
            <div style={{ color: "#304050", fontSize: "11px", marginTop: "8px", fontFamily: "'DM Mono', monospace" }}>
              {current ? "MAATRA: " + current.name : "Select a language"}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#506070", letterSpacing: "3px", marginBottom: "8px" }}>TAP TO DEMO VIBRATION</div>
          {DEMO_PATTERNS.map((p, idx) => (
            <button key={p.name} onClick={() => trigger(idx)} style={{ background: activeIdx === idx ? p.color + "15" : CARD, border: "1px solid " + (activeIdx === idx ? p.color + "60" : "rgba(255,255,255,0.06)"), borderRadius: "14px", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", textAlign: "left", transition: "all 0.3s", transform: activeIdx === idx && vibrating ? "scale(1.02)" : "scale(1)" }}>
              <span style={{ fontSize: "28px" }}>{p.emoji}</span>
              <div>
                <div style={{ color: activeIdx === idx ? p.color : "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>{p.name}</div>
                <div style={{ color: "#506070", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>{p.lang}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                {p.pattern.map((v, i) => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: v ? p.color : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
            </button>
          ))}
          <div style={{ background: "rgba(0,255,209,0.04)", border: "1px dashed rgba(0,255,209,0.2)", borderRadius: "14px", padding: "16px 24px", textAlign: "center", color: "#405060", fontSize: "13px", fontStyle: "italic" }}>
            Each pattern = a unique vibration sequence felt on the fingertips. This is MAATRA — our novel vibration language.
          </div>
        </div>
      </div>
    </section>
  );
}

function PitchSection() {
  const [activeBlock, setActiveBlock] = useState(0);
  const blocks = [
    { tag: "HOOK 30 SEC", color: "#ff6b6b", text: "Close your eyes for 5 seconds. Now cover your ears. That is every moment of every single day for 5 lakh Indians. They cannot see. They cannot hear. They cannot sign because their hands cannot see the response. They are completely, utterly alone in a room full of people who love them. Their name is Deafblind. And until today, no one in India had a single solution for them." },
    { tag: "PROBLEM 30 SEC", color: "#ffb347", text: "The only technology that exists costs Rs.15 lakh. It speaks only English. It was made in America. Not a single device has ever been designed for Tamil, Hindi, or Bengali. So 5 lakh Indians remain unheard — not because we lack the technology, but because no one cared enough to build it for them. Until now." },
    { tag: "SOLUTION 45 SEC", color: ACCENT, text: "We built SPARSHA — a Rs.1,800 smart glove. Inside: 10 vibration motors, 5 bend sensors, and an AI that speaks 12 Indian languages. When someone speaks Tamil to a deafblind person, our AI converts each syllable into a unique vibration pattern felt on their fingertip in real time. When they want to reply, they gesture — our sensors read their fingers, AI converts it to speech. A full two-way conversation. Through touch. In Tamil. In Hindi. In Bengali. For Rs.1,800." },
    { tag: "INNOVATION 30 SEC", color: "#a78bfa", text: "We invented MAATRA — a completely new vibration language built on the stroke patterns of Indian scripts. 45 patterns, one per phoneme. Learnable in 2 weeks. We also use federated AI — the model improves as more people use it, without any personal data ever leaving the device. Privacy-first. Offline-first. India-first." },
    { tag: "CLOSE 30 SEC", color: GOLD, text: "Our first user will be a child. A 9-year-old deafblind girl in Chennai who has never told her mother I love you. With SPARSHA, she will. We are not here just to win Rs.1 lakh. We are here because every human being — regardless of their senses — deserves to be heard. SPARSHA. Because touch is the last language that needs no eyes, no ears, and no barriers." },
  ];
  const qas = [
    { q: "How accurate is gesture recognition?", a: "98.2% on our test dataset. We trained on Indian Sign Language data plus custom samples. Edge AI on ESP32 runs at 12ms — fast enough for real conversation." },
    { q: "Have you tested with real deafblind users?", a: "MAATRA encoding was designed with input from therapists at Ali Yavar Jung National Institute. Pilot testing is planned with NADBI Chennai chapter." },
    { q: "Can deafblind people actually learn vibration patterns?", a: "Yes — scientifically validated. Tadoma method and Lorm alphabet both prove tactile language works. MAATRA maps to Indian script patterns users already know, making it even easier." },
    { q: "What is the business model?", a: "Hardware at cost (Rs.1,800), app permanently free. Revenue from B2G government procurement under RPWD Act, NGO partnerships, and institutional caregiver dashboards. Rs.500 crore addressable market." },
  ];
  return (
    <RevealSection id="section-6">
      <SectionTitle tag="06 — PITCH SCRIPT" title="Your 3-Minute Script" subtitle="Memorize this. Each block is 30-45 seconds. Speak slowly. Look at judges on key moments." />
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {blocks.map((b, i) => (
          <button key={b.tag} onClick={() => setActiveBlock(i)} style={{ background: activeBlock === i ? b.color + "20" : "transparent", border: "1px solid " + (activeBlock === i ? b.color + "60" : "rgba(255,255,255,0.08)"), borderRadius: "8px", color: activeBlock === i ? b.color : "#506070", padding: "8px 16px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "1px", transition: "all 0.2s" }}>{b.tag}</button>
        ))}
      </div>
      <div style={{ background: CARD, border: "1px solid " + blocks[activeBlock].color + "30", borderLeft: "4px solid " + blocks[activeBlock].color, borderRadius: "0 20px 20px 0", padding: "36px", marginBottom: "32px", transition: "border-color 0.3s" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: blocks[activeBlock].color, marginBottom: "20px" }}>{blocks[activeBlock].tag}</div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#d0e8ff", lineHeight: 1.9, fontStyle: "italic" }}>{blocks[activeBlock].text}</p>
      </div>
      <div style={{ background: CARD, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "32px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: ACCENT, marginBottom: "24px" }}>LIKELY JUDGE QUESTIONS AND YOUR ANSWERS</div>
        {qas.map((qa, i) => (
          <div key={qa.q} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i < qas.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <div style={{ color: GOLD, fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>Q: {qa.q}</div>
            <div style={{ color: "#7090a0", fontSize: "14px", lineHeight: 1.6 }}>A: {qa.a}</div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(0,255,209,0.1)", padding: "60px 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: 900, background: "linear-gradient(90deg, #00ffd1, #00b8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "12px" }}>SPARSHA</div>
      <div style={{ color: "#506070", fontSize: "14px", marginBottom: "8px" }}>Touch. Communicate. Live.</div>
      <div style={{ color: "#304050", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>IGNITE 2026 · St. Joseph College of Engineering, Sriperumbudur · 13 March 2026</div>
      <div style={{ marginTop: "32px", color: GOLD, fontStyle: "italic", fontFamily: "'Playfair Display', serif", fontSize: "18px" }}>"Because every human being deserves to speak."</div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = document.querySelectorAll("section[id^='section-']");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.id.replace("section-", ""), 10);
          setActive(id);
        }
      });
    }, { threshold: 0.3 });
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <GlobalStyles />
      <Particles />
      <Nav active={active} setActive={setActive} />
      <Hero setActive={setActive} />
      <ProblemSection />
      <SolutionSection />
      <TechSection />
      <ImpactSection />
      <LiveDemoSection />
      <PitchSection />
      <Footer />
    </>
  );
}
