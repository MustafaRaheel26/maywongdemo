import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Store,
  Sparkles,
  Tag,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  ExternalLink,
  DollarSign,
  Info,
  Save,
  RotateCcw,
  Check,
} from 'lucide-react';

const COMMON_AMENITIES = [
  'Outdoor Heated Patio',
  'Full Cocktail & Wine Bar',
  'Valet Parking Available',
  'Wheelchair Accessible',
  'Private Dining Room',
  'Wi-Fi Access',
  'Sommelier Service',
  'Dog Friendly Patio',
  'Live Music / Jazz',
  'Chef\'s Tasting Counter',
];

export const ProfileView: React.FC = () => {
  const { activeRestaurant, updateRestaurant, submitPendingChange, addToast } = useApp();

  const [name, setName] = useState(activeRestaurant.name || '');
  const [cuisine, setCuisine] = useState(activeRestaurant.cuisine || '');
  const [description, setDescription] = useState(activeRestaurant.description || '');
  const [story, setStory] = useState(
    activeRestaurant.story ||
      'Founded with a passion for local artisanal ingredients and traditional culinary craft.'
  );
  const [priceRange, setPriceRange] = useState<'$$' | '$$$' | '$$$$'>(
    activeRestaurant.priceRange || '$$$'
  );

  const [tags, setTags] = useState<string[]>(activeRestaurant.tags || []);
  const [newTagInput, setNewTagInput] = useState('');

  const [amenities, setAmenities] = useState<string[]>(
    activeRestaurant.amenities || COMMON_AMENITIES.slice(0, 5)
  );

  const [deliveryPlatforms, setDeliveryPlatforms] = useState(
    activeRestaurant.deliveryPlatforms || [
      { name: 'DoorDash', url: 'https://doordash.com', active: true },
      { name: 'Uber Eats', url: 'https://ubereats.com', active: true },
      { name: 'Grubhub', url: 'https://grubhub.com', active: false },
    ]
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const toggleDeliveryPlatform = (index: number) => {
    const updated = [...deliveryPlatforms];
    updated[index].active = !updated[index].active;
    setDeliveryPlatforms(updated);
  };

  const updateDeliveryUrl = (index: number, url: string) => {
    const updated = [...deliveryPlatforms];
    updated[index].url = url;
    setDeliveryPlatforms(updated);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateRestaurant(activeRestaurant.id, {
        name,
        cuisine,
        description,
        story,
        priceRange,
        tags,
        amenities,
        deliveryPlatforms,
      });

      // Submit proposal to pending changes audit log
      submitPendingChange(
        'Restaurant Branding & Story Update',
        activeRestaurant.description || 'Previous Description',
        description
      );

      setIsSaving(false);
    }, 400);
  };

  const handleReset = () => {
    setName(activeRestaurant.name || '');
    setCuisine(activeRestaurant.cuisine || '');
    setDescription(activeRestaurant.description || '');
    setStory(activeRestaurant.story || '');
    setPriceRange(activeRestaurant.priceRange || '$$$');
    setTags(activeRestaurant.tags || []);
    setAmenities(activeRestaurant.amenities || []);
    addToast({
      type: 'info',
      title: 'Form Reset',
      message: 'Reverted profile changes back to saved state.',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Store className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Restaurant Profile & Brand Story</h1>
          </div>
          <p className="text-xs text-slate-300">
            Define your culinary identity, concept tags, guest amenities, and online ordering channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
          >
            {isSaving ? (
              <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Core Identity Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Brand Identity & Concept
            </h2>
            <span className="text-xs text-slate-400">ID: {activeRestaurant.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Restaurant Public Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. La Sponda Bistro"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Cuisine Specialty
              </label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Modern Italian & Seafood"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Price Tier Indicator
              </label>
              <div className="flex items-center gap-2">
                {(['$$', '$$$', '$$$$'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPriceRange(tier)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${
                      priceRange === tier
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Add Specialty Tag
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="e.g. Waterfront, Michelin"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Current Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Active Tags:
            </span>
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold rounded-lg"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(t)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Short Description / Elevator Pitch
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief 1-2 sentence overview shown in directory cards..."
            />
          </div>

          {/* Full Story */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Chef & Heritage Story (Full Narrative)
            </label>
            <textarea
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              placeholder="Tell customers about the history, ingredients, chef philosophy, or interior vibe..."
            />
          </div>
        </div>

        {/* Guest Amenities Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Guest Amenities & Services
            </h2>
            <span className="text-xs text-slate-400">{amenities.length} selected</span>
          </div>

          <p className="text-xs text-slate-400">
            Select features to display on your public profile to attract guests searching for specific conveniences.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {COMMON_AMENITIES.map((item) => {
              const isSelected = amenities.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAmenity(item)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300 shadow-sm'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Online Delivery Channels */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              Third-Party Delivery Integrations
            </h2>
            <span className="text-xs text-slate-400">Configure direct links</span>
          </div>

          <div className="space-y-3">
            {deliveryPlatforms.map((platform, idx) => (
              <div
                key={platform.name}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3.5 bg-slate-800/60 border border-slate-700/70 rounded-xl"
              >
                <div className="flex items-center gap-3 w-48 shrink-0">
                  <input
                    type="checkbox"
                    checked={platform.active}
                    onChange={() => toggleDeliveryPlatform(idx)}
                    className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-white">{platform.name}</span>
                </div>

                <input
                  type="text"
                  value={platform.url}
                  onChange={(e) => updateDeliveryUrl(idx, e.target.value)}
                  disabled={!platform.active}
                  className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40"
                  placeholder={`https://${platform.name.toLowerCase().replace(/\s+/g, '')}.com/store/...`}
                />

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 ${
                    platform.active
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-800'
                      : 'text-slate-600 pointer-events-none'
                  }`}
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
