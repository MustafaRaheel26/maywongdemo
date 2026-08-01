import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OwnerOverview } from './views/OwnerOverview';
import { ProfileView } from './views/ProfileView';
import { SocialMediaView } from './views/SocialMediaView';
import { BusinessInfoView } from './views/BusinessInfoView';
import { PhotosGalleryView } from './views/PhotosGalleryView';
import { ClaimStatusView } from './views/ClaimStatusView';
import { MenuManagementView } from './views/MenuManagementView';
import { BusinessHoursView } from './views/BusinessHoursView';
import { ReviewsView } from './views/ReviewsView';
import { PreviewPage } from './views/PreviewPage';
import { PendingChangesView } from './views/PendingChangesView';
import { OrdersView } from './views/OrdersView';
import { NotificationsView } from './views/NotificationsView';
import { SettingsView } from './views/SettingsView';

import { SubmitClaimModal } from '../modals/SubmitClaimModal';
import { UploadPhotoModal } from '../modals/UploadPhotoModal';
import { AddMenuItemModal } from '../modals/AddMenuItemModal';
import { MenuItem } from '../../types';

export const OwnerDashboard: React.FC = () => {
  const { ownerTab } = useApp();

  const [isSubmitClaimOpen, setIsSubmitClaimOpen] = useState(false);
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  const handleOpenAddDish = (dish?: MenuItem | null) => {
    setEditingDish(dish || null);
    setIsAddDishOpen(true);
  };

  return (
    <div className="w-full">
      {ownerTab === 'overview' && (
        <OwnerOverview
          onOpenSubmitClaim={() => setIsSubmitClaimOpen(true)}
          onOpenUploadPhoto={() => setIsUploadPhotoOpen(true)}
          onOpenAddDish={() => handleOpenAddDish(null)}
        />
      )}

      {ownerTab === 'profile' && <ProfileView />}

      {ownerTab === 'social' && <SocialMediaView />}

      {ownerTab === 'info' && <BusinessInfoView />}

      {ownerTab === 'photos' && (
        <PhotosGalleryView onOpenUpload={() => setIsUploadPhotoOpen(true)} />
      )}

      {ownerTab === 'claim' && (
        <ClaimStatusView onOpenSubmitClaim={() => setIsSubmitClaimOpen(true)} />
      )}

      {ownerTab === 'menu' && (
        <MenuManagementView onOpenAddDish={handleOpenAddDish} />
      )}

      {ownerTab === 'hours' && <BusinessHoursView />}

      {ownerTab === 'reviews' && <ReviewsView />}

      {ownerTab === 'preview' && <PreviewPage />}

      {ownerTab === 'pending_changes' && <PendingChangesView />}

      {ownerTab === 'orders' && <OrdersView />}

      {ownerTab === 'notifications' && <NotificationsView />}

      {ownerTab === 'settings' && <SettingsView />}

      {/* Modals */}
      <SubmitClaimModal
        isOpen={isSubmitClaimOpen}
        onClose={() => setIsSubmitClaimOpen(false)}
      />

      <UploadPhotoModal
        isOpen={isUploadPhotoOpen}
        onClose={() => setIsUploadPhotoOpen(false)}
      />

      <AddMenuItemModal
        isOpen={isAddDishOpen}
        onClose={() => {
          setIsAddDishOpen(false);
          setEditingDish(null);
        }}
        editItem={editingDish}
      />
    </div>
  );
};
