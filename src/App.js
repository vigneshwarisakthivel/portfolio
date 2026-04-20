import { useState, useEffect, useRef } from "react";

const theme = {
  bg: "#0a0a0f",
  bgCard: "#12121a",
  bgCardHover: "#1a1a26",
  border: "#1e1e2e",
  borderHover: "#2d2d4e",
  accent: "#7c6aff",
  accentSoft: "#a594ff",
  accentGlow: "rgba(124,106,255,0.15)",
  accentGlow2: "rgba(124,106,255,0.08)",
  teal: "#2dd4bf",
  tealSoft: "#5eead4",
  text: "#e2e0f0",
  textMuted: "#bbbacb",
  textDim: "#5a596e",
  success: "#4ade80",
  amber: "#fbbf24",
};

const styles = {
  global: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Outfit:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    .show-mobile-flex { display: none !important; }
    .tabs-bar::-webkit-scrollbar { display: none; }
@media (max-width: 768px) { .show-mobile-flex { display: flex !important; } }
    body { background: ${theme.bg}; color: ${theme.text}; font-family: 'Outfit', sans-serif; line-height: 1.6; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${theme.bg}; }
    ::-webkit-scrollbar-thumb { background: ${theme.accent}; border-radius: 3px; }
    ::selection { background: ${theme.accentGlow}; color: ${theme.accentSoft}; }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; border: none; background: none; font-family: inherit; }
    img { max-width: 100%; }
    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(124,106,255,0.4)} 50%{box-shadow:0 0 0 12px rgba(124,106,255,0)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes spin-slow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes scale-in { from{transform:scale(0.9);opacity:0} to{transform:scale(1);opacity:1} }
    .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(124,106,255,0.2); }
    @media (max-width: 768px) {
      h1 { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
      .grid-2 { grid-template-columns: 1fr !important; }
      .grid-3 { grid-template-columns: 1fr !important; }
      .hide-mobile { display: none !important; }
      .stack-mobile { flex-direction: column !important; }
      nav ul { gap: 12px !important; }
    }
  `,
};

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Stack", "Contact"];

// ─── SVG Icon Library ───────────────────────────────────────────────────────

function IconZap({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function IconRocket({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function IconGraduationCap({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function IconBook({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}

function IconBriefcase({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function IconUsers({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function IconClipboard({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  );
}

function IconWrench({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function IconCheckCircle({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

function IconDatabase({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  );
}

function IconRefresh({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  );
}

function IconBot({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  );
}

function IconLock({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function IconFileText({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function IconFilter({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}

function IconUserCheck({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <polyline points="17 11 19 13 23 9"/>
    </svg>
  );
}

function IconBarChart({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}

function IconShield({ size = 28, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function IconTarget({ size = 28, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

function IconPython({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 6 4.48 6 6v2h6v1H4.5C3.12 9 2 10.12 2 11.5v3C2 15.88 3.12 17 4.5 17H6v-2c0-1.66 1.34-3 3-3h6c1.1 0 2-.9 2-2V6c0-1.1-.9-4-5-4z"/>
      <circle cx="9" cy="6" r="1" fill={color} stroke="none"/>
      <path d="M12 22c5.52 0 6-2.48 6-4v-2h-6v-1h7.5c1.38 0 2.5-1.12 2.5-2.5v-3C22 8.12 20.88 7 19.5 7H18v2c0 1.66-1.34 3-3 3H9c-1.1 0-2 .9-2 2v4c0 1.1.9 4 5 4z"/>
      <circle cx="15" cy="18" r="1" fill={color} stroke="none"/>
    </svg>
  );
}

function IconReact({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  );
}

function IconServer({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  );
}

function IconDocker({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12.5c-.18-1.27-1.32-2-2.5-2h-.5V9a1 1 0 0 0-1-1h-4V6h-2V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H4a1 1 0 0 0-1 1v2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18.5"/>
      <path d="M2 13c0 3.87 3.13 7 7 7h6c3.87 0 7-3.13 7-7"/>
    </svg>
  );
}


function IconGlobe({ size = 13, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function IconMail({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}


function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  return (
    <div ref={ref} className={`fade-in ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ label, center }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      justifyContent: center ? "center" : "flex-start", marginBottom: "0.5rem",
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", fontWeight: 400,
        color: theme.textMuted, letterSpacing: "0.12em",
      }}>{label}</span>
      <div style={{ flex: center ? "unset" : 1, height: "1px", background: theme.border, width: center ? "60px" : "auto" }} />
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE FIXES — 3 drop-in replacements for Portfolio.jsx
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. NAVBAR ─────────────────────────────────────────────────────────────────
// Replace the entire Navbar() function with this one.
// Adds a hamburger menu that collapses nav links on mobile.

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? "rgba(10,10,15,0.96)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${theme.border}40` : "none",
      transition: "all 0.3s ease",
      padding: "1rem 2rem",
    }}>
      {/* Top row: logo + hamburger */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem",
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.teal})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{"<VS.dev />"}</span>

        {/* Desktop nav */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}
          className="hide-mobile">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "0.875rem", fontWeight: 500,
                color: active === link ? theme.accentSoft : theme.textMuted,
                transition: "color 0.2s", letterSpacing: "0.03em",
              }}
                onMouseEnter={e => e.target.style.color = theme.text}
                onMouseLeave={e => e.target.style.color = active === link ? theme.accentSoft : theme.textMuted}>
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: "none", flexDirection: "column", gap: "5px",
            padding: "4px", background: "none", border: "none", cursor: "pointer",
          }}
          className="show-mobile-flex"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 2, borderRadius: 1,
              background: theme.textMuted,
              transform: menuOpen
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                : i === 2 ? "translateY(-7px) rotate(-45deg)"
                : "scaleX(0)"
                : "none",
              transition: "transform 0.25s ease, opacity 0.25s",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div style={{
        overflow: "hidden",
        maxHeight: menuOpen ? "400px" : "0",
        transition: "max-height 0.35s ease",
      }}>
        <ul style={{
          listStyle: "none", paddingTop: "1rem", paddingBottom: "0.5rem",
          display: "flex", flexDirection: "column", gap: "0",
        }}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} style={{
                width: "100%", textAlign: "left",
                padding: "0.75rem 0",
                fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 500,
                color: active === link ? theme.accentSoft : theme.textMuted,
                borderBottom: `1px solid ${theme.border}40`,
                transition: "color 0.2s",
              }}>
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function GridBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
        backgroundSize: "60px 60px", opacity: 0.4,
      }} />
      <div style={{
        position: "absolute", top: "10%", left: "15%", width: "600px", height: "600px",
        background: `radial-gradient(circle, rgba(124,106,255,0.12) 0%, transparent 70%)`,
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%", width: "400px", height: "400px",
        background: `radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)`,
        filter: "blur(40px)",
      }} />
    </div>
  );
}

