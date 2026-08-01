import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  History,
  Clock3,
  CheckCircle2,
  XCircle,
  FileEdit,
  Send,
  AlertCircle,
  Filter,
  Plus,
  Sparkles,
  Search,
} from 'lucide-react';

export const PendingChangesView: React.FC = () => {
  const { pendingChanges, submitPendingChange, addToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Propose change modal form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [field, setField] = useState('');
  const [prevVal, setPrevVal] = useState('');
  const [newVal, setNewVal] = useState('');

  const filteredChanges = pendingChanges.filter((item) => {
    const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      item.field.toLowerCase().includes(search.toLowerCase()) ||
      item.newValue.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmitProposedChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!field.trim() || !newVal.trim()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in the change title and proposed new value.',
      });
      return;
    }

    submitPendingChange(field, prevVal || 'N/A', newVal);
    setIsModalOpen(false);
    setField('');
    setPrevVal('');
    setNewVal('');
  };

  const getStatusBadge = (status: string) => {
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
            <Clock3 className="w-3.5 h-3.5" /> Under Review
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Pending Changes & Approval Workflow</h1>
          </div>
          <p className="text-xs text-slate-300">
            Track profile modification requests sent to platform administrators for audit & compliance review.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Propose New Change</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
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
            placeholder="Search change logs..."
            className="w-full bg-slate-800 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {filteredChanges.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <History className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Changes Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              There are no pending or archived change requests matching your current filter.
            </p>
          </div>
        ) : (
          filteredChanges.map((change) => (
            <div
              key={change.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-4 transition shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileEdit className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-bold text-white">{change.field}</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Submitted: {change.submittedAt} • Ref ID: {change.id}
                  </span>
                </div>

                {getStatusBadge(change.status)}
              </div>

              {/* Diff Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 border border-rose-950/60 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
                    Previous Value
                  </span>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed break-words">
                    {change.previousValue}
                  </p>
                </div>

                <div className="bg-slate-950 border border-emerald-950/60 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                    Proposed New Value
                  </span>
                  <p className="text-slate-200 font-mono text-[11px] leading-relaxed break-words">
                    {change.newValue}
                  </p>
                </div>
              </div>

              {/* Admin Feedback Notes */}
              {change.adminNotes && (
                <div className="bg-slate-800/70 border border-slate-700/60 p-3 rounded-xl flex items-start gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">Admin Audit Note:</span>
                    <p className="text-slate-300 text-[11px]">{change.adminNotes}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Propose Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" />
                Propose Profile Modification
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProposedChange} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Change Topic / Field
                </label>
                <input
                  type="text"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  placeholder="e.g. Operating Hours Extension, Outdoor Permit"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current / Previous Value
                </label>
                <input
                  type="text"
                  value={prevVal}
                  onChange={(e) => setPrevVal(e.target.value)}
                  placeholder="Current value in database"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Proposed New Value
                </label>
                <textarea
                  rows={3}
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  placeholder="Detailed description of proposed changes..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition"
                >
                  Submit For Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
