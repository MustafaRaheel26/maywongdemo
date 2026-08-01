import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Settings,
  User,
  Lock,
  Bell,
  ShieldCheck,
  Smartphone,
  Save,
  RotateCcw,
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldAlert,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { activeUser, addToast } = useApp();

  const [name, setName] = useState(activeUser.name || 'Marco Rossi');
  const [email, setEmail] = useState(activeUser.email || 'marco.rossi@laspondabistro.com');
  const [phone, setPhone] = useState('(415) 892-3401');

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Notif Toggles
  const [emailOrders, setEmailOrders] = useState(true);
  const [emailReviews, setEmailReviews] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Account Settings Saved',
        message: 'Owner credentials and notification preferences updated.',
      });
      setIsSaving(false);
    }, 400);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter current and new password.',
      });
      return;
    }
    addToast({
      type: 'success',
      title: 'Password Updated',
      message: 'Your account security credentials were changed successfully.',
    });
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleResetDemoData = () => {
    addToast({
      type: 'info',
      title: 'Demo Cache Cleared',
      message: 'Local session cache reset to initial state.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Account & Security Settings</h1>
          </div>
          <p className="text-xs text-slate-300">
            Manage owner login credentials, two-factor authentication, and automated dispatch notifications.
          </p>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
        >
          {isSaving ? (
            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save All Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Account Info & Password */}
        <div className="lg:col-span-7 space-y-6">
          {/* Owner Identity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                Owner Profile Details
              </h2>
              <span className="text-[10px] bg-blue-950 text-blue-400 font-bold px-2 py-0.5 rounded-full border border-blue-800">
                Verified Owner
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-400" />
                Change Password
              </h2>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Preferences & Danger Zone */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email & Push Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">New Live Orders</span>
                  <span className="text-[11px] text-slate-400 block">Instant alert for new order tickets</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailOrders}
                  onChange={(e) => setEmailOrders(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">Customer Review Digests</span>
                  <span className="text-[11px] text-slate-400 block">Daily summary of ratings & feedback</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailReviews}
                  onChange={(e) => setEmailReviews(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">SMS Critical Dispatch Alerts</span>
                  <span className="text-[11px] text-slate-400 block">Text message if order is waiting &gt; 15m</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reset Demo Cache */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Demo Reset</h2>
            </div>
            <p className="text-xs text-slate-400">
              Reset temporary session modifications back to original dummy seed data.
            </p>
            <button
              onClick={handleResetDemoData}
              className="w-full py-2.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 text-rose-300 font-bold rounded-xl text-xs transition"
            >
              Reset Local Demo State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
