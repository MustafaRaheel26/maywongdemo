import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Upload, Image as ImageIcon, Check } from 'lucide-react';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ isOpen, onClose }) => {
  const { activeRestaurant, addPhotoToRestaurant } = useApp();

  const [category, setCategory] = useState<'cover' | 'logo' | 'interior' | 'food' | 'ambiance'>('food');
  const [caption, setCaption] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  );

  const sampleImages = [
    { label: 'Chef Pasta', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Patio Sunset', url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Wood-fired Fish', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dining Lounge', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRestaurant) return;

    addPhotoToRestaurant(activeRestaurant.id, {
      url: photoUrl,
      caption: caption || `${category.toUpperCase()} image`,
      category,
      isPrimary,
      fileSize: '2.8 MB',
    });

    setCaption('');
    setIsPrimary(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Photo to Gallery"
      subtitle={`Adding image to ${activeRestaurant?.name}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Category Selector */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Photo Classification Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="cover">Cover Banner Image</option>
            <option value="logo">Restaurant Logo Badge</option>
            <option value="food">Signature Dish / Food</option>
            <option value="interior">Interior & Seating</option>
            <option value="ambiance">Ambiance & Atmosphere</option>
          </select>
        </div>

        {/* Preset Sample Selectors */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Select High-Res Sample Image
          </label>
          <div className="grid grid-cols-2 gap-2">
            {sampleImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setPhotoUrl(img.url)}
                className={`p-2 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                  photoUrl === img.url
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <img src={img.url} alt={img.label} className="w-10 h-10 rounded-lg object-cover" />
                <span className="truncate text-[11px] text-slate-800 dark:text-slate-200">
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Image Caption & Description
          </label>
          <input
            type="text"
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="E.g. Main Dining Room with Waterfront Sunset Views"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Primary toggle */}
        <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={isPrimary}
            onChange={(e) => setIsPrimary(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="font-semibold block text-slate-800 dark:text-slate-200">
              Set as Primary Representative Photo
            </span>
            <span className="text-[10px] text-slate-400">
              Will appear first in discovery listings and search result previews.
            </span>
          </div>
        </label>

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
            <Upload className="w-3.5 h-3.5" />
            Upload Photo
          </button>
        </div>
      </form>
    </Modal>
  );
};
