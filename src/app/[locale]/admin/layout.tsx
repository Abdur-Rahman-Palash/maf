import type { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Admin Login',
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <>{children}</>;
}