function TypeWriter({ words = [] }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (!deleting && display === word) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && display === "") {
      setDeleting(false);
      setWordIdx(i => i + 1);
    } else {
      timeout = setTimeout(() => {
        setDisplay(deleting ? display.slice(0, -1) : word.slice(0, display.length + 1));
      }, deleting ? 45 : 90);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words]);
  return (
    <span style={{ color: theme.accentSoft }}>
      {display}<span style={{ animation: "blink 1s infinite", color: theme.accent }}>|</span>
    </span>
  );
}

const TERM_LINES = [
  { type: "cmt",  raw: "// developer.profile.ts" },
  { type: "blank" },
  { type: "mix",  parts: [["kw","interface "],["fn","Developer"],["op"," {"]] },
  { type: "mix",  parts: [["op","  "],["prop","name"],["op","       : "],["str","string"],["op",";"]] },
  { type: "mix",  parts: [["op","  "],["prop","role"],["op","       : "],["str","string"],["op",";"]] },
  { type: "mix",  parts: [["op","  "],["prop","yearsExp"],["op","   : "],["str","number"],["op",";"]] },
  { type: "mix",  parts: [["op","  "],["prop","openToWork"],["op"," : "],["str","boolean"],["op",";"]] },
  { type: "op",   raw: "}" },
  { type: "blank" },
  { type: "mix",  parts: [["kw","const "],["fn","dev"],["op"," : "],["fn","Developer"],["op"," = {"]] },
  { type: "mix",  parts: [["op","  "],["prop","name"],["op","       : "],["str",'"Vigneshwari Sakthivel"'],["op",","]] },
  { type: "mix",  parts: [["op","  "],["prop","role"],["op","       : "],["str",'"Full Stack Dev"'],["op",","]] },
  { type: "mix",  parts: [["op","  "],["prop","yearsExp"],["op","   : "],["num","1.1"],["op",","]] },
  { type: "mix",  parts: [["op","  "],["prop","openToWork"],["op"," : "],["bool","true"],["op",","]] },
  { type: "op",   raw: "}" },
];

const TC = {
  kw: "#ff7b72", fn: "#d2a8ff", prop: "#79c0ff",
  str: "#a5d6ff", num: "#f0883e", bool: "#79c0ff",
  op: "#c9d1d9", cmt: "#8b949e",
};

