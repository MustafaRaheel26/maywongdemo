import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PendingChangeItem } from '../../../types';
import {
  FileEdit,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  Search,
  Filter,
  Sparkles,
  AlertCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';

export const ChangeRequestsView: React.FC = () => {
  const { pendingChanges, updatePendingChangeStatus, addToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedChange, setSelectedChange] = useState<PendingChangeItem | null>(null);
  const [adminComment, setAdminComment] = useState('');

  const filteredChanges = pendingChanges.filter((pc) => {
    const matchesStatus = statusFilter === 'all' || pc.status === statusFilter;
    const matchesSearch =
      pc.field.toLowerCase().includes(search.toLowerCase()) ||
      pc.newValue.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAction = (status: PendingChangeItem['status']) => {
    if (!selectedChange) return;

    updatePendingChangeStatus(selectedChange.id, status, adminComment || undefined);

    addToast({
      type: status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'info',
      title: `Change Request ${status.toUpperCase()}`,
      message: `Modification request #${selectedChange.id} processed successfully.`,
    });

    setSelectedChange(null);
    setAdminComment('');
  };

  const getStatusBadge = (status: PendingChangeItem['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800/60 px-2.5 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Under Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2.5 py-1 rounded-full">
            <AlertCircle className="w-3.5 h-3.5" /> Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <FileEdit className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Profile Modification Requests Approval</h1>
          </div>
          <p className="text-xs text-slate-300">
            Audit side-by-side profile changes submitted by verified restaurant owners before publishing live.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl">
          Pending Review: <strong>{pendingChanges.filter((p) => p.status === 'submitted' || p.status === 'under_review').length}</strong>
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'submitted', label: 'Submitted' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                statusFilter === tab.id
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
            placeholder="Search topic or value..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* List of Changes */}
      <div className="space-y-4">
        {filteredChanges.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            No profile change requests found matching your filter.
          </div>
        ) : (
          filteredChanges.map((change) => (
            <div
              key={change.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileEdit className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-bold text-white">{change.field}</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Submitted: {change.submittedAt} • Ref: #{change.id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(change.status)}
                  {(change.status === 'submitted' || change.status === 'under_review') && (
                    <button
                      onClick={() => setSelectedChange(change)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition"
                    >
                      Audit & Process
                    </button>
                  )}
                </div>
              </div>

              {/* Side-by-Side Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 border border-rose-950/60 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
                    Original Database State
                  </span>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed break-words">
                    {change.previousValue}
                  </p>
                </div>

                <div className="bg-slate-950 border border-emerald-950/60 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                    Owner Proposed State
                  </span>
                  <p className="text-slate-200 font-mono text-[11px] leading-relaxed break-words">
                    {change.newValue}
                  </p>
                </div>
              </div>

              {change.adminNotes && (
                <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Admin Audit Note:</span>
                    <p className="text-[11px] text-slate-300">{change.adminNotes}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {selectedChange && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-blue-400" />
                Audit Change #{selectedChange.id}
              </h2>
              <button onClick={() => setSelectedChange(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-white block mb-1">Field Topic:</span>
                <span className="text-indigo-400 font-semibold">{selectedChange.field}</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-400 block">Current:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{selectedChange.previousValue}</span>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Proposed:</span>
                  <span className="text-slate-200 font-mono text-[11px]">{selectedChange.newValue}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Administrator Feedback Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  placeholder="Reason for approval or rejection..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleAction('rejected')}
                className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs rounded-xl transition"
              >
                Reject Change
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('under_review')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => handleAction('approved')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Approve & Publish Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
