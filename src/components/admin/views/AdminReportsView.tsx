import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  Building2,
  FileCheck,
  ShieldCheck,
  DollarSign,
  Printer,
  Sparkles,
} from 'lucide-react';

export const AdminReportsView: React.FC = () => {
  const { restaurants, claims, addToast } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reportModules = [
    {
      id: 'restaurant_directory',
      title: 'Restaurant Directory & Verification Digest',
      desc: 'Complete list of active, pending, unverified venues, owner contact information, and business hours.',
      icon: Building2,
      count: `${restaurants.length} Listings`,
      badge: 'CSV / PDF',
    },
    {
      id: 'claim_verifications',
      title: 'Verification Claims & Audit History',
      desc: 'Historical claim verification decisions, tax ID validation logs, claimant records, and admin reviewer notes.',
      icon: FileCheck,
      count: `${claims.length} Claims`,
      badge: 'CSV / PDF',
    },
    {
      id: 'platform_revenue',
      title: 'Platform Subscription Revenue & GMV Report',
      desc: 'MRR subscription breakdowns, customer order GMV totals, and tier renewal forecasts.',
      icon: DollarSign,
      count: '$42,850 MRR',
      badge: 'CSV / PDF',
    },
    {
      id: 'security_audit',
      title: 'Security Access & Compliance Audit Trail',
      desc: 'Super admin logins, owner permission updates, system configuration changes, and API key access logs.',
      icon: ShieldCheck,
      count: '1,240 Events',
      badge: 'CSV / PDF',
    },
  ];

  const handleDownload = (reportTitle: string, format: 'CSV' | 'PDF') => {
    addToast({
      type: 'success',
      title: `${format} Export Generated`,
      message: `"${reportTitle}" (${selectedPeriod.toUpperCase()}) exported successfully.`,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Executive Platform Reporting Suite</h1>
          </div>
          <p className="text-xs text-slate-300">
            Export structured compliance, financial, verification, and audit reports for board governance and operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3.5 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="weekly">Weekly Summary</option>
            <option value="monthly">Monthly Audit (Current)</option>
            <option value="quarterly">Quarterly Report (Q1 2026)</option>
            <option value="yearly">Annual Fiscal Digest</option>
          </select>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportModules.map((module) => {
          const IconComponent = module.icon;

          return (
            <div
              key={module.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-indigo-950 text-indigo-400 rounded-xl border border-indigo-800">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{module.title}</h3>
                      <span className="text-[10px] font-extrabold uppercase text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                        {module.count}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    {module.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{module.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleDownload(module.title, 'CSV')}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> Export CSV
                </button>

                <button
                  onClick={() => handleDownload(module.title, 'PDF')}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Generation Logs Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-3 shadow-xl">
        <h3 className="text-sm font-bold flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Scheduled Automatic Governance Export Schedule
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300">
            <div>
              <span className="font-bold text-white block">Weekly Claims & Verification Digest</span>
              <span className="text-[11px] text-slate-400">Recipients: compliance@respulse.com</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-full">
              Active • Every Monday 08:00 UTC
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300">
            <div>
              <span className="font-bold text-white block">Monthly Financial & Subscription Run-Rate</span>
              <span className="text-[11px] text-slate-400">Recipients: finance@respulse.com</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-full">
              Active • 1st of Month 00:00 UTC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
