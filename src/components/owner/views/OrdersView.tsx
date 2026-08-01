import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Order } from '../../../types';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  DollarSign,
  Search,
  Filter,
  Eye,
  XCircle,
  ChevronRight,
  Phone,
  MapPin,
  FileText,
  User,
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, updateOrderStatus, addToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesType = typeFilter === 'all' || o.orderType === typeFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'received':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2.5 py-1 rounded-full animate-pulse">
            <Clock className="w-3.5 h-3.5" /> New Order
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-full">
            <ShoppingBag className="w-3.5 h-3.5" /> Kitchen Preparing
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Pickup
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
            <Truck className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800/60 px-2.5 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
    }
  };

  const getNextStatusAction = (order: Order) => {
    switch (order.status) {
      case 'received':
        return { label: 'Start Preparing', next: 'preparing' as const, color: 'bg-blue-600 hover:bg-blue-500' };
      case 'preparing':
        return { label: 'Mark Ready', next: 'ready' as const, color: 'bg-indigo-600 hover:bg-indigo-500' };
      case 'ready':
        return { label: 'Mark Completed', next: 'delivered' as const, color: 'bg-emerald-600 hover:bg-emerald-500' };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">Live Orders & Ticket Management</h1>
          </div>
          <p className="text-xs text-slate-300">
            Real-time order flow for dine-in tables, takeaway pickup, and third-party delivery dispatch.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Pending</span>
            <span className="text-base font-black text-amber-400">
              {orders.filter((o) => o.status === 'received' || o.status === 'preparing').length}
            </span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Ready</span>
            <span className="text-base font-black text-indigo-400">
              {orders.filter((o) => o.status === 'ready').length}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'received', label: 'Received' },
            { id: 'preparing', label: 'Kitchen Preparing' },
            { id: 'ready', label: 'Ready' },
            { id: 'delivered', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search #ORD or name..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Orders List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Matching Orders</h3>
            <p className="text-xs text-slate-400">There are no orders in the queue matching your current search.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const nextAction = getNextStatusAction(order);

            return (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between transition"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-black text-white">{order.orderNumber}</span>
                      <span className="block text-[11px] text-slate-400">{order.createdAt}</span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        {order.customerName}
                      </span>
                      <span className="text-[10px] text-indigo-400 uppercase bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded">
                        {order.orderType.replace('_', ' ')}
                      </span>
                    </div>

                    {order.tableNumber && (
                      <p className="text-[11px] text-amber-400 font-semibold">{order.tableNumber}</p>
                    )}
                    {order.deliveryAddress && (
                      <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        {order.deliveryAddress}
                      </p>
                    )}
                  </div>

                  {/* Items Summary */}
                  <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Ordered Items ({order.items.length})
                    </span>
                    <ul className="text-xs space-y-1 text-slate-300">
                      {order.items.map((it) => (
                        <li key={it.id} className="flex justify-between text-[11px]">
                          <span>
                            {it.quantity}x {it.name}
                          </span>
                          <span className="font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 font-semibold">Total</span>
                    <span className="text-sm font-black text-emerald-400">${order.total.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition"
                      title="View Ticket Receipt"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {nextAction && (
                      <button
                        onClick={() => updateOrderStatus(order.id, nextAction.next)}
                        className={`px-3.5 py-2 text-xs font-bold text-white rounded-xl shadow-md transition ${nextAction.color}`}
                      >
                        {nextAction.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Ticket Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-bold text-white">Order Receipt {selectedOrder.orderNumber}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-white">{selectedOrder.customerName}</p>
                <p className="text-slate-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedOrder.customerPhone}
                </p>
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
                    <span>
                      {it.quantity}x {it.name}
                    </span>
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
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
