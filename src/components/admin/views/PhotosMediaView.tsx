import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PhotoItem } from '../../../types';
import {
  Image as ImageIcon,
  Search,
  Upload,
  Trash2,
  Eye,
  HardDrive,
  Building2,
  CheckCircle2,
  X,
  Plus,
  Sparkles,
} from 'lucide-react';

export const PhotosMediaView: React.FC = () => {
  const { restaurants, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; title: string; restaurantName: string } | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  // Collect photos from all restaurants
  const allMediaItems = restaurants.flatMap((r) =>
    r.photos.map((p) => ({
      ...p,
      restaurantId: r.id,
      restaurantName: r.name,
    }))
  );

  const filteredMedia = allMediaItems.filter((m) => {
    const matchesSearch =
      m.caption.toLowerCase().includes(search.toLowerCase()) ||
      m.restaurantName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadUrl) return;

    addToast({
      type: 'success',
      title: 'Media Asset Uploaded',
      message: `"${uploadTitle}" added to platform media storage.`,
    });

    setIsUploadOpen(false);
    setUploadTitle('');
    setUploadUrl('');
  };

  const handleDeleteMedia = (title: string) => {
    addToast({
      type: 'info',
      title: 'Media Deleted',
      message: `Media file "${title}" removed from storage bucket.`,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Platform Media & Asset Storage</h1>
          </div>
          <p className="text-xs text-slate-300">
            Manage high-res food photography, venue covers, logos, and CDN image assets across restaurants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Platform Asset</span>
          </button>
        </div>
      </div>

      {/* Storage KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-3 bg-blue-950 text-blue-400 rounded-xl border border-blue-800">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">CDN Storage Usage</span>
            <span className="text-base font-black text-white">18.4 GB / 100 GB</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Media Files</span>
            <span className="text-base font-black text-white">{allMediaItems.length} Assets</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl border border-indigo-800">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Venues With Media</span>
            <span className="text-base font-black text-white">{restaurants.length} Restaurants</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photo caption or venue..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'interior', 'food', 'exterior', 'menu'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            No media assets found matching filter.
          </div>
        ) : (
          filteredMedia.map((photo, idx) => (
            <div
              key={photo.id + idx}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition space-y-2 p-2"
            >
              <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setPreviewPhoto({
                        url: photo.url,
                        title: photo.caption,
                        restaurantName: photo.restaurantName,
                      })
                    }
                    className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-500 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(photo.caption)}
                    className="p-2 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="px-1 space-y-0.5">
                <span className="font-bold text-xs text-white block truncate">{photo.caption}</span>
                <span className="text-[10px] text-slate-400 block truncate">{photo.restaurantName}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Fullscreen Preview */}
      {previewPhoto && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 relative shadow-2xl">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={previewPhoto.url}
              alt={previewPhoto.title}
              className="w-full max-h-[70vh] object-contain rounded-xl border border-slate-800"
            />

            <div className="space-y-1">
              <h3 className="font-bold text-sm text-white">{previewPhoto.title}</h3>
              <p className="text-xs text-indigo-400">{previewPhoto.restaurantName}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Asset Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-400" />
              Upload New Platform Media Asset
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Caption / Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Signature Artisan Pizza"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Upload Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
