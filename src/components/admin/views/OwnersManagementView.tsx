import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PlatformUser } from '../../../types';
import {
  UserCheck,
  Search,
  Filter,
  User,
  Building2,
  Lock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  Plus,
} from 'lucide-react';

export const OwnersManagementView: React.FC = () => {
  const { users, restaurants, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState<PlatformUser | null>(null);
  const [resetPassModal, setResetPassModal] = useState<PlatformUser | null>(null);
  const [assignRestModal, setAssignRestModal] = useState<PlatformUser | null>(null);
  const [selectedRestId, setSelectedRestId] = useState('');

  const ownersList = users.filter((u) => u.role === 'owner');

  const filteredOwners = ownersList.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassModal) return;
    addToast({
      type: 'success',
      title: 'Password Reset Link Sent',
      message: `Password reset email dispatched to ${resetPassModal.email}.`,
    });
    setResetPassModal(null);
  };

  const handleAssignRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignRestModal || !selectedRestId) return;
    addToast({
      type: 'success',
      title: 'Restaurant Access Granted',
      message: `${assignRestModal.name} was linked to restaurant ID #${selectedRestId}.`,
    });
    setAssignRestModal(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <UserCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Restaurant Owner Management</h1>
          </div>
          <p className="text-xs text-slate-300">
            Manage verified merchant accounts, password resets, assigned restaurants, and active sessions.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl">
          Active Owners: <strong>{ownersList.length}</strong>
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search owner name, email..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Owner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOwners.length === 0 ? (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            No restaurant owners matching your query.
          </div>
        ) : (
          filteredOwners.map((owner) => {
            const assignedRest = restaurants.find((r) => r.id === owner.restaurantId) || restaurants[0];

            return (
              <div
                key={owner.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 font-bold text-sm">
                        {owner.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white">{owner.name}</h3>
                        <span className="text-[11px] text-slate-400">{owner.email}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Active
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold text-slate-400">Assigned Venue</span>
                      <span className="text-[10px] text-indigo-400 font-bold">{assignedRest?.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Last Login:</span>
                      <span className="text-slate-300">{owner.lastLogin}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setResetPassModal(owner)}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Reset Pass
                  </button>

                  <button
                    onClick={() => {
                      setAssignRestModal(owner);
                      setSelectedRestId(owner.restaurantId || restaurants[0].id);
                    }}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-400" /> Link Venue
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Password Reset Modal */}
      {resetPassModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
            <KeyRound className="w-10 h-10 text-amber-400 mx-auto" />
            <h2 className="text-sm font-bold text-white">Reset Password for {resetPassModal.name}?</h2>
            <p className="text-xs text-slate-400">
              An automated secure password reset link will be emailed to {resetPassModal.email}.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setResetPassModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Restaurant Modal */}
      {assignRestModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              Link Restaurant Access to {assignRestModal.name}
            </h2>

            <form onSubmit={handleAssignRestaurant} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Target Restaurant
                </label>
                <select
                  value={selectedRestId}
                  onChange={(e) => setSelectedRestId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {restaurants.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignRestModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
                >
                  Grant Management Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
