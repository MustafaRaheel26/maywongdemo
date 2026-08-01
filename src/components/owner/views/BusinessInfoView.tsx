import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Building2, Save, MapPin, Phone, Mail, Globe, Tag, DollarSign, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const BusinessInfoView: React.FC = () => {
  const { activeRestaurant, updateRestaurant } = useApp();

  const [name, setName] = useState(activeRestaurant?.name || '');
  const [cuisine, setCuisine] = useState(activeRestaurant?.cuisine || '');
  const [address, setAddress] = useState(activeRestaurant?.address || '');
  const [city, setCity] = useState(activeRestaurant?.city || '');
  const [state, setState] = useState(activeRestaurant?.state || '');
  const [zipCode, setZipCode] = useState(activeRestaurant?.zipCode || '');
  const [phone, setPhone] = useState(activeRestaurant?.phone || '');
  const [email, setEmail] = useState(activeRestaurant?.email || '');
  const [website, setWebsite] = useState(activeRestaurant?.website || '');
  const [priceRange, setPriceRange] = useState(activeRestaurant?.priceRange || '$$$');
  const [description, setDescription] = useState(activeRestaurant?.description || '');
  const [tagsInput, setTagsInput] = useState(activeRestaurant?.tags.join(', ') || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activeRestaurant) {
      setName(activeRestaurant.name);
      setCuisine(activeRestaurant.cuisine);
      setAddress(activeRestaurant.address);
      setCity(activeRestaurant.city);
      setState(activeRestaurant.state);
      setZipCode(activeRestaurant.zipCode);
      setPhone(activeRestaurant.phone);
      setEmail(activeRestaurant.email);
      setWebsite(activeRestaurant.website);
      setPriceRange(activeRestaurant.priceRange);
      setDescription(activeRestaurant.description);
      setTagsInput(activeRestaurant.tags.join(', '));
    }
  }, [activeRestaurant]);

  if (!activeRestaurant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateRestaurant(activeRestaurant.id, {
        name,
        cuisine,
        address,
        city,
        state,
        zipCode,
        phone,
        email,
        website,
        priceRange: priceRange as any,
        description,
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setIsSaving(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Restaurant Profile & Business Information
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update contact info, address, description, and search tags visible on the platform.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all shrink-0 disabled:opacity-50"
        >
          {isSaving ? (
            <span className="inline-block animate-spin">⏳</span>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving Changes...' : 'Save Profile Updates'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Core Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Restaurant Official Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Cuisine Specialty
              </label>
              <input
                type="text"
                required
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Price Point Indicator
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                <option value="$$">$$ — Moderate ($15-$30)</option>
                <option value="$$$">$$$ — Upscale ($30-$60)</option>
                <option value="$$$$">$$$$ — Fine Dining ($60+)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Search & Feature Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Outdoor Dining, Wine Bar, Waterfront"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Public Bio & Description
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-600" />
            Location & Contact Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Street Address & Suite Number
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Public Inquiry Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Official Website URL
              </label>
              <input
                type="url"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
