import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatsCard } from '../../common/StatsCard';
import { PLATFORM_STATS, REVENUE_MONTHLY_DATA, INITIAL_AUDIT_LOGS } from '../../../data/mockData';
import { RestaurantClaim } from '../../../types';
import {
  ShieldAlert,
  Building2,
  FileCheck2,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  Activity,
  ShoppingBag,
  FileEdit,
  Plus,
  FileSpreadsheet,
  Zap,
  UserCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface AdminOverviewProps {
  onSelectClaim: (claim: RestaurantClaim) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onSelectClaim }) => {
  const { claims, pendingChanges, restaurants, users, orders, setAdminTab, addToast } = useApp();

  const pendingClaims = claims.filter((c) => c.status === 'pending');
  const activeRestaurantsCount = restaurants.filter((r) => r.isVerified).length;
  const inactiveRestaurantsCount = restaurants.length - activeRestaurantsCount;
  const pendingUpdatesCount = pendingChanges.filter((p) => p.status === 'submitted' || p.status === 'under_review').length;
  const ownerUsersCount = users.filter((u) => u.role === 'owner').length;
  const totalOrdersCount = orders.length;

  const handleQuickExport = () => {
    addToast({
      type: 'success',
      title: 'Platform Report Generated',
      message: 'Executive platform metrics CSV exported successfully.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold uppercase tracking-wider">
              Super Admin Command Center
            </span>
            <span className="text-slate-400 text-xs">• ResPulse SaaS v2.4</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            Platform Executive Governance
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Real-time monitoring for restaurant claims, profile changes, platform orders, user permissions, and growth metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setAdminTab('claims')}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Claims ({pendingClaims.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('changes')}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            <FileEdit className="w-4 h-4" />
            <span>Updates ({pendingUpdatesCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Restaurants"
          value={restaurants.length}
          change={`${activeRestaurantsCount} Active • ${inactiveRestaurantsCount} Unverified`}
          isPositive={true}
          subtext="Listed in SaaS directory"
          icon={Building2}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatsCard
          title="Pending Verification Claims"
          value={pendingClaims.length}
          change={pendingClaims.length > 0 ? 'Requires Action' : 'All Clear'}
          isPositive={pendingClaims.length === 0}
          subtext="Awaiting admin approval"
          icon={FileCheck2}
          iconBgColor="bg-amber-50 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatsCard
          title="Pending Profile Updates"
          value={pendingUpdatesCount}
          change="Audit Queue"
          isPositive={false}
          subtext="Owner edit requests"
          icon={FileEdit}
          iconBgColor="bg-rose-50 dark:bg-rose-950/50"
          iconColor="text-rose-600 dark:text-rose-400"
        />
        <StatsCard
          title="Platform Restaurant Owners"
          value={ownerUsersCount}
          change="+18% this month"
          isPositive={true}
          subtext="Verified owner accounts"
          icon={UserCheck}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
      </div>

      {/* KPI Cards Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Platform MRR Revenue"
          value={`$${PLATFORM_STATS.platformRevenueMRR.toLocaleString()}`}
          change={PLATFORM_STATS.growthRate}
          isPositive={true}
          subtext="Subscription revenue run-rate"
          icon={DollarSign}
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/50"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatsCard
          title="Total Platform Orders"
          value={totalOrdersCount}
          change="+24% vs last week"
          isPositive={true}
          subtext="Dine-in, pickup, delivery"
          icon={ShoppingBag}
          iconBgColor="bg-sky-50 dark:bg-sky-950/50"
          iconColor="text-sky-600 dark:text-sky-400"
        />
        <StatsCard
          title="Total System Users"
          value={users.length}
          change="Admins, Owners, Guests"
          isPositive={true}
          subtext="Active accounts"
          icon={Users}
          iconBgColor="bg-purple-50 dark:bg-purple-950/50"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Quick Action Shortcuts Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Administrative Actions:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAdminTab('users')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" /> Add User
          </button>
          <button
            onClick={() => setAdminTab('restaurants')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Manage Directory
          </button>
          <button
            onClick={handleQuickExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" /> Export Platform CSV
          </button>
        </div>
      </div>

      {/* Growth Chart & Priority Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Monthly Platform Claims & Revenue Growth
              </h3>
              <p className="text-xs text-slate-400">Claims verification volume vs recurring subscription MRR</p>
            </div>
            <span className="text-[10px] font-extrabold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2.5 py-1 rounded-full">
              2026 Financial Year
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_MONTHLY_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    borderColor: '#334155',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Claims Queue Spotlight */}
        <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl text-white space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                Pending Verification Queue
              </h3>
              <button
                onClick={() => setAdminTab('claims')}
                className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
              >
                View All ({claims.length}) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {claims.slice(0, 3).map((claim) => (
                <div
                  key={claim.id}
                  onClick={() => onSelectClaim(claim)}
                  className="p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs text-white truncate">
                      {claim.restaurantName}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 uppercase">
                      {claim.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    Claimant: <strong>{claim.claimantName}</strong> ({claim.claimantRole})
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-700/60">
                    <span>{claim.submittedAt}</span>
                    <span className="text-indigo-400 font-bold group-hover:underline flex items-center gap-0.5">
                      Inspect Details <Eye className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setAdminTab('claims')}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition"
          >
            Process Pending Claims
          </button>
        </div>
      </div>

      {/* Bottom Row: Recent Users & Audit Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Registered Users */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Recent Platform Users
            </h3>
            <button
              onClick={() => setAdminTab('users')}
              className="text-xs font-bold text-indigo-400 hover:underline"
            >
              Manage Users →
            </button>
          </div>

          <div className="space-y-3">
            {users.slice(0, 4).map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">{u.name}</span>
                  <span className="text-slate-400 text-[11px] block">{u.email}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-950 text-blue-400 border border-blue-800 block">
                    {u.role}
                  </span>
                  <span className="text-[10px] text-slate-500 block pt-0.5">{u.lastLogin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live System Audit Feed */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                Live Audit & Compliance Trail
              </h3>
            </div>
            <button
              onClick={() => setAdminTab('logs')}
              className="text-xs font-bold text-indigo-400 hover:underline"
            >
              Full System Logs →
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {INITIAL_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-white">{log.action}</span>
                  <p className="text-slate-400 text-[11px]">{log.details}</p>
                </div>

                <div className="text-right shrink-0 text-[11px] text-slate-400">
                  <span className="block font-semibold text-slate-200">
                    {log.actorName} ({log.actorRole})
                  </span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
