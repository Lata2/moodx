import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import BottomNav from '@/components/BottomNav';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'moodX — Television that reads the room',
  description:
    "moodX is a streaming home for whatever mood you're in. Pick a mood, press play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-ink text-paper font-body pb-24 md:pb-0"
        style={{ overscrollBehaviorY: 'none' }}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  );
}