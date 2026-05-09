// LIORA — catalog & app data (ES module)

export const LIORA_KITS = [
  {
    id: 'piel-grasa',
    name: 'Kit Piel Grasa',
    eyebrow: 'Cuidado personal · Piel',
    short: 'Rutina de 30 días para equilibrar el sebo y reducir brillos sin resecar.',
    price: 89900, items: 5, category: 'piel', photo: 'sage',
    contains: [
      { name: 'Limpiador suave matificante', size: '150 ml' },
      { name: 'Tónico astringente sin alcohol', size: '120 ml' },
      { name: 'Sérum niacinamida 5%', size: '30 ml' },
      { name: 'Hidratante oil-free', size: '50 ml' },
      { name: 'Protector solar fluido FPS 50', size: '40 ml' },
    ],
    routine: [
      { time: 'Mañana', step: 'Limpia con agua tibia, aplica tónico, sérum y protector solar.' },
      { time: 'Noche', step: 'Doble limpieza, tónico, sérum y una capa fina de hidratante.' },
      { time: 'Cada 5 días', step: 'Sustituye el sérum por una mascarilla de arcilla 10 minutos.' },
    ],
    note: 'Si la irritación persiste más de 7 días, suspende el uso y consulta a tu médico.',
  },
  {
    id: 'viaje',
    name: 'Kit Viaje',
    eyebrow: 'Esenciales · Tamaño cabina',
    short: 'Siete esenciales en formato pequeño para mantener tu rutina lejos de casa.',
    price: 69900, items: 7, category: 'viaje', photo: 'warm',
    contains: [
      { name: 'Limpiador 50 ml', size: '50 ml' },
      { name: 'Hidratante 30 ml', size: '30 ml' },
      { name: 'Protector solar 30 ml', size: '30 ml' },
      { name: 'Bálsamo labial', size: '10 g' },
      { name: 'Antiséptico de bolsillo', size: '30 ml' },
      { name: 'Apósitos hidrocoloides', size: '10 u.' },
      { name: 'Necessaire de algodón', size: '—' },
    ],
    routine: [
      { time: 'Antes de salir', step: 'Llena los frascos con tu rutina habitual.' },
      { time: 'Mañana en el viaje', step: 'Limpia, hidrata y aplica protector solar antes de salir.' },
      { time: 'Noche', step: 'Limpieza simple si estás cansada — un solo paso es suficiente.' },
    ],
    note: 'Apto para equipaje de mano. Cumple la regla de líquidos de hasta 100 ml.',
  },
  {
    id: 'gym',
    name: 'Kit Gym',
    eyebrow: 'Activo · Cuidado pre y post',
    short: 'Para el cuerpo en movimiento — protección, recuperación y limpieza rápida.',
    price: 79900, items: 5, category: 'activo', photo: 'warm',
    contains: [
      { name: 'Crema antifricción zonas activas', size: '75 ml' },
      { name: 'Gel frío recuperador', size: '120 ml' },
      { name: 'Spray refrescante para pies', size: '60 ml' },
      { name: 'Toallitas limpiadoras x 20', size: '20 u.' },
      { name: 'Protector solar deportivo FPS 50+', size: '50 ml' },
    ],
    routine: [
      { time: 'Antes', step: 'Aplica antifricción en zonas de roce y protector solar si entrenas afuera.' },
      { time: 'Después', step: 'Toallitas para limpiar, gel frío en músculos cargados, spray para pies.' },
    ],
    note: 'Evita aplicar gel frío sobre piel lastimada o con heridas abiertas.',
  },
  {
    id: 'primeros-auxilios',
    name: 'Kit Primeros Auxilios',
    eyebrow: 'Hogar · Para tener a mano',
    short: 'Lo esencial para resolver pequeños accidentes en casa con calma y método.',
    price: 99900, items: 12, category: 'hogar', photo: 'sage',
    contains: [
      { name: 'Apósitos surtidos', size: '20 u.' },
      { name: 'Gasas estériles', size: '10 u.' },
      { name: 'Cinta micropore', size: '1 rollo' },
      { name: 'Antiséptico líquido', size: '60 ml' },
      { name: 'Crema cicatrizante', size: '30 g' },
      { name: 'Pinzas + tijeras', size: '—' },
      { name: 'Termómetro digital', size: '—' },
      { name: 'Compresa fría/caliente', size: '—' },
      { name: 'Suero fisiológico', size: '5 amp.' },
      { name: 'Guantes desechables', size: '5 pares' },
      { name: 'Manual rápido LIORA', size: '—' },
      { name: 'Estuche rígido', size: '—' },
    ],
    routine: [
      { time: 'Cuando lo necesites', step: 'Lava las manos, evalúa la situación y abre el manual rápido si dudas.' },
      { time: 'Cada 6 meses', step: 'Revisa fechas de vencimiento y repón lo usado.' },
    ],
    note: 'No reemplaza atención médica. Llama a emergencias si hay sangrado abundante o pérdida de conciencia.',
  },
  {
    id: 'bienestar',
    name: 'Kit Bienestar',
    eyebrow: 'Cuidado integral · Diario',
    short: 'Suplementos y rutinas guiadas para sostener energía, sueño y digestión.',
    price: 119900, items: 6, category: 'bienestar', photo: 'dark',
    contains: [
      { name: 'Magnesio bisglicinato', size: '60 cápsulas' },
      { name: 'Vitamina D3 + K2', size: '60 cápsulas' },
      { name: 'Probiótico diario', size: '30 sobres' },
      { name: 'Té de hierbas para dormir', size: '20 bolsitas' },
      { name: 'Diario de seguimiento', size: '1 unidad' },
      { name: 'Guía de hábitos LIORA', size: '—' },
    ],
    routine: [
      { time: 'Mañana', step: 'Vitamina D3 con el desayuno y un sobre de probiótico en agua fría.' },
      { time: 'Noche', step: 'Magnesio 30 minutos antes de dormir junto al té de hierbas.' },
      { time: 'Cada domingo', step: 'Anota cómo te sentiste esta semana en el diario.' },
    ],
    note: 'Si tomas otros medicamentos, consulta a tu médico antes de iniciar suplementos.',
  },
]

