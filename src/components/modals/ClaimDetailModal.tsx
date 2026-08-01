import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RestaurantClaim, ClaimStatus } from '../../types';
import { Modal } from '../common/Modal';
import {
  FileText,
  User,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  AlertCircle,
  Send,
} from 'lucide-react';

interface ClaimDetailModalProps {
  claim: RestaurantClaim | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimDetailModal: React.FC<ClaimDetailModalProps> = ({
  claim,
  isOpen,
  onClose,
}) => {
  const { updateClaimStatus } = useApp();
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [actionMode, setActionMode] = useState<'view' | 'reject' | 'info'>('view');

  if (!claim) return null;

  const handleApprove = () => {
    updateClaimStatus(claim.id, 'approved', undefined, adminNotes || 'Approved by Administrator');
    onClose();
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    updateClaimStatus(claim.id, 'rejected', rejectionReason, adminNotes);
    onClose();
  };

  const handleRequestInfo = () => {
    if (!rejectionReason.trim()) return;
    updateClaimStatus(claim.id, 'needs_info', rejectionReason, adminNotes);
    onClose();
  };

  const statusBadges: Record<ClaimStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', text: 'Pending Approval', label: 'Pending' },
    under_review: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', text: 'Under Review', label: 'Under Review' },
    approved: { bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', text: 'Approved & Verified', label: 'Approved' },
    rejected: { bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300', text: 'Rejected', label: 'Rejected' },
    needs_info: { bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300', text: 'Information Requested', label: 'Needs Info' },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Claim Request #${claim.id}`}
      subtitle={`Submitted for ${claim.restaurantName}`}
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Header Status Bar */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">
              Claim Verification Status
            </span>
            <span className={`inline-block mt-1 px-2.5 py-1 rounded-md text-xs font-bold ${statusBadges[claim.status].bg}`}>
              {statusBadges[claim.status].text}
            </span>
          </div>

          <div className="text-right text-xs text-slate-500">
            <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{claim.submittedAt}</span>
            </div>
            {claim.reviewedBy && (
              <span className="text-[11px] block mt-0.5">Reviewed by: {claim.reviewedBy}</span>
            )}
          </div>
        </div>

        {/* Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-500" />
              Claimant Information
            </h4>
            <div className="space-y-1.5 text-xs">
              <p><span className="text-slate-500">Name:</span> <strong className="text-slate-800 dark:text-slate-200">{claim.claimantName}</strong></p>
              <p><span className="text-slate-500">Role:</span> <span className="font-semibold">{claim.claimantRole}</span></p>
              <p><span className="text-slate-500">Email:</span> <a href={`mailto:${claim.claimantEmail}`} className="text-blue-600 hover:underline">{claim.claimantEmail}</a></p>
              <p><span className="text-slate-500">Phone:</span> {claim.claimantPhone}</p>
              <p><span className="text-slate-500">Tax ID:</span> <span className="font-mono">{claim.taxId}</span></p>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2.5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-500" />
              Restaurant Target
            </h4>
            <div className="space-y-1.5 text-xs">
              <p><span className="text-slate-500">Restaurant:</span> <strong className="text-slate-800 dark:text-slate-200">{claim.restaurantName}</strong></p>
              <p><span className="text-slate-500">Restaurant ID:</span> <span className="font-mono text-[11px]">{claim.restaurantId}</span></p>
              {claim.notes && (
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Claimant Note:</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">{claim.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Uploaded Verification PDF Documents */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-500" />
              Verification Documents ({claim.verificationDocs.length})
            </span>
            <span className="text-[11px] text-slate-400 font-normal">Click to simulate download</span>
          </h4>

          <div className="space-y-2">
            {claim.verificationDocs.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300 font-bold text-[10px]">
                    PDF
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{doc.type} • {doc.size}</span>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  View
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Action Input Section for Reject or Need Info */}
        {actionMode !== 'view' && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-3">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100">
              {actionMode === 'reject' ? 'Reason for Rejection' : 'Specific Information Needed'}
            </label>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder={
                actionMode === 'reject'
                  ? 'E.g. Document expired, or Tax ID does not match state registry records...'
                  : 'E.g. Please upload an updated copy of the 2026 health inspection permit...'
              }
              className="w-full text-xs p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Admin Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Internal Administrator Notes (Optional)
          </label>
          <input
            type="text"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="E.g. Verified with California SOS registry on 2026-08-01..."
            className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Decision Actions */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          {actionMode === 'view' ? (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActionMode('reject')}
                  className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors border border-rose-200 dark:border-rose-900/50"
                >
                  Reject Claim
                </button>
                <button
                  type="button"
                  onClick={() => setActionMode('info')}
                  className="px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-900/50"
                >
                  Request More Info
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & Grant Owner Access
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActionMode('view')}
                className="text-xs text-slate-500 hover:underline"
              >
                ← Back to Actions
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={actionMode === 'reject' ? handleReject : handleRequestInfo}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit {actionMode === 'reject' ? 'Rejection' : 'Information Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
