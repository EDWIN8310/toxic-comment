import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'ToxiGuard AI — Toxic Comment Detection',
  description: 'Real-time toxic comment detection powered by DistilBERT. Analyze text across 6 toxicity categories with state-of-the-art NLP.',
  keywords: 'toxic comment detection, NLP, DistilBERT, machine learning, text classification',
  authors: [{ name: 'ToxiGuard AI' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
