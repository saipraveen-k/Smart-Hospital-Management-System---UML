'use client';

import React, { useState } from 'react';
import { Users, Search, Plus, UserPlus, CheckCircle2, X } from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';

export default function DemoPatientsPage() {
  const { patients, addPatient } = useDemoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+ Positive');
  const [department, setDepartment] = useState('General Medicine');

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.uhid.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.department.toLowerCase().includes(q)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient({
      name,
      age: Number(age),
      gender,
      phone,
      email,
      address,
      emergencyContact,
      bloodGroup,
      department
    });
    setIsModalOpen(false);
    // Reset form
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" /> Patient Master Index (MPI)
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Patient</span>
          </button>
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Patient Management & Demographic Directory
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient by UHID, name, phone, department..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-xs font-mono text-gray-500 font-semibold">
          {filteredPatients.length} Active Patient Records
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="p-3.5">UHID</th>
              <th className="p-3.5">Patient Name</th>
              <th className="p-3.5">Age / Gender</th>
              <th className="p-3.5">Phone Contact</th>
              <th className="p-3.5">Blood Group</th>
              <th className="p-3.5">Department</th>
              <th className="p-3.5">Registered Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-[11px]">
            {filteredPatients.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition">
                <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">{p.uhid}</td>
                <td className="p-3.5 font-sans font-bold text-gray-900 dark:text-white">{p.name}</td>
                <td className="p-3.5 font-sans text-gray-600 dark:text-gray-300">{p.age} Yrs / {p.gender}</td>
                <td className="p-3.5 text-gray-600 dark:text-gray-300">{p.phone}</td>
                <td className="p-3.5 text-gray-600 dark:text-gray-300">{p.bloodGroup}</td>
                <td className="p-3.5 font-sans font-semibold text-gray-700 dark:text-gray-200">{p.department}</td>
                <td className="p-3.5 text-gray-500">{p.registeredDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <h3 className="text-xl font-extrabold">Register New Patient</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ananya Rao" className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} required className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Phone Number</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 98765 43210" className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="patient@example.com" className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Blood Group</label>
                  <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs" />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full street address" className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs" />
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md">
                  Register & Issue UHID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
