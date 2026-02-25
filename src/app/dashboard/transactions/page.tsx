'use client';
import { useState } from 'react';
import { Search, Download, ArrowUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

const allTransactions = Array.from({ length: 50 }, (_, i) => ({
  id: `TXN-${String(1000 - i).padStart(4, '0')}`,
  name: ['Sarah Nakato', 'John Mugisha', 'Mary Apio', 'Peter Okello', 'Grace Nambi', 'David Ssemwogerere', 'Fatuma Namutebi'][i % 7],
  phone: `+2567${String(i).padStart(8, '0')}`.slice(0, 13),
  amount: (Math.floor(Math.abs(Math.sin(i)) * 10) + 1) * 50000,
  method: ['MTN', 'Airtel', 'Bank'][i % 3],
  status: ['success', 'success', 'success', 'failed', 'pending'][i % 5],
  date: new Date(Date.now() - i * 3600000 * 2).toISOString(),
  reference: `REF${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
}));

const statusConfig: Record<string, { label: string; className: string }> = {
  success: { label: 'Success', className: 'bg-green-100 text-green-700' },
  failed: { label: 'Failed', className: 'bg-red-100 text-red-700' },
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
};

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = allTransactions.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search);
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{filtered.length} total transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
            />
          </div>
          <div className="flex gap-1">
            {['all', 'success', 'pending', 'failed'].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={cn(
                  'px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all',
                  statusFilter === s ? 'bg-blue-600 text-white' : 'border hover:bg-slate-50'
                )}
                style={statusFilter !== s ? { borderColor: 'var(--border)', color: 'var(--muted)' } : {}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide border-b" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <th className="px-5 py-3">
                  <span className="flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {paginated.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono font-medium text-blue-600">{tx.id}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium">{tx.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{tx.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">{formatCurrency(tx.amount)}</td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      'px-2 py-1 rounded-lg text-xs font-medium',
                      tx.method === 'MTN' ? 'bg-amber-100 text-amber-700' :
                        tx.method === 'Airtel' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    )}>
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusConfig[tx.status].className)}>
                      {statusConfig[tx.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'var(--muted)' }}>{formatDate(tx.date)}</td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View details">
                      <Eye className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border disabled:opacity-40 hover:bg-slate-50 transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'w-8 h-8 rounded-lg text-sm font-medium transition-all',
                  page === p ? 'bg-blue-600 text-white' : 'border hover:bg-slate-50'
                )}
                style={page !== p ? { borderColor: 'var(--border)', color: 'var(--muted)' } : {}}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border disabled:opacity-40 hover:bg-slate-50 transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
