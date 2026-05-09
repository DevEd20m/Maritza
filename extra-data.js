/* LIORA — extended data for the mobile prototype */

window.LIORA_TRUST = [
  { icon: "truck", label: "Envío gratis sobre $ 50.000" },
  { icon: "shield", label: "Garantía 30 días" },
  { icon: "check", label: "Uso seguro y responsable" },
  { icon: "guide", label: "Guía experta incluida" },
  { icon: "heart", label: "Atención 24/7" },
];

window.LIORA_STEPS = [
  {
    n: "01",
    icon: "routine",
    title: "Contanos cómo te sentís",
    desc: "Un quiz breve nos ayuda a entender tu piel, rutina y ritmo de vida.",
  },
  {
    n: "02",
    icon: "box",
    title: "Recibí tu kit personalizado",
    desc: "Productos seleccionados, instrucciones claras y guía paso a paso.",
  },
  {
    n: "03",
    icon: "heart",
    title: "Te acompañamos siempre",
    desc: "Recordatorios suaves y respuestas reales cuando las necesites.",
  },
];

window.LIORA_STATS = [
  { n: 92, suffix: "%", label: "de personas notan mejoras en 30 días" },
  { n: 4.9, suffix: "/5", label: "promedio en más de 12.000 reseñas", decimals: 1 },
  { n: 8, suffix: " min", label: "para armar tu kit ideal" },
];

window.LIORA_REVIEWS = [
  {
    quote: "Por fin alguien me explica el orden de los productos sin sermonear. Mi piel está mucho más calma.",
    author: "Camila R.",
    kit: "Kit Piel Mixta",
    rating: 5,
    avatar: "warm",
  },
  {
    quote: "El kit de viaje me salvó las vacaciones. Todo cabe en el neceser y la rutina se sigue casi sola.",
    author: "Mariana O.",
    kit: "Kit Viaje",
    rating: 5,
    avatar: "sage",
  },
  {
    quote: "Lo que más me gustó fue el tono — no me hicieron sentir que algo estaba mal en mí.",
    author: "Lucía F.",
    kit: "Kit Bienestar",
    rating: 5,
    avatar: "cream",
  },
];

window.LIORA_BENEFITS = ["Sin parabenos", "Dermatológicamente testado", "Vegano"];

window.LIORA_QUIZ = [
  {
    id: "skin",
    step: 1, total: 7,
    headline: "¿Cuál es tu tipo de piel?",
    sub: "Esto nos ayuda a empezar por lo más importante.",
    layout: "2x2",
    options: [
      { id: "grasa", label: "Piel grasa", desc: "Brillos, poros visibles", icon: "drop" },
      { id: "seca",  label: "Piel seca",  desc: "Tirantez, descamación", icon: "leaf" },
      { id: "mixta", label: "Piel mixta", desc: "Zona T grasa, mejillas secas", icon: "heart" },
      { id: "no",    label: "No estoy segura", desc: "Te ayudamos a descubrirlo", icon: "info" },
    ],
    tip: {
      title: "¿No sabés cuál es la tuya?",
      body: "Mirá estos ejemplos visuales — observá cómo se ve tu piel después de lavarte la cara, sin nada aplicado.",
      cards: [
        { tone: "warm", title: "Brillo en frente", note: "Probablemente grasa" },
        { tone: "cream", title: "Tirantez", note: "Probablemente seca" },
        { tone: "sage", title: "Mezcla de zonas", note: "Probablemente mixta" },
      ],
    },
  },
  {
    id: "concern",
    step: 2, total: 7,
    headline: "¿Qué te preocupa hoy?",
    sub: "Elegí hasta 3 — vamos a priorizar tu rutina alrededor de eso.",
    layout: "list-multi",
    options: [
      { id: "acne", label: "Acné y brotes", icon: "alert" },
      { id: "manchas", label: "Manchas y tono desigual", icon: "eye" },
      { id: "lineas", label: "Líneas finas", icon: "clock" },
      { id: "sensibilidad", label: "Sensibilidad y rojeces", icon: "heart" },
      { id: "deshidratacion", label: "Deshidratación", icon: "drop" },
      { id: "ninguno", label: "Nada en particular", icon: "leaf" },
    ],
  },
  {
    id: "routine",
    step: 3, total: 7,
    headline: "¿Cuánto tiempo tenés a la mañana?",
    sub: "Sin culpa — adaptamos la rutina a tu ritmo real.",
    layout: "slider",
    min: 1, max: 15, step: 1, default: 5, suffix: " min",
    marks: [
      { v: 2, label: "Express" },
      { v: 5, label: "Justo" },
      { v: 10, label: "Tranqui" },
      { v: 15, label: "Ritual" },
    ],
  },
  {
    id: "moment",
    step: 4, total: 7,
    headline: "¿Cuándo es tu momento?",
    sub: "Elegí los momentos en los que vas a usar tus productos.",
    layout: "moment",
    options: [
      { id: "manana", label: "Mañana", icon: "sun", desc: "Antes de salir" },
      { id: "noche",  label: "Noche",  icon: "moon", desc: "Antes de dormir" },
      { id: "ambos",  label: "Ambos",  icon: "clock", desc: "Rutina completa" },
    ],
  },
  {
    id: "ingredients",
    step: 5, total: 7,
    headline: "¿Qué evitás?",
    sub: "Marcá lo que no quieras encontrar en tu kit.",
    layout: "chips",
    options: [
      { id: "fragancia", label: "Fragancia" },
      { id: "alcohol", label: "Alcohol" },
      { id: "sulfatos", label: "Sulfatos" },
      { id: "parabenos", label: "Parabenos" },
      { id: "siliconas", label: "Siliconas" },
      { id: "origen-animal", label: "Origen animal" },
      { id: "ninguno-2", label: "No tengo restricciones" },
    ],
  },
];

/* simple price helper if missing */
if (!window.formatPrice) {
  window.formatPrice = (n) => "$ " + n.toLocaleString("es-CO").replace(/,/g, ".");
}
