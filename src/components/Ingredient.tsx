/**
 * Ilustraciones SVG de ingredientes presentes en las descripciones oficiales
 * de Bocatto (frambuesas, maracuyá, galleta, maní, avellana, nuggets de Milo,
 * chips de chocolate, fresas, arándanos, migas de base). Estilo plano, mismo
 * trazo, sin logos de marcas de terceros.
 */

export type IngredientKind =
  | "raspberry"
  | "strawberry"
  | "blueberry"
  | "passionfruit"
  | "seeds"
  | "sandwich-cookie"
  | "cookie-crumb"
  | "chocolate-chip"
  | "peanut"
  | "hazelnut"
  | "nugget";

const OUTLINE = "rgb(42 23 18 / 0.18)";

function Raspberry() {
  const drupes: [number, number, number][] = [
    [50, 38, 9], [38, 44, 9], [62, 44, 9], [44, 56, 9.5], [56, 56, 9.5], [32, 57, 8], [68, 57, 8],
    [38, 68, 8.5], [50, 69, 9], [62, 68, 8.5], [44, 79, 7.5], [56, 79, 7.5], [50, 88, 6],
  ];
  return (
    <>
      {drupes.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#B3163A" stroke={OUTLINE} strokeWidth="1" />
          <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#E9566F" />
        </g>
      ))}
      <path d="M50 30 C44 22 36 22 32 26 C40 27 44 30 47 33 Z M50 30 C56 22 64 22 68 26 C60 27 56 30 53 33 Z" fill="#4E7A3A" />
      <path d="M50 31 L50 18" stroke="#4E7A3A" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Strawberry() {
  return (
    <>
      <path d="M50 92 C28 80 18 56 24 40 C30 26 70 26 76 40 C82 56 72 80 50 92 Z" fill="#D7263D" stroke={OUTLINE} />
      <path d="M50 92 C40 84 32 70 32 54 C40 66 46 78 50 92 Z" fill="#B71C33" opacity="0.6" />
      {[[38, 46], [50, 44], [62, 46], [34, 58], [46, 58], [58, 58], [68, 56], [40, 70], [52, 70], [62, 68], [48, 81]].map(
        ([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.6" ry="2.4" fill="#FCE7A8" />,
      )}
      <path d="M50 34 L36 24 L44 34 L30 34 L46 38 L50 30 L54 38 L70 34 L56 34 L64 24 Z" fill="#4E7A3A" />
    </>
  );
}

function Blueberry() {
  return (
    <>
      <circle cx="50" cy="52" r="34" fill="#3D3F79" stroke={OUTLINE} />
      <circle cx="40" cy="40" r="11" fill="#6C6FAF" opacity="0.55" />
      <path d="M50 30 l4 7 l8 -2 l-5 6 l5 6 l-8 -2 l-4 7 l-4 -7 l-8 2 l5 -6 l-5 -6 l8 2 Z" fill="#23244A" transform="translate(0 -6) scale(1)" />
    </>
  );
}

function Passionfruit() {
  // Maracuyá amarillo (el que se usa en Colombia) partido por la mitad.
  const seeds: [number, number, number][] = [
    [50, 40, 20], [38, 48, -30], [62, 48, 40], [44, 60, 70], [57, 61, -50], [50, 52, 0], [34, 60, 15], [66, 60, -15], [50, 70, 90], [41, 39, -60], [59, 39, 55],
  ];
  return (
    <>
      <circle cx="50" cy="52" r="42" fill="#E8C33E" stroke={OUTLINE} />
      <circle cx="50" cy="52" r="35" fill="#FFF4D6" />
      <circle cx="50" cy="52" r="31" fill="#F2A81D" />
      <circle cx="44" cy="44" r="14" fill="#F8C65A" opacity="0.7" />
      {seeds.map(([x, y, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="4.4" ry="3" fill="#F7D584" opacity="0.8" />
          <ellipse cx={x} cy={y} rx="2.6" ry="1.7" fill="#24130D" />
        </g>
      ))}
    </>
  );
}

function Seeds() {
  return (
    <>
      {[[30, 40, 20], [55, 30, -30], [70, 58, 40], [40, 68, 70], [58, 76, -10]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="11" ry="8" fill="#F2A81D" opacity="0.9" />
          <ellipse cx={x} cy={y} rx="5" ry="3.4" fill="#24130D" />
        </g>
      ))}
    </>
  );
}

function SandwichCookie() {
  return (
    <>
      <circle cx="50" cy="52" r="40" fill="#1F1513" stroke={OUTLINE} />
      <circle cx="50" cy="52" r="33" fill="none" stroke="#3A2A26" strokeWidth="2.5" strokeDasharray="3 4" />
      <circle cx="50" cy="52" r="22" fill="none" stroke="#3A2A26" strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={50 + Math.cos(a) * 14} cy={52 + Math.sin(a) * 14} r="2.4" fill="#3A2A26" />;
      })}
      <path d="M22 34 A40 40 0 0 1 60 13" fill="none" stroke="#5A4440" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </>
  );
}

