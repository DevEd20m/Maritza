/* global React */
const { useState, useEffect } = React;

// LIORA line-icon set — 1.5px stroke, no fill, optional tonal circular container
function IconLine({ name, size = 24, stroke = "currentColor", container = null, containerSize = 48 }) {
  const s = size;
  const props = {
    width: s, height: s, viewBox: "0 0 24 24", fill: "none",
    stroke, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
  };

  const paths = {
    guide:    <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    routine:  <><rect x="6" y="3" width="12" height="18" rx="1"/><path d="M9 7h6M9 11h6M9 15h4"/></>,
    info:     <><rect x="2" y="4" width="20" height="16"/><path d="M2 9h20M7 13h6"/></>,
    shield:   <><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z"/><path d="M9 12l2 2 4-4"/></>,
    heart:    <><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l9 9 9-9a5.5 5.5 0 0 0 0-7.78z"/></>,
    leaf:     <><path d="M11 20A7 7 0 0 1 4 13c0-3 2-6 5-7 4-1 8 2 8 7 0 1 0 2-1 3"/><path d="M2 21c5-2 8-5 9-9"/></>,
    bag:      <><path d="M6 7h12l-1 13H7zM9 7V5a3 3 0 0 1 6 0v2"/></>,
    search:   <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    user:     <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    box:      <><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/></>,
    sun:      <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon:     <><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/></>,
    drop:     <><path d="M12 2s7 7 7 13a7 7 0 0 1-14 0c0-6 7-13 7-13z"/></>,
    clock:    <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    eye:      <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    arrow:    <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check:    <><path d="M5 12l5 5L20 7"/></>,
    plus:     <><path d="M12 5v14M5 12h14"/></>,
    cart:     <><path d="M3 4h2l3 12h11l2-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    alert:    <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></>,
    book:     <><path d="M4 4h7a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4zM20 4h-7a3 3 0 0 0-3 3v13h7a3 3 0 0 0 3-3V4z"/></>,
    grid:     <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    home:     <><path d="M3 12L12 4l9 8M5 10v10h14V10"/></>,
    chevron:  <><path d="M9 6l6 6-6 6"/></>,
    close:    <><path d="M6 6l12 12M18 6L6 18"/></>,
    truck:    <><rect x="2" y="7" width="13" height="10"/><path d="M15 10h4l3 4v3h-7"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
    pin:      <><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
  };

  const svg = <svg {...props}>{paths[name] || paths.leaf}</svg>;
  if (!container) return svg;

  const bg = { sage: "#A8BBAF", warm: "#F7EDE3", deep: "#4E5A52", arena: "#F2E9DB" }[container] || "#A8BBAF";
  const inkOnDeep = container === "deep" ? "#FAFAF5" : "#111312";
  return (
    <div style={{
      width: containerSize, height: containerSize, borderRadius: "999px",
      background: bg, display: "inline-flex", alignItems: "center", justifyContent: "center",
      flex: `0 0 ${containerSize}px`,
    }}>
      <svg {...props} stroke={inkOnDeep}>{paths[name] || paths.leaf}</svg>
    </div>
  );
}

// LIORA wordmark with the leaf-in-circle replacing the bowl of the O
function Wordmark({ size = 28, color = "#111312" }) {
  const fs = size;
  const dotSize = fs * 0.10;
  const circleSize = fs * 0.85;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: fs * 0.18, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: fs, letterSpacing: "0.04em", color, lineHeight: 1 }}>
      <span>L</span>
      <span>I</span>
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: circleSize, height: circleSize }}>
        <span style={{ position: "absolute", top: -dotSize * 1.0, left: "50%", transform: "translateX(-50%)", width: dotSize, height: dotSize, borderRadius: "50%", background: color }}></span>
        <svg width={circleSize} height={circleSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 8v8M12 10c-2 0-3 1.2-3 3M12 13c2 0 3 1.2 3 3"/>
        </svg>
      </span>
      <span>R</span>
      <span>A</span>
    </div>
  );
}

// Tagline lockup used under the wordmark
function LogoLockup({ size = 28, color = "#111312", showTagline = true, align = "center" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 8 }}>
      <Wordmark size={size} color={color}/>
      {showTagline && (
        <>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase", color, opacity: 0.85 }}>Cuidado integral</div>
        </>
      )}
    </div>
  );
}

// Reusable button
function Button({ variant = "primary", icon, iconRight, children, onClick, fullWidth, type = "button", style }) {
  const cls = "btn btn-" + variant;
  return (
    <button type={type} className={cls} onClick={onClick} style={{ width: fullWidth ? "100%" : "auto", justifyContent: "center", ...style }}>
      {icon && <IconLine name={icon} size={18}/>}
      <span>{children}</span>
      {iconRight && <IconLine name={iconRight} size={18}/>}
    </button>
  );
}

Object.assign(window, { IconLine, Wordmark, LogoLockup, Button });
