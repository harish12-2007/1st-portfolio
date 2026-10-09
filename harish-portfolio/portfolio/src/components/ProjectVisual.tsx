import type { ProjectVisualKey } from "../data/content";

const LABELS: Record<ProjectVisualKey, string> = {
  signal: "Abstract illustration: a price line, a liquidity sweep marker and walk-forward test windows",
  voice: "Abstract illustration: an audio waveform above terminal prompts",
  orderbook: "Abstract illustration: stacked bid and ask bars around a price spread",
  routes: "Abstract illustration: three exchange nodes connected to a central SOL/USDC node and a scorer",
};

const mono = { fontFamily: "ui-monospace, Menlo, Consolas, monospace" } as const;

function Signal() {
  const line = "M20 190 L60 170 L100 178 L140 140 L180 150 L220 110 L260 126 L300 84 L340 98 L380 60 L440 72";
  return (
    <>
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={20 + i * 70} y="22" width="62" height="12" rx="3" fill="#8b9cff" fillOpacity={i % 2 ? 0.1 : 0.28} />
            <rect x={20 + i * 70 + 40} y="22" width="22" height="12" rx="3" fill="#5ce1e6" fillOpacity=".5" />
          </g>
        ))}
        <text x="20" y="52" fill="#9ba5bd" fontSize="10" style={mono}>
          walk-forward folds: train / test
        </text>
      </g>
      <line x1="20" y1="164" x2="450" y2="164" stroke="#ffb454" strokeOpacity=".6" strokeDasharray="4 5" />
      <path d={line} fill="none" stroke="#8b9cff" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      <path d={`${line} L440 260 L20 260 Z`} fill="url(#sig-fill)" />
      <path d="M140 140 L140 182" stroke="#ffb454" strokeWidth="2" strokeLinecap="round" />
      <circle cx="140" cy="182" r="5" fill="#ffb454" />
      <circle cx="140" cy="140" r="4" fill="#5ce1e6" />
      <text x="150" y="204" fill="#ffb454" fontSize="10" style={mono}>
        sweep
      </text>
      <text x="20" y="248" fill="#9ba5bd" fontSize="10" style={mono}>
        illustration, not real results
      </text>
    </>
  );
}

function Voice() {
  const bars = Array.from({ length: 44 }, (_, i) => 10 + Math.abs(Math.sin(i * 0.55) * 46 + Math.sin(i * 1.7) * 18));
  return (
    <>
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={26 + i * 9.6}
            y={110 - h / 2}
            width="5"
            height={h}
            rx="2.5"
            fill={i % 7 === 0 ? "#5ce1e6" : "#8b9cff"}
            fillOpacity={i % 7 === 0 ? 0.95 : 0.55}
          />
        ))}
      </g>
      <g style={mono} fontSize="11">
        <text x="26" y="190" fill="#5ce1e6">
          &gt; listening
        </text>
        <text x="26" y="212" fill="#9ba5bd">
          &gt; fetching futures data
        </text>
        <text x="26" y="234" fill="#9ba5bd">
          &gt; refresh every 15s
        </text>
      </g>
    </>
  );
}

function OrderBook() {
  const bids = [118, 96, 82, 64, 52, 36, 24];
  const asks = [22, 38, 50, 70, 84, 98, 120];
  return (
    <>
      {bids.map((w, i) => (
        <rect key={`b${i}`} x={240 - w * 1.5} y={34 + i * 28} width={w * 1.5} height="20" rx="4" fill="#5ce1e6" fillOpacity={0.18 + (7 - i) * 0.04} />
      ))}
      {asks.map((w, i) => (
        <rect key={`a${i}`} x="244" y={34 + i * 28} width={w * 1.5} height="20" rx="4" fill="#8b9cff" fillOpacity={0.18 + i * 0.04} />
      ))}
      <line x1="242" y1="24" x2="242" y2="236" stroke="#e8ecf6" strokeOpacity=".5" />
      <text x="26" y="252" fill="#5ce1e6" fontSize="11" style={mono}>
        bids
      </text>
      <text x="426" y="252" textAnchor="end" fill="#8b9cff" fontSize="11" style={mono}>
        asks
      </text>
      <text x="242" y="252" textAnchor="middle" fill="#9ba5bd" fontSize="11" style={mono}>
        price-time priority
      </text>
    </>
  );
}

function Routes() {
  const dex = [
    { n: "Jupiter", x: 90, y: 62 },
    { n: "Raydium", x: 90, y: 190 },
    { n: "Orca", x: 250, y: 126 },
  ];
  return (
    <>
      {dex.map((d) => (
        <line key={d.n} x1={d.x} y1={d.y} x2="250" y2="126" stroke="#8b9cff" strokeOpacity=".7" className="dash-flow" />
      ))}
      <line x1="250" y1="126" x2="360" y2="126" stroke="#5ce1e6" strokeWidth="1.6" />
      <line x1="90" y1="62" x2="90" y2="190" stroke="#8b9cff" strokeOpacity=".3" strokeDasharray="3 6" />
      {dex.map((d) => (
        <g key={d.n}>
          <circle cx={d.x} cy={d.y} r="24" fill="#0f1526" stroke="#8b9cff" strokeOpacity=".7" />
          <text x={d.x} y={d.y + 4} textAnchor="middle" fill="#e8ecf6" fontSize="10" style={mono}>
            {d.n}
          </text>
        </g>
      ))}
      <rect x="360" y="98" width="78" height="56" rx="12" fill="#5ce1e6" fillOpacity=".12" stroke="#5ce1e6" strokeOpacity=".7" />
      <text x="399" y="122" textAnchor="middle" fill="#5ce1e6" fontSize="10" style={mono}>
        scorer
      </text>
      <text x="399" y="140" textAnchor="middle" fill="#9ba5bd" fontSize="9" style={mono}>
        XGBoost-ready
      </text>
      <text x="26" y="248" fill="#9ba5bd" fontSize="11" style={mono}>
        SOL/USDC
      </text>
    </>
  );
}

export default function ProjectVisual({ kind }: { kind: ProjectVisualKey }) {
  return (
    <svg role="img" aria-label={LABELS[kind]} viewBox="0 0 460 270" className="size-full">
      <defs>
        <linearGradient id="sig-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b9cff" stopOpacity=".22" />
          <stop offset="1" stopColor="#8b9cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {kind === "signal" && <Signal />}
      {kind === "voice" && <Voice />}
      {kind === "orderbook" && <OrderBook />}
      {kind === "routes" && <Routes />}
    </svg>
  );
}
