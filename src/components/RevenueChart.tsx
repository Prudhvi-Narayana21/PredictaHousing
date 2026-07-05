import { useState } from 'react';
import { revenueSeries } from '../data';
import { TrendingUp } from 'lucide-react';

const ranges = ['6M', '12M', 'YTD'] as const;

export default function RevenueChart() {
  const [range, setRange] = useState<(typeof ranges)[number]>('12M');
  const data = range === '6M' ? revenueSeries.slice(6) : revenueSeries;

  const w = 720;
  const h = 260;
  const padX = 16;
  const padY = 24;
  const max = Math.max(...data.map((d) => Math.max(d.revenue, d.target))) * 1.1;
  const stepX = (w - padX * 2) / (data.length - 1);
  const y = (v: number) => h - padY - (v / max) * (h - padY * 2);
  const x = (i: number) => padX + i * stepX;

  const revPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(d.revenue)}`).join(' ');
  const tgtPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(d.target)}`).join(' ');
  const areaPath = `${revPath} L ${x(data.length - 1)},${h - padY} L ${x(0)},${h - padY} Z`;

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card animate-fade-up" style={{ animationDelay: '120ms' }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold text-ink-900">Revenue Overview</h3>
          <p className="mt-0.5 text-sm text-ink-500">Monthly revenue vs. target</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-4 sm:flex">
            <Legend color="#3372ff" label="Revenue" />
            <Legend color="#b0b8c8" label="Target" dashed />
          </div>
          <div className="flex rounded-lg border border-ink-100 bg-ink-50 p-0.5">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  range === r ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-ink-900">$842,920</span>
        <span className="flex items-center gap-0.5 text-sm font-semibold text-accent-600">
          <TrendingUp className="h-4 w-4" /> +18.2%
        </span>
        <span className="text-sm text-ink-400">vs. last period</span>
      </div>

      <div className="relative mt-2">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full"
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(51,114,255,0.22)" />
              <stop offset="100%" stopColor="rgba(51,114,255,0)" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line key={f} x1={padX} x2={w - padX} y1={padY + f * (h - padY * 2)} y2={padY + f * (h - padY * 2)} stroke="#eceef2" strokeWidth="1" />
          ))}

          <path d={areaPath} fill="url(#rev-fill)" />
          <path d={tgtPath} fill="none" stroke="#b0b8c8" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
          <path
            d={revPath}
            fill="none"
            stroke="#3372ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-line"
            style={{ strokeDasharray: 1200 }}
          />

          {data.map((d, i) => (
            <g key={i}>
              <rect
                x={x(i) - stepX / 2}
                y={0}
                width={stepX}
                height={h}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
              {hover === i && (
                <>
                  <line x1={x(i)} x2={x(i)} y1={padY} y2={h - padY} stroke="#3372ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx={x(i)} cy={y(d.revenue)} r="5" fill="#3372ff" stroke="#fff" strokeWidth="2" />
                </>
              )}
            </g>
          ))}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 rounded-xl border border-ink-100 bg-white px-3 py-2 shadow-card-hover"
            style={{ left: `${(x(hover) / w) * 100}%`, top: 0 }}
          >
            <p className="text-xs font-semibold text-ink-900">{data[hover].label}</p>
            <p className="mt-0.5 text-xs text-brand-600">Revenue: ${(data[hover].revenue / 1000).toFixed(0)}k</p>
            <p className="text-xs text-ink-400">Target: ${(data[hover].target / 1000).toFixed(0)}k</p>
          </div>
        )}
      </div>

      <div className="mt-1 flex justify-between px-2 text-xs text-ink-400">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
      <svg width="16" height="4">
        <line x1="0" y1="2" x2="16" y2="2" stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? '4 3' : undefined} strokeLinecap="round" />
      </svg>
      {label}
    </span>
  );
}
