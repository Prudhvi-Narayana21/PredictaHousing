import { DollarSign, Users, ShoppingCart, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Kpi } from '../data';

const iconMap = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: Target,
};

export default function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const Icon = iconMap[kpi.icon];
  const up = kpi.trend === 'up';

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold ${
            up ? 'bg-accent-500/10 text-accent-600' : 'bg-danger-500/10 text-danger-500'
          }`}
        >
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {kpi.delta}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-ink-500">{kpi.label}</p>
      <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900">
        {kpi.value}
      </p>

      <Sparkline data={kpi.spark} up={up} />
    </div>
  );
}

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`);
  const path = `M ${points.join(' L ')}`;
  const stroke = up ? '#0fc189' : '#f43f5e';
  const fill = up ? 'rgba(15,193,137,0.12)' : 'rgba(244,63,94,0.10)';
  const id = `spark-${up ? 'u' : 'd'}-${data.join('')}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-9 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w},${h} L 0,${h} Z`} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