function TerminalLine({ line, num }) {
  const lnStyle = {
    color: "#3d444d", marginRight: "14px", userSelect: "none",
    minWidth: "16px", display: "inline-block", textAlign: "right",
    fontFamily: "'DM Mono', monospace", fontSize: "0.78rem",
  };
  const base = { display: "flex", lineHeight: "1.9", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem" };
  if (line.type === "blank") return <div style={base}><span style={lnStyle}>{num}</span><span>&nbsp;</span></div>;
  if (line.type === "cmt")   return <div style={base}><span style={lnStyle}>{num}</span><span style={{ color: TC.cmt }}>{line.raw}</span></div>;
  if (line.type === "op")    return <div style={base}><span style={lnStyle}>{num}</span><span style={{ color: TC.op }}>{line.raw}</span></div>;
  return (
    <div style={base}>
      <span style={lnStyle}>{num}</span>
      <span>{line.parts.map(([t, v], i) => <span key={i} style={{ color: TC[t] }}>{v}</span>)}</span>
    </div>
  );
}

function TerminalCard() {
  return (
    <div style={{
      background: "#0d1117", borderRadius: "18px",
      border: "1px solid #30363d", overflow: "visible",
      position: "relative", animation: "float 5s ease-in-out infinite",
    }}>
      {/* Badge: Performance */}
      <div style={{
        position: "absolute", top: "-14px", right: "24px", zIndex: 2,
        display: "flex", alignItems: "center", gap: "8px",
        background: "#161b22", border: "1px solid #30363d",
        borderRadius: "12px", padding: "8px 14px",
      }}>
        <IconZap size={14} color="#fbbf24" />
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#c9d1d9", fontWeight: 500, lineHeight: 1.2 }}>40% Faster</div>
          <div style={{ fontSize: "0.68rem", color: "#8b949e" }}>Query optimization</div>
        </div>
      </div>

      {/* Badge: Projects */}
      <div style={{
        position: "absolute", bottom: "70px", left: "-20px", zIndex: 2,
        display: "flex", alignItems: "center", gap: "8px",
        background: "#161b22", border: "1px solid #30363d",
        borderRadius: "12px", padding: "8px 14px",
      }}>
        <IconRocket size={14} color="#7c6aff" />
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#c9d1d9", fontWeight: 500, lineHeight: 1.2 }}>2 Live Projects</div>
          <div style={{ fontSize: "0.68rem", color: "#8b949e" }}>Production deployed</div>
        </div>
      </div>

      {/* Title bar */}
      <div style={{
        background: "#161b22", borderBottom: "1px solid #30363d",
        padding: "10px 16px", display: "flex", alignItems: "center", gap: "7px",
      }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#8b949e" }}>dev.profile.ts</span>
      </div>

      {/* Open to work */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: "rgba(35,134,54,0.12)", borderBottom: "1px solid #238636",
        padding: "7px 16px",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3fb950", animation: "pulse-glow 2s infinite" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#3fb950", fontWeight: 500 }}>Open to work · Full-time roles</span>
      </div>

      {/* Code */}
      <div style={{ padding: "14px 18px 10px" }}>
        {TERM_LINES.map((line, i) => <TerminalLine key={i} line={line} num={i + 1} />)}
      </div>

      <div style={{ height: "1px", background: "#21262d", margin: "0 16px" }} />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[["1.1","yr","Experience"],["2","+","Projects"],["85","%","CGPA"],["10","+","Tech"]].map(([n, u, l]) => (
          <div key={l} style={{ padding: "12px 8px", textAlign: "center", borderRight: "1px solid #21262d" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", fontWeight: 500, color: "#c9d1d9", lineHeight: 1 }}>
              {n}<span style={{ fontSize: "0.65rem", color: "#8b949e" }}>{u}</span>
            </div>
            <div style={{ fontSize: "0.65rem", color: "#484f58", marginTop: "3px", letterSpacing: "0.03em" }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "5rem 2rem 2rem" }}>
      <GridBg />
      <div style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: "1200px",
        margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
      }} className="grid-2">
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: theme.accentGlow2, border: `1px solid ${theme.border}`,
            borderRadius: "100px", padding: "6px 16px", marginBottom: "1.75rem",
            fontSize: "0.75rem", color: theme.accentSoft, letterSpacing: "0.1em", fontWeight: 600,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: theme.success, display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            AVAILABLE FOR FULL-TIME ROLES
          </div>

          <div style={{
            fontSize: "0.8rem", color: theme.textMuted, letterSpacing: "0.14em",
            fontWeight: 500, marginBottom: "0.6rem",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{ height: "1px", width: "28px", background: theme.accent }} />
            Full Stack Developer
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.05,
            fontSize: "clamp(2.2rem, 3vw, 3.2rem)", marginBottom: "1rem", color: theme.text,
          }}>
            Hi, I'm<br />
            <span style={{
              background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.teal} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite",
            }}>Vigneshwari Sakthivel</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["React", "Django", "PostgreSQL", "Docker"].map((t, i) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {i > 0 && <span style={{ width: 4, height: 4, borderRadius: "50%", background: theme.textDim, display: "inline-block" }} />}
                <span style={{ fontSize: "0.85rem", color: theme.textMuted, fontWeight: 500 }}>{t}</span>
              </span>
            ))}
          </div>

          <p style={{ fontSize: "1rem", color: theme.textMuted, lineHeight: 1.85, fontWeight: 300, marginBottom: "1.25rem", maxWidth: "480px" }}>
            I engineer <strong style={{ color: theme.text, fontWeight: 600 }}>production-grade</strong> web apps — from pixel-precise
            interfaces to robust, scalable APIs. <em style={{ color: theme.accentSoft }}>1.1 years</em> of real enterprise experience
            shipping features that matter.
          </p>

          <div style={{ fontSize: "0.85rem", color: theme.textMuted, marginBottom: "2.25rem", fontFamily: "'DM Mono', monospace" }}>
            Currently mastering:{" "}
            <TypeWriter words={["React.js", "Django REST", "PostgreSQL", "Docker", "GenAI APIs"]} />
          </div>

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.teal})`,
                color: "#000000", padding: "0.8rem 2rem", borderRadius: "100px",
                fontWeight: 600, fontSize: "0.9rem", transition: "all 0.3s ease",
              
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";  }}>
              View Projects ↓
            </a>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: `1px solid ${theme.border}`, color: theme.text,
                padding: "0.8rem 1.75rem", borderRadius: "100px",
                fontWeight: 500, fontSize: "0.9rem", transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.teal; e.currentTarget.style.background = "rgba(45,212,191,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              Let's Talk →
            </a>
            <a href="https://linkedin.com/in/vigneshwari-sakthivel-584065329/" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: `1px solid ${theme.border}`, color: theme.text,
                padding: "0.8rem 1.5rem", borderRadius: "100px",
                fontWeight: 500, fontSize: "0.9rem", transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#0a66c2"; e.currentTarget.style.background = "rgba(10,102,194,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <a href="https://github.com/vigneshwarisakthivel/" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "0.82rem", color: theme.textMuted, transition: "color 0.2s",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={e => e.currentTarget.style.color = theme.accentSoft}
              onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}>
              <GithubIcon size={14} /> github.com/vigneshwarisakthivel/ ↗
            </a>
          </div>
        </div>

        <div style={{ paddingTop: "2rem" }} className="hide-mobile">
          <TerminalCard />
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const aboutItems = [
    { icon: <IconGraduationCap size={22} color={theme.accent} />, title: "B.Sc. Computer Science", sub: "2022–2025 · 85% CGPA", color: theme.accent },
    { icon: <IconBook size={22} color={theme.teal} />, title: "M.Sc. Computer Science", sub: "Distance Education · Expected 2027", color: theme.teal },
    { icon: <IconBriefcase size={22} color={theme.amber} />, title: "VDart — Intern → Apprentice", sub: "Trichy · 1.1 Years · React + Django", color: theme.amber },
  ];
  return (
    <section id="about" style={{ padding: "3rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel label="01 — About Me" />
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginTop: "2.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.2, marginBottom: "1.5rem", color: theme.text }}>
              Crafting software that <span style={{ color: theme.accentSoft }}>scales</span> and <span style={{ color: theme.tealSoft }}>matters</span>
            </h2>
            <p style={{ color: theme.textMuted, lineHeight: 1.9, marginBottom: "1.25rem", fontSize: "1rem" }}>
              I'm a Full Stack Developer with 1.1 years of real-world experience (intern + apprentice) at <strong style={{ color: theme.text }}>VDart, Trichy</strong> — building internal tools and production features using React and Django.
            </p>
            <p style={{ color: theme.textMuted, lineHeight: 1.9, marginBottom: "2rem", fontSize: "1rem" }}>
              I specialize in REST API design, clean architecture, and performance-optimized frontends. I work in Agile environments and take ownership from design to deployment.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Clean Code", "REST APIs", "Agile/Scrum", "Problem Solving"].map(tag => (
                <span key={tag} style={{
                  padding: "5px 14px", borderRadius: "100px", fontSize: "0.8rem",
                  background: theme.accentGlow2, border: `1px solid ${theme.border}`,
                  color: theme.accentSoft, fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {aboutItems.map(item => (
              <div key={item.title} className="hover-lift" style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.25rem 1.5rem", borderRadius: "16px",
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                transition: "border-color 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = item.color + "60"}
                onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}>
                <div style={{
                  width: 48, height: 48, borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: item.color + "15", border: `1px solid ${item.color}30`, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: theme.text }}>{item.title}</div>
                  <div style={{ fontSize: "0.8rem", color: theme.textMuted, marginTop: "2px" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    cat: "Frontend", color: "#7c6aff", icon: "◈",
    skills: [
      { name: "HTML5 / CSS3", level: 90 },
      { name: "React.js", level: 85 },
      { name: "JavaScript ES6+", level: 83 },
      { name: "Material UI", level: 80 },
    ],
  },
  {
    cat: "Backend", color: "#2dd4bf", icon: "◎",
    skills: [
      { name: "Python", level: 88 },
      { name: "Django / DRF", level: 85 },
      { name: "JWT / OAuth", level: 80 },
      { name: "Celery & Redis", level: 68 },
    ],
  },
  {
    cat: "Database", color: "#fbbf24", icon: "◐",
    skills: [
      { name: "PostgreSQL", level: 78 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    cat: "DevOps", color: "#f472b6", icon: "◉",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Docker", level: 70 },
    ],
  },
];

const CORE_SKILLS = [
  "REST API Design", "Clean Architecture", "Agile / Scrum",
  "Performance Optimization", "Problem Solving", "OOP Principles",
  "Microservices", "GenAI Integration",
];

function RadialSkill({ skill, color, angle, radius, visible }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  const levelLabel = skill.level >= 85 ? "Expert" : skill.level >= 75 ? "Proficient" : "Familiar";
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      display: "flex", flexDirection: "column", alignItems: "center",
      transition: "opacity 0.6s ease, transform 0.6s ease",
      opacity: visible ? 1 : 0,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}99`, marginBottom: "6px", flexShrink: 0 }} />
      <div style={{ background: "#12121a", border: `1px solid ${color}40`, borderRadius: "10px", padding: "5px 10px", textAlign: "center", whiteSpace: "nowrap" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#e2e0f0" }}>{skill.name}</div>
        <div style={{ fontSize: "0.68rem", fontFamily: "'DM Mono', monospace", color, marginTop: "2px" }}>{skill.level}% · {levelLabel}</div>
      </div>
    </div>
  );
}

