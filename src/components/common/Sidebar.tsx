import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  Image as ImageIcon,
  FileCheck,
  Utensils,
  Clock,
  Star,
  Users,
  ShieldCheck,
  Settings,
  ChevronRight,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  Clock3,
  X,
  Store,
  Share2,
  ShoppingBag,
  Eye,
  History,
  Bell,
  UserCheck,
  FileEdit,
  BarChart3,
  FileSpreadsheet,
  Terminal,
  User,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const {
    role,
    ownerTab,
    setOwnerTab,
    adminTab,
    setAdminTab,
    restaurants,
    selectedRestaurantId,
    setSelectedRestaurantId,
    activeRestaurant,
    claims,
    pendingChanges,
    orders,
    notifications,
  } = useApp();

  const pendingClaimsCount = claims.filter((c) => c.status === 'pending').length;
  const pendingChangesCount = pendingChanges.filter((pc) => pc.status === 'submitted' || pc.status === 'under_review').length;
  const activeOrdersCount = orders.filter((o) => o.status === 'received' || o.status === 'preparing').length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  interface NavItem {
    id: string;
    label: string;
    icon: any;
    badge?: number;
  }

  const ownerNavItems: NavItem[] = [
    { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'profile', label: 'Restaurant Profile', icon: Store },
    { id: 'social', label: 'Social Media & Links', icon: Share2 },
    { id: 'info', label: 'Business Info & Address', icon: Building2 },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'photos', label: 'Photos & Gallery', icon: ImageIcon },
    { id: 'menu', label: 'Menu Management', icon: Utensils },
    {
      id: 'orders',
      label: 'Orders Management',
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'pending_changes', label: 'Pending Changes', icon: History },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : undefined,
    },
    { id: 'claim', label: 'Claim & Verification', icon: FileCheck },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  const adminNavItems: NavItem[] = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
    { id: 'restaurants', label: 'Restaurants', icon: Store },
    { id: 'owners', label: 'Restaurant Owners', icon: UserCheck },
    {
      id: 'claims',
      label: 'Restaurant Claims',
      icon: FileCheck,
      badge: pendingClaimsCount > 0 ? pendingClaimsCount : undefined,
    },
    {
      id: 'changes',
      label: 'Change Requests',
      icon: FileEdit,
      badge: pendingChangesCount > 0 ? pendingChangesCount : undefined,
    },
    { id: 'users', label: 'Users & Permissions', icon: Users },
    {
      id: 'orders',
      label: 'Platform Orders',
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    { id: 'photos', label: 'Photos & Media', icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : undefined,
    },
    { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
    { id: 'logs', label: 'System Audit Logs', icon: Terminal },
    { id: 'profile', label: 'Admin Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 z-40 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 transition-transform duration-200 ease-in-out custom-scrollbar ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header Close */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white text-sm">ResPulse Navigation</span>
          </div>
          <button
            onClick={onMobileClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Header depending on Role */}
        <div className="p-4 border-b border-slate-800/80">
          {role === 'owner' ? (
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Assigned Restaurant
              </label>

              {/* Restaurant Selector Dropdown */}
              <select
                value={selectedRestaurantId}
                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                className="w-full bg-slate-800/90 text-white text-xs font-semibold rounded-xl px-3 py-2 border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
              >
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.city})
                  </option>
                ))}
              </select>

              {/* Claim Status Badge */}
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-slate-400">Claim Status:</span>
                {activeRestaurant?.claimStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-950/80 border border-amber-800/50 px-2 py-0.5 rounded-full">
                    <Clock3 className="w-3 h-3" />
                    {activeRestaurant?.claimStatus?.replace('_', ' ') || 'Pending'}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Admin Platform Scope
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Global oversight, claim approvals, and system audit log.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            {role === 'owner' ? 'Owner Management' : 'Admin Operations'}
          </div>

          {(role === 'owner' ? ownerNavItems : adminNavItems).map((item) => {
            const Icon = item.icon;
            const isActive =
              role === 'owner' ? ownerTab === item.id : adminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (role === 'owner') {
                    setOwnerTab(item.id);
                  } else {
                    setAdminTab(item.id);
                  }
                  onMobileClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive
                        ? 'bg-white text-blue-600'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Card - Proof of Concept Summary info */}
        <div className="p-3 border-t border-slate-800">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Claim Workflow Demo</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Switch roles freely at the top header to inspect both Owner & Admin view logic.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
