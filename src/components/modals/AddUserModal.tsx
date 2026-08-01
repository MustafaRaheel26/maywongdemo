import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Modal } from '../common/Modal';
import { UserPlus } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const { addUser, restaurants } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('owner');
  const [restaurantId, setRestaurantId] = useState(restaurants[0]?.id || '');
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  );

  const selectedRest = restaurants.find((r) => r.id === restaurantId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      name,
      email,
      role,
      avatar,
      restaurantId: role === 'owner' ? restaurantId : undefined,
      restaurantName: role === 'owner' ? selectedRest?.name : undefined,
      status: 'active',
    });
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite New Platform User"
      subtitle="Grant dashboard access to restaurant owners or administrators."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            User Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Chef Antoine Laurent"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="antoine@bistro.com"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Role & Permissions
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
            >
              <option value="owner">Restaurant Owner</option>
              <option value="admin">Platform Administrator</option>
            </select>
          </div>

          {role === 'owner' && (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Assigned Restaurant
              </label>
              <select
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Send Access Invite
          </button>
        </div>
      </form>
    </Modal>
  );
};
