import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signal — HoneyDrunk Studios',
  description: 'Build-in-public devlog. Real-time updates from the Grid.',
};

export default function SignalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
