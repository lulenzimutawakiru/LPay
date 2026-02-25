'use client';
import { useState } from 'react';
import { CheckCircle, ChevronRight, School, Wifi, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type BusinessType = 'school' | 'isp' | null;

const schoolSteps = [
  { id: 1, title: 'School Details', desc: 'Add your school name and info' },
  { id: 2, title: 'Add Classes', desc: 'Set up grade levels and classes' },
  { id: 3, title: 'Fee Structure', desc: 'Define fee categories and amounts' },
  { id: 4, title: 'Connect Mobile Money', desc: 'Link MTN or Airtel account' },
  { id: 5, title: 'Test Payment', desc: 'Run a test transaction' },
];

const ispSteps = [
  { id: 1, title: 'Connect MikroTik', desc: 'Enter router credentials' },
  { id: 2, title: 'Bandwidth Plans', desc: 'Create internet packages' },
  { id: 3, title: 'Configure Webhook', desc: 'Set auto-activation endpoint' },
  { id: 4, title: 'Test Activation', desc: 'Simulate a customer signup' },
];

export default function OnboardingPage() {
  const [businessType, setBusinessType] = useState<BusinessType>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = businessType === 'school' ? schoolSteps : businessType === 'isp' ? ispSteps : [];
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;

  const handleComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!businessType) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to LPay</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
            Let&apos;s set up your account. What type of business are you running?
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { type: 'school' as const, icon: School, title: 'School / Academy', desc: 'Collect school fees via mobile money. Manage students, classes, and payments.' },
            { type: 'isp' as const, icon: Wifi, title: 'Internet Service Provider', desc: 'Auto-activate internet plans after payment. Connect MikroTik routers easily.' },
          ].map(({ type, icon: Icon, title, desc }) => (
            <button
              key={type}
              onClick={() => setBusinessType(type)}
              className="p-6 rounded-2xl border-2 text-left transition-all hover:border-blue-500 hover:shadow-md group"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{desc}</p>
              <div className="flex items-center gap-1 mt-4 text-blue-600 text-sm font-medium">
                Get started <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setBusinessType(null); setCurrentStep(1); setCompletedSteps([]); }}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {businessType === 'school' ? 'School Setup' : 'ISP Setup'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Complete all steps to start accepting payments
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Setup Progress</p>
          <p className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</p>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
          {completedSteps.length} of {totalSteps} steps completed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Step list */}
        <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="font-semibold text-sm">Setup Checklist</p>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {steps.map((step) => {
              const done = completedSteps.includes(step.id);
              const active = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    'w-full flex items-start gap-3 p-4 text-left transition-colors',
                    active ? 'bg-blue-50' : 'hover:bg-slate-50'
                  )}
                >
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all',
                    done ? 'bg-green-500 border-green-500' : active ? 'border-blue-600' : 'border-slate-200'
                  )}>
                    {done ? <Check className="w-3 h-3 text-white" /> : active ? <div className="w-2 h-2 bg-blue-600 rounded-full" /> : null}
                  </div>
                  <div>
                    <p className={cn('text-sm font-medium', active && 'text-blue-600')}>{step.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step form */}
        <div className="lg:col-span-2 rounded-2xl border shadow-sm p-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h3 className="font-semibold text-lg mb-1">{steps[currentStep - 1]?.title}</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{steps[currentStep - 1]?.desc}</p>

          <div className="space-y-4">
            {currentStep === 1 && businessType === 'school' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5">School Name</label>
                  <input type="text" placeholder="e.g. Kampala International School" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">School Address</label>
                  <input type="text" placeholder="e.g. Plot 12, Nakasero, Kampala" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Contact Phone</label>
                  <input type="tel" placeholder="+256 700 000 000" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
              </>
            )}
            {currentStep === 1 && businessType === 'isp' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5">MikroTik Router IP</label>
                  <input type="text" placeholder="e.g. 192.168.1.1" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Router Username</label>
                  <input type="text" placeholder="admin" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Router Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" style={{ background: 'var(--background)', borderColor: 'var(--border)' }} />
                </div>
              </>
            )}
            {currentStep > 1 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-medium">Step {currentStep}: {steps[currentStep - 1]?.title}</p>
                <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Configure this step to continue your setup</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl text-sm font-medium border disabled:opacity-40 hover:bg-slate-50 transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              Previous
            </button>
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Save & Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
