import './globals.css';
import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import ParticleCanvas from './components/ParticleCanvas';

const firaCode = Fira_Code({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cloudzz Hackathon Team - Zadar',
  description: 'Innovating under pressure since Day 1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <ParticleCanvas />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}