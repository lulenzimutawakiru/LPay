'use client';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const monthlyData = [
  { month: 'Aug', revenue: 12400000, txns: 145, failed: 8 },
  { month: 'Sep', revenue: 18200000, txns: 210, failed: 12 },
  { month: 'Oct', revenue: 15800000, txns: 189, failed: 9 },
  { month: 'Nov', revenue: 22400000, txns: 267, failed: 15 },
  { month: 'Dec', revenue: 28900000, txns: 345, failed: 18 },
  { month: 'Jan', revenue: 24100000, txns: 298, failed: 11 },
  { month: 'Feb', revenue: 31500000, txns: 389, failed: 14 },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  txns: Math.floor(Math.sin(i / 3) * 20 + 25),
}));

const metrics = [
  { label: 'Avg Transaction Value', value: formatCurrency(80977), change: '+5.2%', up: true },
  { label: 'Payment Success Rate', value: '97.4%', change: '+0.8%', up: true },
  { label: 'Avg Processing Time', value: '1.8s', change: '-0.3s', up: true },
  { label: 'Customer Retention', value: '82%', change: '-1.2%', up: false },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Revenue trends and payment insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{m.label}</p>
            <p className="text-2xl font-bold mt-1">{m.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {m.up ? <TrendingUp className="w-3.5 h-3.5 text-green-500" /> : <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
              <span className={cn('text-xs font-medium', m.up ? 'text-green-600' : 'text-red-500')}>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <h2 className="font-semibold mb-1">Monthly Revenue</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Revenue and transaction volume</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}
              formatter={(v: number | undefined, name: string | undefined) => [name === 'revenue' ? formatCurrency(v ?? 0) : (v ?? 0), name === 'revenue' ? 'Revenue' : 'Transactions']}
            />
            <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="txns" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hourly transactions */}
        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h2 className="font-semibold mb-1">Hourly Transaction Volume</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Transactions per hour today</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="txns" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Failed payment analysis */}
        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h2 className="font-semibold mb-1">Failed Payment Analysis</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Failed vs total transactions per month</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="failGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fill="url(#failGrad)" name="Failed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
