import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './views/AdminOverview';
import { ClaimsReviewView } from './views/ClaimsReviewView';
import { RestaurantDirectoryView } from './views/RestaurantDirectoryView';
import { OwnersManagementView } from './views/OwnersManagementView';
import { ChangeRequestsView } from './views/ChangeRequestsView';
import { UserManagementView } from './views/UserManagementView';
import { AdminOrdersView } from './views/AdminOrdersView';
import { PhotosMediaView } from './views/PhotosMediaView';
import { AdminAnalyticsView } from './views/AdminAnalyticsView';
import { AdminReportsView } from './views/AdminReportsView';
import { AdminNotificationsView } from './views/AdminNotificationsView';
import { RolesPermissionsView } from './views/RolesPermissionsView';
import { PlatformSettingsView } from './views/PlatformSettingsView';
import { SystemLogsView } from './views/SystemLogsView';
import { AdminProfileView } from './views/AdminProfileView';

import { ClaimDetailModal } from '../modals/ClaimDetailModal';
import { AddUserModal } from '../modals/AddUserModal';
import { RestaurantClaim } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { adminTab } = useApp();

  const [selectedClaim, setSelectedClaim] = useState<RestaurantClaim | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleSelectClaim = (claim: RestaurantClaim) => {
    setSelectedClaim(claim);
    setIsClaimModalOpen(true);
  };

  return (
    <div className="w-full">
      {adminTab === 'overview' && (
        <AdminOverview onSelectClaim={handleSelectClaim} />
      )}

      {adminTab === 'restaurants' && <RestaurantDirectoryView />}

      {adminTab === 'owners' && <OwnersManagementView />}

      {adminTab === 'claims' && (
        <ClaimsReviewView onSelectClaim={handleSelectClaim} />
      )}

      {adminTab === 'changes' && <ChangeRequestsView />}

      {adminTab === 'users' && (
        <UserManagementView onOpenAddUser={() => setIsAddUserOpen(true)} />
      )}

      {adminTab === 'orders' && <AdminOrdersView />}

      {adminTab === 'photos' && <PhotosMediaView />}

      {adminTab === 'analytics' && <AdminAnalyticsView />}

      {adminTab === 'reports' && <AdminReportsView />}

      {adminTab === 'notifications' && <AdminNotificationsView />}

      {adminTab === 'roles' && <RolesPermissionsView />}

      {adminTab === 'settings' && <PlatformSettingsView />}

      {adminTab === 'logs' && <SystemLogsView />}

      {adminTab === 'profile' && <AdminProfileView />}

      {/* Modals */}
      <ClaimDetailModal
        claim={selectedClaim}
        isOpen={isClaimModalOpen}
        onClose={() => {
          setIsClaimModalOpen(false);
          setSelectedClaim(null);
        }}
      />

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      />
    </div>
  );
};
