'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ArrowLeftRight, BarChart3, Settings, Menu, X,
  Sun, Moon, Bell, Search, LogOut, ChevronDown, Zap, Users,
  CreditCard, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/onboarding', icon: Layers, label: 'Onboarding' },
  { href: '/dashboard/customers', icon: Users, label: 'Customers' },
  { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode, sidebarOpen, setSidebarOpen, user } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className={cn('min-h-screen flex', darkMode && 'dark')} style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16',
          'lg:relative'
        )}
        style={{ background: 'var(--sidebar-bg)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-white font-bold text-xl">LPay</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-slate-400 hover:text-white transition-colors hidden lg:flex"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 mx-2 rounded-xl mb-1 transition-all duration-200 group',
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/auth/login"
            className={cn(
              'flex items-center gap-3 px-2 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              style={{ background: 'var(--background)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl transition-colors hover:bg-slate-100"
              style={{ color: 'var(--muted)' }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-xl transition-colors hover:bg-slate-100 relative"
                style={{ color: 'var(--muted)' }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl shadow-xl border z-50 overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                  <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <p className="font-semibold text-sm">Notifications</p>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {[
                      { title: 'Payment received', desc: 'UGX 150,000 from John Doe', time: '2m ago', color: 'bg-green-500' },
                      { title: 'Settlement processed', desc: 'UGX 2,400,000 to your account', time: '1h ago', color: 'bg-blue-500' },
                      { title: 'Failed payment', desc: 'Transaction #TXN-9821 failed', time: '3h ago', color: 'bg-red-500' },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.color}`} />
                        <div>
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{n.desc}</p>
                          <p className="text-xs mt-1 text-blue-500">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <button className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AU</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold">{user?.name}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{user?.role}</p>
              </div>
              <ChevronDown className="w-3 h-3 hidden md:block" style={{ color: 'var(--muted)' }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
