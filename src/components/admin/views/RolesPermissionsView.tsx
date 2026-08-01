import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Users,
  Check,
  X,
  Save,
  HelpCircle,
  Key,
  Shield,
  Eye,
} from 'lucide-react';

export const RolesPermissionsView: React.FC = () => {
  const { addToast } = useApp();

  const [permissionsState, setPermissionsState] = useState({
    manage_restaurants: { admin: true, owner: true, customer: false },
    approve_claims: { admin: true, owner: false, customer: false },
    approve_changes: { admin: true, owner: false, customer: false },
    edit_menu: { admin: true, owner: true, customer: false },
    view_orders: { admin: true, owner: true, customer: true },
    manage_users: { admin: true, owner: false, customer: false },
    view_analytics: { admin: true, owner: true, customer: false },
    export_reports: { admin: true, owner: true, customer: false },
    system_settings: { admin: true, owner: false, customer: false },
    submit_reviews: { admin: false, owner: false, customer: true },
  });

  const handleToggle = (permKey: keyof typeof permissionsState, roleKey: 'admin' | 'owner' | 'customer') => {
    if (roleKey === 'admin') return; // Admins keep full control

    setPermissionsState((prev) => ({
      ...prev,
      [permKey]: {
        ...prev[permKey],
        [roleKey]: !prev[permKey][roleKey],
      },
    }));
  };

  const handleSavePermissions = () => {
    addToast({
      type: 'success',
      title: 'Security Matrix Updated',
      message: 'Role-Based Access Control (RBAC) rules published to gateway.',
    });
  };

  const permissionRows = [
    { key: 'manage_restaurants', name: 'Directory & Listing Governance', category: 'Listings' },
    { key: 'approve_claims', name: 'Approve / Reject Restaurant Claims', category: 'Verification' },
    { key: 'approve_changes', name: 'Approve Profile Modifications', category: 'Verification' },
    { key: 'edit_menu', name: 'Edit Menus & Operating Hours', category: 'Merchant' },
    { key: 'view_orders', name: 'View Live Orders & Receipts', category: 'Operations' },
    { key: 'manage_users', name: 'User & Owner Account Governance', category: 'Security' },
    { key: 'view_analytics', name: 'Executive Revenue & Traffic Analytics', category: 'Reporting' },
    { key: 'export_reports', name: 'Generate & Export CSV/PDF Audits', category: 'Reporting' },
    { key: 'system_settings', name: 'Configure Platform API Keys & Branding', category: 'System' },
    { key: 'submit_reviews', name: 'Post Customer Reviews & Ratings', category: 'Public' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Roles & Access Control Matrix (RBAC)</h1>
          </div>
          <p className="text-xs text-slate-300">
            Configure permission boundaries, API route scopes, and dashboard feature authorization for each platform role.
          </p>
        </div>

        <button
          onClick={handleSavePermissions}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Security Policy</span>
        </button>
      </div>

      {/* Role Overview Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-indigo-400 uppercase">Super Administrator</span>
            <Shield className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xs text-slate-300">
            Unrestricted access to system configuration, claim approvals, database mutations, and billing records.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-emerald-400 uppercase">Restaurant Owner</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xs text-slate-300">
            Scoped access to manage assigned restaurant profile, menus, live order ticket queue, and customer reviews.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-blue-400 uppercase">Customer / Guest</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xs text-slate-300">
            Read-only access to restaurant profiles, order placement capability, and customer review submissions.
          </p>
        </div>
      </div>

      {/* Interactive Permission Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-4 px-5">Permission Scope</th>
                <th className="py-4 px-5 text-center">Super Admin</th>
                <th className="py-4 px-5 text-center">Restaurant Owner</th>
                <th className="py-4 px-5 text-center">Customer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {permissionRows.map((perm) => {
                const state = permissionsState[perm.key as keyof typeof permissionsState];

                return (
                  <tr key={perm.key} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-5">
                      <span className="font-bold text-white block">{perm.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold block">
                        Category: {perm.category}
                      </span>
                    </td>

                    {/* Admin */}
                    <td className="py-4 px-5 text-center">
                      <div className="inline-flex p-1.5 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400">
                        <Check className="w-4 h-4" />
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => handleToggle(perm.key as any, 'owner')}
                        className={`inline-flex p-1.5 rounded-lg border transition ${
                          state.owner
                            ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                            : 'bg-slate-800 border-slate-700 text-slate-500'
                        }`}
                      >
                        {state.owner ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => handleToggle(perm.key as any, 'customer')}
                        className={`inline-flex p-1.5 rounded-lg border transition ${
                          state.customer
                            ? 'bg-blue-950 border-blue-800 text-blue-400'
                            : 'bg-slate-800 border-slate-700 text-slate-500'
                        }`}
                      >
                        {state.customer ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
