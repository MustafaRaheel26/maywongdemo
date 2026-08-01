import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Users, UserPlus, Search, Shield, Building2, CheckCircle2, AlertOctagon } from 'lucide-react';

interface UserManagementViewProps {
  onOpenAddUser: () => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ onOpenAddUser }) => {
  const { users, updateUserStatus } = useApp();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            User Accounts & Permission Roles
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage platform access for restaurant owners, general managers, and administrators.
          </p>
        </div>

        <button
          onClick={onOpenAddUser}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Invite User Account
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'owner', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                roleFilter === r
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {r === 'all' ? 'All Roles' : r === 'owner' ? 'Restaurant Owners' : 'Super Admins'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200/80 dark:border-slate-800">
                <th className="p-4">User Identity</th>
                <th className="p-4">Role Access</th>
                <th className="p-4">Assigned Listing</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                      />
                      <div>
                        <strong className="block text-slate-900 dark:text-slate-100 text-xs font-bold">
                          {u.name}
                        </strong>
                        <span className="text-[11px] text-slate-500">{u.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {u.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 px-2.5 py-1 rounded-md text-[10px]">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 px-2.5 py-1 rounded-md text-[10px]">
                        <Building2 className="w-3 h-3" /> Owner
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
                    {u.restaurantName || '— Platform Scope —'}
                  </td>

                  <td className="p-4 text-slate-500">{u.joinedDate}</td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold capitalize ${
                        u.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : u.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-1">
                    {u.status === 'active' ? (
                      <button
                        onClick={() => updateUserStatus(u.id, 'suspended')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserStatus(u.id, 'active')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                      >
                        Activate
                      </button>
                    )}
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
