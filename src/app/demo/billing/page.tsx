'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/store/demoStore';
import {
  CreditCard,
  Receipt,
  Plus,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  XCircle,
  User,
  DollarSign,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { DemoBill } from '@/types';

export default function BillingDemoPage() {
  const { bills, patients, processPayment, addBill } = useDemoStore();

  const [search, setSearch] = useState('');
  const [selectedBillForPayment, setSelectedBillForPayment] = useState<DemoBill | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'UPI'>('UPI');

  // Modal for printable receipt
  const [selectedReceipt, setSelectedReceipt] = useState<DemoBill | null>(null);

  // New Invoice Modal
  const [isNewBillModalOpen, setNewBillModalOpen] = useState(false);
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [item1Desc, setItem1Desc] = useState('Specialist OPD Consultation Fee');
  const [item1Cost, setItem1Cost] = useState(600);
  const [item2Desc, setItem2Desc] = useState('Laboratory Blood Test Package');
  const [item2Cost, setItem2Cost] = useState(850);
  const [discountVal, setDiscountVal] = useState(50);

  const filteredBills = bills.filter(
    (b) =>
      b.patientName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.patientId.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    const p = patients.find((pat) => pat.id === patientId);
    if (!p) return;

    const items = [];
    if (item1Desc && item1Cost > 0) items.push({ description: item1Desc, amount: Number(item1Cost), category: 'Consultation' as const });
    if (item2Desc && item2Cost > 0) items.push({ description: item2Desc, amount: Number(item2Cost), category: 'Laboratory' as const });

    const total = items.reduce((acc, curr) => acc + curr.amount, 0);
    const net = Math.max(0, total - Number(discountVal));

    addBill({
      patientId: p.id,
      patientName: p.name,
      items,
      totalAmount: total,
      discount: Number(discountVal),
      netAmount: net
    });

    setNewBillModalOpen(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBillForPayment || paymentAmount <= 0) return;

    processPayment(selectedBillForPayment.id, paymentAmount, paymentMethod);
    setSelectedBillForPayment(null);
  };

  const openPaymentModal = (bill: DemoBill) => {
    setSelectedBillForPayment(bill);
    setPaymentAmount(bill.netAmount - bill.paidAmount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Header Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-400 mb-2">
            <Link href="/demo" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Demo Hub
            </Link>
            <span>/</span>
            <span className="text-slate-400">Billing & Revenue Counter</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-cyan-400" />
            Patient Billing & Invoice Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Integrated cashier counter, payment gateway simulation (UPI/Card/Cash), and itemized receipt printing (FR-13, FR-14).
          </p>
        </div>

        <button
          onClick={() => setNewBillModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Generate Invoice
        </button>
      </div>

      {/* Control Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search Invoice ID or Patient Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Bill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill) => {
          const pending = bill.netAmount - bill.paidAmount;
          return (
            <div
              key={bill.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                    {bill.id}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${
                      bill.status === 'Paid'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : bill.status === 'Partially Paid'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {bill.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" /> {bill.patientName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">UHID: {bill.patientId} • Date: {bill.billDate}</p>
                </div>

                {/* Line Items */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                  <div className="text-slate-400 font-semibold mb-1">Itemized Services:</div>
                  {bill.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <span>• {item.description}</span>
                      <span className="font-mono">₹{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-900 pt-1 mt-1 flex justify-between font-semibold text-slate-200">
                    <span>Net Total:</span>
                    <span className="text-cyan-400 font-mono font-bold">₹{bill.netAmount.toLocaleString()}</span>
                  </div>
                  {bill.paidAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 text-[11px]">
                      <span>Amount Paid:</span>
                      <span className="font-mono font-bold">₹{bill.paidAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                {pending > 0 ? (
                  <button
                    onClick={() => openPaymentModal(bill)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" /> Collect Payment (₹{pending.toLocaleString()})
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedReceipt(bill)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-cyan-400" /> View / Print Receipt
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Collect Payment Modal */}
      {selectedBillForPayment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-cyan-400" /> Collect Invoice Payment
              </h3>
              <button onClick={() => setSelectedBillForPayment(null)} className="text-slate-400 hover:text-white p-1">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Patient: <strong className="text-white">{selectedBillForPayment.patientName}</strong></div>
                <div className="text-xs text-slate-400">Bill Ref: <strong className="text-cyan-400 font-mono">{selectedBillForPayment.id}</strong></div>
                <div className="text-sm font-bold text-slate-100 flex justify-between pt-2 border-t border-slate-900">
                  <span>Balance Due:</span>
                  <span className="text-amber-400 font-mono">₹{(selectedBillForPayment.netAmount - selectedBillForPayment.paidAmount).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  max={selectedBillForPayment.netAmount - selectedBillForPayment.paidAmount}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-base font-bold focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Card', 'Cash'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        paymentMethod === method
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedBillForPayment(null)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-5 py-2 rounded-lg text-sm transition-all"
                >
                  Process Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Receipt className="w-6 h-6 text-cyan-400" /> Official Hospital Payment Receipt
              </h3>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-white p-1">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">SMART HOSPITAL HEALTHCARE CENTER</h4>
                  <p className="text-slate-400">100 Super Specialty Road, Tech City</p>
                  <p className="text-slate-400">GSTIN: 36AAAAA0000A1Z5</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-cyan-400 font-bold">{selectedReceipt.id}</span>
                  <p className="text-slate-400">{selectedReceipt.billDate}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400">Billed To:</span>
                <p className="font-bold text-white text-sm">{selectedReceipt.patientName} ({selectedReceipt.patientId})</p>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {selectedReceipt.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 text-slate-200">{item.description}</td>
                      <td className="py-2 text-right font-mono text-slate-200">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t border-slate-800 pt-3 space-y-1 text-right">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Total:</span>
                  <span className="font-mono">₹{selectedReceipt.totalAmount.toLocaleString()}</span>
                </div>
                {selectedReceipt.discount > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Discount:</span>
                    <span className="font-mono text-emerald-400">- ₹{selectedReceipt.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-slate-800">
                  <span>Total Paid Amount:</span>
                  <span className="font-mono text-cyan-400">₹{selectedReceipt.paidAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {isNewBillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Receipt className="w-6 h-6 text-cyan-400" /> Create Patient Invoice
              </h3>
              <button onClick={() => setNewBillModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateBill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Patient</label>
                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.uhid})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Item 1 Description</label>
                  <input
                    type="text"
                    value={item1Desc}
                    onChange={(e) => setItem1Desc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cost (₹)</label>
                  <input
                    type="number"
                    value={item1Cost}
                    onChange={(e) => setItem1Cost(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Item 2 Description</label>
                  <input
                    type="text"
                    value={item2Desc}
                    onChange={(e) => setItem2Desc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cost (₹)</label>
                  <input
                    type="number"
                    value={item2Cost}
                    onChange={(e) => setItem2Cost(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Concession / Discount (₹)</label>
                <input
                  type="number"
                  value={discountVal}
                  onChange={(e) => setDiscountVal(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewBillModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all"
                >
                  Save & Issue Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
