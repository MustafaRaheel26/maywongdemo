import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  CheckCheck,
  Shield,
  Building2,
  ChevronDown,
  Sparkles,
  Command,
  User,
  LogOut,
  X,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const {
    role,
    setRole,
    activeUser,
    activeRestaurant,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setIsCommandOpen,
    setOwnerTab,
    setAdminTab,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left side: Logo + Mobile Toggle + Role Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 mr-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-slate-100 block leading-none">
              ResPulse
            </span>
            <span className="text-[10px] text-slate-500 font-medium">SaaS Platform</span>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <button
            onClick={() => {
              setRole('owner');
              setOwnerTab('overview');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'owner'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Owner Portal</span>
          </button>

          <button
            onClick={() => {
              setRole('admin');
              setAdminTab('overview');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'admin'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Super Admin</span>
          </button>
        </div>
      </div>

      {/* Middle: Global Quick Search Button */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="hidden md:flex items-center gap-3 px-3.5 py-1.5 w-64 lg:w-80 bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs transition-colors"
      >
        <Search className="w-4 h-4 text-slate-400" />
        <span className="flex-1 text-left truncate">Search claims, restaurants, settings...</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-500 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
          <Command className="w-2.5 h-2.5" /> K
        </kbd>
      </button>

      {/* Right side: Actions, Notifications, User Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Demo Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-[11px] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>Fiverr Proof-of-Concept</span>
        </div>

        {/* Search Icon for Mobile */}
        <button
          onClick={() => setIsCommandOpen(true)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        !n.isRead ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <img
              src={activeUser.avatar}
              alt={activeUser.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
            />
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {activeUser.name}
              </span>
              <span className="block text-[10px] text-slate-500 capitalize">
                {role === 'owner' ? 'Restaurant Owner' : 'Super Admin'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 z-50">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {activeUser.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{activeUser.email}</p>
              </div>

              <button
                onClick={() => {
                  setRole('owner');
                  setOwnerTab('info');
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                Profile Settings
              </button>

              <button
                onClick={() => {
                  setRole('admin');
                  setAdminTab('settings');
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                Admin Audit Controls
              </button>

              <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
