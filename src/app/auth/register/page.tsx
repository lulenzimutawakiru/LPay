'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', businessType: 'school' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push('/dashboard/onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Start accepting payments in minutes</p>
        </div>

        <div className="rounded-2xl border shadow-sm p-8" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+256 700 000 000" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@business.ug" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Business Type</label>
              <select value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                <option value="school">School / Academy</option>
                <option value="isp">Internet Service Provider</option>
                <option value="retail">Retail Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 characters" className="w-full px-4 py-2.5 pr-12 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: 'var(--muted)' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" className="mt-0.5 rounded" />
              <label htmlFor="terms" className="text-xs" style={{ color: 'var(--muted)' }}>
                I agree to LPay&apos;s <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading} className={cn('w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 text-white', loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700')}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-4" style={{ color: 'var(--muted)' }}>
            Already have an account? <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs" style={{ color: 'var(--muted)' }}>
          <Shield className="w-3.5 h-3.5 text-green-500" />
          SSL Secured · PCI DSS Compliant · Licensed in Uganda
        </div>
      </div>
    </div>
  );
}
