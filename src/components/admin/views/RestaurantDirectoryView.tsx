import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Restaurant } from '../../../types';
import {
  Store,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  Building2,
  MapPin,
  Phone,
  Star,
  Plus,
  ArrowUpDown,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

export const RestaurantDirectoryView: React.FC = () => {
  const { restaurants, updateRestaurant, addToast, setAdminTab } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [cuisineFilter, setCuisineFilter] = useState<string>('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Modals
  const [assignOwnerModal, setAssignOwnerModal] = useState<Restaurant | null>(null);
  const [ownerEmailInput, setOwnerEmailInput] = useState('');
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<Restaurant | null>(null);

  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)));

  const activeRestaurantsCount = restaurants.filter((r) => r.isVerified ?? (r.claimStatus === 'approved')).length;

  const filteredRestaurants = restaurants.filter((r) => {
    const isVerified = r.isVerified ?? (r.claimStatus === 'approved');
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.ownerName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'verified'
        ? isVerified
        : !isVerified;

    const matchesCuisine = cuisineFilter === 'all' || r.cuisine === cuisineFilter;

    return matchesSearch && matchesStatus && matchesCuisine;
  });

  const handleToggleVerification = (r: Restaurant) => {
    const currentStatus = r.isVerified ?? (r.claimStatus === 'approved');
    const updatedStatus = !currentStatus;
    updateRestaurant(r.id, { isVerified: updatedStatus, claimStatus: updatedStatus ? 'approved' : 'pending' });
    addToast({
      type: 'success',
      title: 'Restaurant Status Updated',
      message: `${r.name} status set to ${updatedStatus ? 'Verified' : 'Unverified'}.`,
    });
  };

  const handleAssignOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignOwnerModal || !ownerEmailInput.trim()) return;

    updateRestaurant(assignOwnerModal.id, {
      ownerName: ownerEmailInput.split('@')[0],
      ownerEmail: ownerEmailInput,
    });

    addToast({
      type: 'success',
      title: 'Owner Assigned',
      message: `${ownerEmailInput} assigned as verified owner of ${assignOwnerModal.name}.`,
    });

    setAssignOwnerModal(null);
    setOwnerEmailInput('');
  };

  const handleDeleteRestaurant = () => {
    if (!deleteConfirmModal) return;
    addToast({
      type: 'info',
      title: 'Restaurant Unlisted',
      message: `${deleteConfirmModal.name} removed from platform directory.`,
    });
    setDeleteConfirmModal(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Store className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Restaurant Directory & Governance</h1>
          </div>
          <p className="text-xs text-slate-300">
            Audit, verify, assign ownership, and configure listings across the platform network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl">
            Total Listings: <strong>{restaurants.length}</strong>
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurant name, city, owner..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Verification Statuses</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified Only</option>
          </select>

          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Cuisines</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Restaurant Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Restaurant</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Assigned Owner</th>
                <th className="py-3.5 px-4">Rating & Reviews</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredRestaurants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No restaurants found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={restaurant.logoUrl || restaurant.coverUrl}
                          alt={restaurant.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block">{restaurant.name}</span>
                          <span className="text-[11px] text-slate-400 block">{restaurant.cuisine} • {restaurant.priceRange}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-200 block">{restaurant.city}, {restaurant.state}</span>
                        <span className="text-[11px] text-slate-400 block">{restaurant.phone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {restaurant.ownerEmail ? (
                        <div>
                          <span className="font-bold text-white block">{restaurant.ownerName}</span>
                          <span className="text-[11px] text-indigo-400 block">{restaurant.ownerEmail}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAssignOwnerModal(restaurant)}
                          className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-1 rounded-lg hover:bg-amber-900 transition"
                        >
                          + Assign Owner
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white">{restaurant.rating}</span>
                        <span className="text-slate-500 text-[11px]">({restaurant.reviewCount})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {(restaurant.isVerified ?? (restaurant.claimStatus === 'approved')) ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Unverified
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedRestaurant(restaurant);
                            setIsDetailDrawerOpen(true);
                          }}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
                          title="Inspect Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleVerification(restaurant)}
                          className={`p-2 rounded-xl transition border ${
                            (restaurant.isVerified ?? (restaurant.claimStatus === 'approved'))
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800 hover:bg-emerald-900'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                          }`}
                          title={(restaurant.isVerified ?? (restaurant.claimStatus === 'approved')) ? 'Unverify Listing' : 'Verify Listing'}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmModal(restaurant)}
                          className="p-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 rounded-xl transition border border-slate-700"
                          title="Unlist Restaurant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restaurant Inspection Drawer */}
      {isDetailDrawerOpen && selectedRestaurant && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-lg h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Listing Inspector: {selectedRestaurant.name}
              </h2>
              <button onClick={() => setIsDetailDrawerOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <img
                src={selectedRestaurant.coverUrl}
                alt="Cover"
                className="w-full h-40 object-cover rounded-xl border border-slate-800"
              />

              <div className="flex items-center gap-3">
                <img
                  src={selectedRestaurant.logoUrl}
                  alt="Logo"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedRestaurant.name}</h3>
                  <p className="text-slate-400">{selectedRestaurant.cuisine} • {selectedRestaurant.address}</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Owner Contact Info</h4>
                <p className="text-slate-300">Name: {selectedRestaurant.ownerName || 'Unassigned'}</p>
                <p className="text-slate-300">Email: {selectedRestaurant.ownerEmail || 'Unassigned'}</p>
                <p className="text-slate-300">Phone: {selectedRestaurant.phone}</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Platform Statistics</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>Menu Items: <strong>{selectedRestaurant.menu.length}</strong></div>
                  <div>Photos: <strong>{selectedRestaurant.photos.length}</strong></div>
                  <div>Rating: <strong>{selectedRestaurant.rating} / 5.0</strong></div>
                  <div>Reviews: <strong>{selectedRestaurant.reviewCount}</strong></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setAssignOwnerModal(selectedRestaurant)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
              >
                Assign / Change Owner
              </button>

              <button
                onClick={() => setIsDetailDrawerOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Owner Modal */}
      {assignOwnerModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-400" />
              Assign Verified Owner to {assignOwnerModal.name}
            </h2>

            <form onSubmit={handleAssignOwnerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Owner Email Address
                </label>
                <input
                  type="email"
                  value={ownerEmailInput}
                  onChange={(e) => setOwnerEmailInput(e.target.value)}
                  placeholder="owner@restaurant.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignOwnerModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
                >
                  Confirm Ownership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h2 className="text-sm font-bold text-white">Unlist {deleteConfirmModal.name}?</h2>
            <p className="text-xs text-slate-400">
              This will remove the listing from public search and revoke active owner dashboard access.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRestaurant}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl"
              >
                Confirm Unlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
