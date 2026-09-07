'use client'
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation'

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  const pathname = usePathname()

  // Check if it's a project detail page
  const isProjectDetailPage = pathname?.startsWith('/projects/')


  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {!isProjectDetailPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
