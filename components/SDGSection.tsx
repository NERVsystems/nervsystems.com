'use client';

import { useTranslations } from 'next-intl';

// Official UN Sustainable Development Goals brand palette (all 17),
// used to render the iconic SDG colour wheel.
const SDG_WHEEL_COLORS = [
  '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2',
  '#FCC30B', '#A21942', '#FD6925', '#DD1367', '#FD9D24', '#BF8B2E',
  '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A',
];

// UN blue — the official United Nations brand colour.
const UN_BLUE = '#009EDB';

// The six goals NERV's work maps to, each paired with its official
// UN goal colour and number.
const GOALS = [
  { key: 'health', number: '03', color: '#4C9F38' },
  { key: 'infrastructure', number: '09', color: '#FD6925' },
  { key: 'cities', number: '11', color: '#FD9D24' },
  { key: 'climate', number: '13', color: '#3F7E44' },
  { key: 'institutions', number: '16', color: '#00689D' },
  { key: 'partnerships', number: '17', color: '#19486A' },
] as const;

// Build the 17-segment SDG colour wheel as an SVG donut.
function SDGWheel({ size = 96 }: { size?: number }) {
  const cx = 60;
  const cy = 60;
  const outer = 56;
  const inner = 30;
  const n = SDG_WHEEL_COLORS.length;
  const step = (2 * Math.PI) / n;
  const gap = 0.012; // radians of separation between segments

  const point = (angle: number, r: number) => [
    cx + r * Math.cos(angle - Math.PI / 2),
    cy + r * Math.sin(angle - Math.PI / 2),
  ];

  const segments = SDG_WHEEL_COLORS.map((color, i) => {
    const a0 = i * step + gap;
    const a1 = (i + 1) * step - gap;
    const [ox0, oy0] = point(a0, outer);
    const [ox1, oy1] = point(a1, outer);
    const [ix1, iy1] = point(a1, inner);
    const [ix0, iy0] = point(a0, inner);
    const d = [
      `M ${ox0} ${oy0}`,
      `A ${outer} ${outer} 0 0 1 ${ox1} ${oy1}`,
      `L ${ix1} ${iy1}`,
      `A ${inner} ${inner} 0 0 0 ${ix0} ${iy0}`,
      'Z',
    ].join(' ');
    return <path key={i} d={d} fill={color} />;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="UN Sustainable Development Goals wheel"
      className="drop-shadow-[0_0_12px_rgba(0,158,219,0.25)]"
    >
      {segments}
    </svg>
  );
}

export default function SDGSection() {
  const t = useTranslations('sdg');

  return (
    <section id="sdg" className="relative py-24 bg-tactical-bg border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <SDGWheel />
          </div>
          <div
            className="font-mono text-sm mb-4 uppercase tracking-[0.2em]"
            style={{ color: UN_BLUE }}
          >
            {t('eyebrow')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Goals Grid — styled after the official UN SDG colour tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOALS.map(({ key, number, color }) => {
            const goal = t.raw(`goals.${key}`) as {
              title: string;
              description: string;
            };

            return (
              <div
                key={key}
                className="group relative flex flex-col overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1"
                style={{ ['--sdg' as string]: color }}
              >
                {/* Official-style colour block: large goal number + title */}
                <div
                  className="flex items-start gap-3 p-5"
                  style={{ backgroundColor: color }}
                >
                  <span className="font-mono text-3xl font-bold leading-none text-white/90">
                    {number}
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                      SDG {number}
                    </div>
                    <h3 className="mt-1 text-base font-bold uppercase leading-tight tracking-tight text-white">
                      {goal.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1 p-5">
                  <p className="text-sm leading-relaxed text-tactical-textDim">
                    {goal.description}
                  </p>
                </div>

                {/* Accent underline that fills in the goal's colour on hover */}
                <div
                  className="h-1 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-12 max-w-3xl mx-auto text-center font-mono text-xs text-tactical-textDim/60">
          {t('footnote')}
        </p>
      </div>
    </section>
  );
}
