import React, { useState } from 'react';
import { INITIAL_AUDIT_LOGS } from '../../../data/mockData';
import { useApp } from '../../../context/AppContext';
import {
  Terminal,
  Search,
  Filter,
  Download,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Info,
  User,
  Activity,
  FileText,
} from 'lucide-react';

export const SystemLogsView: React.FC = () => {
  const { addToast } = useApp();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const logsList = [
    ...INITIAL_AUDIT_LOGS,
    {
      id: 'log-101',
      action: 'CLAIM_VERIFICATION_APPROVED',
      actorName: 'Admin Sarah',
      actorRole: 'Super Admin',
      details: 'Approved claim request #CLM-8821 for Bella Italia Bistro.',
      timestamp: '2026-08-01 10:14 AM',
    },
    {
      id: 'log-102',
      action: 'OWNER_PASSWORD_RESET',
      actorName: 'System Gateway',
      actorRole: 'Security Bot',
      details: 'Dispatched password reset token to owner@sushi.com.',
      timestamp: '2026-08-01 09:42 AM',
    },
    {
      id: 'log-103',
      action: 'RESTAURANT_PROFILE_UPDATE',
      actorName: 'Chef Marco',
      actorRole: 'Restaurant Owner',
      details: 'Updated business hours for weekend dinner service.',
      timestamp: '2026-08-01 08:30 AM',
    },
  ];

  const filteredLogs = logsList.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const handleExportLogs = () => {
    addToast({
      type: 'success',
      title: 'Audit Logs Exported',
      message: 'System audit log history exported to CSV file.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Terminal className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">System Security & Audit Trail</h1>
          </div>
          <p className="text-xs text-slate-300">
            Immutable log of super admin actions, verification approvals, login events, and security access.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
        >
          <Download className="w-4 h-4" /> Export Audit Log CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action keyword, actor, details..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <span className="text-xs text-slate-400 font-bold bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl">
          Log Entries: {filteredLogs.length}
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px] font-sans">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Action Event</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 text-slate-400 text-[11px] shrink-0">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-bold text-indigo-400 text-[11px]">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-slate-200">
                    <span className="font-bold text-white block">{log.actorName}</span>
                    <span className="text-[10px] text-slate-500 font-sans block">{log.actorRole}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 text-[11px] font-sans">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
