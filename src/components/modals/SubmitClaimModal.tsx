import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Building2, Upload, FileCheck2, Shield, Send } from 'lucide-react';

interface SubmitClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitClaimModal: React.FC<SubmitClaimModalProps> = ({ isOpen, onClose }) => {
  const { restaurants, submitNewClaim, activeUser } = useApp();

  const [restaurantId, setRestaurantId] = useState(restaurants[0]?.id || 'rest-1');
  const [claimantName, setClaimantName] = useState(activeUser.name);
  const [claimantEmail, setClaimantEmail] = useState(activeUser.email);
  const [claimantPhone, setClaimantPhone] = useState('(415) 892-3401');
  const [claimantRole, setClaimantRole] = useState('Executive Chef & Owner');
  const [taxId, setTaxId] = useState('XX-XXX9812');
  const [notes, setNotes] = useState('');
  const [attachedDocName, setAttachedDocName] = useState('Business_License_2026.pdf');

  const selectedRest = restaurants.find((r) => r.id === restaurantId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitNewClaim({
      restaurantId,
      restaurantName: selectedRest?.name || 'Restaurant',
      claimantName,
      claimantEmail,
      claimantPhone,
      claimantRole,
      taxId,
      notes,
      verificationDocs: [
        { name: attachedDocName, type: 'PDF Document', size: '2.4 MB' },
        { name: 'SanFrancisco_Health_Permit.pdf', type: 'PDF Document', size: '1.1 MB' },
      ],
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Restaurant Ownership Claim"
      subtitle="Provide verification records to claim and manage your restaurant listing."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Restaurant Select */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Target Restaurant Listing
          </label>
          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.address}, {r.city} ({r.claimStatus.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              required
              value={claimantName}
              onChange={(e) => setClaimantName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Business Email Address
            </label>
            <input
              type="email"
              required
              value={claimantEmail}
              onChange={(e) => setClaimantEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Contact Phone Number
            </label>
            <input
              type="text"
              required
              value={claimantPhone}
              onChange={(e) => setClaimantPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Business Role / Title
            </label>
            <input
              type="text"
              required
              value={claimantRole}
              onChange={(e) => setClaimantRole(e.target.value)}
              placeholder="e.g. Owner, General Manager, Founder"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tax ID */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Federal Tax ID / Seller Permit Number
          </label>
          <input
            type="text"
            required
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Simulated Document Upload Dropzone */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Upload Verification Documents (Business License, Health Permit, Utility Bill)
          </label>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
            <span className="font-semibold block text-slate-700 dark:text-slate-200">
              Drag & drop business PDF documents here
            </span>
            <span className="text-[11px] text-slate-400">
              Simulated attachment: <strong className="text-blue-600">{attachedDocName}</strong>
            </span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Additional Comments for Administrators (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g. We recently acquired this location and updated our liquor license..."
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Modal Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Verification Claim
          </button>
        </div>
      </form>
    </Modal>
  );
};
