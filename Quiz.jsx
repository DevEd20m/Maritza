/* global React, IconLine, BotanicalLeaf */

const QuizScreen = ({ onComplete, onBack }) => {
  const { useState, useEffect, useRef } = React;
  const quiz = window.LIORA_QUIZ;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("forward"); // forward | back
  const [answers, setAnswers] = useState({});
  const [tipOpen, setTipOpen] = useState(false);

  const current = quiz[step];
  const pct = ((step + 1) / quiz.length) * 100;

  const advance = () => {
    setDirection("forward");
    if (step < quiz.length - 1) setTimeout(() => setStep(step + 1), 280);
    else onComplete && onComplete(answers);
  };

  const back = () => {
    if (step === 0) { onBack && onBack(); return; }
    setDirection("back");
    setTimeout(() => setStep(step - 1), 200);
  };

  const setAnswer = (id, value) => setAnswers(a => ({ ...a, [id]: value }));

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      background: "var(--bg)",
      animation: direction === "back" ? "liora-slide-right-screen 280ms var(--ease-out) forwards" : "none",
    }}>
      <style>{`
        @keyframes liora-slide-right-screen {
          from { transform: translateX(0); }
          to { transform: translateX(0); }
        }
        @keyframes liora-q-out-up {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }
        @keyframes liora-q-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top bar — progress + step counter + close */}
      <div style={{ padding: "20px 20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={back} aria-label="Atrás" style={{
            background: "transparent", border: 0, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--fg-muted)",
          }}>
            <span style={{ display: "inline-block", transform: "rotate(180deg)" }}>
              <IconLine name="arrow" size={14} stroke="currentColor"/>
            </span>
            Atrás
          </button>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--fg-soft)", letterSpacing: "0.04em" }}>
            <span style={{ color: "var(--liora-verde-salvia)", fontWeight: 600 }}>{current.step}</span> de {current.total}
          </div>
          <button onClick={onBack} aria-label="Cerrar" style={{
            width: 32, height: 32, borderRadius: 999,
            background: "transparent", border: 0, cursor: "pointer", color: "var(--fg-muted)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconLine name="close" size={18} stroke="currentColor"/>
          </button>
        </div>
        <div className="qprog">
          <div className="qprog__fill" style={{ width: `${pct}%` }}/>
        </div>
      </div>

      {/* Question content */}
      <div key={step} style={{
        flex: 1, overflowY: "auto", padding: "8px 24px 32px",
        animation: "liora-q-in-up 360ms var(--ease-out) forwards",
      }}>
        <div className="eyebrow-cap" style={{ marginBottom: 6 }}>QUIZ · {current.id.toUpperCase()}</div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 30,
          lineHeight: 1.15, letterSpacing: "-0.01em", margin: "8px 0 8px",
        }}>
          {current.headline.includes("piel") ? (
            <>¿Cuál es tu <em style={{ fontStyle: "italic" }}>tipo de piel</em>?</>
          ) : current.headline}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-muted)", margin: "0 0 24px" }}>
          {current.sub}
        </p>

        {current.layout === "2x2" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {current.options.map((o, i) => {
              const selected = answers[current.id] === o.id;
              return (
                <div key={o.id} className={"opt-card pop-in" + (selected ? " is-selected" : "")}
                  style={{ animationDelay: `${i * 50 + 200}ms`, minHeight: 130 }}
                  onClick={() => { setAnswer(current.id, o.id); setTimeout(advance, 320); }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: selected ? "var(--liora-verde-claro)" : "var(--liora-arena)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <IconLine name={o.icon} size={20} stroke={selected ? "var(--liora-verde-profundo)" : "var(--liora-verde-salvia)"}/>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, lineHeight: 1.2 }}>{o.label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, lineHeight: 1.4, color: "var(--fg-muted)" }}>{o.desc}</div>
                  <div className="opt-check">
                    {selected && <IconLine name="check" size={12} stroke="currentColor"/>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {current.layout === "list-multi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {current.options.map((o, i) => {
              const arr = answers[current.id] || [];
              const selected = arr.includes(o.id);
              return (
                <div key={o.id} className={"opt-card pop-in" + (selected ? " is-selected" : "")}
                  style={{ animationDelay: `${i * 50 + 150}ms`, flexDirection: "row", alignItems: "center", padding: "14px 16px" }}
                  onClick={() => {
                    const next = selected ? arr.filter(x => x !== o.id) : [...arr, o.id].slice(0, 3);
                    setAnswer(current.id, next);
                  }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: selected ? "var(--liora-verde-claro)" : "var(--liora-arena)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 36px" }}>
                    <IconLine name={o.icon} size={18} stroke={selected ? "var(--liora-verde-profundo)" : "var(--liora-verde-salvia)"}/>
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, flex: 1 }}>{o.label}</div>
                  <div className="opt-check" style={{ position: "static" }}>
                    {selected && <IconLine name="check" size={12} stroke="currentColor"/>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {current.layout === "slider" && (
          <SliderQuestion q={current} value={answers[current.id] ?? current.default} onChange={(v) => setAnswer(current.id, v)}/>
        )}

        {current.layout === "moment" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {current.options.map((o, i) => {
              const selected = answers[current.id] === o.id;
              return (
                <div key={o.id} className={"opt-card pop-in" + (selected ? " is-selected" : "")}
                  style={{ animationDelay: `${i * 60 + 150}ms`, flexDirection: "row", alignItems: "center", padding: "20px", gap: 16 }}
                  onClick={() => { setAnswer(current.id, o.id); setTimeout(advance, 320); }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: o.id === "manana" ? "var(--liora-durazno-claro)" : o.id === "noche" ? "var(--liora-verde-salvia)" : "var(--liora-verde-claro)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 56px" }}>
                    <IconLine name={o.icon} size={26} stroke={o.id === "noche" ? "var(--liora-cream)" : "var(--liora-verde-profundo)"}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, lineHeight: 1.15 }}>{o.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>{o.desc}</div>
                  </div>
                  <div className="opt-check" style={{ position: "static" }}>
                    {selected && <IconLine name="check" size={12} stroke="currentColor"/>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {current.layout === "chips" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {current.options.map((o, i) => {
              const arr = answers[current.id] || [];
              const selected = arr.includes(o.id);
              return (
                <button key={o.id} className="kit-pill pop-in" aria-pressed={selected}
                  style={{ animationDelay: `${i * 30 + 100}ms`, padding: "10px 16px", fontSize: 14 }}
                  onClick={() => {
                    const next = selected ? arr.filter(x => x !== o.id) : [...arr, o.id];
                    setAnswer(current.id, next);
                  }}>
                  {selected && <span style={{ marginRight: 6 }}>✓</span>}
                  {o.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Tip — only on step 1 (skin) */}
        {current.layout === "2x2" && (
          <div style={{ marginTop: 28 }}>
            <button onClick={() => setTipOpen(!tipOpen)} style={{
              background: "var(--liora-arena)", border: "1px solid var(--line)",
              borderRadius: 8, padding: "12px 16px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: "var(--liora-verde-claro)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 32px" }}>
                <IconLine name="info" size={16} stroke="var(--liora-verde-profundo)"/>
              </div>
              <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600 }}>
                ¿No sabés cuál es la tuya?
              </div>
              <span style={{ display: "inline-block", transform: tipOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform var(--dur-base) var(--ease-out)" }}>
                <IconLine name="chevron" size={14} stroke="var(--fg-muted)"/>
              </span>
            </button>
            <div style={{ maxHeight: tipOpen ? 360 : 0, overflow: "hidden", transition: "max-height 360ms var(--ease-out)" }}>
              <div style={{ padding: "16px 4px 4px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.55, color: "var(--fg-muted)", margin: "0 0 14px" }}>
                  {current.tip.body}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {current.tip.cards.map((c, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div className={"photo " + c.tone} style={{ height: 80, border: "1px solid var(--line)" }}><span style={{ display: "none" }}/></div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600 }}>{c.title}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--fg-soft)", lineHeight: 1.4 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA — for steps that don't auto-advance */}
      {(current.layout === "list-multi" || current.layout === "slider" || current.layout === "chips") && (
        <div style={{
          padding: "16px 20px 24px",
          background: "rgba(250,250,245,0.94)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--line)",
          display: "flex", gap: 10, alignItems: "center",
        }}>
          <button className="btn btn-link" onClick={advance} style={{ flex: "0 0 auto" }}>
            Saltar
          </button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={advance}>
            Continuar <IconLine name="arrow" size={16} stroke="currentColor"/>
          </button>
        </div>
      )}
    </div>
  );
};

function SliderQuestion({ q, value, onChange }) {
  const pct = ((value - q.min) / (q.max - q.min)) * 100;
  return (
    <div className="pop-in" style={{ animationDelay: "120ms", padding: "16px 4px" }}>
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "baseline", gap: 4,
        margin: "20px 0 32px",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 72, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--liora-verde-salvia)" }}>{value}</span>
        <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--fg-muted)" }}>{q.suffix.trim()}</span>
      </div>

      <div style={{ position: "relative", padding: "20px 0" }}>
        <input type="range" min={q.min} max={q.max} step={q.step} value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={{
            width: "100%", appearance: "none", WebkitAppearance: "none",
            background: `linear-gradient(to right, var(--liora-verde-salvia) 0%, var(--liora-verde-salvia) ${pct}%, var(--liora-gris-claro) ${pct}%, var(--liora-gris-claro) 100%)`,
            height: 6, borderRadius: 999, outline: "none", cursor: "pointer",
          }}/>
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 28px; height: 28px; border-radius: 999px;
            background: var(--liora-verde-salvia);
            border: 3px solid var(--liora-cream);
            box-shadow: 0 4px 10px rgba(47,58,53,0.25);
            cursor: pointer;
          }
          input[type=range]::-moz-range-thumb {
            width: 28px; height: 28px; border-radius: 999px;
            background: var(--liora-verde-salvia);
            border: 3px solid var(--liora-cream);
            box-shadow: 0 4px 10px rgba(47,58,53,0.25);
            cursor: pointer; border-style: solid;
          }
        `}</style>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          {q.marks.map(m => (
            <div key={m.v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontFamily: "var(--font-body)", fontSize: 11, color: "var(--fg-soft)" }}>
              <span style={{ width: 1, height: 6, background: "var(--line-strong)" }}/>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.QuizScreen = QuizScreen;
