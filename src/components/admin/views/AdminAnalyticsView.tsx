import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Download,
  Calendar,
  Filter,
  PieChart as PieChartIcon,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { REVENUE_MONTHLY_DATA } from '../../../data/mockData';

export const AdminAnalyticsView: React.FC = () => {
  const { restaurants, orders, users, addToast } = useApp();
  const [timeRange, setTimeRange] = useState('YTD');

  const cuisineDistribution = [
    { name: 'Italian', value: 35, color: '#6366f1' },
    { name: 'Japanese', value: 25, color: '#3b82f6' },
    { name: 'Mexican', value: 20, color: '#10b981' },
    { name: 'American', value: 20, color: '#f59e0b' },
  ];

  const handleExportAnalytics = () => {
    addToast({
      type: 'success',
      title: 'Analytics Export Dispatched',
      message: 'Full SaaS platform performance metrics CSV generated.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Executive Platform Analytics</h1>
          </div>
          <p className="text-xs text-slate-300">
            Deep intelligence on SaaS recurring subscription growth, GMV, category trends, and user conversion metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1">
            {['7D', '30D', 'YTD', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  timeRange === range ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Subscription MRR</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">$42,850</p>
          <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +14.2% month-over-month
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Network Venues</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">{restaurants.length}</p>
          <p className="text-[11px] text-blue-400 font-bold">+6 new onboardings this week</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Merchandise Value</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white">$128,400</p>
          <p className="text-[11px] text-indigo-400 font-bold">+28% quarterly growth</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">User Retention Rate</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">98.4%</p>
          <p className="text-[11px] text-emerald-400 font-bold">Industry leading retention</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Monthly SaaS Platform Revenue & Claims Submissions
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
              {timeRange} Period
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_MONTHLY_DATA}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#areaColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cuisine Category Breakdown Donut */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold border-b border-slate-800 pb-3 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-emerald-400" />
              Cuisine Category Market Share
            </h3>

            <div className="h-48 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cuisineDistribution}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cuisineDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            {cuisineDistribution.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </div>
                <span className="font-bold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Restaurants Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl">
        <h3 className="text-sm font-bold border-b border-slate-800 pb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          Top Performing Network Venues
        </h3>

        <div className="divide-y divide-slate-800 text-xs">
          {restaurants.map((rest, i) => (
            <div key={rest.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-slate-500 w-4">#{i + 1}</span>
                <img src={rest.logoUrl || rest.coverUrl} className="w-8 h-8 rounded-lg object-cover border border-slate-700" alt="" />
                <div>
                  <span className="font-bold text-white block">{rest.name}</span>
                  <span className="text-slate-400 text-[11px] block">{rest.cuisine} • {rest.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="font-extrabold text-emerald-400 block">${(rest.reviewCount * 142.5).toFixed(0)}</span>
                  <span className="text-slate-500 text-[10px] block">Est GMV</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white block">★ {rest.rating}</span>
                  <span className="text-slate-500 text-[10px] block">{rest.reviewCount} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
