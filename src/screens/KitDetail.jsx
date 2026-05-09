import { useState, useEffect } from 'react'
import { IconLine } from '../components/Primitives'
import { useInView, BotanicalLeaf, Stars } from '../components/Common'
import { LIORA_BENEFITS, formatPrice } from '../data/data'
import { useRouterVM } from '../viewmodels/useRouterVM'
import { useKitsVM } from '../viewmodels/useKitsVM'

export default function KitDetail({ kitId, screenRef }) {
  const { backToHome, startQuiz } = useRouterVM()
  const { getKit } = useKitsVM()
  const kit = getKit(kitId)

  const [showStickyCta, setShowStickyCta] = useState(false)
  const [openRow, setOpenRow] = useState(0)

  useEffect(() => {
    const el = screenRef?.current
    if (!el) return
    const onScroll = () => setShowStickyCta(el.scrollTop > 280)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [screenRef])

  const photoCls = `photo ${kit.photo || 'warm'}`

  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <div className={photoCls} style={{ position: 'absolute', inset: 0, animation: 'liora-detail-zoom 700ms var(--ease-out) forwards' }}>
          <div className="label" style={{ fontSize: 16 }}>LIORA · {kit.name.replace('Kit ', '')}</div>
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,19,18,0.20) 0%, rgba(17,19,18,0.0) 30%, rgba(17,19,18,0.0) 60%, rgba(17,19,18,0.55) 100%)' }}/>

        <button onClick={backToHome} aria-label="Volver" style={{
          position: 'absolute', top: 18, left: 16, zIndex: 10,
          width: 40, height: 40, borderRadius: 999,
          background: 'rgba(250,250,245,0.92)', backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.6)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--fg)',
        }}>
          <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
            <IconLine name="arrow" size={16} stroke="currentColor"/>
          </span>
        </button>

        <div style={{ position: 'absolute', top: 24, left: 72, right: 16 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--liora-cream)', background: 'rgba(47,58,53,0.55)', padding: '6px 10px', borderRadius: 999, backdropFilter: 'blur(8px)' }}>
            {kit.eyebrow}
          </span>
        </div>

        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 22, color: 'var(--liora-cream)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0, color: 'var(--liora-cream)' }}>
            {kit.name}
          </h1>
          <p className="lead" style={{ marginTop: 8, color: 'rgba(250,250,245,0.92)', fontSize: 14, lineHeight: 1.5 }}>
            {kit.short}
          </p>
        </div>
      </div>

      <div className="kit-detail-body">
      {/* BENEFIT PILLS */}
      <section style={{ padding: '20px 24px 8px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {LIORA_BENEFITS.map((b, i) => (
          <span key={b} className="pop-in" style={{
            animationDelay: `${i * 40 + 100}ms`,
            border: '1px solid var(--liora-verde-salvia)', color: 'var(--liora-verde-salvia)',
            background: 'var(--liora-cream)', borderRadius: 999,
            padding: '6px 12px', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <IconLine name="check" size={12} stroke="currentColor"/>
            {b}
          </span>
        ))}
      </section>

      {/* PRICE & QUICK INFO */}
      <section style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 28, letterSpacing: '-0.01em' }}>{formatPrice(kit.price)}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-soft)', marginTop: 2 }}>
            {kit.items} productos · envío gratis sobre $ 50.000
          </div>
        </div>
        <Stars value={5}/>
      </section>

      {/* KIT CONTENTS */}
      <section style={{ padding: '32px 24px 24px' }}>
        <div className="eyebrow-cap">QUÉ INCLUYE</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '8px 0 20px' }}>
          {kit.items} esenciales <em style={{ fontStyle: 'italic' }}>seleccionados</em>.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {kit.contains.map((c, i) => (
            <ContentRow key={i} item={c} index={i} routine={kit.routine}
              open={openRow === i} onToggle={() => setOpenRow(openRow === i ? -1 : i)}/>
          ))}
        </div>
      </section>

      {/* TE ACOMPAÑAMOS */}
      <section style={{ background: 'var(--liora-arena)', padding: '40px 24px', margin: '0 16px', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -40, opacity: 0.45 }}>
          <BotanicalLeaf width={140}/>
        </div>
        <div className="eyebrow-cap">TE ACOMPAÑAMOS</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.01em', margin: '8px 0 12px', maxWidth: 280 }}>
          Tu kit, ajustado a <em style={{ fontStyle: 'italic' }}>tu rutina</em>.
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)', margin: '0 0 20px', maxWidth: 320 }}>
          Hacemos un quiz breve y reemplazamos productos según tu piel, tiempo y momento del día. Sin sumar pasos que no vas a hacer.
        </p>
        <button className="btn btn-primary" onClick={startQuiz}>
          Personalizar este kit <IconLine name="arrow" size={16} stroke="currentColor"/>
        </button>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '48px 24px 16px' }}>
        <div className="eyebrow-cap">QUÉ DICEN</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '8px 0 20px' }}>
          Reseñas verificadas.
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { quote: 'Por fin alguien me explica el orden de los productos sin sermonear. Mi piel está mucho más calma.', author: 'Camila R.', kit: kit.name, rating: 5 },
            { quote: 'Lo que más me gustó fue el tono — no me hicieron sentir que algo estaba mal en mí.', author: 'Lucía F.', kit: kit.name, rating: 5 },
          ].map((r, i) => (
            <article key={i} style={{ background: 'var(--liora-cream)', border: '1px solid var(--line)', borderRadius: 8, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Stars value={r.rating} size={13}/>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.4, margin: 0 }}>"{r.quote}"</p>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-soft)' }}>{r.author} · {r.kit}</div>
            </article>
          ))}
        </div>
      </section>

      {/* GUARANTEE STRIP */}
      <section style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { icon: 'shield', label: 'Garantía 30 días' },
          { icon: 'truck',  label: 'Envío gratis' },
          { icon: 'heart',  label: 'Atención 24/7' },
        ].map(g => (
          <div key={g.icon} style={{ background: 'var(--liora-cream)', border: '1px solid var(--line)', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
            <IconLine name={g.icon} size={22} stroke="var(--liora-verde-salvia)"/>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, lineHeight: 1.3 }}>{g.label}</div>
          </div>
        ))}
      </section>

      {/* MEDICAL NOTE */}
      <section style={{ padding: '16px 24px 120px' }}>
        <div style={{ padding: 16, border: '1px solid var(--line-strong)', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <IconLine name="alert" size={18} stroke="#9C4A3C"/>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{kit.note}</div>
        </div>
      </section>
      </div>

      {/* STICKY CTA */}
      <div className={'sticky-cta' + (showStickyCta ? ' is-on' : '')}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-soft)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Desde</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22 }}>{formatPrice(kit.price)}</div>
        </div>
        <button className="btn btn-primary" onClick={startQuiz}>
          Personalizar mi kit <IconLine name="arrow" size={14} stroke="currentColor"/>
        </button>
      </div>
    </>
  )
}

