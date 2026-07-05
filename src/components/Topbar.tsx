import { Search, Bell, Menu, ChevronDown } from 'lucide-react';

interface Props {
  onMenu: () => void;
}

export default function Topbar({ onMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={onMenu}
        className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-ink-50 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 sm:block sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          placeholder="Search transactions, customers…"
          className="h-10 w-full rounded-xl border border-ink-100 bg-ink-50 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button className="relative grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-ink-50">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-ink-100" />

        <button className="flex items-center gap-2.5 rounded-xl p-1 pr-2 hover:bg-ink-50">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
            EM
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-tight text-ink-900">Elena Marsh</p>
            <p className="text-xs leading-tight text-ink-400">Admin</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-ink-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