function SkillOrbit({ group, active, onClick }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  const isActive = active === group.cat;
  const nodeCount = group.skills.length;
  const angleStep = 360 / nodeCount;
  const radius = 110;
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div onClick={() => onClick(group.cat)} style={{ width: 280, height: 280, position: "relative", cursor: "pointer", flexShrink: 0 }}>
        <div style={{
          position: "absolute", inset: "50%",
          transform: "translate(-50%,-50%)",
          width: radius * 2 + 20, height: radius * 2 + 20,
          borderRadius: "50%",
          border: `1px dashed ${group.color}${isActive ? "60" : "30"}`,
          transition: "border-color 0.3s",
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: isActive ? 72 : 60, height: isActive ? 72 : 60,
          borderRadius: "50%",
          background: isActive ? group.color + "20" : "#12121a",
          border: `2px solid ${isActive ? group.color : group.color + "40"}`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "all 0.35s ease",
          boxShadow: isActive ? `0 0 28px ${group.color}40` : "none",
          zIndex: 2,
        }}>
          <span style={{ fontSize: "1.3rem", lineHeight: 1, color: group.color }}>{group.icon}</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: group.color, letterSpacing: "0.06em", marginTop: "3px" }}>{group.cat.toUpperCase()}</span>
        </div>
        {group.skills.map((skill, i) => (
          <RadialSkill key={skill.name} skill={skill} color={group.color} angle={angleStep * i - 90} radius={radius} visible={visible} />
        ))}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 280 280">
          {group.skills.map((_, i) => {
            const r = ((angleStep * i - 90) * Math.PI) / 180;
            return <line key={i} x1={140} y1={140} x2={140 + Math.cos(r) * radius} y2={140 + Math.sin(r) * radius} stroke={group.color} strokeOpacity={isActive ? 0.35 : 0.12} strokeWidth="1" strokeDasharray="3 4" style={{ transition: "stroke-opacity 0.35s" }} />;
          })}
        </svg>
      </div>
      <div style={{ fontSize: "0.75rem", fontFamily: "'DM Mono', monospace", color: group.color, opacity: 0.8 }}>
        {group.skills.length} technologies
      </div>
    </div>
  );
}

