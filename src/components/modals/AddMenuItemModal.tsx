import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { Modal } from '../common/Modal';
import { Plus, Utensils } from 'lucide-react';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editItem?: MenuItem | null;
}

export const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  isOpen,
  onClose,
  editItem,
}) => {
  const { activeRestaurant, addMenuItem, updateMenuItem } = useApp();

  const [name, setName] = useState(editItem?.name || '');
  const [category, setCategory] = useState(editItem?.category || 'Antipasti');
  const [price, setPrice] = useState(editItem?.price || 24);
  const [description, setDescription] = useState(editItem?.description || '');
  const [isAvailable, setIsAvailable] = useState(editItem?.isAvailable ?? true);
  const [isVegetarian, setIsVegetarian] = useState(editItem?.isVegetarian ?? false);
  const [isGlutenFree, setIsGlutenFree] = useState(editItem?.isGlutenFree ?? false);
  const [isSpicy, setIsSpicy] = useState(editItem?.isSpicy ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRestaurant) return;

    if (editItem) {
      updateMenuItem(activeRestaurant.id, editItem.id, {
        name,
        category,
        price: Number(price),
        description,
        isAvailable,
        isVegetarian,
        isGlutenFree,
        isSpicy,
      });
    } else {
      addMenuItem(activeRestaurant.id, {
        name,
        category,
        price: Number(price),
        description,
        isAvailable,
        isVegetarian,
        isGlutenFree,
        isSpicy,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editItem ? 'Edit Menu Dish' : 'Add New Menu Item'}
      subtitle={`Updating menu for ${activeRestaurant?.name}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Dish Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Truffle Tagliolini al Burro"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Antipasti, Primi, Secondi, Dolci"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Price ($ USD)
            </label>
            <input
              type="number"
              step="0.5"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Description & Ingredients
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of ingredients, preparation, and flavor notes..."
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dietary Tags */}
        <div className="space-y-2 pt-1">
          <span className="block font-semibold text-slate-700 dark:text-slate-300">
            Dietary & Availability Attributes
          </span>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Active / In Stock</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Vegetarian</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isGlutenFree}
                onChange={(e) => setIsGlutenFree(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Gluten-Free</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isSpicy}
                onChange={(e) => setIsSpicy(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Spicy</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
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
            className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20"
          >
            <Utensils className="w-3.5 h-3.5" />
            {editItem ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
