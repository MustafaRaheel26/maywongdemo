import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Restaurant,
  RestaurantClaim,
  PlatformUser,
  NotificationItem,
  Toast,
  PhotoItem,
  MenuItem,
  BusinessHours,
  ClaimStatus,
} from '../types';
import {
  INITIAL_RESTAURANTS,
  INITIAL_CLAIMS,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  INITIAL_PENDING_CHANGES,
} from '../data/mockData';
import { Order, PendingChangeItem } from '../types';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeUser: PlatformUser;
  restaurants: Restaurant[];
  claims: RestaurantClaim[];
  users: PlatformUser[];
  notifications: NotificationItem[];
  toasts: Toast[];
  orders: Order[];
  pendingChanges: PendingChangeItem[];
  
  // Owner specific state
  selectedRestaurantId: string;
  setSelectedRestaurantId: (id: string) => void;
  activeRestaurant: Restaurant;
  ownerTab: string;
  setOwnerTab: (tab: string) => void;
  
  // Admin specific state
  adminTab: string;
  setAdminTab: (tab: string) => void;

  // Search & Command Palette
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;

  // Actions
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Restaurant management actions
  updateRestaurant: (id: string, updates: Partial<Restaurant>) => void;
  addPhotoToRestaurant: (restaurantId: string, photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => void;
  deletePhotoFromRestaurant: (restaurantId: string, photoId: string) => void;
  addMenuItem: (restaurantId: string, item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (restaurantId: string, itemId: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (restaurantId: string, itemId: string) => void;
  updateBusinessHours: (restaurantId: string, hours: BusinessHours[]) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  submitPendingChange: (field: string, previousValue: string, newValue: string) => void;

  // Claims & Admin Workflow actions
  updateClaimStatus: (claimId: string, status: ClaimStatus, rejectionReason?: string, notes?: string) => void;
  submitNewClaim: (claimData: Partial<RestaurantClaim>) => void;
  addUser: (userData: Omit<PlatformUser, 'id' | 'joinedDate' | 'lastActive'>) => void;
  updateUserStatus: (userId: string, status: 'active' | 'pending' | 'suspended') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('owner');
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [claims, setClaims] = useState<RestaurantClaim[]>(INITIAL_CLAIMS);
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [pendingChanges, setPendingChanges] = useState<PendingChangeItem[]>(INITIAL_PENDING_CHANGES);

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('rest-1');
  const [ownerTab, setOwnerTab] = useState<string>('overview');
  const [adminTab, setAdminTab] = useState<string>('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Active User based on role
  const activeUser = users.find((u) => u.role === role) || users[0];

  // Currently selected restaurant for Owner portal
  const activeRestaurant =
    restaurants.find((r) => r.id === selectedRestaurantId) || restaurants[0];

  // Toast notification helper
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
    });
  };

  // Restaurant updates
  const updateRestaurant = (id: string, updates: Partial<Restaurant>) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
    addToast({
      type: 'success',
      title: 'Changes Saved',
      message: `${updates.name || 'Restaurant'} profile updated successfully.`,
    });
  };

  // Photos
  const addPhotoToRestaurant = (
    restaurantId: string,
    photoData: Omit<PhotoItem, 'id' | 'uploadedAt'>
  ) => {
    const newPhoto: PhotoItem = {
      ...photoData,
      id: `photo-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          const updatedPhotos = photoData.isPrimary
            ? r.photos.map((p) => ({ ...p, isPrimary: false })).concat(newPhoto)
            : [...r.photos, newPhoto];

          return {
            ...r,
            photos: updatedPhotos,
            coverUrl: photoData.category === 'cover' ? photoData.url : r.coverUrl,
            logoUrl: photoData.category === 'logo' ? photoData.url : r.logoUrl,
          };
        }
        return r;
      })
    );

    addToast({
      type: 'success',
      title: 'Photo Uploaded',
      message: `New ${photoData.category} image added to gallery.`,
    });
  };

  const deletePhotoFromRestaurant = (restaurantId: string, photoId: string) => {
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          return {
            ...r,
            photos: r.photos.filter((p) => p.id !== photoId),
          };
        }
        return r;
      })
    );
    addToast({
      type: 'info',
      title: 'Photo Deleted',
      message: 'Image removed from gallery.',
    });
  };

  // Menu items
  const addMenuItem = (restaurantId: string, item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}`,
    };
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurantId ? { ...r, menu: [...r.menu, newItem] } : r))
    );
    addToast({
      type: 'success',
      title: 'Menu Item Added',
      message: `${item.name} is now available on the menu.`,
    });
  };

  const updateMenuItem = (restaurantId: string, itemId: string, updates: Partial<MenuItem>) => {
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          return {
            ...r,
            menu: r.menu.map((m) => (m.id === itemId ? { ...m, ...updates } : m)),
          };
        }
        return r;
      })
    );
    addToast({
      type: 'success',
      title: 'Menu Updated',
      message: 'Dish details updated.',
    });
  };

  const deleteMenuItem = (restaurantId: string, itemId: string) => {
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          return {
            ...r,
            menu: r.menu.filter((m) => m.id !== itemId),
          };
        }
        return r;
      })
    );
    addToast({
      type: 'info',
      title: 'Item Removed',
      message: 'Menu dish deleted.',
    });
  };

  // Hours
  const updateBusinessHours = (restaurantId: string, hours: BusinessHours[]) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurantId ? { ...r, businessHours: hours } : r))
    );
    addToast({
      type: 'success',
      title: 'Schedule Updated',
      message: 'Business hours saved successfully.',
    });
  };

  // Orders
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast({
      type: 'info',
      title: 'Order Status Updated',
      message: `Order #${orderId} changed to ${status}.`,
    });
  };

  // Pending Changes Workflow
  const submitPendingChange = (field: string, previousValue: string, newValue: string) => {
    const newChange: PendingChangeItem = {
      id: `chg-${Date.now()}`,
      restaurantId: selectedRestaurantId,
      field,
      previousValue,
      newValue,
      status: 'submitted',
      submittedAt: new Date().toLocaleString(),
    };
    setPendingChanges((prev) => [newChange, ...prev]);
    addToast({
      type: 'success',
      title: 'Change Request Submitted',
      message: `Proposed update for "${field}" sent to admin for review.`,
    });
  };

  // Claims
  const updateClaimStatus = (
    claimId: string,
    status: ClaimStatus,
    rejectionReason?: string,
    notes?: string
  ) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          const updated: RestaurantClaim = {
            ...c,
            status,
            reviewedBy: activeUser.name,
            reviewedAt: new Date().toLocaleString(),
            rejectionReason: rejectionReason || c.rejectionReason,
            notes: notes || c.notes,
          };

          // Also update the target restaurant's claim status
          setRestaurants((restPrev) =>
            restPrev.map((r) => {
              if (r.id === c.restaurantId) {
                return {
                  ...r,
                  claimStatus: status,
                  ownerName: status === 'approved' ? c.claimantName : r.ownerName,
                  ownerEmail: status === 'approved' ? c.claimantEmail : r.ownerEmail,
                  claimedAt: status === 'approved' ? new Date().toISOString().split('T')[0] : r.claimedAt,
                };
              }
              return r;
            })
          );

          return updated;
        }
        return c;
      })
    );

    const statusLabels: Record<ClaimStatus, string> = {
      approved: 'Claim Approved',
      rejected: 'Claim Rejected',
      under_review: 'Moved to Under Review',
      needs_info: 'Information Requested',
      pending: 'Marked Pending',
    };

    addToast({
      type: status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'info',
      title: statusLabels[status],
      message: `Claim status updated for restaurant.`,
    });
  };

  const submitNewClaim = (claimData: Partial<RestaurantClaim>) => {
    const newClaim: RestaurantClaim = {
      id: `claim-${Date.now().toString().slice(-4)}`,
      restaurantId: claimData.restaurantId || 'rest-1',
      restaurantName: claimData.restaurantName || 'Selected Restaurant',
      claimantName: claimData.claimantName || activeUser.name,
      claimantEmail: claimData.claimantEmail || activeUser.email,
      claimantPhone: claimData.claimantPhone || '(415) 555-0199',
      claimantRole: claimData.claimantRole || 'Owner',
      taxId: claimData.taxId || 'XX-XXX1234',
      submittedAt: new Date().toLocaleString(),
      status: 'pending',
      notes: claimData.notes || 'Submitted via owner portal claim form.',
      verificationDocs: claimData.verificationDocs || [
        { name: 'Business_Permit_2026.pdf', type: 'PDF Document', size: '1.2 MB' },
      ],
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update restaurant status to pending
    if (claimData.restaurantId) {
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === claimData.restaurantId ? { ...r, claimStatus: 'pending' } : r
        )
      );
    }

    addToast({
      type: 'success',
      title: 'Claim Submitted!',
      message: 'Your verification request was sent to administrators for review.',
    });
  };

  const addUser = (userData: Omit<PlatformUser, 'id' | 'joinedDate' | 'lastActive'>) => {
    const newUser: PlatformUser = {
      ...userData,
      id: `user-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
    };
    setUsers((prev) => [newUser, ...prev]);
    addToast({
      type: 'success',
      title: 'User Added',
      message: `${userData.name} added as ${userData.role}.`,
    });
  };

  const updateUserStatus = (userId: string, status: 'active' | 'pending' | 'suspended') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
    addToast({
      type: 'info',
      title: 'User Status Updated',
      message: `Account status changed to ${status}.`,
    });
  };

  // Keybindings for global Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeUser,
        restaurants,
        claims,
        users,
        notifications,
        toasts,
        orders,
        pendingChanges,
        selectedRestaurantId,
        setSelectedRestaurantId,
        activeRestaurant,
        ownerTab,
        setOwnerTab,
        adminTab,
        setAdminTab,
        searchQuery,
        setSearchQuery,
        isCommandOpen,
        setIsCommandOpen,
        addToast,
        removeToast,
        markNotificationRead,
        clearAllNotifications,
        updateRestaurant,
        addPhotoToRestaurant,
        deletePhotoFromRestaurant,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateBusinessHours,
        updateOrderStatus,
        submitPendingChange,
        updateClaimStatus,
        submitNewClaim,
        addUser,
        updateUserStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
