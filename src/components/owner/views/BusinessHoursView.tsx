import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { BusinessHours } from '../../../types';
import { Clock, Save, CheckCircle2, XCircle } from 'lucide-react';

export const BusinessHoursView: React.FC = () => {
  const { activeRestaurant, updateBusinessHours } = useApp();
  const [hours, setHours] = useState<BusinessHours[]>(activeRestaurant?.businessHours || []);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activeRestaurant) {
      setHours(activeRestaurant.businessHours);
    }
  }, [activeRestaurant]);

  if (!activeRestaurant) return null;

  const handleToggleOpen = (day: string) => {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, isOpen: !h.isOpen } : h))
    );
  };

  const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', val: string) => {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, [field]: val } : h))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateBusinessHours(activeRestaurant.id, hours);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Business Hours & Opening Schedule
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure weekly operating times displayed on customer discovery listing.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all shrink-0"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving Schedule...' : 'Save Operating Hours'}
        </button>
      </div>

      {/* Days Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {hours.map((h) => (
            <div
              key={h.day}
              className="py-3.5 flex items-center justify-between gap-4 flex-wrap text-xs"
            >
              <div className="flex items-center gap-3 w-36 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleOpen(h.day)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    h.isOpen ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
                <span className="font-bold text-slate-900 dark:text-slate-100">{h.day}</span>
              </div>

              {h.isOpen ? (
                <div className="flex items-center gap-2 flex-1 max-w-xs">
                  <input
                    type="time"
                    value={h.openTime}
                    onChange={(e) => handleTimeChange(h.day, 'openTime', e.target.value)}
                    className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center font-semibold text-slate-800 dark:text-slate-200"
                  />
                  <span className="text-slate-400 font-bold">to</span>
                  <input
                    type="time"
                    value={h.closeTime}
                    onChange={(e) => handleTimeChange(h.day, 'closeTime', e.target.value)}
                    className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center font-semibold text-slate-800 dark:text-slate-200"
                  />
                </div>
              ) : (
                <div className="flex-1 text-slate-400 italic font-semibold">
                  Closed All Day
                </div>
              )}

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 ${
                  h.isOpen
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                }`}
              >
                {h.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