function Skills() {
  const [active, setActive] = useState("Frontend");
  const toggle = (cat) => setActive(prev => prev === cat ? null : cat);
  return (
    <section id="skills" style={{ padding: "3rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="02 — Skills" />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2.2rem", margin: "0.75rem 0 0.5rem", color: theme.text }}>
            What I bring to the table
          </h2>
          <p style={{ fontSize: "0.9rem", color: theme.textMuted, marginBottom: "3rem" }}>
            Click any orbit to highlight · hover nodes to explore
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "3.5rem" }}>
            {SKILL_GROUPS.map(group => (
              <SkillOrbit key={group.cat} group={group} active={active} onClick={toggle} />
            ))}
          </div>
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)`, marginBottom: "2rem" }} />
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.14em", color: theme.textDim, fontWeight: 600, textTransform: "uppercase" }}>Core Competencies</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {CORE_SKILLS.map((s, i) => {
              const colors = ["#7c6aff","#2dd4bf","#fbbf24","#f472b6","#7c6aff","#2dd4bf","#fbbf24","#f472b6"];
              const c = colors[i % colors.length];
              return (
                <span key={s} style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "7px 16px", border: `1px solid ${theme.border}`, borderRadius: "100px",
                  fontSize: "0.82rem", fontWeight: 500, color: theme.textMuted,
                  background: "transparent", transition: "all 0.25s ease", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c + "80"; e.currentTarget.style.color = c; e.currentTarget.style.background = c + "10"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, display: "inline-block", flexShrink: 0 }} />
                  {s}
                </span>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  const items = [
    {
      role: "Full Stack Developer Apprentice",
      company: "VDart",
      location: "Trichy, Tamil Nadu",
      period: "Apr 2025 — Feb 2026",
      color: theme.accent,
      points: [
        "Promoted from intern to apprentice based on performance and contribution",
        "Led development of production features using React and Django REST Framework",
        "Implemented JWT-based auth and role-based access control across internal tools",
        "Optimized database queries in PostgreSQL — reducing load times by ~35%",
        "Integrated GenAI APIs for AI-powered proctoring in the test platform",
        "Participated in Agile sprints, code reviews, and daily standups",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      company: "VDart",
      location: "Trichy, Tamil Nadu",
      period: "Dec 2024 — Mar 2024",
      color: theme.teal,
      points: [
        "Joined as a full-stack intern working on internal company projects",
        "Built reusable React components with Material UI for admin dashboards",
        "Developed REST APIs with Django REST Framework and handled serialization",
        "Worked with Docker containers for local development and deployment",
        "Set up CI/CD pipelines with Vercel and Render for automated deployments",
        "Collaborated with senior engineers and followed clean architecture principles",
      ],
    },
  ];
  return (
    <section id="experience" style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel label="03 — Experience" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2.2rem", margin: "0.75rem 0 3rem", color: theme.text }}>
          Professional Journey
        </h2>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "20px", top: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${theme.accent}, ${theme.teal})`, borderRadius: "1px" }} />
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 150} style={{ paddingLeft: "56px", marginBottom: "3rem", position: "relative" }}>
              <div style={{
                position: "absolute", left: "12px", top: "8px", width: "16px", height: "16px",
                borderRadius: "50%", background: item.color, border: `3px solid ${theme.bg}`,
                boxShadow: `0 0 12px ${item.color}80`, zIndex: 1,
              }} />
              <div className="hover-lift" style={{
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: "20px", padding: "2rem",
                transition: "border-color 0.3s, background 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "50"; e.currentTarget.style.background = theme.bgCardHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.bgCard; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: theme.text }}>{item.role}</h3>
                    <div style={{ fontSize: "0.9rem", color: item.color, fontWeight: 600, marginTop: "2px" }}>{item.company} · {item.location}</div>
                  </div>
                  <span style={{
                    padding: "4px 14px", borderRadius: "100px", fontSize: "0.78rem",
                    background: item.color + "15", border: `1px solid ${item.color}30`,
                    color: item.color, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
                  }}>{item.period}</span>
                </div>
                <ul style={{ paddingLeft: "0", listStyle: "none", marginTop: "1rem" }}>
                  {item.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", gap: "10px", marginBottom: "0.6rem", fontSize: "0.9rem", color: theme.textMuted, lineHeight: 1.6 }}>
                      <span style={{ color: item.color, marginTop: "2px", flexShrink: 0 }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "Incident IQ",
    subtitle: "Incident Management System",
    description: "A role-based incident lifecycle management platform for enterprise teams. Manages the full flow from creation to resolution with a built-in knowledge base.",
    color: theme.accent,
    gradient: `linear-gradient(135deg, ${theme.accent}20, transparent)`,
    ProjectIcon: IconShield,
    liveUrl: "https://incident-iq-navy.vercel.app/",
    githubUrl: "https://github.com/vigneshwarisakthivel/",
    tags: ["React", "Django", "PostgreSQL", "JWT", "REST API", "Material UI"],
    features: [
      { Icon: IconUsers,     text: "Role-based access: Admin, Engineer, Support" },
      { Icon: IconClipboard, text: "Admin manages users & monitors all incidents" },
      { Icon: IconWrench,    text: "Engineers resolve and close critical issues" },
      { Icon: IconCheckCircle, text: "Support creates and verifies incident reports" },
      { Icon: IconDatabase,  text: "Knowledge base for storing resolved incidents" },
      { Icon: IconRefresh,   text: "Workflow-based incident lifecycle management" },
    ],
  },
  {
    title: "Skill Bridge",
    subtitle: "Online Test Platform",
    description: "An AI-powered online assessment platform with role-based access, secure proctoring, automated evaluation, and candidate filtering for organizations.",
    color: theme.teal,
    gradient: `linear-gradient(135deg, rgba(45,212,191,0.15), transparent)`,
    ProjectIcon: IconTarget,
    liveUrl: "https://skill-bridge-hazel-nine.vercel.app/",
    githubUrl: "https://github.com/vigneshwarisakthivel/",
    tags: ["React", "Django", "GenAI API", "Celery", "Redis", "PostgreSQL"],
    features: [
      { Icon: IconBot,       text: "AI-based proctoring using GenAI APIs" },
      { Icon: IconLock,      text: "Secure login + passcode for test access" },
      { Icon: IconFileText,  text: "Admin creates tests & manages question banks" },
      { Icon: IconFilter,    text: "Automated candidate evaluation & filtering" },
      { Icon: IconUserCheck, text: "Role-based system: Admin & Candidate" },
      { Icon: IconBarChart,  text: "Real-time test monitoring and analytics" },
    ],
  },
];

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  const { ProjectIcon } = project;
  return (
    <FadeIn delay={delay}>
      <div className="hover-lift" style={{
        background: hovered ? theme.bgCardHover : theme.bgCard,
        border: `1px solid ${hovered ? project.color + "50" : theme.border}`,
        borderRadius: "24px", padding: "2rem",
        transition: "all 0.3s ease", height: "100%",
        position: "relative", overflow: "hidden",
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div style={{ position: "absolute", inset: 0, opacity: hovered ? 1 : 0, background: project.gradient, transition: "opacity 0.3s" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: project.color + "20", border: `1px solid ${project.color}30`,
            }}>
              <ProjectIcon size={26} color={project.color} />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "0 12px", height: 36, borderRadius: "10px",
                  background: project.color + "18", border: `1px solid ${project.color}40`,
                  color: project.color, fontSize: "0.78rem", fontWeight: 600,
                  fontFamily: "'Outfit', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = project.color + "30"; e.currentTarget.style.borderColor = project.color + "80"; }}
                onMouseLeave={e => { e.currentTarget.style.background = project.color + "18"; e.currentTarget.style.borderColor = project.color + "40"; }}>
                <IconGlobe size={13} color={project.color} />
                Live Demo
              </a>
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: theme.border, color: theme.textMuted, transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = project.color + "30"; e.currentTarget.style.color = project.color; }}
                onMouseLeave={e => { e.currentTarget.style.background = theme.border; e.currentTarget.style.color = theme.textMuted; }}>
                <GithubIcon size={16} />
              </a>
            </div>
          </div>

          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.75rem", color: project.color, fontWeight: 600, letterSpacing: "0.08em" }}>{project.subtitle.toUpperCase()}</span>
          </div>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: theme.text, marginBottom: "0.75rem" }}>{project.title}</h3>
          <p style={{ fontSize: "0.9rem", color: theme.textMuted, lineHeight: 1.75, marginBottom: "1.5rem" }}>{project.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "0.82rem", color: theme.textMuted }}>
                <f.Icon size={14} color={project.color} />
                <span style={{ lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: "3px 12px", borderRadius: "100px", fontSize: "0.75rem",
                background: project.color + "12", border: `1px solid ${project.color}25`,
                color: project.color, fontFamily: "'DM Mono', monospace",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "3rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="04 — Projects" />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2.2rem", margin: "0.75rem 0 2.5rem", color: theme.text }}>
            Things I've Built
          </h2>
        </FadeIn>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={i * 150} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack (Constellation) ───────────────────────────────────────────────

// ─── REPLACE the existing TechStack function in Portfolio.jsx with this ───────
// Drop this entire block in place of the current TechStack() function.
// Everything else in Portfolio.jsx stays exactly as-is.

