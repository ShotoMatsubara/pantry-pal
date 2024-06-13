'use client';

import { Inter } from 'next/font/google';
import './globals.css';

import { NotificationProvider } from '../contexts/NotificationContext';
import Notification from '../components/Notification';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <NotificationProvider>
          {children}
          <Notification />
        </NotificationProvider>
      </body>
    </html>
  );
}
