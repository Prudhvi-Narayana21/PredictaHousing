import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  LifeBuoy,
  Sparkles,
  X,
} from 'lucide-react';

const nav = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, active: true },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const secondary = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Support', icon: LifeBuoy },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const [active, setActive] = useState('overview');

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static z-40 h-full w-64 shrink-0 border-r border-ink-100 bg-white transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-ink-900">
              Pulse
            </span>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-2">
          <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Menu
          </p>
          {nav.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
          <p className="px-3 pb-1 pt-5 text-xs font-semibold uppercase tracking-wider text-ink-400">
            General
          </p>
          {secondary.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-4 text-white">
            <p className="font-display text-sm font-semibold">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-brand-100">
              Unlock advanced reports & exports.
            </p>
            <button className="mt-3 w-full rounded-lg bg-white/15 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/25">
              Upgrade now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { id: string; label: string; icon: React.ElementType };
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? 'bg-brand-50 text-brand-700'
          : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
      }`}
    >
      <Icon
        className={`h-4.5 w-4.5 transition ${
          active ? 'text-brand-600' : 'text-ink-400 group-hover:text-ink-600'
        }`}
      />
      {item.label}
      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
    </button>
  );
}