// ─── Icon Factory (add this just above the TechStack function) ────────────────
function getStackIcon(key, color) {
  const s = (d) =>
    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${d}</svg>`;

  const icons = {
    // Frontend
    react: s(
      `<circle cx="12" cy="12" r="2.2" fill="${color}"/>
       <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="${color}" stroke-width="1.3" fill="none"/>
       <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="${color}" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/>
       <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="${color}" stroke-width="1.3" fill="none" transform="rotate(120 12 12)"/>`
    ),
    js: s(
      `<rect x="3" y="3" width="18" height="18" rx="3" stroke="${color}" stroke-width="1.4" fill="none"/>
       <path d="M8 16.5c.4.6.9 1 1.8 1 1 0 1.5-.5 1.5-1.2 0-.8-.6-1.1-1.6-1.6l-.5-.2C7.9 14 7.2 13.2 7.2 11.8c0-1.4 1-2.4 2.6-2.4 1.1 0 1.9.4 2.5 1.4l-1.3.8c-.3-.5-.6-.7-1.2-.7-.5 0-.9.3-.9.8 0 .5.3.8 1.1 1.1l.5.2c1.4.6 2.1 1.4 2.1 2.9 0 1.7-1.3 2.6-3 2.6-1.7 0-2.8-.9-3.3-2l1.2-.7zm6.5.1c.4.7 1 1.2 2 1.2.9 0 1.4-.4 1.4-1 0-.7-.5-1-1.5-1.4l-.5-.2c-1.5-.6-2.4-1.5-2.4-3.3 0-1.7 1.3-2.8 3.1-2.8 1.4 0 2.4.5 3.1 1.7l-1.3 1c-.4-.6-.8-.9-1.7-.9-.7 0-1.2.4-1.2 1 0 .6.4.9 1.4 1.3l.5.2c1.8.8 2.7 1.6 2.7 3.4 0 2-1.5 3-3.6 3-2 0-3.3-1-3.9-2.3l1.4-.7z" fill="${color}"/>`
    ),
    html: s(
      `<path d="M5 3l1.2 14L12 19l5.8-2L19 3H5z" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M9 8h6M9.5 12h5l-.5 4-2 .7-2-.7-.1-1.5" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`
    ),
    mui: s(
      `<path d="M3 15.5L7.5 13 12 15.5v4L7.5 22 3 19.5v-4z" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M12 15.5L16.5 13 21 15.5v4L16.5 22 12 19.5v-4z" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M7.5 4L12 6.5 16.5 4v4L12 10.5 7.5 8V4z" stroke="${color}" stroke-width="1.3" fill="none"/>`
    ),
    // Backend
    python: s(
      `<path d="M12 2.5C9.8 2.5 8 3.4 8 5.5V8h4v1H6.5C4.5 9 3 10.3 3 12.5S4.5 16 6.5 16H9v-1.5H6.5c-.8 0-1.5-.4-1.5-2s.7-2 1.5-2H13c1.7 0 3-1.2 3-3V5.5c0-2.1-1.8-3-4-3zM11 5a.8.8 0 110 1.6A.8.8 0 0111 5z" fill="${color}"/>
       <path d="M12 21.5c2.2 0 4-.9 4-3V16h-4v-1h6.5c2 0 3.5-1.3 3.5-3.5S20.5 8 18.5 8H16v1.5h2.5c.8 0 1.5.4 1.5 2s-.7 2-1.5 2H11c-1.7 0-3 1.2-3 3v3c0 2.1 1.8 3 4 3zM13 19a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="${color}" opacity=".7"/>`
    ),
    django: s(
      `<rect x="3" y="3" width="18" height="18" rx="3" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M9 8h6M9 12h4M9 16h2" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>
       <circle cx="16" cy="16" r="2" stroke="${color}" stroke-width="1.2" fill="none"/>`
    ),
    jwt: s(
      `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M12 7v5" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
       <circle cx="12" cy="15" r="1.5" fill="${color}"/>
       <path d="M8.5 9.5l1.5 1.5M15.5 9.5L14 11" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`
    ),
    redis: s(
      `<path d="M12 4L3 8.5 12 13l9-4.5L12 4z" stroke="${color}" stroke-width="1.2" fill="none"/>
       <path d="M3 8.5v4L12 17l9-4.5v-4" stroke="${color}" stroke-width="1.2" fill="none"/>
       <path d="M3 12.5v4L12 21l9-4.5v-4" stroke="${color}" stroke-width="1.2" fill="none"/>`
    ),
    // Database
    postgres: s(
      `<path d="M12 2C8 2 5 4.8 5 8.5c0 2.5 1.4 4.7 3.5 5.8-.1.5-.2 1-.2 1.5 0 2 1.2 3.5 3.7 4.2v1H15v-1c2.5-.7 3.7-2.2 3.7-4.2 0-.5-.1-1-.2-1.5C20.6 13.2 22 11 22 8.5 22 4.8 19 2 15 2h-3z" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M9 8.5c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="${color}" stroke-width="1.3" stroke-linecap="round" fill="none"/>`
    ),
    mysql: s(
      `<ellipse cx="12" cy="7" rx="8" ry="3" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" stroke="${color}" stroke-width="1.3" fill="none"/>`
    ),
    // DevOps
    git: s(
      `<circle cx="18" cy="5.5" r="2.2" stroke="${color}" stroke-width="1.3" fill="none"/>
       <circle cx="6" cy="12" r="2.2" stroke="${color}" stroke-width="1.3" fill="none"/>
       <circle cx="18" cy="18.5" r="2.2" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M8.2 12h5.6M15.8 5.5H13a3 3 0 00-3 3v7a3 3 0 003 3h2.8" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/>`
    ),
    docker: s(
      `<path d="M9.5 8H12V11H9.5V8zM6 8h2.5v3H6V8zM12.5 8H15v3h-2.5V8z" stroke="${color}" stroke-width="1.1" fill="none"/>
       <path d="M9.5 5H12V8H9.5V5z" stroke="${color}" stroke-width="1.1" fill="none"/>
       <path d="M3 12.5h17.5c0 0-.5 5-6.5 5H7.5C4.5 17.5 3 15 3 12.5z" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M20.5 10c-1-2-3-2-3-2M18.5 12.5h2" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`
    ),
    vercel: s(
      `<path d="M12 4L21 20H3L12 4z" stroke="${color}" stroke-width="1.4" stroke-linejoin="round" fill="none"/>`
    ),
    render: s(
      `<rect x="3" y="3" width="18" height="18" rx="3" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M8 8h5.5a3 3 0 010 6H8V8z" stroke="${color}" stroke-width="1.3" stroke-linecap="round" fill="none"/>
       <path d="M13.5 14L17 19" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/>`
    ),
    // API & AI
    rest: s(
      `<rect x="2" y="5" width="20" height="14" rx="3" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M6 12h12M14.5 9l3.5 3-3.5 3" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`
    ),
    oauth: s(
      `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="1.3" fill="none"/>
       <circle cx="12" cy="12" r="3" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/>`
    ),
    ai: s(
      `<path d="M12 3C7 3 4 6.5 4 10c0 2 .9 3.8 2.3 5L5 21l5-2c.6.2 1.3.3 2 .3 5 0 8-3.5 8-7S17 3 12 3z" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M9 10.5h6M9 13.5h4" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/>`
    ),
    postman: s(
      `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="1.3" fill="none"/>
       <path d="M8 12a4 4 0 008 0" stroke="${color}" stroke-width="1.3" stroke-linecap="round" fill="none"/>
       <line x1="14" y1="10" x2="17" y2="7" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/>
       <circle cx="12" cy="12" r="1.5" fill="${color}"/>`
    ),
  };

  return icons[key] || "";
}

