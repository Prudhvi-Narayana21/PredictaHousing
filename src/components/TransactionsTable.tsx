import { useState } from 'react';
import { transactions } from '../data';
import type { Transaction } from '../data';
import { MoreHorizontal, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const statusClasses: Record<Transaction['status'], string> = {
  Paid: 'bg-accent-500/10 text-accent-600',
  Pending: 'bg-warning-500/10 text-warning-500',
  Refunded: 'bg-danger-500/10 text-danger-500',
};

const filters = ['All', 'Paid', 'Pending', 'Refunded'] as const;

export default function TransactionsTable() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const rows = filter === 'All' ? transactions : transactions.filter((t) => t.status === filter);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white shadow-card animate-fade-up" style={{ animationDelay: '360ms' }}>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-3">
        <div>
          <h3 className="font-display text-base font-bold text-ink-900">Recent Transactions</h3>
          <p className="mt-0.5 text-sm text-ink-500">{rows.length} payments this week</p>
        </div>
        <div className="flex rounded-lg border border-ink-100 bg-ink-50 p-0.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                filter === f ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-y border-ink-100 bg-ink-50/50 text-xs font-semibold uppercase tracking-wider text-ink-400">
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((t) => (
              <tr key={t.id} className="group transition hover:bg-ink-50/60">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-ink-100 to-ink-200 text-xs font-semibold text-ink-600">
                      {t.customer.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-900">{t.customer}</p>
                      <p className="truncate text-xs text-ink-400">{t.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-1 text-sm font-semibold text-ink-900">
                    {t.status === 'Refunded' ? (
                      <ArrowDownLeft className="h-3.5 w-3.5 text-danger-500" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-accent-600" />
                    )}
                    {t.amount}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-600">{t.method}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500">{t.date}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 opacity-0 transition hover:bg-ink-100 hover:text-ink-700 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
