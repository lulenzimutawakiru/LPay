'use client';
import { useState } from 'react';
import { Shield, CheckCircle, Smartphone, CreditCard, AlertCircle, Loader2, Download } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

type Step = 'form' | 'processing' | 'success' | 'error';

const paymentMethods = [
  { id: 'mtn', label: 'MTN Mobile Money', color: 'border-amber-400 bg-amber-50' },
  { id: 'airtel', label: 'Airtel Money', color: 'border-red-400 bg-red-50' },
  { id: 'bank', label: 'Bank Transfer', color: 'border-blue-400 bg-blue-50' },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('form');
  const [selectedMethod, setSelectedMethod] = useState('mtn');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const amount = 250000;
  const fee = 2500;
  const total = amount + fee;

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned.startsWith('256') && !cleaned.startsWith('0')) {
      setPhoneError('Enter a valid Uganda phone number');
    } else if (cleaned.length < 10) {
      setPhoneError('Phone number is too short');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (val) validatePhone(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validatePhone(phone);
    if (phoneError || !phone) return;
    setStep('processing');
    await new Promise((r) => setTimeout(r, 3000));
    setStep('success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <p className="text-sm font-semibold">LPay Checkout</p>
        </div>

        <div className="rounded-2xl border shadow-xl overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          {step === 'form' && (
            <form onSubmit={handleSubmit}>
              {/* Order summary */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--muted)' }}>Order Summary</p>
                <p className="font-semibold">School Fees - Term 2</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Kampala International School · Class P.4B</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--muted)' }}>Amount</span>
                    <span>{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--muted)' }}>Processing fee</span>
                    <span>{formatCurrency(fee)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span>Total</span>
                    <span className="text-blue-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="p-6 space-y-4">
                <p className="text-sm font-semibold">Select Payment Method</p>
                <div className="space-y-2">
                  {paymentMethods.map((m) => (
                    <label
                      key={m.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all',
                        selectedMethod === m.id ? m.color : 'border-transparent hover:border-slate-200'
                      )}
                      style={selectedMethod !== m.id ? { borderColor: 'var(--border)' } : {}}
                    >
                      <input type="radio" name="method" value={m.id} checked={selectedMethod === m.id} onChange={() => setSelectedMethod(m.id)} className="sr-only" />
                      <span className="text-sm font-medium">{m.label}</span>
                      {selectedMethod === m.id && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </label>
                  ))}
                </div>

                {/* Phone input */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Mobile Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+256 700 000 000"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 text-sm',
                        phoneError ? 'border-red-400 focus:ring-red-100' : 'focus:ring-blue-500/20 focus:border-blue-500'
                      )}
                      style={{ background: 'var(--background)', borderColor: phoneError ? undefined : 'var(--border)' }}
                    />
                  </div>
                  {phoneError && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3 h-3" /> {phoneError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                  Pay {formatCurrency(total)}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    SSL Secured
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                    <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                    PCI Compliant
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="font-semibold text-lg">Processing Payment</p>
              <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
                Please check your phone for a {selectedMethod === 'mtn' ? 'MTN' : 'Airtel'} Mobile Money prompt.
              </p>
              <div className="mt-6 space-y-2">
                {['Initiating transaction...', 'Sending USSD prompt...', 'Awaiting confirmation...'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs justify-center" style={{ color: 'var(--muted)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold text-xl text-green-600">Payment Successful!</p>
              <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Your payment of {formatCurrency(total)} was processed successfully.</p>
              <div className="mt-6 p-4 rounded-xl text-left space-y-3" style={{ background: 'var(--background)' }}>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Receipt</p>
                {[
                  ['Transaction ID', 'TXN-20240225-0021'],
                  ['Amount', formatCurrency(total)],
                  ['Method', selectedMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money'],
                  ['Phone', phone || '+256 700 000 000'],
                  ['Date', new Date().toLocaleString('en-UG')],
                  ['Status', 'Successful'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span style={{ color: 'var(--muted)' }}>{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium hover:bg-slate-50 transition-colors" style={{ borderColor: 'var(--border)' }}>
                  <Download className="w-4 h-4" /> Download
                </button>
                <button onClick={() => setStep('form')} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  New Payment
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--muted)' }}>
          Powered by <strong>LPay</strong> · Uganda Payment Gateway
        </p>
      </div>
    </div>
  );
}
