import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { RestaurantClaim, ClaimStatus } from '../../../types';
import { FileCheck2, Search, Filter, Eye, CheckCircle2, XCircle, Clock, Download } from 'lucide-react';

interface ClaimsReviewViewProps {
  onSelectClaim: (claim: RestaurantClaim) => void;
}

export const ClaimsReviewView: React.FC<ClaimsReviewViewProps> = ({ onSelectClaim }) => {
  const { claims, updateClaimStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredClaims = claims.filter((claim) => {
    const matchesStatus = statusFilter === 'all' ? true : claim.status === statusFilter;
    const matchesSearch =
      claim.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      claim.claimantName.toLowerCase().includes(search.toLowerCase()) ||
      claim.claimantEmail.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusBadges: Record<ClaimStatus, { bg: string; text: string }> = {
    pending: { bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', text: 'Pending' },
    under_review: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', text: 'Under Review' },
    approved: { bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', text: 'Approved' },
    rejected: { bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300', text: 'Rejected' },
    needs_info: { bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300', text: 'Needs Info' },
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-indigo-600" />
            Restaurant Claims & Verification Approvals
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review submitted tax permits, health licenses, and authorize owner dashboard permissions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 rounded-lg border border-amber-200">
            {claims.filter((c) => c.status === 'pending').length} Pending Requests
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurant, claimant or email..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'pending', 'under_review', 'approved', 'rejected', 'needs_info'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200/80 dark:border-slate-800">
                <th className="p-4">Target Restaurant</th>
                <th className="p-4">Claimant & Role</th>
                <th className="p-4">Tax ID / Permit</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No claims match current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4">
                      <strong className="block text-slate-900 dark:text-slate-100 text-sm font-bold">
                        {claim.restaurantName}
                      </strong>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ID: {claim.restaurantId}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        {claim.claimantName}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {claim.claimantRole} • {claim.claimantEmail}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {claim.taxId}
                      <span className="block text-[10px] text-slate-400 font-sans">
                        {claim.verificationDocs.length} PDF attachments
                      </span>
                    </td>

                    <td className="p-4 text-slate-500">{claim.submittedAt}</td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          statusBadges[claim.status].bg
                        }`}
                      >
                        {statusBadges[claim.status].text}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => onSelectClaim(claim)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-lg font-bold text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>

                      {claim.status === 'pending' && (
                        <button
                          onClick={() => updateClaimStatus(claim.id, 'approved')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Quick Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
