import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { NotificationItem } from '../../../types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ShoppingBag,
  Info,
  Trash2,
  Check,
  Search,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminNotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications, addToast } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'unread') return !n.isRead;
    return n.type === categoryFilter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    notifications.forEach((n) => markNotificationRead(n.id));
    addToast({
      type: 'info',
      title: 'Notifications Updated',
      message: 'All notifications marked as read.',
    });
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'claim':
        return <FileCheck2 className="w-4 h-4 text-amber-400" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-400" />;
      case 'system':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default:
        return <Info className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Bell className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Platform Command Notifications</h1>
          </div>
          <p className="text-xs text-slate-300">
            Real-time alerts for claim submissions, security events, profile updates, and system health status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              <Check className="w-4 h-4" /> Mark All Read ({unreadCount})
            </button>
          )}

          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-2 rounded-2xl overflow-x-auto">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'claim', label: 'Claim Verifications' },
          { id: 'system', label: 'System Alerts' },
          { id: 'order', label: 'Orders' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              categoryFilter === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl divide-y divide-slate-800 overflow-hidden">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No notifications matching selected filter.
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 flex items-start justify-between gap-4 cursor-pointer transition ${
                n.isRead ? 'bg-slate-900 hover:bg-slate-800/40' : 'bg-slate-800/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs font-bold ${n.isRead ? 'text-slate-300' : 'text-white'}`}>
                      {n.title}
                    </h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-500 block pt-1">{n.timestamp}</span>
                </div>
              </div>

              {!n.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(n.id);
                  }}
                  className="px-2.5 py-1 text-[10px] font-bold text-blue-400 bg-blue-950 border border-blue-800 rounded-lg shrink-0"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