export const LIORA_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'piel', label: 'Piel' },
  { id: 'bienestar', label: 'Bienestar' },
  { id: 'activo', label: 'Activo' },
  { id: 'viaje', label: 'Viaje' },
  { id: 'hogar', label: 'Hogar' },
]

export const LIORA_PILLARS = [
  { icon: 'guide', title: 'Guía experta', sub: 'en cada paso' },
  { icon: 'routine', title: 'Rutinas', sub: 'personalizadas' },
  { icon: 'info', title: 'Información', sub: 'clara y confiable' },
  { icon: 'shield', title: 'Uso seguro', sub: 'y responsable' },
  { icon: 'heart', title: 'Acompañamiento', sub: 'siempre' },
]

export const LIORA_TRUST = [
  { icon: 'truck', label: 'Envío gratis sobre $ 50.000' },
  { icon: 'shield', label: 'Garantía 30 días' },
  { icon: 'check', label: 'Uso seguro y responsable' },
  { icon: 'guide', label: 'Guía experta incluida' },
  { icon: 'heart', label: 'Atención 24/7' },
]

export const LIORA_STEPS = [
  { n: '01', icon: 'routine', title: 'Contanos cómo te sentís', desc: 'Un quiz breve nos ayuda a entender tu piel, rutina y ritmo de vida.' },
  { n: '02', icon: 'box', title: 'Recibí tu kit personalizado', desc: 'Productos seleccionados, instrucciones claras y guía paso a paso.' },
  { n: '03', icon: 'heart', title: 'Te acompañamos siempre', desc: 'Recordatorios suaves y respuestas reales cuando las necesites.' },
]

export const LIORA_STATS = [
  { n: 92, suffix: '%', label: 'de personas notan mejoras en 30 días' },
  { n: 4.9, suffix: '/5', label: 'promedio en más de 12.000 reseñas', decimals: 1 },
  { n: 8, suffix: ' min', label: 'para armar tu kit ideal' },
]

export const LIORA_REVIEWS = [
  { quote: 'Por fin alguien me explica el orden de los productos sin sermonear. Mi piel está mucho más calma.', author: 'Camila R.', kit: 'Kit Piel Mixta', rating: 5, avatar: 'warm' },
  { quote: 'El kit de viaje me salvó las vacaciones. Todo cabe en el neceser y la rutina se sigue casi sola.', author: 'Mariana O.', kit: 'Kit Viaje', rating: 5, avatar: 'sage' },
  { quote: 'Lo que más me gustó fue el tono — no me hicieron sentir que algo estaba mal en mí.', author: 'Lucía F.', kit: 'Kit Bienestar', rating: 5, avatar: 'cream' },
]

