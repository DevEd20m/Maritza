/* global React, ReactDOM, HomeScreen, KitDetailScreen, QuizScreen */

const { useState, useRef, useEffect } = React;

function App() {
  const [route, setRoute] = useState({ name: "home" });
  const [transition, setTransition] = useState(null); // { kind, kitId? }
  const homeRef = useRef(null);
  const detailRef = useRef(null);

  const openKit = (kitId) => {
    setTransition({ kind: "open-kit", kitId });
    setTimeout(() => {
      setRoute({ name: "detail", kitId });
      setTransition(null);
    }, 380);
  };
  const backToHome = () => {
    setTransition({ kind: "close-kit" });
    setTimeout(() => {
      setRoute({ name: "home" });
      setTransition(null);
    }, 280);
  };
  const startQuiz = () => {
    setTransition({ kind: "wipe-up" });
    setTimeout(() => {
      setRoute({ name: "quiz" });
      setTimeout(() => setTransition({ kind: "wipe-clear" }), 50);
      setTimeout(() => setTransition(null), 460);
    }, 480);
  };
  const endQuiz = () => setRoute({ name: "home" });

  return (
    <div className="stage">
      <div className="stage__caption">LIORA · Mobile · Cuidado integral</div>

      <div className="stage__shell" data-screen-label="LIORA mobile prototype">
        <div className="stage__chrome">
          {/* Home screen — kept mounted so scroll position survives back-nav */}
          {(route.name === "home" || transition?.kind === "open-kit" || transition?.kind === "close-kit") && (
            <div ref={homeRef} className="screen" data-screen-label="01 Home / Landing"
              style={{
                zIndex: route.name === "home" ? 1 : 0,
                pointerEvents: route.name === "home" ? "auto" : "none",
                opacity: transition?.kind === "open-kit" ? 0.4 : 1,
                transform: transition?.kind === "open-kit" ? "scale(0.98)" : "scale(1)",
                transition: "opacity 320ms var(--ease-out), transform 320ms var(--ease-out)",
              }}>
              <HomeScreen onOpenKit={openKit} screenRef={homeRef}
                onCart={() => alert("Carrito")} onChat={() => alert("Chat")}/>
            </div>
          )}

          {/* Kit Detail */}
          {(route.name === "detail" || transition?.kind === "open-kit") && (
            <div ref={detailRef} className="screen" data-screen-label="02 Kit Detail"
              style={{
                zIndex: 2,
                animation: transition?.kind === "open-kit"
                  ? "liora-detail-enter 380ms var(--ease-out) forwards"
                  : transition?.kind === "close-kit"
                  ? "liora-detail-exit 280ms var(--ease-out) forwards"
                  : "none",
              }}>
              <KitDetailScreen kitId={transition?.kitId || route.kitId}
                onBack={backToHome} onPersonalize={startQuiz}
                screenRef={detailRef}/>
            </div>
          )}

          {/* Quiz */}
          {route.name === "quiz" && (
            <div className="screen" data-screen-label="03 Personalization Quiz"
              style={{ zIndex: 3, overflow: "hidden" }}>
              <QuizScreen onComplete={endQuiz} onBack={endQuiz}/>
            </div>
          )}

          {/* Wipe overlay (between kit detail and quiz) */}
          {(transition?.kind === "wipe-up" || transition?.kind === "wipe-clear") && (
            <div className={"wipe-overlay " + (transition.kind === "wipe-up" ? "is-active" : "is-clearing")}
              style={{ zIndex: 200 }}>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--liora-cream)",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div className="eyebrow-cap" style={{ color: "rgba(250,250,245,0.7)", marginBottom: 8 }}>UN MOMENTO</div>
                  <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 28 }}>
                    Personalizando tu kit…
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stage-level styles */}
      <style>{`
        @keyframes liora-detail-enter {
          from { opacity: 0; transform: translateY(36px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes liora-detail-exit {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(36px) scale(0.98); }
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
