import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { NotificationDrawer } from '@/components/layout/NotificationDrawer';
import { PresentationModeModal } from '@/components/layout/PresentationModeModal';
import { DemoTourModal } from '@/components/layout/DemoTourModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Hospital Management System (SHMS) | UML OOAD Laboratory Project',
  description: 'An Integrated Object-Oriented Model for Smart Hospital Operations - Interactive UML & OOAD Demonstration System'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white`}>
        {/* Header */}
        <Header />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Workspace Content Area */}
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-[calc(100vh-4rem)]">
            <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {children}
            </div>
            <Footer />
          </main>
        </div>

        {/* Global Modals & Overlay Portals */}
        <CommandPalette />
        <NotificationDrawer />
        <PresentationModeModal />
        <DemoTourModal />
      </body>
    </html>
  );
}
