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
  ChevronUp
} from 'lucide-react';
import type { ClientMeasurementProfile } from '@/lib/clients/store';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientMeasurementProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientMeasurementProfile | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Edit measurement states for selected client
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<'approved' | 'pending_review'>('approved');

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

  useEffect(() => {
    fetchClients();
  }, []);

  const handleApproveMeasurements = async (client: ClientMeasurementProfile) => {
    setApprovingId(client.id);
    const notes = prompt(
      `Approve measurements for ${client.fullName} as Master Tailor?\nEnter tailoring calibration notes (or leave default):`,
      client.tailorNotes || 'Verified & approved by Master Cutter Samuel M. Balanced shoulder slope and drop.'
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
        // Update local list
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
  const approvedCount = clients.filter((c) => c.approvalStatus === 'approved').length;
  const pendingCount = clients.filter((c) => c.approvalStatus !== 'approved').length;
  const securedCount = clients.filter((c) => c.twoFactorEnabled).length;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Master Tailor Registry & Sartorial Blueprints</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Clients & Saved Measurements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review anatomical measurement blueprints, approve tailoring records, and verify 2FA client accounts.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchClients}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Clients</span>
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
          <div className="text-[11px] text-slate-500 mt-1">Archived sartorial accounts</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-emerald-700">
            <span>Tailor Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-800 font-mono">{approvedCount}</div>
          <div className="text-[11px] text-emerald-600 mt-1">Ready for immediate cutting</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-amber-700">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-amber-900 font-mono">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 mt-1">Awaiting Master Cutter signoff</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>2FA Fortified</span>
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="mt-3 text-2xl font-bold text-brand-navy font-mono">{securedCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Accounts with 2-Factor enabled</div>
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
            <p className="text-xs text-slate-500">Loading client blueprints...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">
            No client records matching your query.
          </div>
        ) : (
          filteredClients.map((client) => {
            const isApproved = client.approvalStatus === 'approved';
            const isExpanded = expandedId === client.id;

            return (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Main Client Row */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-serif text-lg font-bold text-brand-navy">
                        {client.fullName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isApproved ? 'Master Tailor Approved' : 'Pending Review'}
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
                  <div className="flex items-center space-x-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
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
                      <span>{isExpanded ? 'Hide Measurements' : 'Inspect Measurements'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Anatomical Measurements & Preferences */}
                {isExpanded && (
                  <div className="bg-slate-50/70 border-t border-slate-200 p-5 sm:p-6 space-y-6">
                    {/* Measurements Matrix */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center justify-between">
                        <span>Anatomical Blueprint ({client.measurements?.unit || 'inches'})</span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          Saved for subsequent orders
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

                    {/* Sartorial Style & Delivery Instructions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          Sartorial Preferences
                        </span>
                        <div className="space-y-1">
                          <div><strong>Silhouette:</strong> <span className="capitalize">{client.preferences?.fitStyle?.replace('_', ' ') || 'Contemporary'}</span></div>
                          <div><strong>Lapel:</strong> <span className="capitalize">{client.preferences?.lapelPreference?.replace('_', ' ') || 'Peak Lapel'}</span></div>
                          <div><strong>Vents:</strong> <span className="capitalize">{client.preferences?.jacketVents?.replace('_', ' ') || 'Double Side Vents'}</span></div>
                          <div><strong>Trouser Break:</strong> <span className="capitalize">{client.preferences?.trouserBreak?.replace('_', ' ') || 'Slight Break'}</span></div>
                          {client.preferences?.monogramInitials && (
                            <div><strong>Monogram:</strong> <span className="font-mono font-bold text-brand-gold">{client.preferences.monogramInitials}</span></div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          Saved White-Glove Delivery Info
                        </span>
                        <div className="space-y-1 text-slate-600">
                          <div><strong>Destination:</strong> {client.savedDelivery?.town}</div>
                          {client.savedDelivery?.streetAddress && (
                            <div><strong>Street / Suite:</strong> {client.savedDelivery.streetAddress}</div>
                          )}
                          {client.savedDelivery?.deliveryNotes && (
                            <div><strong>Instructions:</strong> {client.savedDelivery.deliveryNotes}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

