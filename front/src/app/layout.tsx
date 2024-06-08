import type { Metadata } from 'next';
import RootLayout from './RootLayout';

export const metadata: Metadata = {
  title: 'pantry-pal',
  description: '食材管理アプリケーション',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
