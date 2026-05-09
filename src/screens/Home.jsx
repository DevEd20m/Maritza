import { useState, useEffect, useRef } from 'react'
import { IconLine, Wordmark } from '../components/Primitives'
import { useInView, CountUp, BotanicalLeaf, TopNav, ChatFab, Stars } from '../components/Common'
import { LIORA_TRUST, LIORA_STEPS, LIORA_STATS, LIORA_REVIEWS, formatPrice } from '../data/data'
import { useRouterVM } from '../viewmodels/useRouterVM'
import { useKitsVM } from '../viewmodels/useKitsVM'

const KIT_THEMES = {
  'piel-grasa':        { bg: '#EBF2EC', accent: '#3E6848', fg: '#162418', fgMuted: '#4E7058' },
  'viaje':             { bg: '#F7EDD8', accent: '#9A5820', fg: '#281808', fgMuted: '#8A5030' },
  'gym':               { bg: '#EDE8DE', accent: '#7A5E38', fg: '#201808', fgMuted: '#7A5A38' },
  'primeros-auxilios': { bg: '#DCF0E8', accent: '#1E6040', fg: '#081E14', fgMuted: '#386850' },
  'bienestar':         { bg: '#1A2620', accent: '#B0CCBA', fg: '#EEF4F0', fgMuted: '#80A490' },
}
const DEFAULT_THEME = { bg: '#F5F0E8', accent: '#5C7A5E', fg: '#2F3A35', fgMuted: '#6B7B71' }

