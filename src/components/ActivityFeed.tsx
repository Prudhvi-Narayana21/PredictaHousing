import { activities } from '../data';
import type { Activity } from '../data';

const toneClasses: Record<Activity['tone'], string> = {
  brand: 'bg-brand-50 text-brand-600',
  accent: 'bg-accent-500/10 text-accent-600',
  warning: 'bg-warning-500/10 text-warning-500',
  danger: 'bg-danger-500/10 text-danger-500',
};

export default function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card animate-fade-up" style={{ animationDelay: '280ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-bold text-ink-900">Recent Activity</h3>
          <p className="mt-0.5 text-sm text-ink-500">Latest team actions</p>
        </div>
        <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all</button>
      </div>

      <ol className="mt-4 space-y-1">
        {activities.map((a, i) => (
          <li key={a.id} className="relative flex gap-3 rounded-xl p-2 transition hover:bg-ink-50">
            {i < activities.length - 1 && (
              <span className="absolute left-[26px] top-12 h-[calc(100%-3rem)] w-px bg-ink-100" />
            )}
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${toneClasses[a.tone]}`}>
              {a.initials}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm text-ink-700">
                <span className="font-semibold text-ink-900">{a.who}</span> {a.action}{' '}
                <span className="font-semibold text-brand-600">{a.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-ink-400">{a.time}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
