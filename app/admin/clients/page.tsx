'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Ruler, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Search, 
  RefreshCw, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Save, 
  X,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Plus,
  Truck,
  DollarSign
} from 'lucide-react';
import { formatCurrencyPrice } from '@/lib/currency';
import type { ClientMeasurementProfile } from '@/lib/clients/store';
import type { StoredOrder } from '@/app/api/orders/route';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientMeasurementProfile[]>([]);
  const [allOrders, setAllOrders] = useState<StoredOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Add Order Modal State
  const [addOrderModalClient, setAddOrderModalClient] = useState<ClientMeasurementProfile | null>(null);
  const [newOrderName, setNewOrderName] = useState('Bespoke Navy 2-Piece Suit (English Wool)');
  const [newOrderSize, setNewOrderSize] = useState('Custom Tailored');
  const [newOrderPrice, setNewOrderPrice] = useState('65000');
  const [newOrderStatus, setNewOrderStatus] = useState<StoredOrder['fulfillment_status']>('confirmed');
  const [newOrderPayment, setNewOrderPayment] = useState<StoredOrder['payment_status']>('paid');
  const [newOrderNotes, setNewOrderNotes] = useState('');
  const [creatingOrder, setCreatingOrder] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients');
      const data = await res.json();
      if (data.clients) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error('Error fetching admin clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        setAllOrders(data.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchOrders();
  }, []);

  const handleApproveMeasurements = async (client: ClientMeasurementProfile) => {
    setApprovingId(client.id);
    const notes = prompt(
      `Approve measurements for ${client.fullName} as Master Tailor?\nEnter tailoring calibration notes:`,
      client.tailorNotes || 'Verified & approved by Master Cutter Samuel M. Balanced shoulder slope and chest ease.'
    );

    if (notes === null) {
      setApprovingId(null);
      return;
    }

    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          email: client.email,
          approvedBy: 'Samuel M. (Master Cutter)',
          tailorNotes: notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setClients((prev) =>
          prev.map((c) => (c.email === client.email ? data.profile : c))
        );
      }
    } catch (err) {
      console.error('Error approving client measurements:', err);
    } finally {
      setApprovingId(null);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, fulfillment_status: StoredOrder['fulfillment_status']) => {
    try {
      setAllOrders((prev) =>
        prev.map((o) => (o.id === orderId || o.order_number === orderId ? { ...o, fulfillment_status } : o))
      );

      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, fulfillment_status }),
      });
      fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleCreateOrderForClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addOrderModalClient) return;
    setCreatingOrder(true);

    try {
      const newOrderNumber = `MMK-${Date.now().toString().slice(-5)}`;
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: newOrderNumber,
          customerName: addOrderModalClient.fullName,
          customerEmail: addOrderModalClient.email,
          customerPhone: addOrderModalClient.phone || '',
          deliveryLocation: addOrderModalClient.savedDelivery?.town || 'Nairobi',
          items: [
            {
              id: `item-${Date.now()}`,
              productId: 'bespoke-garment',
              name: newOrderName,
              priceKes: Number(newOrderPrice) || 0,
              size: newOrderSize,
              quantity: 1,
              image: '/images/DSC04888.jpg',
            },
          ],
          totalAmountKes: Number(newOrderPrice) || 0,
          fulfillmentStatus: newOrderStatus,
          paymentStatus: newOrderPayment,
          notes: newOrderNotes || 'Commissioned in atelier by administrator.',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAddOrderModalClient(null);
        setNewOrderName('Bespoke Navy 2-Piece Suit (English Wool)');
        setNewOrderNotes('');
        await fetchOrders();
      }
    } catch (err) {
      console.error('Error creating order for client:', err);
    } finally {
      setCreatingOrder(false);
    }
  };

  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q)) ||
      (c.savedDelivery?.town && c.savedDelivery.town.toLowerCase().includes(q))
    );
  });

  const totalClients = clients.length;
  const approvedMeasurementsCount = clients.filter((c) => c.approvalStatus === 'approved').length;
  const totalOrdersCount = allOrders.length;
  const activeOrdersCount = allOrders.filter((o) => o.fulfillment_status !== 'delivered' && o.fulfillment_status !== 'cancelled').length;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Client Registry & Live Sartorial Control</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Members & Order Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View registered clients, update order statuses, add new orders directly, and approve anatomical measurements.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              fetchClients();
              fetchOrders();
            }}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>Registered Clients</span>
            <Users className="w-4 h-4 text-brand-navy" />
          </div>
          <div className="mt-3 text-2xl font-bold text-brand-navy font-mono">{totalClients}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active client accounts</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-blue-200 bg-blue-50/20 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-blue-800">
            <span>Active Commissions</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-blue-900 font-mono">{activeOrdersCount}</div>
          <div className="text-[11px] text-blue-700 mt-1 font-semibold">Orders in crafting or dispatch</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>Total Orders Logged</span>
            <ShoppingBag className="w-4 h-4 text-brand-navy" />
          </div>
          <div className="mt-3 text-2xl font-bold text-brand-navy font-mono">{totalOrdersCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Synchronized with Supabase</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-emerald-700">
            <span>Approved Measurements</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-800 font-mono">{approvedMeasurementsCount}</div>
          <div className="text-[11px] text-emerald-600 mt-1">Calibrated blueprints on record</div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center">
        <Search className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by client name, email, phone number, or delivery town..."
          className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-gold mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading client blueprints and orders...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">
            No client records matching your query.
          </div>
        ) : (
          filteredClients.map((client) => {
            const isApproved = client.approvalStatus === 'approved';
            const isExpanded = expandedId === client.id;
            const clientOrders = allOrders.filter(
              (o) =>
                o.customer_email.toLowerCase().trim() === client.email.toLowerCase().trim() ||
                (client.phone && o.customer_phone && o.customer_phone.replace(/\s+/g, '') === client.phone.replace(/\s+/g, ''))
            );

            return (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Main Client Row */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-brand-navy">
                        {client.fullName}
                      </h3>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {clientOrders.length} {clientOrders.length === 1 ? 'Order' : 'Orders'}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isApproved ? 'Measurements Approved' : 'Measurements Pending'}
                      </span>
                      {client.twoFactorEnabled && (
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center space-x-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>2FA Active</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{client.email}</span>
                      </span>
                      {client.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{client.phone}</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{client.savedDelivery?.town || 'Nairobi'}</span>
                      </span>
                    </div>

                    {client.tailorNotes && (
                      <p className="text-[11px] text-slate-600 italic pt-1">
                        Tailor Note: "{client.tailorNotes}" {client.approvedBy && `— ${client.approvedBy}`}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => setAddOrderModalClient(client)}
                      className="px-3.5 py-1.5 rounded-lg bg-brand-navy hover:bg-slate-900 text-brand-gold text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                      title="Create a new order for this client"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Order</span>
                    </button>

                    {!isApproved && (
                      <button
                        onClick={() => handleApproveMeasurements(client)}
                        disabled={approvingId === client.id}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{approvingId === client.id ? 'Approving...' : 'Approve Measurements'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : client.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{isExpanded ? 'Hide Details' : 'View Orders & Measurements'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Section: Orders List & Measurements */}
                {isExpanded && (
                  <div className="bg-slate-50/70 border-t border-slate-200 p-5 sm:p-6 space-y-6">
                    {/* Orders Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center space-x-2">
                          <ShoppingBag className="w-4 h-4 text-brand-gold" />
                          <span>Orders for {client.fullName} ({clientOrders.length})</span>
                        </span>
                        <button
                          onClick={() => setAddOrderModalClient(client)}
                          className="text-xs text-brand-navy hover:text-brand-gold font-bold flex items-center space-x-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>New Order</span>
                        </button>
                      </div>

                      {clientOrders.length === 0 ? (
                        <div className="p-4 bg-white rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                          No orders on record for this client yet. Click <strong>"Add Order"</strong> above to create one.
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {clientOrders.map((ord) => (
                            <div
                              key={ord.id}
                              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-bold text-brand-navy text-sm">
                                    {ord.order_number}
                                  </span>
                                  <span className="text-[11px] text-slate-400">
                                    {new Date(ord.created_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      ord.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                    }`}
                                  >
                                    {ord.payment_status}
                                  </span>
                                </div>
                                <div className="text-slate-700 font-medium">
                                  {ord.items.map((it) => `${it.quantity}x ${it.name} (${it.size || 'Standard'})`).join(', ')}
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <span className="font-mono font-bold text-brand-navy text-sm">
                                  {formatCurrencyPrice(ord.total_amount_kes, 'KES')}
                                </span>

                                {/* Status Selector */}
                                <select
                                  value={ord.fulfillment_status}
                                  onChange={(e) =>
                                    handleUpdateOrderStatus(ord.id, e.target.value as StoredOrder['fulfillment_status'])
                                  }
                                  className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1 font-semibold text-slate-800 focus:outline-none focus:border-brand-navy cursor-pointer"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed & In Craft</option>
                                  <option value="dispatched">Dispatched</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Measurements Matrix */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center justify-between border-b border-slate-200/80 pb-2">
                        <span>Anatomical Blueprint ({client.measurements?.unit || 'inches'})</span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          Saved measurements profile
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs">
                        {[
                          { label: 'Chest', val: client.measurements?.chest },
                          { label: 'Waist / Stomach', val: client.measurements?.waistStomach },
                          { label: 'Hips / Seat', val: client.measurements?.hipsSeat },
                          { label: 'Shoulders', val: client.measurements?.shoulderWidth },
                          { label: 'Half Back', val: client.measurements?.halfBack },
                          { label: 'Jacket Length', val: client.measurements?.jacketLength },
                          { label: 'Left Sleeve', val: client.measurements?.sleeveLengthLeft },
                          { label: 'Right Sleeve', val: client.measurements?.sleeveLengthRight },
                          { label: 'Collar / Neck', val: client.measurements?.neckCollar },
                          { label: 'Bicep', val: client.measurements?.bicep },
                          { label: 'Trouser Waist', val: client.measurements?.trouserWaist },
                          { label: 'Trouser Inseam', val: client.measurements?.trouserInseam },
                          { label: 'Trouser Outseam', val: client.measurements?.trouserOutseam },
                          { label: 'Thigh', val: client.measurements?.thigh },
                          { label: 'Ankle Opening', val: client.measurements?.ankleOpening },
                        ].map((m, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{m.label}</span>
                            <span className="font-mono font-bold text-brand-navy text-sm">
                              {m.val ? `${m.val}"` : '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Order Modal */}
      {addOrderModalClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                  Direct Atelier Order Entry
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-navy">
                  Add Order for {addOrderModalClient.fullName}
                </h3>
              </div>
              <button
                onClick={() => setAddOrderModalClient(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderForClient} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Client & Account Email
                </label>
                <input
                  type="text"
                  disabled
                  value={`${addOrderModalClient.fullName} (${addOrderModalClient.email})`}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Garment / Ensemble Title
                </label>
                <input
                  type="text"
                  required
                  value={newOrderName}
                  onChange={(e) => setNewOrderName(e.target.value)}
                  placeholder="e.g. Bespoke Navy 3-Piece Suit (English Wool)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-navy font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Size / Fitting Note
                  </label>
                  <input
                    type="text"
                    value={newOrderSize}
                    onChange={(e) => setNewOrderSize(e.target.value)}
                    placeholder="e.g. 40R or Custom Measured"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Total Amount (KES)
                  </label>
                  <input
                    type="number"
                    required
                    value={newOrderPrice}
                    onChange={(e) => setNewOrderPrice(e.target.value)}
                    placeholder="65000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-navy font-mono font-bold text-brand-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Initial Fulfillment Status
                  </label>
                  <select
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-navy font-semibold"
                  >
                    <option value="confirmed">Confirmed & In Craft</option>
                    <option value="pending">Pending Review</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={newOrderPayment}
                    onChange={(e) => setNewOrderPayment(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-navy font-semibold"
                  >
                    <option value="paid">Paid in Full</option>
                    <option value="pending">Pending Payment</option>
                    <option value="on_delivery">Payment on Delivery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Atelier Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  value={newOrderNotes}
                  onChange={(e) => setNewOrderNotes(e.target.value)}
                  placeholder="e.g. Fitted on Tubman Road. Double side vents, horn buttons, navy silk lining."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-navy"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddOrderModalClient(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creatingOrder}
                  className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-slate-900 text-brand-gold font-bold transition-all shadow-sm flex items-center space-x-1.5 disabled:opacity-60 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{creatingOrder ? 'Creating Order...' : 'Assign Order to Client'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
