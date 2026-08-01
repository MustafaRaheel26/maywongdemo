import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Order } from '../../../types';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  RotateCcw,
  DollarSign,
  Building2,
  User,
  Phone,
  FileText,
  MapPin,
  Check,
} from 'lucide-react';

export const AdminOrdersView: React.FC = () => {
  const { orders, restaurants, updateOrderStatus, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [restaurantFilter, setRestaurantFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundModalOrder, setRefundModalOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesRestaurant = restaurantFilter === 'all' || o.restaurantId === restaurantFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);

    return matchesStatus && matchesRestaurant && matchesSearch;
  });

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);

  const handleIssueRefund = () => {
    if (!refundModalOrder) return;
    updateOrderStatus(refundModalOrder.id, 'cancelled');
    addToast({
      type: 'success',
      title: 'Refund Processed',
      message: `Full refund of $${refundModalOrder.total.toFixed(2)} credited for order #${refundModalOrder.orderNumber}.`,
    });
    setRefundModalOrder(null);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'received':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Received
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-1 rounded-full">
            <ShoppingBag className="w-3.5 h-3.5" /> Preparing
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ready
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-full">
            <Truck className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-2.5 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" /> Refunded
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Platform-Wide Live Order Feed</h1>
          </div>
          <p className="text-xs text-slate-300">
            Monitor real-time food order volume, ticket statuses, and process customer dispute refunds across all restaurants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-right">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Total Platform GMV</span>
            <span className="text-base font-black text-emerald-400">${totalGMV.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search #ORD, customer, phone..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Order Statuses</option>
            <option value="received">Received</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Completed</option>
            <option value="cancelled">Refunded / Cancelled</option>
          </select>

          <select
            value={restaurantFilter}
            onChange={(e) => setRestaurantFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Venues</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Restaurant</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Type & Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No orders matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const rest = restaurants.find((r) => r.id === order.restaurantId) || restaurants[0];

                  return (
                    <tr key={order.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {order.orderNumber}
                        <span className="block text-[10px] text-slate-400 font-normal">{order.createdAt}</span>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {rest?.name}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{order.customerName}</span>
                        <span className="text-[11px] text-slate-400 block">{order.customerPhone}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded block w-fit mb-1">
                          {order.orderType.replace('_', ' ')}
                        </span>
                        <span className="text-slate-300 text-[11px]">{order.items.length} items</span>
                      </td>

                      <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                        ${order.total.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4">
                        {getStatusBadge(order.status)}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
                            title="View Receipt"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {order.status !== 'cancelled' && (
                            <button
                              onClick={() => setRefundModalOrder(order)}
                              className="p-2 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-xl transition border border-slate-700"
                              title="Process Admin Refund"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Ticket Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Receipt #{selectedOrder.orderNumber}
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-white">{selectedOrder.customerName}</p>
                <p className="text-slate-400">{selectedOrder.customerPhone}</p>
                {selectedOrder.deliveryAddress && (
                  <p className="text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {selectedOrder.deliveryAddress}
                  </p>
                )}
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-2">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-slate-200">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-bold">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-800 flex justify-between font-extrabold text-white text-sm">
                  <span>Grand Total</span>
                  <span className="text-emerald-400">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Refund Modal */}
      {refundModalOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
            <RotateCcw className="w-10 h-10 text-rose-500 mx-auto" />
            <h2 className="text-sm font-bold text-white">Issue Full Refund for #{refundModalOrder.orderNumber}?</h2>
            <p className="text-xs text-slate-400">
              Amount of <strong>${refundModalOrder.total.toFixed(2)}</strong> will be refunded to customer {refundModalOrder.customerName}.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setRefundModalOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueRefund}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl"
              >
                Authorize Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
