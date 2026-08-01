import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Building2,
  FileCheck2,
  Users,
  Settings,
  Image as ImageIcon,
  Utensils,
  Clock,
  Star,
  ShieldAlert,
  ArrowRight,
  X,
} from 'lucide-react';

export const CommandMenu: React.FC = () => {
  const {
    isCommandOpen,
    setIsCommandOpen,
    role,
    setRole,
    setOwnerTab,
    setAdminTab,
    restaurants,
    setSelectedRestaurantId,
    claims,
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isCommandOpen) return null;

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  const filteredClaims = claims.filter(
    (c) =>
      c.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
      c.claimantName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectTab = (targetRole: 'owner' | 'admin', tab: string) => {
    setRole(targetRole);
    if (targetRole === 'owner') {
      setOwnerTab(tab);
    } else {
      setAdminTab(tab);
    }
    setIsCommandOpen(false);
  };

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    setRole('owner');
    setOwnerTab('overview');
    setIsCommandOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 px-4">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, claims, or jump to dashboard section... (Esc to close)"
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsCommandOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Portal Switcher */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Switch Portal & View
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSelectTab('owner', 'overview')}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span>Restaurant Owner Portal — Dashboard Overview</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => handleSelectTab('admin', 'overview')}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-200 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-indigo-500" />
                  <span>Platform Admin Console — Command Center</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Owner Quick Links */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Owner Management Tools
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => handleSelectTab('owner', 'info')}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Restaurant Profile
              </button>
              <button
                onClick={() => handleSelectTab('owner', 'photos')}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                Photos & Gallery
              </button>
              <button
                onClick={() => handleSelectTab('owner', 'menu')}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Utensils className="w-3.5 h-3.5 text-slate-400" />
                Menu Items
              </button>
              <button
                onClick={() => handleSelectTab('owner', 'hours')}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Business Hours
              </button>
            </div>
          </div>

          {/* Admin Quick Links */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Admin Governance
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => handleSelectTab('admin', 'claims')}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                Review Claims Queue ({claims.filter((c) => c.status === 'pending').length})
              </button>
              <button
                onClick={() => handleSelectTab('admin', 'users')}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Users className="w-3.5 h-3.5 text-slate-400" />
                User Access & Roles
              </button>
            </div>
          </div>

          {/* Restaurants Search Matches */}
          {filteredRestaurants.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Restaurants ({filteredRestaurants.length})
              </div>
              <div className="space-y-1">
                {filteredRestaurants.slice(0, 4).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRestaurant(r.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={r.logoUrl}
                        alt={r.name}
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <div>
                        <span className="font-semibold block text-slate-900 dark:text-slate-100">
                          {r.name}
                        </span>
                        <span className="text-[10px] text-slate-500">{r.cuisine} • {r.city}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded capitalize">
                      {r.claimStatus.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 border rounded font-mono">Cmd+K</kbd> anywhere to open</span>
          <span>Fiverr Demo Mode</span>
        </div>
      </div>
    </div>
  );
};
