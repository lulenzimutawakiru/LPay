'use client';
import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Globe, Shield, Bell, CreditCard, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useStore();
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sandboxMode, setSandboxMode] = useState(false);
  const apiKey = 'lpay_live_sk_ug_1234567890abcdef';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <nav className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-sm font-medium',
                  activeSection === s.id ? 'text-blue-600 bg-blue-50' : 'hover:bg-slate-50'
                )}
                style={activeSection !== s.id ? { color: 'var(--foreground)' } : {}}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeSection === 'general' && (
            <div className="rounded-2xl border shadow-sm p-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h2 className="font-semibold mb-4">General Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Switch between light and dark theme</p>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={cn('relative w-11 h-6 rounded-full transition-colors', darkMode ? 'bg-blue-600' : 'bg-slate-200')}
                  >
                    <div className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', darkMode ? 'translate-x-5' : 'translate-x-0.5')} />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-sm font-medium">Sandbox Mode</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Use test credentials for development</p>
                  </div>
                  <button
                    onClick={() => setSandboxMode(!sandboxMode)}
                    className={cn('relative w-11 h-6 rounded-full transition-colors', sandboxMode ? 'bg-amber-500' : 'bg-slate-200')}
                  >
                    <div className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', sandboxMode ? 'translate-x-5' : 'translate-x-0.5')} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Business Name</label>
                  <input type="text" defaultValue="LPay Demo Business" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Support Email</label>
                  <input type="email" defaultValue="support@lpay.ug" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
                <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="rounded-2xl border shadow-sm p-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h2 className="font-semibold mb-4">API Keys</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1.5">Live Secret Key</p>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-sm overflow-hidden" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                      <span className="truncate">{apiKeyVisible ? apiKey : '•'.repeat(apiKey.length)}</span>
                    </div>
                    <button onClick={() => setApiKeyVisible(!apiKeyVisible)} className="p-2.5 rounded-xl border hover:bg-slate-50 transition-colors flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
                      {apiKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={handleCopy} className="p-2.5 rounded-xl border hover:bg-slate-50 transition-colors flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>Keep this secret. Never expose it in client-side code.</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-sm font-medium text-amber-800">Sandbox Mode</p>
                  <p className="text-xs text-amber-700 mt-1">Enable sandbox mode in General settings to use test keys.</p>
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'security' || activeSection === 'notifications' || activeSection === 'billing') && (
            <div className="rounded-2xl border shadow-sm p-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h2 className="font-semibold mb-2">{sections.find((s) => s.id === activeSection)?.label} Settings</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>This section is coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
