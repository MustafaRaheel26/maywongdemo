import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
  Upload,
  ArrowRight,
  Send,
} from 'lucide-react';

interface ClaimStatusViewProps {
  onOpenSubmitClaim: () => void;
}

export const ClaimStatusView: React.FC<ClaimStatusViewProps> = ({ onOpenSubmitClaim }) => {
  const { activeRestaurant, claims } = useApp();

  if (!activeRestaurant) return null;

  const restaurantClaims = claims.filter((c) => c.restaurantId === activeRestaurant.id);
  const latestClaim = restaurantClaims[0];

  const timelineSteps = [
    {
      title: 'Claim Application Submitted',
      description: latestClaim
        ? `Submitted by ${latestClaim.claimantName} on ${latestClaim.submittedAt}`
        : 'Initial application submitted',
      status: latestClaim ? 'completed' : 'pending',
    },
    {
      title: 'Document Verification',
      description: 'Tax ID, business license, and utility permits checked by resPulse security team',
      status:
        latestClaim?.status === 'approved' || latestClaim?.status === 'under_review'
          ? 'completed'
          : latestClaim?.status === 'pending'
          ? 'in_progress'
          : 'pending',
    },
    {
      title: 'Administrator Final Approval',
      description: 'Platform owner privileges granted and verified badge activated',
      status: latestClaim?.status === 'approved' ? 'completed' : 'pending',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
              Listing Claim Verification
            </span>
            {activeRestaurant.claimStatus === 'approved' ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                ✓ Verified Owner
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold capitalize">
                {activeRestaurant.claimStatus.replace('_', ' ')}
              </span>
            )}
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            Ownership Claim Status for {activeRestaurant.name}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track verification progress, review submitted business permits, and manage claim status.
          </p>
        </div>

        <button
          onClick={onOpenSubmitClaim}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          {latestClaim ? 'Update / Resubmit Claim' : 'Submit Claim'}
        </button>
      </div>

      {/* Claim Status Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
          Verification Process Timeline
        </h3>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                  step.status === 'completed'
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                    : step.status === 'in_progress'
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {step.status === 'completed' ? '✓' : idx + 1}
              </div>

              <div className="pt-1 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{step.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Documentation */}
      {latestClaim && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Submitted Business Permits & Documents
          </h3>

          <div className="space-y-2">
            {latestClaim.verificationDocs.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600 font-bold text-[10px]">
                    PDF
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-slate-100">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg">
                  Attached to Claim #{latestClaim.id}
                </span>
              </div>
            ))}
          </div>

          {latestClaim.notes && (
            <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200/50 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300">
              <strong className="block text-blue-600 dark:text-blue-400 font-bold mb-1">
                Claim Notes:
              </strong>
              {latestClaim.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
