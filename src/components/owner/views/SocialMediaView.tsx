import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Share2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Globe,
  Utensils,
  Calendar,
  MessageCircle,
  Copy,
  ExternalLink,
  Save,
  Check,
  Sparkles,
  Smartphone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const SocialMediaView: React.FC = () => {
  const { activeRestaurant, updateRestaurant, addToast } = useApp();

  const initialLinks = activeRestaurant.socialLinks || {
    instagram: 'https://instagram.com/laspondabistro',
    facebook: 'https://facebook.com/laspondabistro.sf',
    tiktok: 'https://tiktok.com/@laspondabistro',
    youtube: 'https://youtube.com/c/laspondabistro',
    linkedin: 'https://linkedin.com/company/laspondabistro',
    twitter: 'https://twitter.com/laspondabistro',
    whatsapp: '+14158923401',
    website: activeRestaurant.website || 'https://laspondabistro.com',
    reservationLink: activeRestaurant.reservationUrl || 'https://opentable.com/r/la-sponda-bistro',
    menuLink: activeRestaurant.menuUrl || 'https://laspondabistro.com/menu',
  };

  const [links, setLinks] = useState(initialLinks);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleLinkChange = (key: keyof typeof links, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopy = (key: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(key);
    addToast({
      type: 'info',
      title: 'Link Copied',
      message: 'URL copied to clipboard.',
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateRestaurant(activeRestaurant.id, {
        socialLinks: links,
        website: links.website || activeRestaurant.website,
        reservationUrl: links.reservationLink,
        menuUrl: links.menuLink,
      });

      setIsSaving(false);
    }, 400);
  };

  const isUrlValid = (url?: string) => {
    if (!url) return true;
    try {
      if (url.startsWith('+')) return true; // WhatsApp number
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const socialFields = [
    {
      key: 'website',
      label: 'Official Website',
      icon: Globe,
      placeholder: 'https://yourrestaurant.com',
      color: 'text-emerald-400',
    },
    {
      key: 'reservationLink',
      label: 'Direct Reservation Link (OpenTable / Resy)',
      icon: Calendar,
      placeholder: 'https://opentable.com/r/...',
      color: 'text-blue-400',
    },
    {
      key: 'menuLink',
      label: 'Digital Menu Link',
      icon: Utensils,
      placeholder: 'https://yourrestaurant.com/menu',
      color: 'text-amber-400',
    },
    {
      key: 'instagram',
      label: 'Instagram Profile',
      icon: Instagram,
      placeholder: 'https://instagram.com/yourhandle',
      color: 'text-pink-400',
    },
    {
      key: 'facebook',
      label: 'Facebook Page',
      icon: Facebook,
      placeholder: 'https://facebook.com/yourpage',
      color: 'text-blue-500',
    },
    {
      key: 'tiktok',
      label: 'TikTok Handle',
      icon: Share2,
      placeholder: 'https://tiktok.com/@yourhandle',
      color: 'text-rose-400',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp Business Number',
      icon: MessageCircle,
      placeholder: '+1 (415) 555-0199',
      color: 'text-emerald-500',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn Business Page',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/company/yourrestaurant',
      color: 'text-sky-400',
    },
    {
      key: 'twitter',
      label: 'Twitter / X Profile',
      icon: Twitter,
      placeholder: 'https://x.com/yourhandle',
      color: 'text-slate-300',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Share2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Social Media & Public Links</h1>
          </div>
          <p className="text-xs text-slate-300">
            Connect your social channels, online booking widgets, and digital menu links.
          </p>
        </div>

        <button
          onClick={handleSaveSocial}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
        >
          {isSaving ? (
            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Social Links</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Connected Link Hub
            </h2>
            <span className="text-xs text-slate-400">All channels active</span>
          </div>

          <div className="space-y-4">
            {socialFields.map((field) => {
              const Icon = field.icon;
              const val = (links as any)[field.key] || '';
              const valid = isUrlValid(val);

              return (
                <div key={field.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${field.color}`} />
                      <span>{field.label}</span>
                    </label>

                    {val && (
                      <span className="text-[10px] font-bold flex items-center gap-1">
                        {valid ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <AlertCircle className="w-3 h-3" /> Check format
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        handleLinkChange(field.key as keyof typeof links, e.target.value)
                      }
                      placeholder={field.placeholder}
                      className={`flex-1 bg-slate-800 border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 ${
                        valid ? 'border-slate-700 focus:ring-blue-500' : 'border-rose-500/70 focus:ring-rose-500'
                      }`}
                    />

                    {val && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCopy(field.key, val)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
                          title="Copy Link"
                        >
                          {copiedField === field.key ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <a
                          href={val.startsWith('http') ? val : `https://${val}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-xl transition border border-slate-700"
                          title="Open Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Social Hub Preview Card */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-400" />
                Live Link-in-Bio Preview
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-800">
                Live Mock
              </span>
            </div>

            {/* Smartphone Mockup */}
            <div className="bg-slate-950 border-4 border-slate-800 rounded-3xl p-4 shadow-2xl space-y-4 max-w-xs mx-auto">
              <div className="text-center space-y-2 pt-2">
                <img
                  src={activeRestaurant.logoUrl || activeRestaurant.coverUrl}
                  alt="Logo"
                  className="w-16 h-16 rounded-full mx-auto border-2 border-blue-500 shadow-md object-cover"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-white">{activeRestaurant.name}</h3>
                  <p className="text-[11px] text-slate-400">{activeRestaurant.cuisine}</p>
                </div>
              </div>

              {/* Quick Action Pills in Preview */}
              <div className="space-y-2 pt-2">
                {links.reservationLink && (
                  <a
                    href={links.reservationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Book Table
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}

                {links.menuLink && (
                  <a
                    href={links.menuLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-700 border border-slate-700 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-amber-400" />
                      View Menu
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}

                {links.website && (
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-700 border border-slate-700 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      Official Website
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}
              </div>

              {/* Social Icons row */}
              <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-800/80">
                {links.instagram && <Instagram className="w-4 h-4 text-pink-400" />}
                {links.facebook && <Facebook className="w-4 h-4 text-blue-400" />}
                {links.whatsapp && <MessageCircle className="w-4 h-4 text-emerald-400" />}
                {links.linkedin && <Linkedin className="w-4 h-4 text-sky-400" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
