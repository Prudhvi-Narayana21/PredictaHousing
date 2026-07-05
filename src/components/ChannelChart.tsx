import { channelData } from '../data';

export default function ChannelChart() {
  const total = channelData.reduce((s, c) => s + c.value, 0);
  const radius = 56;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card animate-fade-up" style={{ animationDelay: '200ms' }}>
      <h3 className="font-display text-base font-bold text-ink-900">Traffic Sources</h3>
      <p className="mt-0.5 text-sm text-ink-500">Sessions by channel</p>

      <div className="mt-4 flex items-center gap-6">
        <div className="relative shrink-0">
          <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
            {channelData.map((c) => {
              const len = (c.value / total) * circ;
              const seg = (
                <circle
                  key={c.label}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="14"
                  strokeDasharray={`${len} ${circ - len}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                />
              );
              offset += len;
              return seg;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-bold text-ink-900">42%</span>
            <span className="text-xs text-ink-400">Organic</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {channelData.map((c) => (
            <div key={c.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-ink-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  {c.label}
                </span>
                <span className="font-semibold text-ink-900">{c.value}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${c.value}%`, background: c.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