// ─── TechStack Component ──────────────────────────────────────────────────────
function TechStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [shownRows, setShownRows] = useState([]);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  const STACK = [
    {
      id: "frontend", label: "frontend", color: "#7c6aff",
      cmd: ["stack", "--list", "frontend"],
      techs: [
        { icon: "react",   name: "React.js",        level: 85, label: "proficient" },
        { icon: "js",      name: "JavaScript ES6+", level: 83, label: "proficient" },
        { icon: "html",    name: "HTML5 / CSS3",    level: 90, label: "expert"     },
        { icon: "mui",     name: "Material UI",     level: 80, label: "proficient" },
      ],
    },
    {
      id: "backend", label: "backend", color: "#2dd4bf",
      cmd: ["stack", "--list", "backend"],
      techs: [
        { icon: "python",  name: "Python",          level: 88, label: "expert"     },
        { icon: "django",  name: "Django / DRF",    level: 85, label: "proficient" },
        { icon: "jwt",     name: "JWT / OAuth",     level: 80, label: "proficient" },
        { icon: "redis",   name: "Celery + Redis",  level: 68, label: "familiar"   },
      ],
    },
    {
      id: "database", label: "database", color: "#fbbf24",
      cmd: ["stack", "--list", "database"],
      techs: [
        { icon: "postgres", name: "PostgreSQL",     level: 78, label: "proficient" },
        { icon: "mysql",    name: "MySQL",          level: 75, label: "proficient" },
      ],
    },
    {
      id: "devops", label: "devops", color: "#f472b6",
      cmd: ["stack", "--list", "devops"],
      techs: [
        { icon: "git",    name: "Git / GitHub",     level: 88, label: "expert"     },
        { icon: "docker", name: "Docker",           level: 70, label: "proficient" },
        { icon: "vercel", name: "Vercel",           level: 78, label: "proficient" },
        { icon: "render", name: "Render",           level: 75, label: "proficient" },
      ],
    },
    {
      id: "api", label: "api & ai", color: "#a78bfa",
      cmd: ["stack", "--list", "api"],
      techs: [
        { icon: "rest",    name: "REST APIs",       level: 87, label: "proficient" },
        { icon: "oauth",   name: "OAuth 2.0",       level: 80, label: "proficient" },
        { icon: "ai",      name: "GenAI APIs",      level: 72, label: "proficient" },
        { icon: "postman", name: "Postman",         level: 85, label: "proficient" },
      ],
    },
  ];

  const LEVEL_COLORS = {
    expert:     "#3fb950",
    proficient: "#7c6aff",
    familiar:   "#fbbf24",
  };

  const runCategory = (idx) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIdx(idx);
    setShownRows([]);
    setTyped("");
    setIsTyping(true);

    const cat = STACK[idx];
    const full = cat.cmd.join(" ");
    let i = 0;

    const tick = () => {
      i++;
      setTyped(full.slice(0, i));
      if (i < full.length) {
        timerRef.current = setTimeout(tick, 32);
      } else {
        setIsTyping(false);
        cat.techs.forEach((_, ri) => {
          timerRef.current = setTimeout(
            () => setShownRows((prev) => [...prev, ri]),
            150 + ri * 90
          );
        });
      }
    };

    timerRef.current = setTimeout(tick, 60);
  };

  useEffect(() => {
    runCategory(0);
    return () => clearTimeout(timerRef.current);
  }, []);

  const cat = STACK[activeIdx];
  const typedParts = typed.split(" ");

  return (
    <section id="stack" style={{ padding: "3rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="05 — Tech Stack" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: "2.2rem", margin: "0.75rem 0 2rem", color: theme.text,
          }}>
            Tools &amp; Technologies
          </h2>

          {/* Terminal card */}
          <div style={{
            background: "#0d1117", borderRadius: 14,
            border: `1px solid ${theme.border}`, overflow: "hidden",
          }}>

            {/* ── Title bar ── */}
            <div style={{
              background: "#161b22", borderBottom: "1px solid #21262d",
              padding: "10px 16px", display: "flex", alignItems: "center", gap: 7,
            }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
              <span style={{
                margin: "0 auto", fontFamily: "'DM Mono', monospace",
                fontSize: 12, color: "#484f58",
              }}>
                stack.sh — portfolio
              </span>
            </div>

            {/* ── Tab bar ── */}
            <div style={{
              display: "flex", gap: 2, background: "#161b22",
              borderBottom: "1px solid #21262d", padding: "0 12px",
              overflowX: "auto",
            }}>
              {STACK.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => runCategory(i)}
                  style={{
                    padding: "10px 16px", fontSize: 12, cursor: "pointer",
                    border: "none", background: "none",
                    borderBottom: `2px solid ${i === activeIdx ? cat.color : "transparent"}`,
                    color: i === activeIdx ? "#e2e0f0" : "#484f58",
                    fontFamily: "'DM Mono', monospace",
                    whiteSpace: "nowrap", transition: "color 0.2s",
                  }}
                >
                  ./{s.label}
                </button>
              ))}
            </div>

            {/* ── Terminal output ── */}
            <div style={{ padding: "20px 20px 28px", minHeight: 280 }}>

              {/* Prompt line */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 16, fontFamily: "'DM Mono', monospace",
              }}>
                <span style={{ color: "#3fb950", fontSize: 13 }}>❯</span>
                <span style={{ fontSize: 13 }}>
                  <span style={{ color: "#79c0ff" }}>{typedParts[0] || ""}</span>
                  {" "}
                  <span style={{ color: "#ffa657" }}>{typedParts[1] || ""}</span>
                  {" "}
                  <span style={{ color: "#a5d6ff" }}>{typedParts[2] || ""}</span>
                </span>
                {isTyping && (
                  <span style={{
                    display: "inline-block", width: 8, height: 14,
                    background: cat.color, borderRadius: 1,
                    animation: "blink 1s step-end infinite",
                  }} />
                )}
              </div>

              {/* Tech rows */}
              {!isTyping && shownRows.length > 0 && (
                <>
                  <div style={{ height: 1, background: "#21262d", margin: "14px 0" }} />
  {cat.techs.map((t, i) => (
    <div
      key={t.name}
      style={{
        display: "flex", alignItems: "center", margin: "4px 0",
        fontFamily: "'DM Mono', monospace", fontSize: 13, lineHeight: 1.8,
        opacity: shownRows.includes(i) ? 1 : 0,
        transform: shownRows.includes(i) ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.25s, transform 0.25s",
        flexWrap: "wrap", gap: "2px",
      }}
    >
      <span style={{ color: "#3d444d", minWidth: 28, flexShrink: 0 }}>
        {String(i + 1).padStart(2, "0")}
      </span>
      <span
        style={{ minWidth: 22, flexShrink: 0, display: "flex", alignItems: "center" }}
        dangerouslySetInnerHTML={{ __html: getStackIcon(t.icon, cat.color) }}
      />
      <span style={{
        color: "#e2e0f0", fontWeight: 500, marginLeft: 8,
        flex: "1 1 120px", minWidth: 0,
      }}>
        {t.name}
      </span>
      <span style={{ color: "#3d444d", margin: "0 8px", flexShrink: 0 }}>—</span>
      <div className="tabs-bar" style={{ display: "flex", gap: 2, marginRight: 8, flexShrink: 0 }}>
        {Array.from({ length: 10 }, (_, j) => (
          <div key={j} style={{
            width: 7, height: 7, borderRadius: 2,
            background: j < Math.round(t.level / 10) ? cat.color : "#21262d",
          }} />
        ))}
      </div>
      <span style={{
        fontSize: 11,
        color: LEVEL_COLORS[t.label],
        letterSpacing: "0.06em",
        flexShrink: 0,
      }}>
        {t.label}
      </span>
    </div>
  ))}

                  {/* Footer */}
                  <div style={{
                    marginTop: 20, paddingTop: 14,
                    borderTop: "1px solid #21262d",
                    display: "flex", alignItems: "center", gap: 10,
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#3fb950", animation: "pulse-glow 2s infinite",
                    }} />
                    <span style={{ fontSize: 11, color: "#484f58", letterSpacing: "0.06em" }}>
                      {cat.techs.length} technologies · {cat.label.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 11, color: "#484f58", marginLeft: "auto" }}>
                      exit code 0
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
// ─── Certifications ───────────────────────────────────────────────────────────

function Certifications() {
  const certs = [
    { name: "Python Programming", issuer: "Coursera / University of Michigan", Icon: IconPython, color: theme.accent },
    { name: "React – The Complete Guide", issuer: "Udemy", Icon: IconReact, color: theme.teal },
    { name: "Django REST Framework", issuer: "Udemy", Icon: IconServer, color: theme.amber },
    { name: "Docker & Kubernetes", issuer: "Udemy", Icon: IconDocker, color: "#f472b6" },
  ];
  return (
    <section id="certifications" style={{ padding: "3rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel label="06 — Certifications" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2.2rem", margin: "0.75rem 0 2.5rem", color: theme.text }}>
          Learning never stops
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {certs.map((cert, i) => (
            <FadeIn key={cert.name} delay={i * 100}>
              <div style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.25rem 1.5rem", borderRadius: "16px",
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cert.color + "50"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.transform = "translateX(0)"; }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: cert.color + "15", flexShrink: 0,
                }}>
                  <cert.Icon size={22} color={cert.color} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: theme.text }}>{cert.name}</div>
                  <div style={{ fontSize: "0.8rem", color: cert.color, marginTop: "2px" }}>{cert.issuer}</div>
                </div>
                <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                  <IconCheckCircle size={18} color={theme.success} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "vigneshwarisakthivel8@email.com";
  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" style={{ padding: "3rem 2rem", textAlign: "center" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="07 — Contact" center />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.1,
            margin: "0.75rem 0 1.5rem", color: theme.text,
          }}>
            Let's build something <span style={{ color: theme.accentSoft }}>great</span> together
          </h2>
          <p style={{ color: theme.textMuted, fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem" }}>
            Open to full-time roles, freelance projects, and collaborations. Drop a message and I'll get back to you promptly.
          </p>
          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "24px", padding: "1.5rem 1.8rem", marginBottom: "2rem" }}>
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // 👈 FIXED
    gap: "1rem",
    flexWrap: "wrap",
    textAlign: "center",
  }}
