import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtext,
  icon: Icon,
  iconBgColor = 'bg-blue-50 dark:bg-blue-950/50',
  iconColor = 'text-blue-600 dark:text-blue-400',
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBgColor} ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/60'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>
      )}
    </div>
  );
};