export const LIORA_BENEFITS = ['Sin parabenos', 'Dermatológicamente testado', 'Vegano']

export const LIORA_QUIZ = [
  {
    id: 'skin', step: 1, total: 6,
    headline: '¿Cuál es tu tipo de piel?',
    sub: 'Esto nos ayuda a empezar por lo más importante.',
    layout: '2x2',
    options: [
      { id: 'grasa', label: 'Piel grasa',        desc: 'Brillos, poros visibles',      icon: 'drop' },
      { id: 'seca',  label: 'Piel seca',          desc: 'Tirantez, descamación',        icon: 'leaf' },
      { id: 'mixta', label: 'Piel mixta',         desc: 'Zona T grasa, mejillas secas', icon: 'heart' },
      { id: 'no',    label: 'No estoy segura',    desc: 'Te ayudamos a descubrirlo',   icon: 'info' },
    ],
    tip: {
      title: '¿No sabés cuál es la tuya?',
      body: 'Mirá estos ejemplos visuales — observá cómo se ve tu piel después de lavarte la cara, sin nada aplicado.',
      cards: [
        { tone: 'warm',  title: 'Brillo en frente', note: 'Probablemente grasa' },
        { tone: 'cream', title: 'Tirantez',          note: 'Probablemente seca' },
        { tone: 'sage',  title: 'Mezcla de zonas',   note: 'Probablemente mixta' },
      ],
    },
  },
  {
    id: 'concern', step: 2, total: 6,
    headline: '¿Qué te preocupa hoy?',
    sub: 'Elegí hasta 3 — vamos a priorizar tu rutina alrededor de eso.',
    layout: 'list-multi',
    options: [
      { id: 'acne',          label: 'Acné y brotes',           icon: 'alert' },
      { id: 'manchas',       label: 'Manchas y tono desigual', icon: 'eye' },
      { id: 'lineas',        label: 'Líneas finas',            icon: 'clock' },
      { id: 'sensibilidad',  label: 'Sensibilidad y rojeces',  icon: 'heart' },
      { id: 'deshidratacion',label: 'Deshidratación',          icon: 'drop' },
      { id: 'ninguno',       label: 'Nada en particular',      icon: 'leaf' },
    ],
  },
  {
    id: 'routine', step: 3, total: 6,
    headline: '¿Cuánto tiempo tenés a la mañana?',
    sub: 'Sin culpa — adaptamos la rutina a tu ritmo real.',
    layout: 'slider',
    min: 1, max: 15, step: 1, default: 5, suffix: ' min',
    marks: [
      { v: 2,  label: 'Express' },
      { v: 5,  label: 'Justo' },
      { v: 10, label: 'Tranqui' },
      { v: 15, label: 'Ritual' },
    ],
  },
  {
    id: 'moment', step: 4, total: 6,
    headline: '¿Cuándo es tu momento?',
    sub: 'Elegí los momentos en los que vas a usar tus productos.',
    layout: 'moment',
    options: [
      { id: 'manana', label: 'Mañana', icon: 'sun',   desc: 'Antes de salir' },
      { id: 'noche',  label: 'Noche',  icon: 'moon',  desc: 'Antes de dormir' },
      { id: 'ambos',  label: 'Ambos',  icon: 'clock', desc: 'Rutina completa' },
    ],
  },
  {
    id: 'ingredients', step: 5, total: 6,
    headline: '¿Qué evitás?',
    sub: 'Marcá lo que no quieras encontrar en tu kit.',
    layout: 'chips',
    options: [
      { id: 'fragancia',    label: 'Fragancia' },
      { id: 'alcohol',      label: 'Alcohol' },
      { id: 'sulfatos',     label: 'Sulfatos' },
      { id: 'parabenos',    label: 'Parabenos' },
      { id: 'siliconas',    label: 'Siliconas' },
      { id: 'origen-animal',label: 'Origen animal' },
      { id: 'ninguno-2',    label: 'No tengo restricciones' },
    ],
  },
  {
    id: 'interstitial', step: 6, total: 6,
    headline: 'Armando tu kit…',
    sub: 'Estamos seleccionando los mejores productos para vos.',
    layout: 'interstitial',
    options: [],
  },
]

export const formatPrice = (n) =>
  '$ ' + new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(n)