>
  {/* Email block */}
  <div style={{ minWidth: 0, flex: 1 }}>
    <div
      style={{
        fontSize: "0.7rem",
        color: theme.textMuted,
        marginBottom: "6px",
        letterSpacing: "0.1em",
        fontFamily: "'DM Mono', monospace",
        textAlign: "center",
      }}
    >
      EMAIL ADDRESS
    </div>

    <div
      title="vigneshwarisakthivel8@email.com"
      style={{
        fontSize: "clamp(0.7rem, 2.5vw, 0.95rem)",
        fontFamily: "'DM Mono', monospace",
        color: theme.accentSoft,

        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",

        maxWidth: "60vw",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      vigneshwarisakthivel8@email.com
    </div>
  </div>

  {/* Copy button */}
  <button
    onClick={copy}
    style={{
      padding: "0.65rem 1.4rem",
      borderRadius: "12px",
      fontWeight: 600,
      background: copied ? theme.success + "20" : theme.accentGlow2,
      border: `1px solid ${
        copied ? theme.success + "50" : theme.accent + "40"
      }`,
      color: copied ? theme.success : theme.accentSoft,
      transition: "all 0.3s",
      fontSize: "0.88rem",
      cursor: "pointer",
      whiteSpace: "nowrap",
      flexShrink: 0,

      alignSelf: "flex-start", // 👈 THIS keeps it left on mobile
    }}
  >
    {copied ? "✓ Copied!" : "Copy"}
  </button>
</div>
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <SocialBtn href="https://github.com/vigneshwarisakthivel/" icon={<GithubIcon />} label="GitHub" color="#ffffff" />
            <SocialBtn href="https://linkedin.com/in/vigneshwari-sakthivel-584065329/" icon={<LinkedinIcon />} label="LinkedIn" color="#0a66c2" />
            <SocialBtn href={`mailto:${email}`} icon={<IconMail size={16} />} label="Send Email" color={theme.accent} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SocialBtn({ href, icon, label, color }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      padding: "0.75rem 1.75rem", borderRadius: "100px",
      border: `1px solid ${theme.border}`, color: theme.text,
      fontWeight: 500, fontSize: "0.95rem", transition: "all 0.25s ease",
      background: "rgba(255,255,255,0.02)",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + "80"; e.currentTarget.style.background = color + "12"; e.currentTarget.style.color = color; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.color = theme.text; }}>
      {icon}
      {label}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ padding: "1.5rem", textAlign: "center", borderTop: `1px solid ${theme.border}`, color: theme.textDim, fontSize: "0.85rem" }}>
      <span>Designed & built with </span>
      <span style={{ color: theme.accent }}>♥</span>
      <span> · React and Material UI · {new Date().getFullYear()}</span>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles.global;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <TechStack />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}