export default function Home({ screenRef }) {
  const { openKit, startQuiz } = useRouterVM()
  const { filteredKits, filters, activeFilter, setFilter } = useKitsVM()

  const [introDone, setIntroDone] = useState(false)
  useEffect(() => { const t = setTimeout(() => setIntroDone(true), 950); return () => clearTimeout(t) }, [])

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const leafRef = useRef(null)
  useEffect(() => {
    const el = screenRef?.current
    if (!el) return
    const onScroll = () => { if (leafRef.current) leafRef.current.style.transform = `translateY(${el.scrollTop * 0.3}px)` }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [screenRef])

  const [statsRef, statsIn] = useInView({ threshold: 0.4 })

  const [activeCard, setActiveCard] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => { setActiveCard(0); setRotation(0) }, [activeFilter])
  useEffect(() => setExpanded(false), [activeCard])

  const angleStep = 360 / Math.max(filteredKits.length, 1)
  const RADIUS = 220
  const activeKit = filteredKits[Math.min(activeCard, filteredKits.length - 1)] || null
  const theme = (activeKit && KIT_THEMES[activeKit.id]) || DEFAULT_THEME

  const goTo = (i) => {
    const total = filteredKits.length
    let delta = i - activeCard
    if (delta > total / 2) delta -= total
    if (delta < -total / 2) delta += total
    setRotation(r => r - delta * angleStep)
    setActiveCard(i)
  }
  const goPrev = () => goTo((activeCard - 1 + filteredKits.length) % filteredKits.length)
  const goNext = () => goTo((activeCard + 1) % filteredKits.length)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -40) goNext()
    else if (dx > 40) goPrev()
    touchStartX.current = null
  }

  const scrollToShelf = () => screenRef?.current?.scrollTo({ top: 740, behavior: 'smooth' })

  const headlineWords = ['Tu', <em key="bn"><i>bienestar</i></em>, ',', 'nuestra', 'guía.']

  return (
    <>
      {!introDone && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg)', pointerEvents: 'none',
        }}>
          <div style={{ animation: 'liora-logo-intro 900ms var(--ease-out) forwards' }}>
            <Wordmark size={36} color="var(--fg)"/>
          </div>
          <style>{`
            @keyframes liora-logo-intro {
              0%   { opacity: 0; transform: translateY(0) scale(0.96); }
              30%  { opacity: 1; transform: translateY(0) scale(1); }
              100% { opacity: 0; transform: translateY(-220px) scale(0.55); }
            }
          `}</style>
        </div>
      )}

      <TopNav scrollRef={screenRef} onCart={() => {}} onMyKits={() => {}}/>

      {/* HERO */}
      <section className="hero-section" style={{ position: 'relative', padding: '16px 24px 40px', overflow: 'hidden' }}>
        <div ref={leafRef} style={{ position: 'absolute', top: -30, right: -60, pointerEvents: 'none' }}>
          <BotanicalLeaf width={240} opacity={0.5}/>
        </div>

        <div className="hero-text">
          <div className="eyebrow-cap fade-up" style={{ animationDelay: '950ms' }}>CUIDADO INTEGRAL</div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.01em', margin: '12px 0 0', maxWidth: 320 }}>
            {headlineWords.map((w, i) => (
              <span key={i} className="fade-up" style={{
                display: 'inline-block',
                animationDelay: `${950 + i * 60}ms`,
                marginRight: i < headlineWords.length - 1 ? 8 : 0,
              }}>{w}</span>
            ))}
          </h1>

          <p className="lead fade-up" style={{ marginTop: 16, maxWidth: 300, animationDelay: '1300ms', fontSize: 16, lineHeight: 1.55, color: 'var(--fg-muted)' }}>
            Kits completos de autocuidado con productos seleccionados e instrucciones claras para saber qué usar, cómo usarlo y cuándo pedir ayuda.
          </p>

          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24, animationDelay: '1450ms' }}>
            <button className="btn btn-primary" onClick={scrollToShelf}>
              Encontrar mi kit <IconLine name="arrow" size={16} stroke="currentColor"/>
            </button>
            <button className="btn btn-link" style={{ alignSelf: 'flex-start' }} onClick={scrollToShelf}>
              Ver todos los kits →
            </button>
          </div>
        </div>

        <div className="photo warm hero-photo" style={{ marginTop: 28, height: 220, borderRadius: 0, animation: 'liora-hero-product 700ms var(--ease-out) 1100ms both' }}>
          <div className="label">Kit Bienestar · Edición Otoño</div>
        </div>

        <div className="hero-scroll-hint" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 32, opacity: 0.65, animation: 'liora-pulse 2.4s ease-in-out infinite' }}>
          <div className="eyebrow-cap" style={{ fontSize: 10 }}>SEGUIR</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </section>

      {/* KIT SHOWCASE */}
      <section style={{ paddingTop: 48 }}>
        <div className="kit-section-header">
          <div>
            <div className="eyebrow-cap">VITRINA · KITS</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '8px 0 0' }}>
              Encontrá tu <em style={{ fontStyle: 'italic' }}>kit ideal</em>
            </h2>
          </div>
          <button className="btn-link" style={{ background: 'transparent', border: 0, padding: '8px 0', fontSize: 12, fontWeight: 600, color: 'var(--accent)', cursor: 'pointer' }}>
            Ver todos →
          </button>
        </div>

        {/* Category filter pills */}
        <div className="kit-pills-bar">
          {filters.map(f => (
            <button key={f.id} className={'kit-pill' + (f.id === activeFilter ? ' is-on' : '')}
              aria-pressed={f.id === activeFilter}
              onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Themed showcase area */}
        <div
          className="kit-showcase"
          style={{ background: theme.bg }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="kit-showcase__inner">

            {/* Left: Kit info */}
            {activeKit && (
              <div key={activeKit.id} className="kit-showcase__info fade-in">
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.accent, marginBottom: 10 }}>
                  KIT COLLECTION · {activeKit.items} productos
                </div>
                <h3 className="kit-showcase__name" style={{ color: theme.fg }}>
                  {activeKit.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: theme.fgMuted, margin: '0 0 18px', maxWidth: 340 }}>
                  {activeKit.short}
                </p>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: theme.fg, marginBottom: 22 }}>
                  {formatPrice(activeKit.price)}
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    className="btn"
                    style={{ background: theme.accent, color: theme.bg, minHeight: 44, padding: '10px 22px', fontSize: 14, borderRadius: 'var(--r-button)' }}
                    onClick={() => openKit(activeKit.id)}
                  >
                    Ver kit
                  </button>
                  <button
                    className="btn"
                    style={{
                      background: 'transparent', color: theme.fg,
                      border: `1px solid ${theme.fg}55`,
                      minHeight: 44, padding: '10px 20px', fontSize: 14, borderRadius: 'var(--r-button)',
                    }}
                    onClick={() => setExpanded(e => !e)}
                  >
                    {expanded ? 'Cerrar' : 'Explorar contenido'}
                  </button>
                </div>

                {/* Product tags - expand on click */}
                {expanded && (
                  <div className="kit-products" style={{ marginTop: 20 }}>
                    {activeKit.contains.map((item, i) => (
                      <div
                        key={i}
                        className="kit-product-tag fade-up"
                        style={{ animationDelay: `${i * 50}ms`, borderColor: theme.accent + '70', color: theme.fg }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: theme.accent, flexShrink: 0 }}/>
                        <span style={{ fontWeight: 500 }}>{item.name}</span>
                        {item.size !== '—' && <span style={{ opacity: 0.5, fontSize: 11, marginLeft: 2 }}>· {item.size}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Right: 3D Carousel */}
            <div className="kit-showcase__card">
              <div className="kit-showcase__carousel">
                <div
                  className="carousel-3d-ring"
                  style={{ transform: `rotateY(${rotation}deg)` }}
                >
                  {filteredKits.map((k, i) => (
                    <div
                      key={k.id}
                      className="carousel-3d-item"
                      style={{ transform: `rotateY(${i * angleStep}deg) translateZ(${RADIUS}px)` }}
                    >
                      <ShelfCard
                        kit={k}
                        active={i === activeCard}
                        accentColor={theme.accent}
                        onFocus={() => goTo(i)}
                        onOpen={openKit}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center', marginTop: 12 }}>
                <button
                  onClick={goPrev}
                  style={{
                    width: 38, height: 38, borderRadius: 999, cursor: 'pointer',
                    border: `1px solid ${theme.fg}30`, background: theme.fg + '12', color: theme.fg,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div style={{ display: 'flex', gap: 6 }}>
                  {filteredKits.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} style={{
                      width: i === activeCard ? 16 : 6, height: 6, borderRadius: 999, border: 0, padding: 0,
                      background: i === activeCard ? theme.accent : theme.fg + '40',
                      cursor: 'pointer', transition: 'all var(--dur-base) var(--ease-out)',
                    }}/>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  style={{
                    width: 38, height: 38, borderRadius: 999, cursor: 'pointer',
                    border: `1px solid ${theme.fg}30`, background: theme.fg + '12', color: theme.fg,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-bar__track">
          {[...LIORA_TRUST, ...LIORA_TRUST].map((t, i) => (
            <div key={i} className="trust-item">
              <IconLine name={t.icon} size={16} stroke="var(--liora-verde-salvia)"/>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.10em', fontSize: 11 }}>{t.label}</span>
              <span style={{ color: 'var(--liora-verde-claro)', margin: '0 8px' }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" style={{ marginTop: 0 }}>
        <div className="eyebrow-cap">CÓMO FUNCIONA</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '8px 0 28px' }}>
          Tres pasos, sin <em style={{ fontStyle: 'italic' }}>vueltas</em>.
        </h2>
        <div className="steps-grid" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {LIORA_STEPS.map((s, i) => <StepRow key={s.n} step={s} index={i}/>)}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background: 'var(--liora-verde-claro)', padding: '40px 24px', margin: '16px 16px', borderRadius: 8 }}>
        <div className="eyebrow-cap">¿POR QUÉ LIORA?</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, lineHeight: 1.2, margin: '8px 0 24px', letterSpacing: '-0.01em' }}>
          Resultados que se sostienen.
        </h3>
        <div className="stats-grid" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {LIORA_STATS.map((s, i) => (
            <div key={i} className="stats-item" style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 16, borderBottom: i < LIORA_STATS.length - 1 ? '1px solid rgba(47,58,53,0.15)' : '0' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--liora-verde-profundo)', minWidth: 110 }}>
                <CountUp to={s.n} suffix={s.suffix} decimals={s.decimals || 0} start={statsIn}/>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45, color: 'var(--liora-verde-profundo)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ paddingTop: 48 }}>
        <div style={{ padding: '0 24px' }}>
          <div className="eyebrow-cap">QUÉ DICEN</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '8px 0 0' }}>
            Personas reales, <em style={{ fontStyle: 'italic' }}>rutinas reales</em>.
          </h2>
        </div>
        <div className="snap-x" style={{ marginTop: 20 }}>
          {LIORA_REVIEWS.map((r, i) => <ReviewCard key={i} r={r}/>)}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ background: 'var(--liora-verde-salvia)', color: 'var(--liora-cream)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="eyebrow-cap" style={{ color: 'rgba(250,250,245,0.7)' }}>BIENVENIDA</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 26, lineHeight: 1.2, letterSpacing: '-0.01em', marginTop: 8, color: 'var(--liora-cream)' }}>
            Ingresá tu email y recibí <em style={{ fontStyle: 'italic' }}>15% off</em> en tu primer kit.
          </h3>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }}
            style={{ display: 'flex', gap: 8, marginTop: 18, background: 'rgba(250,250,245,0.10)', border: '1px solid rgba(250,250,245,0.22)', borderRadius: 8, padding: 6 }}>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitted}
              placeholder="tu@email.com"
              style={{ flex: 1, background: 'transparent', border: 0, color: 'var(--liora-cream)', fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 12px', outline: 'none' }}
            />
            <button type="submit" className="btn btn-warm" style={{
              minHeight: 40, padding: submitted ? '10px 14px' : '10px 18px',
              background: submitted ? '#5C7A5E' : 'var(--liora-durazno-claro)',
              color: submitted ? 'var(--liora-cream)' : 'var(--fg)',
              transition: 'all 360ms var(--ease-out)',
            }}>
              {submitted ? <><IconLine name="check" size={16} stroke="currentColor"/> ¡Listo!</> : 'Quiero el 15%'}
            </button>
          </form>
          {submitted && (
            <div className="fade-in" style={{ marginTop: 12, fontSize: 13, color: 'rgba(250,250,245,0.85)' }}>
              ¡Listo! Revisá tu correo <span style={{ color: '#C9D6CB' }}>·</span> el cupón llega en unos minutos.
            </div>
          )}
        </div>
      </section>

      {/* VIDEO REVIEW */}
      <section style={{ padding: '16px 24px 48px' }}>
        <div className="eyebrow-cap" style={{ marginBottom: 12 }}>EN VIDEO</div>
        <div className="photo dark" style={{ position: 'relative', height: 220, cursor: 'pointer' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(250,250,245,0.92)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(47,58,53,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--liora-verde-profundo)"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div className="label" style={{ marginBottom: 16 }}>2:14</div>
        </div>
        <p style={{ marginTop: 14, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.55 }}>
          Florencia abre su Kit Piel Mixta y nos cuenta cómo armó su rutina en un departamento compartido.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--liora-verde-profundo)', color: 'var(--liora-cream)', padding: '48px 24px 80px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, border: '1px solid rgba(250,250,245,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--liora-cream)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 7v10M12 9.5c-2 0-3 1.2-3 3M12 12.5c2 0 3 1.2 3 3"/>
            </svg>
          </div>
        </div>
        <Wordmark size={20} color="var(--liora-cream)"/>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', marginTop: 8, opacity: 0.8 }}>Cuidado integral</div>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, marginTop: 20, opacity: 0.85 }}>Tu bienestar, nuestra guía.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 24 }}>
          {['info', 'guide', 'heart'].map(n => (
            <button key={n} className="topnav__icon-btn" style={{ color: 'var(--liora-cream)' }}>
              <IconLine name={n} size={18} stroke="currentColor"/>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 28, fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(250,250,245,0.75)', flexWrap: 'wrap' }}>
          <span>Sobre LIORA</span><span>Guías</span><span>Envíos</span><span>Contacto</span>
        </div>
      </footer>

      <ChatFab onClick={() => {}}/>
    </>
  )
}

function ShelfCard({ kit, active, accentColor, onFocus, onOpen }) {
  const photoCls = `photo ${kit.photo || 'warm'}`
  const borderAccent = accentColor || 'var(--liora-verde-salvia)'
  return (
    <article
      onClick={active ? () => onOpen(kit.id) : onFocus}
      style={{
        width: '100%', height: '100%',
        background: 'var(--liora-beige)',
        border: `1px solid ${active ? borderAccent : 'var(--line)'}`,
        borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        boxShadow: active
          ? '0 28px 64px rgba(47,58,53,0.32), 0 8px 24px rgba(47,58,53,0.14)'
          : '0 2px 8px rgba(47,58,53,0.06)',
        transition: 'box-shadow 420ms var(--ease-out), border-color 420ms var(--ease-out)',
      }}>
      <div className={photoCls} style={{ height: 160, flexShrink: 0 }}>
        <div className="label">{kit.name.replace('Kit ', '')}</div>
      </div>
      <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        <div className="eyebrow-cap" style={{ color: 'var(--fg-soft)' }}>{kit.eyebrow}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, lineHeight: 1.2, margin: 0 }}>{kit.name}</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.5,
          color: 'var(--fg-muted)', margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{kit.short}</p>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>
            {formatPrice(kit.price)}
          </div>
          <button className="btn btn-outline" style={{
            width: '100%', minHeight: 36, padding: '8px 0', fontSize: 13,
            opacity: active ? 1 : 0,
            transition: 'opacity 300ms var(--ease-out)',
            pointerEvents: 'none',
          }}>
            Ver kit
          </button>
        </div>
      </div>
    </article>
  )
}

function StepRow({ step, index }) {
  const [ref, seen] = useInView({ threshold: 0.3 })
  const fromLeft = index % 2 === 0
  return (
    <div ref={ref} style={{
      display: 'flex', gap: 14, alignItems: 'flex-start',
      padding: 16, borderRadius: 8,
      background: index === 1 ? 'var(--liora-arena)' : 'var(--liora-cream)',
      border: '1px solid var(--line)',
      opacity: seen ? 1 : 0,
      transform: seen ? 'translateX(0)' : `translateX(${fromLeft ? -28 : 28}px)`,
      transition: `opacity 480ms var(--ease-out) ${index * 100}ms, transform 480ms var(--ease-out) ${index * 100}ms`,
    }}>
      <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--liora-verde-claro)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 48px' }}>
        <IconLine name={step.icon} size={22} stroke="var(--liora-verde-profundo)"/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--fg-soft)' }}>— paso {step.n}</div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: '2px 0 6px' }}>{step.title}</h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--fg-muted)', margin: 0 }}>{step.desc}</p>
      </div>
    </div>
  )
}

function ReviewCard({ r }) {
  const tone = r.avatar === 'sage' ? 'sage' : r.avatar === 'cream' ? 'cream' : 'warm'
  return (
    <article style={{ width: 280, background: 'var(--liora-cream)', border: '1px solid var(--line)', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Stars value={r.rating}/>
      <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 17, lineHeight: 1.4, margin: 0 }}>"{r.quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        <div className={`photo ${tone}`} style={{ width: 36, height: 36, borderRadius: 999, overflow: 'hidden', border: '1px solid var(--line)' }}/>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>{r.author}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-soft)' }}>{r.kit}</div>
        </div>
      </div>
    </article>
  )
}
