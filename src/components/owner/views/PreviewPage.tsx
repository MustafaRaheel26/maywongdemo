import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Eye,
  Monitor,
  Smartphone,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Utensils,
  Share2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Heart,
} from 'lucide-react';

export const PreviewPage: React.FC = () => {
  const { activeRestaurant, addToast } = useApp();
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'photos' | 'reviews'>('overview');

  const handleSharePreview = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast({
      type: 'success',
      title: 'Preview URL Copied',
      message: 'Shareable preview link copied to clipboard.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Viewport Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Eye className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Customer Live Listing Preview
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                Public Mode
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              This is how guests view {activeRestaurant.name} on the discovery platform.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Device Toggle */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                deviceView === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop View</span>
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                deviceView === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          <button
            onClick={handleSharePreview}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Copy Preview Link</span>
          </button>
        </div>
      </div>

      {/* Interactive Mock Frame */}
      <div
        className={`mx-auto transition-all duration-300 ${
          deviceView === 'mobile' ? 'max-w-md shadow-2xl border-8 border-slate-800 rounded-3xl overflow-hidden' : 'w-full'
        }`}
      >
        <div className="bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          {/* Hero Cover Banner */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={activeRestaurant.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-800/60 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Restaurant
              </span>
              <button className="p-2 bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-rose-400 rounded-full border border-slate-700 transition">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Logo + Basic Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end gap-4">
              <img
                src={activeRestaurant.logoUrl}
                alt="Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white shadow-2xl object-cover shrink-0"
              />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">{activeRestaurant.name}</h1>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded-full">
                    {activeRestaurant.priceRange}
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center gap-2">
                  <span>{activeRestaurant.cuisine}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{activeRestaurant.city}, {activeRestaurant.state}</span>
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center text-amber-400 font-bold gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{activeRestaurant.rating}</span>
                  </div>
                  <span className="text-slate-400">({activeRestaurant.reviewCount} customer reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900/80 px-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Overview & Story
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'menu'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Menu ({activeRestaurant.menu.length})
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'photos'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Gallery ({activeRestaurant.photos.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Main Details */}
                <div className="md:col-span-8 space-y-6">
                  {/* Bio */}
                  <div className="space-y-2">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">About the Restaurant</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeRestaurant.description}</p>
                  </div>

                  {/* Story */}
                  {activeRestaurant.story && (
                    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Chef Heritage & Vision
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed italic">"{activeRestaurant.story}"</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeRestaurant.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 bg-slate-800 text-slate-200 rounded-lg border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  {activeRestaurant.amenities && (
                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services & Features</h3>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        {activeRestaurant.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar Quick Book Box */}
                <div className="md:col-span-4 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      Reservations & Orders
                    </h3>

                    <a
                      href={activeRestaurant.reservationUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg transition"
                    >
                      <span>Book Table Online</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{activeRestaurant.address}, {activeRestaurant.city}, {activeRestaurant.state} {activeRestaurant.zipCode}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{activeRestaurant.phone}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="truncate">{activeRestaurant.website}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Signature Menu Dishes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeRestaurant.menu.map((item) => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-white">{item.name}</h3>
                          {item.isVegetarian && <span className="text-[10px] text-emerald-400 bg-emerald-950 border border-emerald-800 px-1.5 rounded">Veg</span>}
                          {item.isGlutenFree && <span className="text-[10px] text-amber-400 bg-amber-950 border border-amber-800 px-1.5 rounded">GF</span>}
                        </div>
                        <p className="text-[11px] text-slate-400">{item.description}</p>
                      </div>
                      <span className="text-sm font-extrabold text-blue-400">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activeRestaurant.photos.map((p) => (
                    <div key={p.id} className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 group">
                      <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex items-end">
                        <span className="text-[10px] font-semibold text-white">{p.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