function CookieCrumb() {
  return (
    <>
      <path d="M22 50 L38 34 L56 40 L50 60 L30 64 Z" fill="#C9944F" stroke={OUTLINE} />
      <path d="M60 30 L76 34 L72 50 L58 46 Z" fill="#A9763B" />
      <path d="M56 66 L70 62 L78 76 L62 82 Z" fill="#2A1C18" />
      <path d="M26 72 L36 70 L38 80 L28 82 Z" fill="#C9944F" />
      <circle cx="40" cy="48" r="2" fill="#7A5228" />
      <circle cx="46" cy="54" r="1.6" fill="#7A5228" />
    </>
  );
}

function ChocolateChip() {
  return (
    <>
      <path d="M50 16 C54 30 76 52 74 68 C72 84 28 84 26 68 C24 52 46 30 50 16 Z" fill="#4A2A1D" stroke={OUTLINE} />
      <path d="M44 42 C40 52 36 60 38 68" stroke="#7B4A35" strokeWidth="5" strokeLinecap="round" fill="none" />
    </>
  );
}

function Peanut() {
  return (
    <>
      <path d="M50 16 C66 16 70 32 62 44 C70 54 70 82 50 84 C30 82 30 54 38 44 C30 32 34 16 50 16 Z" fill="#E7C08B" stroke={OUTLINE} />
      <path d="M50 22 L50 80" stroke="#C99A5E" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="42" cy="32" rx="5" ry="7" fill="#F4D9AE" />
    </>
  );
}

function Hazelnut() {
  return (
    <>
      <path d="M50 22 C74 22 82 50 74 68 C66 86 34 86 26 68 C18 50 26 22 50 22 Z" fill="#8A5230" stroke={OUTLINE} />
      <path d="M28 40 C36 30 64 30 72 40 C66 34 34 34 28 40 Z" fill="#5E3520" />
      <path d="M50 22 C46 14 54 10 56 16" stroke="#5E3520" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="38" cy="54" rx="7" ry="12" fill="#B0754A" opacity="0.6" />
    </>
  );
}

function Nugget() {
  return (
    <>
      <path d="M24 34 C26 22 44 20 56 22 C72 24 80 34 76 52 C74 70 62 80 44 78 C26 76 20 56 24 34 Z" fill="#6E4129" stroke={OUTLINE} />
      {[[36, 36], [52, 32], [64, 44], [40, 54], [56, 60], [46, 68], [66, 62], [32, 62]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="#A97A55" />
      ))}
      <path d="M30 30 C36 26 46 26 52 27" stroke="#8C5A3C" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  );
}

const MAP: Record<IngredientKind, () => React.JSX.Element> = {
  raspberry: Raspberry,
  strawberry: Strawberry,
  blueberry: Blueberry,
  passionfruit: Passionfruit,
  seeds: Seeds,
  "sandwich-cookie": SandwichCookie,
  "cookie-crumb": CookieCrumb,
  "chocolate-chip": ChocolateChip,
  peanut: Peanut,
  hazelnut: Hazelnut,
  nugget: Nugget,
};

export function Ingredient({ kind, className = "", style }: { kind: IngredientKind; className?: string; style?: React.CSSProperties }) {
  const Shape = MAP[kind];
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" focusable="false">
      <g style={{ filter: "drop-shadow(0 6px 6px rgb(42 23 18 / 0.22))" }}>
        <Shape />
      </g>
    </svg>
  );
}
