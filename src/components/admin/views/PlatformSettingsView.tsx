import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Settings,
  Shield,
  Key,
  Mail,
  Database,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Bell,
  HardDrive,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export const PlatformSettingsView: React.FC = () => {
  const { addToast } = useApp();

  const [platformName, setPlatformName] = useState('ResPulse SaaS');
  const [supportEmail, setSupportEmail] = useState('support@respulse.com');
  const [platformFee, setPlatformFee] = useState('3.5');
  const [autoVerifyClaims, setAutoVerifyClaims] = useState(false);
  const [requireTaxId, setRequireTaxId] = useState(true);
  const [enableEmailAlerts, setEnableEmailAlerts] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Platform Settings Saved',
      message: 'System governance parameters updated across all environments.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Platform Configuration & System Governance</h1>
          </div>
          <p className="text-xs text-slate-300">
            Configure global SaaS branding, fee schedules, verification protocols, email templates, and API integrations.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General SaaS Settings */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs shadow-xl">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
            <Globe className="w-4 h-4 text-blue-400" /> General Platform Parameters
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Support Email Address</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Marketplace Platform Commission Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Verification & Security Rules */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs shadow-xl">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
            <Shield className="w-4 h-4 text-emerald-400" /> Verification & Compliance Policy
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Require Tax ID Document (PDF)</span>
                <span className="text-slate-400 text-[11px] block">Claimants must upload tax verification credentials</span>
              </div>
              <input
                type="checkbox"
                checked={requireTaxId}
                onChange={(e) => setRequireTaxId(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Dispatch Admin Alerts on Claims</span>
                <span className="text-slate-400 text-[11px] block">Notify compliance team instantly on new claims</span>
              </div>
              <input
                type="checkbox"
                checked={enableEmailAlerts}
                onChange={(e) => setEnableEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Auto-Verify Approved Owners</span>
                <span className="text-slate-400 text-[11px] block">Auto-activate owner dashboard upon claim approval</span>
              </div>
              <input
                type="checkbox"
                checked={autoVerifyClaims}
                onChange={(e) => setAutoVerifyClaims(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700"
              />
            </label>
          </div>
        </div>

        {/* API Keys & Secrets Configuration */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs shadow-xl">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
            <Key className="w-4 h-4 text-amber-400" /> Platform API Keys & Secrets Status
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">GEMINI_API_KEY</span>
                <span className="text-slate-400 text-[11px] block">Server-side Lazy Proxy</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold text-[10px]">
                Active Injected
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">POSTGRES_DB_URI</span>
                <span className="text-slate-400 text-[11px] block">Cloud SQL Connection</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold text-[10px]">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* Infrastructure & Maintenance */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs shadow-xl">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 text-sm">
            <Database className="w-4 h-4 text-purple-400" /> Backup & Infrastructure Controls
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white block">Daily Automated Database Backup</span>
                <span className="text-slate-400 text-[11px] block">Last snapshot: 3 hours ago</span>
              </div>
              <button
                type="button"
                onClick={() => addToast({ type: 'info', title: 'Backup Triggered', message: 'Instant snapshot triggered.' })}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold border border-slate-700"
              >
                Snapshot Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
