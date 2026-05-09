import { useRef } from 'react'
import { useRouterVM } from './viewmodels/useRouterVM'
import Home from './screens/Home'
import KitDetail from './screens/KitDetail'
import Quiz from './screens/Quiz'

export default function App() {
  const { route, transition } = useRouterVM()
  const homeRef = useRef(null)
  const detailRef = useRef(null)

  const isOpeningKit = transition === 'open-kit'
  const isClosingKit = transition === 'close-kit'
  const isWipingUp = transition === 'wipe-up'
  const isWipeClear = transition === 'wipe-clear'

  return (
    <div className="stage">
      <div className="stage__caption">LIORA · Mobile · Cuidado integral</div>
      <div className="stage__shell">
        <div className="stage__chrome">

          {/* Home — always mounted to preserve scroll on back-nav */}
          {(route.name === 'home' || isOpeningKit || isClosingKit) && (
            <div
              ref={homeRef}
              className="screen"
              style={{
                zIndex: route.name === 'home' ? 1 : 0,
                pointerEvents: route.name === 'home' ? 'auto' : 'none',
                opacity: isOpeningKit ? 0.4 : 1,
                transform: isOpeningKit ? 'scale(0.98)' : 'scale(1)',
                transition: 'opacity 320ms var(--ease-out), transform 320ms var(--ease-out)',
              }}>
              <Home screenRef={homeRef}/>
            </div>
          )}

          {/* Kit Detail */}
          {(route.name === 'detail' || isOpeningKit) && (
            <div
              ref={detailRef}
              className="screen"
              style={{
                zIndex: 2,
                animation: isOpeningKit
                  ? 'liora-detail-enter 380ms var(--ease-out) forwards'
                  : isClosingKit
                  ? 'liora-detail-exit 280ms var(--ease-out) forwards'
                  : 'none',
              }}>
              <KitDetail kitId={route.kitId} screenRef={detailRef}/>
            </div>
          )}

          {/* Quiz */}
          {route.name === 'quiz' && (
            <div className="screen" style={{ zIndex: 3, overflow: 'hidden' }}>
              <Quiz/>
            </div>
          )}

          {/* Wipe overlay */}
          {(isWipingUp || isWipeClear) && (
            <div className={'wipe-overlay' + (isWipingUp ? ' is-active' : '') + (isWipeClear ? ' is-clearing' : '')} style={{ zIndex: 200 }}>
              <div style={{ textAlign: 'center', color: 'var(--liora-cream)' }}>
                <div className="eyebrow-cap" style={{ color: 'rgba(250,250,245,0.7)', marginBottom: 8 }}>UN MOMENTO</div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28 }}>
                  Personalizando tu kit…
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
