import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  User,
  Shield,
  Key,
  Lock,
  Mail,
  Smartphone,
  LogOut,
  Save,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Laptop,
} from 'lucide-react';

export const AdminProfileView: React.FC = () => {
  const { activeUser, addToast, setRole } = useApp();

  const [name, setName] = useState(activeUser.name || 'Super Administrator');
  const [email, setEmail] = useState(activeUser.email || 'admin@respulse.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Admin Profile Updated',
      message: 'Account details and credentials saved.',
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    addToast({
      type: 'success',
      title: 'Security Password Changed',
      message: 'Administrator password updated successfully.',
    });

    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
            {name.charAt(0)}
          </div>
          <div className="space-y-0.5">
            <h1 className="text-xl font-black tracking-tight">{name}</h1>
            <p className="text-xs text-indigo-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Super Administrator • ResPulse Platform Governance
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setRole('owner');
            addToast({ type: 'info', title: 'Role Switched', message: 'Switched to Restaurant Owner View.' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl shadow-md transition shrink-0"
        >
          <LogOut className="w-4 h-4 text-amber-400" /> Switch View Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information Form */}
        <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs shadow-xl">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
            <User className="w-4 h-4 text-indigo-400" /> Administrator Credentials
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Profile Details
          </button>
        </form>

        {/* Password Security Form */}
        <form onSubmit={handlePasswordChange} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs shadow-xl">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
            <Key className="w-4 h-4 text-amber-400" /> Security & Password
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" /> Update Administrator Password
          </button>
        </form>
      </div>

      {/* Active Session & 2FA Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs shadow-xl">
        <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
          <Laptop className="w-4 h-4 text-emerald-400" /> Active Security Sessions & 2FA
        </h3>

        <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <Laptop className="w-5 h-5 text-indigo-400" />
            <div>
              <span className="font-bold text-white block">Chrome on macOS (Current Session)</span>
              <span className="text-[11px] text-slate-400">IP: 192.168.1.102 • Cloud Run Container</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold text-[10px]">
            Active Now
          </span>
        </div>
      </div>
    </div>
  );
};
