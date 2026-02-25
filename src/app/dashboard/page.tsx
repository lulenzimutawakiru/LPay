'use client';
import { useState } from 'react';
import {
  TrendingUp, TrendingDown, ArrowLeftRight, DollarSign,
  CheckCircle, Users, Download, RefreshCw,
  AlertTriangle, Shield
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

const revenueData = [
  { month: 'Aug', revenue: 12400000, transactions: 145 },
  { month: 'Sep', revenue: 18200000, transactions: 210 },
  { month: 'Oct', revenue: 15800000, transactions: 189 },
  { month: 'Nov', revenue: 22400000, transactions: 267 },
  { month: 'Dec', revenue: 28900000, transactions: 345 },
  { month: 'Jan', revenue: 24100000, transactions: 298 },
  { month: 'Feb', revenue: 31500000, transactions: 389 },
];

const paymentMethods = [
  { name: 'MTN Mobile Money', value: 55, color: '#f59e0b' },
  { name: 'Airtel Money', value: 30, color: '#ef4444' },
  { name: 'Bank Transfer', value: 10, color: '#3b82f6' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const recentTransactions = [
  { id: 'TXN-0021', name: 'Sarah Nakato', phone: '+256701234567', amount: 250000, method: 'MTN', status: 'success', time: '2 min ago' },
  { id: 'TXN-0020', name: 'John Mugisha', phone: '+256752345678', amount: 100000, method: 'Airtel', status: 'success', time: '8 min ago' },
  { id: 'TXN-0019', name: 'Mary Apio', phone: '+256773456789', amount: 75000, method: 'MTN', status: 'failed', time: '15 min ago' },
  { id: 'TXN-0018', name: 'Peter Okello', phone: '+256704567890', amount: 500000, method: 'Bank', status: 'pending', time: '22 min ago' },
  { id: 'TXN-0017', name: 'Grace Nambi', phone: '+256785678901', amount: 150000, method: 'MTN', status: 'success', time: '34 min ago' },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  success: { label: 'Success', className: 'bg-green-100 text-green-700' },
  failed: { label: 'Failed', className: 'bg-red-100 text-red-700' },
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
};

const kpiCards = [
  {
    title: 'Total Revenue',
    value: formatCurrency(31500000),
    change: '+18.4%',
    positive: true,
    icon: DollarSign,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Transactions',
    value: '389',
    change: '+12.2%',
    positive: true,
    icon: ArrowLeftRight,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Success Rate',
    value: '97.4%',
    change: '+0.8%',
    positive: true,
    icon: CheckCircle,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Active Customers',
    value: '1,247',
    change: '-2.1%',
    positive: false,
    icon: Users,
    gradient: 'from-orange-500 to-amber-600',
  },
];

export default function DashboardPage() {
  const [activeRange, setActiveRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Welcome back, Admin. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border hover:bg-slate-50 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow"
            style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {card.positive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span className={cn('text-xs font-medium', card.positive ? 'text-green-600' : 'text-red-500')}>
                    {card.change}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>vs last month</span>
                </div>
              </div>
              <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center', card.gradient)}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Revenue Trend</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Monthly revenue overview</p>
            </div>
            <div className="flex gap-1">
              {['7d', '30d', '90d', '1y'].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    activeRange === r ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-500'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}
                formatter={(value: number | undefined) => [formatCurrency(value ?? 0), 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Method Pie */}
        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h2 className="font-semibold mb-1">Payment Methods</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Distribution this month</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {paymentMethods.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {paymentMethods.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                  <span className="text-xs">{m.name}</span>
                </div>
                <span className="text-xs font-semibold">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 rounded-2xl border shadow-sm overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <h2 className="font-semibold">Recent Transactions</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Live feed</p>
            </div>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 font-medium">Live</span>
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                  <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{tx.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{tx.id} · {tx.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold">{formatCurrency(tx.amount)}</p>
                  <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1', statusConfig[tx.status].className)}>
                    {statusConfig[tx.status].label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Quick Stats */}
        <div className="space-y-4">
          {/* Fraud Alert */}
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Fraud Alert</p>
                <p className="text-xs text-amber-700 mt-1">3 suspicious transactions flagged in the last hour. Review recommended.</p>
                <button className="text-xs font-semibold text-amber-700 mt-2 hover:underline">Review now →</button>
              </div>
            </div>
          </div>

          {/* Settlement Summary */}
          <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-sm">Settlement Summary</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Pending Settlement', value: formatCurrency(4200000), color: 'text-amber-600' },
                { label: 'Settled Today', value: formatCurrency(12800000), color: 'text-green-600' },
                { label: 'Next Settlement', value: 'Tomorrow 10 AM', color: 'text-blue-600' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</span>
                  <span className={cn('text-xs font-semibold', s.color)}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="rounded-2xl p-4 border shadow-sm text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-semibold">Secured by LPay</p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>SSL Encrypted · PCI Compliant</p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">SSL</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">PCI</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">AML</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
