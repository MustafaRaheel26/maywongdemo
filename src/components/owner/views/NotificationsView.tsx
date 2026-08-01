import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Clock,
  FileCheck,
  Star,
  ShoppingBag,
  Info,
  Trash2,
  Check,
  Search,
  Filter,
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setOwnerTab,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredNotifications = notifications.filter((n) => {
    const matchesFilter =
      filterType === 'all'
        ? true
        : filterType === 'unread'
        ? !n.isRead
        : n.type === filterType;

    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'claim':
        return <FileCheck className="w-4 h-4 text-blue-400" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'review':
        return <Star className="w-4 h-4 text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-indigo-400" />;
    }
  };

  const handleNotificationClick = (linkTab?: string, id?: string) => {
    if (id) markNotificationRead(id);
    if (linkTab) setOwnerTab(linkTab);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Bell className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Notification Center</h1>
          </div>
          <p className="text-xs text-slate-300">
            System updates, verification alerts, customer feedback, and live order alerts.
          </p>
        </div>

        <button
          onClick={clearAllNotifications}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'unread', label: 'Unread' },
            { id: 'claim', label: 'Claims' },
            { id: 'review', label: 'Reviews' },
            { id: 'system', label: 'System' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                filterType === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notification Items List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Bell className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Notifications</h3>
            <p className="text-xs text-slate-400">All caught up! You have no alerts matching this filter.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.linkTab, notif.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                notif.isRead
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900 border-slate-700/80 text-white shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 shrink-0">
                  {getNotifIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{notif.title}</h3>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">{notif.message}</p>
                  <span className="text-[10px] text-slate-500 block pt-1">{notif.timestamp}</span>
                </div>
              </div>

              {!notif.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(notif.id);
                  }}
                  className="p-1.5 text-slate-500 hover:text-emerald-400 rounded-lg hover:bg-slate-800"
                  title="Mark Read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
