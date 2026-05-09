/* global React */

const { useState, useEffect, useRef } = React;

// Hook: track when element enters viewport (one-shot by default)
function useInView(opts = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      });
    }, { root: opts.root || null, threshold: opts.threshold ?? 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, opts.root, opts.threshold]);
  return [ref, seen];
}

// Animated count-up
function CountUp({ to, suffix = "", decimals = 0, durationMs = 1200, start = false }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, durationMs]);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{val.toFixed(decimals).replace(".", ",")}{suffix}</span>;
}

// Botanical SVG (watercolor leaf motif, decorative)
function BotanicalLeaf({ width = 220, opacity = 0.55, style = {} }) {
  return (
    <svg width={width} height={width * 1.2} viewBox="0 0 200 240" style={{ opacity, ...style }} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="leafGrad" cx="0.5" cy="0.4" r="0.8">
          <stop offset="0%" stopColor="#C9D6CB" stopOpacity="0.85"/>
          <stop offset="60%" stopColor="#A8BBAF" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#A8BBAF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="leafGrad2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F2DCC2" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#F2DCC2" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* soft watercolor wash */}
      <ellipse cx="100" cy="110" rx="95" ry="115" fill="url(#leafGrad)"/>
      <ellipse cx="120" cy="80" rx="50" ry="60" fill="url(#leafGrad2)"/>
      {/* big leaf */}
      <path d="M30 200 C 40 100, 90 30, 175 35 C 178 110, 140 190, 50 215 Z"
        stroke="#4E5A52" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 200 C 80 150, 130 90, 170 50" stroke="#4E5A52" strokeWidth="1.2" fill="none"/>
      {/* veins */}
      <path d="M70 180 Q 100 165, 110 130" stroke="#4E5A52" strokeWidth="1" fill="none"/>
      <path d="M90 175 Q 120 150, 140 105" stroke="#4E5A52" strokeWidth="1" fill="none"/>
      <path d="M115 170 Q 145 130, 160 80" stroke="#4E5A52" strokeWidth="1" fill="none"/>
      {/* small leaf */}
      <path d="M40 60 C 70 40, 110 50, 120 90 C 95 95, 60 90, 40 60 Z"
        stroke="#4E5A52" strokeWidth="1.2" fill="none"/>
      <path d="M40 60 Q 80 70, 120 90" stroke="#4E5A52" strokeWidth="1" fill="none"/>
    </svg>
  );
}

// Top sticky nav with logo + cart
function TopNav({ scrollRef, onCart, onMyKits, dark = false, transparent = false, transparentUntil = 24 }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > transparentUntil);
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef, transparentUntil]);

  const navStyle = transparent && !scrolled ? { background: "transparent", borderBottomColor: "transparent" } : {};
  const ink = dark && !scrolled ? "var(--liora-cream)" : "var(--fg)";

  return (
    <header className={"topnav" + (scrolled ? " is-scrolled" : "")} style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Wordmark size={scrolled ? 18 : 22} color={ink}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button className="topnav__icon-btn" aria-label="Mis kits" onClick={onMyKits} style={{ color: ink }}>
          <IconLine name="user" size={20} stroke="currentColor"/>
        </button>
        <button className="topnav__icon-btn" aria-label="Carrito" onClick={onCart} style={{ position: "relative", color: ink }}>
          <IconLine name="bag" size={20} stroke="currentColor"/>
          <span className="topnav__cart-dot">2</span>
        </button>
      </div>
    </header>
  );
}

// Floating chat button
function ChatFab({ onClick }) {
  return (
    <button className="fab" aria-label="Hablar con alguien de LIORA" onClick={onClick}>
      <IconLine name="guide" size={22} stroke="currentColor"/>
    </button>
  );
}

// Star rating
function Stars({ value = 5, size = 14 }) {
  return (
    <span className="stars" aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < value ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
          <path d="M12 2.5l2.9 6.2 6.6.7-4.9 4.6 1.4 6.6L12 17.3l-6 3.3 1.4-6.6L2.5 9.4l6.6-.7L12 2.5z"/>
        </svg>
      ))}
    </span>
  );
}

Object.assign(window, { useInView, CountUp, BotanicalLeaf, TopNav, ChatFab, Stars });
