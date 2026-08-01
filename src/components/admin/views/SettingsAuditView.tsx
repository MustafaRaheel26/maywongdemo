import React from 'react';
import { INITIAL_AUDIT_LOGS } from '../../../data/mockData';
import { Settings, Shield, Key, Database, RefreshCw } from 'lucide-react';

export const SettingsAuditView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            System Settings & Security Audit Log
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure claim verification auto-routing rules, security parameters, and audit history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Services Operational
          </span>
        </div>
      </div>

      {/* System Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Rules */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            Claim Verification Policy
          </h3>

          <div className="space-y-2 pt-1">
            <label className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Require Tax ID Document (PDF)
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded text-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Auto-notify admin on new claim submission
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded text-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Allow owner instant menu editing post-approval
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded text-indigo-600"
              />
            </label>
          </div>
        </div>

        {/* Database & Infrastructure */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Database className="w-4 h-4 text-blue-600" />
            Platform Infrastructure
          </h3>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-slate-500">Database Engine:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">PostgreSQL (Cloud SQL Ready)</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-slate-500">API Proxy Security:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Server-side Lazy Init Proxy</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-slate-500">Media CDN Provider:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">High-Res Unsplash CDN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Security Audit Log History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200/80 dark:border-slate-800">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Actor</th>
                <th className="p-3">Action Type</th>
                <th className="p-3">Details</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {INITIAL_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    {log.actorName} ({log.actorRole})
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{log.details}</td>
                  <td className="p-3 font-mono text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
