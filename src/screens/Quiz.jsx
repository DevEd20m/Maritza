import { useState } from 'react'
import { IconLine } from '../components/Primitives'
import { useRouterVM } from '../viewmodels/useRouterVM'
import { useQuizVM } from '../viewmodels/useQuizVM'

export default function Quiz() {
  const { endQuiz } = useRouterVM()
  const { step, answers, current, progress, advance, back, answer, toggle, reset } = useQuizVM()
  const [tipOpen, setTipOpen] = useState(false)

  const handleAdvance = () => advance(endQuiz)
  const handleBack = () => back(endQuiz)

  if (current.layout === 'interstitial') {
    return <InterstitialStep onContinue={handleAdvance} onBack={handleBack} step={current}/>
  }

  const pct = progress

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={handleBack} aria-label="Atrás" style={{ background: 'transparent', border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--fg-muted)' }}>
            <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
              <IconLine name="arrow" size={14} stroke="currentColor"/>
            </span>
            Atrás
          </button>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--fg-soft)', letterSpacing: '0.04em' }}>
            <span style={{ color: 'var(--liora-verde-salvia)', fontWeight: 600 }}>{current.step}</span> de {current.total}
          </div>
          <button onClick={endQuiz} aria-label="Cerrar" style={{ width: 32, height: 32, borderRadius: 999, background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--fg-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconLine name="close" size={18} stroke="currentColor"/>
          </button>
        </div>
        <div className="qprog">
          <div className="qprog__fill" style={{ width: `${pct}%` }}/>
        </div>
      </div>

      {/* Question content */}
      <div key={step} className="quiz-inner" style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 32px', animation: 'liora-q-in-up 360ms var(--ease-out) forwards' }}>
        <div className="eyebrow-cap" style={{ marginBottom: 6 }}>QUIZ · {current.id.toUpperCase()}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 30, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '8px 0 8px' }}>
          {current.id === 'skin' ? <>¿Cuál es tu <em style={{ fontStyle: 'italic' }}>tipo de piel</em>?</> : current.headline}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)', margin: '0 0 24px' }}>{current.sub}</p>

        {current.layout === '2x2' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {current.options.map((o, i) => {
              const selected = answers[current.id] === o.id
              return (
                <div key={o.id} className={'opt-card pop-in' + (selected ? ' is-selected' : '')}
                  style={{ animationDelay: `${i * 50 + 200}ms`, minHeight: 130 }}
                  onClick={() => { answer(current.id, o.id); setTimeout(handleAdvance, 320) }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: selected ? 'var(--liora-verde-claro)' : 'var(--liora-arena)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconLine name={o.icon} size={20} stroke={selected ? 'var(--liora-verde-profundo)' : 'var(--liora-verde-salvia)'}/>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, lineHeight: 1.2 }}>{o.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.4, color: 'var(--fg-muted)' }}>{o.desc}</div>
                  <div className="opt-check">{selected && <IconLine name="check" size={12} stroke="currentColor"/>}</div>
                </div>
              )
            })}
          </div>
        )}

        {current.layout === 'list-multi' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {current.options.map((o, i) => {
              const arr = answers[current.id] || []
              const selected = arr.includes(o.id)
              return (
                <div key={o.id} className={'opt-card pop-in' + (selected ? ' is-selected' : '')}
                  style={{ animationDelay: `${i * 50 + 150}ms`, flexDirection: 'row', alignItems: 'center', padding: '14px 16px' }}
                  onClick={() => {
                    const next = selected ? arr.filter(x => x !== o.id) : [...arr, o.id].slice(0, 3)
                    answer(current.id, next)
                  }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: selected ? 'var(--liora-verde-claro)' : 'var(--liora-arena)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 36px' }}>
                    <IconLine name={o.icon} size={18} stroke={selected ? 'var(--liora-verde-profundo)' : 'var(--liora-verde-salvia)'}/>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500, flex: 1 }}>{o.label}</div>
                  <div className="opt-check" style={{ position: 'static' }}>{selected && <IconLine name="check" size={12} stroke="currentColor"/>}</div>
                </div>
              )
            })}
          </div>
        )}

        {current.layout === 'slider' && (
          <SliderQuestion q={current} value={answers[current.id] ?? current.default} onChange={(v) => answer(current.id, v)}/>
        )}

        {current.layout === 'moment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {current.options.map((o, i) => {
              const selected = answers[current.id] === o.id
              const bg = o.id === 'manana' ? 'var(--liora-durazno-claro)' : o.id === 'noche' ? 'var(--liora-verde-salvia)' : 'var(--liora-verde-claro)'
              const ink = o.id === 'noche' ? 'var(--liora-cream)' : 'var(--liora-verde-profundo)'
              return (
                <div key={o.id} className={'opt-card pop-in' + (selected ? ' is-selected' : '')}
                  style={{ animationDelay: `${i * 60 + 150}ms`, flexDirection: 'row', alignItems: 'center', padding: '20px', gap: 16 }}
                  onClick={() => { answer(current.id, o.id); setTimeout(handleAdvance, 320) }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 56px' }}>
                    <IconLine name={o.icon} size={26} stroke={ink}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, lineHeight: 1.15 }}>{o.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{o.desc}</div>
                  </div>
                  <div className="opt-check" style={{ position: 'static' }}>{selected && <IconLine name="check" size={12} stroke="currentColor"/>}</div>
                </div>
              )
            })}
          </div>
        )}

        {current.layout === 'chips' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {current.options.map((o, i) => {
              const arr = answers[current.id] || []
              const selected = arr.includes(o.id)
              return (
                <button key={o.id} className="kit-pill pop-in" aria-pressed={selected}
                  style={{ animationDelay: `${i * 30 + 100}ms`, padding: '10px 16px', fontSize: 14 }}
                  onClick={() => {
                    const next = selected ? arr.filter(x => x !== o.id) : [...arr, o.id]
                    answer(current.id, next)
                  }}>
                  {selected && <span style={{ marginRight: 6 }}>✓</span>}
                  {o.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Tip — skin type only */}
        {current.layout === '2x2' && current.tip && (
          <div style={{ marginTop: 28 }}>
            <button onClick={() => setTipOpen(!tipOpen)} style={{ background: 'var(--liora-arena)', border: '1px solid var(--line)', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left' }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--liora-verde-claro)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 32px' }}>
                <IconLine name="info" size={16} stroke="var(--liora-verde-profundo)"/>
              </div>
              <div style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>¿No sabés cuál es la tuya?</div>
              <span style={{ display: 'inline-block', transform: tipOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform var(--dur-base) var(--ease-out)' }}>
                <IconLine name="chevron" size={14} stroke="var(--fg-muted)"/>
              </span>
            </button>
            <div style={{ maxHeight: tipOpen ? 360 : 0, overflow: 'hidden', transition: 'max-height 360ms var(--ease-out)' }}>
              <div style={{ padding: '16px 4px 4px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--fg-muted)', margin: '0 0 14px' }}>{current.tip.body}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {current.tip.cards.map((c, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div className={`photo ${c.tone}`} style={{ height: 80, border: '1px solid var(--line)' }}/>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600 }}>{c.title}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--fg-soft)', lineHeight: 1.4 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA — for steps that don't auto-advance */}
      {(current.layout === 'list-multi' || current.layout === 'slider' || current.layout === 'chips') && (
        <div style={{ padding: '16px 20px 24px', background: 'rgba(250,250,245,0.94)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-link" onClick={handleAdvance} style={{ flex: '0 0 auto' }}>Saltar</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdvance}>
            Continuar <IconLine name="arrow" size={16} stroke="currentColor"/>
          </button>
        </div>
      )}
    </div>
  )
}

function InterstitialStep({ onContinue, onBack, step }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--liora-verde-salvia)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
      <button onClick={onBack} aria-label="Atrás" style={{ position: 'absolute', top: 20, left: 20, background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--liora-cream)', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500 }}>
        <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
          <IconLine name="arrow" size={14} stroke="currentColor"/>
        </span>
        Atrás
      </button>

      <div style={{ animation: 'liora-kit-assemble 800ms var(--ease-out) forwards', marginBottom: 32 }}>
        <div style={{ width: 96, height: 96, borderRadius: 999, border: '1.5px solid rgba(250,250,245,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(250,250,245,0.12)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--liora-cream)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v10M12 9.5c-2 0-3 1.2-3 3M12 12.5c2 0 3 1.2 3 3"/>
          </svg>
        </div>
      </div>

      <div className="eyebrow-cap" style={{ color: 'rgba(250,250,245,0.7)', marginBottom: 12 }}>
        PASO {step.step} DE {step.total}
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 32, lineHeight: 1.15, color: 'var(--liora-cream)', margin: '0 0 16px' }}>
        {step.headline}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'rgba(250,250,245,0.85)', maxWidth: 300, margin: '0 0 40px' }}>
        {step.sub}
      </p>
      <button className="btn btn-warm" style={{ minWidth: 220 }} onClick={onContinue}>
        Ver resultados <IconLine name="arrow" size={16} stroke="currentColor"/>
      </button>
    </div>
  )
}

function SliderQuestion({ q, value, onChange }) {
  const pct = ((value - q.min) / (q.max - q.min)) * 100
  return (
    <div className="pop-in" style={{ animationDelay: '120ms', padding: '16px 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 4, margin: '20px 0 32px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 72, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--liora-verde-salvia)' }}>{value}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--fg-muted)' }}>{q.suffix.trim()}</span>
      </div>
      <div style={{ position: 'relative', padding: '20px 0' }}>
        <input type="range" min={q.min} max={q.max} step={q.step} value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={{
            width: '100%', appearance: 'none', WebkitAppearance: 'none',
            background: `linear-gradient(to right, var(--liora-verde-salvia) 0%, var(--liora-verde-salvia) ${pct}%, var(--liora-gris-claro) ${pct}%, var(--liora-gris-claro) 100%)`,
            height: 6, borderRadius: 999, outline: 'none', cursor: 'pointer',
          }}/>
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 28px; height: 28px; border-radius: 999px;
            background: var(--liora-verde-salvia);
            border: 3px solid var(--liora-cream);
            box-shadow: 0 4px 10px rgba(47,58,53,0.25); cursor: pointer;
          }
          input[type=range]::-moz-range-thumb {
            width: 28px; height: 28px; border-radius: 999px;
            background: var(--liora-verde-salvia);
            border: 3px solid var(--liora-cream);
            box-shadow: 0 4px 10px rgba(47,58,53,0.25); cursor: pointer; border-style: solid;
          }
        `}</style>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          {q.marks.map(m => (
            <div key={m.v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-soft)' }}>
              <span style={{ width: 1, height: 6, background: 'var(--line-strong)' }}/>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
