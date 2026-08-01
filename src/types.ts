export type UserRole = 'owner' | 'admin';

export type ClaimStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_info';

export interface BusinessHours {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: 'cover' | 'logo' | 'interior' | 'food' | 'menu' | 'ambiance';
  uploadedAt: string;
  isPrimary?: boolean;
  fileSize?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface RestaurantClaim {
  id: string;
  restaurantId: string;
  restaurantName: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  claimantRole: string; // e.g. "Owner", "General Manager"
  taxId: string;
  utilityBillUrl?: string;
  submittedAt: string;
  status: ClaimStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  notes?: string;
  verificationDocs: {
    name: string;
    type: string;
    size: string;
  }[];
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  whatsapp?: string;
  website?: string;
  reservationLink?: string;
  menuLink?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'received' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  orderType: 'dine_in' | 'takeout' | 'delivery';
  createdAt: string;
  tableNumber?: string;
  deliveryAddress?: string;
}

export interface PendingChangeItem {
  id: string;
  restaurantId: string;
  field: string;
  previousValue: string;
  newValue: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  adminNotes?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  claimStatus: ClaimStatus;
  isVerified?: boolean;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  claimedAt?: string;
  logoUrl: string;
  coverUrl: string;
  description: string;
  story?: string;
  photos: PhotoItem[];
  menu: MenuItem[];
  businessHours: BusinessHours[];
  monthlyRevenue: number;
  monthlyVisitors: number;
  monthlyOrders: number;
  todayVisitors?: number;
  weeklyVisitors?: number;
  menuViews?: number;
  galleryViews?: number;
  reservationsCount?: number;
  priceRange: '$$' | '$$$' | '$$$$';
  tags: string[];
  amenities?: string[];
  deliveryPlatforms?: { name: string; url: string; active: boolean }[];
  reservationUrl?: string;
  menuUrl?: string;
  socialLinks?: SocialLinks;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  restaurantId?: string;
  restaurantName?: string;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
  lastActive: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  response?: string;
  status: 'published' | 'flagged' | 'archived';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  details: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'claim' | 'system' | 'review' | 'order';
  isRead: boolean;
  linkTab?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}
