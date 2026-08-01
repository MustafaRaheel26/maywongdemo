import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Home, Building2, ShieldCheck } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { role, ownerTab, adminTab, activeRestaurant } = useApp();

  const ownerTabLabels: Record<string, string> = {
    overview: 'Overview & Performance',
    info: 'Restaurant Profile & Details',
    photos: 'Photos & Gallery Management',
    claim: 'Claim Status & Verification',
    menu: 'Menu Management',
    hours: 'Operating Hours & Schedule',
    reviews: 'Customer Reviews & Feedback',
  };

  const adminTabLabels: Record<string, string> = {
    overview: 'Platform Command Center',
    claims: 'Restaurant Claims Queue',
    restaurants: 'Directory & Management',
    users: 'User Access & Permissions',
    settings: 'System Settings & Audit Log',
  };

  const currentLabel =
    role === 'owner'
      ? ownerTabLabels[ownerTab] || 'Dashboard'
      : adminTabLabels[adminTab] || 'Portal';

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
        {role === 'owner' ? (
          <>
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">{activeRestaurant?.name || 'Restaurant Owner'}</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Super Admin Console
            </span>
          </>
        )}
      </div>

      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />

      <span className="capitalize text-slate-900 dark:text-slate-100 font-medium">
        {currentLabel}
      </span>
    </nav>
  );
};
