import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LPay - Uganda Payment Gateway',
  description: 'World-class fintech payment platform for Uganda',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
