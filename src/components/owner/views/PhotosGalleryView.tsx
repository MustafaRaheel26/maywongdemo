import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface PhotosGalleryViewProps {
  onOpenUpload: () => void;
}

export const PhotosGalleryView: React.FC<PhotosGalleryViewProps> = ({ onOpenUpload }) => {
  const { activeRestaurant, deletePhotoFromRestaurant } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (!activeRestaurant) return null;

  const categories = ['all', 'cover', 'logo', 'food', 'interior', 'ambiance'];

  const photos = activeRestaurant.photos.filter((p) =>
    filterCategory === 'all' ? true : p.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            Photos & Gallery Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize high-resolution cover banners, logos, food items, and interior dining photos.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Upload New Image
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
              filterCategory === cat
                ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700/60'
            }`}
          >
            {cat} {cat === 'all' ? `(${activeRestaurant.photos.length})` : ''}
          </button>
        ))}
      </div>

      {/* Primary Assets Showcase (Cover Banner & Logo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cover Banner Preview */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
            <span>Primary Cover Banner</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active on Listing
            </span>
          </div>
          <div className="relative h-48 rounded-xl overflow-hidden group border border-slate-100 dark:border-slate-800">
            <img
              src={activeRestaurant.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-4 flex items-end">
              <span className="text-white text-xs font-semibold">
                High-Resolution Header Media
              </span>
            </div>
          </div>
        </div>

        {/* Logo Badge Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
            <span>Listing Brand Logo</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active Badge
            </span>
          </div>
          <div className="h-48 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center p-4 border border-slate-100 dark:border-slate-800">
            <img
              src={activeRestaurant.logoUrl}
              alt="Logo"
              className="w-24 h-24 rounded-2xl object-cover shadow-md ring-4 ring-white dark:ring-slate-700"
            />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-3">
              {activeRestaurant.name}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Uploaded Media Gallery ({photos.length})
        </h3>

        {photos.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              No photos found in this category.
            </p>
            <button
              onClick={onOpenUpload}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Upload First Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold capitalize">
                      {photo.category}
                    </span>
                    {photo.isPrimary && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold shadow-xs">
                        Primary
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deletePhotoFromRestaurant(activeRestaurant.id, photo.id)}
                    className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow-md"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 text-xs">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100 truncate">
                    {photo.caption}
                  </span>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                    <span>Uploaded: {photo.uploadedAt}</span>
                    <span>{photo.fileSize || '2.5 MB'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
