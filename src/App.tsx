import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { ToastContainer } from './components/common/ToastContainer';
import { CommandMenu } from './components/common/CommandMenu';
import { OwnerDashboard } from './components/owner/OwnerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

function DashboardContent() {
  const { role } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)} />

      {/* Main Container Layout */}
      <div className="flex-1 flex w-full min-w-0">
        {/* Navigation Sidebar */}
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">
          <div className="w-full max-w-7xl mx-auto space-y-6">
            <Breadcrumbs />

            {role === 'owner' ? <OwnerDashboard /> : <AdminDashboard />}
          </div>
        </main>
      </div>

      {/* Global Utilities */}
      <ToastContainer />
      <CommandMenu />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
