import { useState } from 'react';
import { Calendar, Download, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KpiCard from './components/KpiCard';
import RevenueChart from './components/RevenueChart';
import ChannelChart from './components/ChannelChart';
import ActivityFeed from './components/ActivityFeed';
import TransactionsTable from './components/TransactionsTable';
import { kpis } from './data';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-ink-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  Welcome back, Elena — here's what's happening today.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink-700 shadow-card transition hover:bg-ink-50">
                  <Calendar className="h-4 w-4 text-ink-400" />
                  <span className="hidden sm:inline">Last 30 days</span>
                  <span className="sm:hidden">30d</span>
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink-700 shadow-card transition hover:bg-ink-50">
                  <Download className="h-4 w-4 text-ink-400" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Report</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi, i) => (
                <KpiCard key={kpi.id} kpi={kpi} index={i} />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <ChannelChart />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TransactionsTable />
              </div>
              <ActivityFeed />
            </div>

            <footer className="mt-8 pb-2 text-center text-xs text-ink-400">
              Pulse Analytics · Built with care
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
