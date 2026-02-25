'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-2xl">LPay</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Uganda&apos;s Premier<br />Payment Gateway
          </h2>
          <p className="text-blue-200 mt-4 text-lg">
            Accept MTN Mobile Money, Airtel Money, and bank transfers seamlessly.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Transactions', value: '500K+' },
              { label: 'Businesses', value: '2,400+' },
              { label: 'Uptime', value: '99.9%' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-blue-200 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-blue-200 text-sm">
          <Shield className="w-4 h-4" />
          SSL Encrypted · PCI DSS Compliant · Uganda FinTech Licensed
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl">LPay</span>
          </div>

          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Sign in to your LPay dashboard</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lpay.ug"
                className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
                  style={{ color: 'var(--muted)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2',
                loading ? 'bg-blue-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 font-medium hover:underline">Create one</Link>
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
              <Shield className="w-3.5 h-3.5 text-green-500" />
              SSL Secured
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Powered by LPay Uganda</p>
          </div>
        </div>
      </div>
    </div>
  );
}