function ContentRow({ item, index, routine, open, onToggle }) {
  const moment = index % 2 === 0 ? 'sun' : 'moon'
  const desc = routine?.[Math.min(index, (routine?.length ?? 1) - 1)]?.step ?? 'Aplicar según tu rutina diaria.'
  return (
    <div className="pop-in" style={{ animationDelay: `${index * 60 + 200}ms`, background: 'var(--liora-cream)', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'transparent', border: 0, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, flex: '0 0 36px', background: moment === 'sun' ? 'var(--liora-durazno-claro)' : 'var(--liora-verde-claro)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconLine name={moment} size={18} stroke="var(--liora-verde-profundo)"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}>{item.name}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-soft)', marginTop: 2 }}>{item.size}</div>
        </div>
        <span style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform var(--dur-base) var(--ease-out)' }}>
          <IconLine name="chevron" size={16} stroke="var(--fg-muted)"/>
        </span>
      </button>
      <div style={{ maxHeight: open ? 220 : 0, overflow: 'hidden', transition: 'max-height 360ms var(--ease-out)' }}>
        <div style={{ padding: '0 16px 16px 64px', borderTop: '1px solid var(--line)' }}>
          <div style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{desc}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {['Niacinamida', 'Centella', 'Sin alcohol'].map(tag => (
              <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', padding: '4px 10px', border: '1px solid var(--line-strong)', borderRadius: 999 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
