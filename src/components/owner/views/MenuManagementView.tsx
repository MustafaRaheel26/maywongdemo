import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { MenuItem } from '../../../types';
import { Utensils, Plus, Edit2, Trash2, CheckCircle2, XCircle, Flame, Leaf } from 'lucide-react';

interface MenuManagementViewProps {
  onOpenAddDish: (editItem?: MenuItem | null) => void;
}

export const MenuManagementView: React.FC<MenuManagementViewProps> = ({ onOpenAddDish }) => {
  const { activeRestaurant, updateMenuItem, deleteMenuItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!activeRestaurant) return null;

  const categories = ['all', ...Array.from(new Set(activeRestaurant.menu.map((m) => m.category)))];

  const filteredItems = activeRestaurant.menu.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-blue-600" />
            Menu & Culinary Items
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage dishes, prices, descriptions, and dietary attributes for {activeRestaurant.name}.
          </p>
        </div>

        <button
          onClick={() => onOpenAddDish(null)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Dish
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700/60'
            }`}
          >
            {cat} {cat === 'all' ? `(${activeRestaurant.menu.length})` : ''}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-2xs hover:shadow-md transition-all space-y-3 ${
              item.isAvailable
                ? 'border-slate-200/80 dark:border-slate-800'
                : 'border-slate-200/40 dark:border-slate-800/40 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                    {item.category}
                  </span>
                  {item.isVegetarian && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <Leaf className="w-2.5 h-2.5" /> Veg
                    </span>
                  )}
                  {item.isGlutenFree && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 text-[10px] font-bold">
                      GF
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400 text-[10px] font-bold flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5" /> Spicy
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {item.name}
                </h3>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 block">
                  ${item.price.toFixed(2)}
                </span>
                <span
                  onClick={() =>
                    updateMenuItem(activeRestaurant.id, item.id, {
                      isAvailable: !item.isAvailable,
                    })
                  }
                  className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    item.isAvailable
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {item.isAvailable ? 'In Stock ✓' : 'Sold Out ✕'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => onOpenAddDish(item)}
                className="flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-semibold transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Dish
              </button>
              <button
                onClick={() => deleteMenuItem(activeRestaurant.id, item.id)}
                className="flex items-center gap-1 px-3 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
