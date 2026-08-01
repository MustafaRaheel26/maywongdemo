import React from 'react';
import { useApp } from '../../../context/AppContext';
import { StatsCard } from '../../common/StatsCard';
import { REVENUE_MONTHLY_DATA, INITIAL_REVIEWS } from '../../../data/mockData';
import {
  DollarSign,
  Users,
  ShoppingBag,
  Star,
  FileCheck2,
  Building2,
  Sparkles,
  ArrowRight,
  Plus,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface OwnerOverviewProps {
  onOpenSubmitClaim: () => void;
  onOpenUploadPhoto: () => void;
  onOpenAddDish: () => void;
}

export const OwnerOverview: React.FC<OwnerOverviewProps> = ({
  onOpenSubmitClaim,
  onOpenUploadPhoto,
  onOpenAddDish,
}) => {
  const { activeRestaurant, setOwnerTab } = useApp();

  if (!activeRestaurant) return null;

  return (
    <div className="space-y-6">
      {/* Verification Status Banner if not approved */}
      {activeRestaurant.claimStatus !== 'approved' && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Claim Verification Pending for {activeRestaurant.name}
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Your listing claim status is currently{' '}
                <strong className="underline capitalize">
                  {activeRestaurant.claimStatus.replace('_', ' ')}
                </strong>
                . Submit verification documents to unlock full platform features.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSubmitClaim}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            Submit Claim Documents →
          </button>
        </div>
      )}

      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={activeRestaurant.logoUrl}
              alt={activeRestaurant.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold">
                  {activeRestaurant.cuisine}
                </span>
                <span className="text-slate-400 text-xs">• {activeRestaurant.city}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {activeRestaurant.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl line-clamp-2">
                {activeRestaurant.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddDish}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-xl transition-all border border-white/10"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Dish
            </button>
            <button
              onClick={onOpenUploadPhoto}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Upload Photos
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Monthly Revenue"
          value={`$${activeRestaurant.monthlyRevenue.toLocaleString()}`}
          change="+14.2%"
          isPositive={true}
          subtext="vs $130k previous month"
          icon={DollarSign}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatsCard
          title="Monthly Visitors"
          value={activeRestaurant.monthlyVisitors.toLocaleString()}
          change="+8.4%"
          isPositive={true}
          subtext="Listing profile pageviews"
          icon={Users}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatsCard
          title="Total Orders"
          value={activeRestaurant.monthlyOrders.toLocaleString()}
          change="+11.0%"
          isPositive={true}
          subtext="Dine-in & online reservations"
          icon={ShoppingBag}
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/50"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatsCard
          title="Customer Rating"
          value={`${activeRestaurant.rating} ★`}
          change="+0.2"
          isPositive={true}
          subtext={`${activeRestaurant.reviewCount} total reviews`}
          icon={Star}
          iconBgColor="bg-amber-50 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Analytics Chart & Quick Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Revenue & Traffic Growth Trends
              </h3>
              <p className="text-xs text-slate-500">Historical performance trajectory</p>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
              YTD 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_MONTHLY_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${val.toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    borderColor: '#334155',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              Owner Workspace Actions
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Quick shortcuts to configure your profile listing.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setOwnerTab('info')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Update Profile & Location
                    </span>
                    <span className="text-[10px] text-slate-500">Address, phone, description</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </button>

              <button
                onClick={() => setOwnerTab('photos')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Manage Photo Gallery
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {activeRestaurant.photos.length} uploaded photos
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </button>

              <button
                onClick={() => setOwnerTab('menu')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Curate Menu Items
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {activeRestaurant.menu.length} active dishes
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Last listing sync: 2 hours ago
          </div>
        </div>
      </div>

      {/* Customer Reviews Spotlight */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Recent Customer Reviews
            </h3>
            <p className="text-xs text-slate-500">Feedback left on your restaurant listing</p>
          </div>
          <button
            onClick={() => setOwnerTab('reviews')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            View All Reviews →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {rev.author}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <span>{'★'.repeat(rev.rating)}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({rev.date})</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
              {rev.response && (
                <div className="mt-2 p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border-l-2 border-blue-600 text-[11px] text-slate-700 dark:text-slate-300">
                  <strong className="block text-blue-600 dark:text-blue-400">Owner Response:</strong>
                  {rev.response}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
