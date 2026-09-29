import { create } from 'zustand';
import {
  UserRole,
  DemoPatient,
  DemoDoctor,
  DemoAppointment,
  DemoLabOrder,
  DemoPrescription,
  DemoMedicine,
  DemoAdmission,
  DemoBed,
  DemoBill,
  DemoPayment,
  DemoNotification,
  DemoAuditLog
} from '@/types';
import {
  SEEDED_PATIENTS,
  SEEDED_DOCTORS,
  SEEDED_APPOINTMENTS,
  SEEDED_LAB_ORDERS,
  SEEDED_PRESCRIPTIONS,
  SEEDED_MEDICINES,
  SEEDED_ADMISSIONS,
  SEEDED_BEDS,
  SEEDED_BILLS,
  SEEDED_PAYMENTS,
  SEEDED_NOTIFICATIONS,
  SEEDED_AUDIT_LOGS
} from '@/data/demoData';

interface DemoStore {
  // Demo Role
  demoRole: UserRole;
  setDemoRole: (role: UserRole) => void;

  // Global UI States
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  isPresentationMode: boolean;
  setPresentationMode: (active: boolean) => void;
  presentationSlideIndex: number;
  setPresentationSlideIndex: (index: number | ((prev: number) => number)) => void;

  isDemoTourActive: boolean;
  setDemoTourActive: (active: boolean) => void;
  demoTourStep: number;
  setDemoTourStep: (step: number | ((prev: number) => number)) => void;

  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  isNotificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;

  // Data collections
  patients: DemoPatient[];
  doctors: DemoDoctor[];
  appointments: DemoAppointment[];
  labOrders: DemoLabOrder[];
  prescriptions: DemoPrescription[];
  medicines: DemoMedicine[];
  admissions: DemoAdmission[];
  beds: DemoBed[];
  bills: DemoBill[];
  payments: DemoPayment[];
  notifications: DemoNotification[];
  auditLogs: DemoAuditLog[];

  // Helper Logging Actions
  addAuditLog: (userRole: UserRole, action: string, entity: string, entityId: string) => void;
  addNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => void;

  // Store Actions
  addPatient: (patient: Omit<DemoPatient, 'id' | 'uhid' | 'registeredDate'>) => DemoPatient;
  bookAppointment: (appointment: Omit<DemoAppointment, 'id' | 'tokenNumber' | 'status'>) => DemoAppointment;
  checkInAppointment: (appointmentId: string) => void;
  updateAppointmentStatus: (appointmentId: string, status: DemoAppointment['status']) => void;

  addLabOrder: (order: Omit<DemoLabOrder, 'id' | 'orderDate' | 'status'>) => DemoLabOrder;
  updateLabOrderStatus: (orderId: string, status: DemoLabOrder['status'], result?: string, notes?: string) => void;

  addPrescription: (prescription: Omit<DemoPrescription, 'id' | 'date' | 'status'>) => DemoPrescription;
  dispensePrescription: (prescriptionId: string) => void;

  addAdmission: (admission: Omit<DemoAdmission, 'id' | 'admittedDate' | 'status'>) => DemoAdmission;
  allocateBed: (admissionId: string, bedId: string) => void;
  dischargeAdmission: (admissionId: string) => void;

  addBill: (bill: Omit<DemoBill, 'id' | 'billDate' | 'status' | 'paidAmount'>) => DemoBill;
  processPayment: (billId: string, amount: number, method: 'Cash' | 'Card' | 'UPI') => DemoPayment;
  cancelAppointment: (appointmentId: string) => void;

  addMedicine: (medicine: Omit<DemoMedicine, 'id'>) => DemoMedicine;
  updateMedicineStock: (medicineId: string, newStock: number) => void;
  updatePrescriptionStatus: (prescriptionId: string, status: DemoPrescription['status']) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  resetDemoState: () => void;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  demoRole: 'Admin',
  setDemoRole: (role) => {
    set({ demoRole: role });
    get().addAuditLog(role, `Switched view mode to ${role} role`, 'System', role);
  },

  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),

  isPresentationMode: false,
  setPresentationMode: (active) => set({ isPresentationMode: active }),
  presentationSlideIndex: 0,
  setPresentationSlideIndex: (updater) =>
    set((state) => ({
      presentationSlideIndex: typeof updater === 'function' ? updater(state.presentationSlideIndex) : updater
    })),

  isDemoTourActive: false,
  setDemoTourActive: (active) => set({ isDemoTourActive: active }),
  demoTourStep: 0,
  setDemoTourStep: (updater) =>
    set((state) => ({
      demoTourStep: typeof updater === 'function' ? updater(state.demoTourStep) : updater
    })),

  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  isNotificationDrawerOpen: false,
  setNotificationDrawerOpen: (open) => set({ isNotificationDrawerOpen: open }),

  // Data Collections
  patients: SEEDED_PATIENTS,
  doctors: SEEDED_DOCTORS,
  appointments: SEEDED_APPOINTMENTS,
  labOrders: SEEDED_LAB_ORDERS,
  prescriptions: SEEDED_PRESCRIPTIONS,
  medicines: SEEDED_MEDICINES,
  admissions: SEEDED_ADMISSIONS,
  beds: SEEDED_BEDS,
  bills: SEEDED_BILLS,
  payments: SEEDED_PAYMENTS,
  notifications: SEEDED_NOTIFICATIONS,
  auditLogs: SEEDED_AUDIT_LOGS,

  // Helper Logging Actions
  addAuditLog: (userRole: UserRole, action: string, entity: string, entityId: string) => {
    const count = get().auditLogs.length + 101;
    const newLog: DemoAuditLog = {
      id: `LOG-${count}`,
      timestamp: new Date().toLocaleString(),
      userRole,
      userName: `Demo ${userRole}`,
      action,
      entity,
      entityId,
      details: `${action} executed on ${entity} (${entityId})`
    };
    set((s) => ({ auditLogs: [newLog, ...s.auditLogs] }));
  },

  addNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => {
    const count = get().notifications.length + 1;
    const newNotif: DemoNotification = {
      id: `NOTIF-${String(count).padStart(2, '0')}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type
    };
    set((s) => ({ notifications: [newNotif, ...s.notifications] }));
  },

  // --- ACTIONS ---
  addPatient: (patientData) => {
    const state = get();
    const newNum = state.patients.length + 1001;
    const newId = `P-${newNum}`;
    const newPatient: DemoPatient = {
      ...patientData,
      id: newId,
      uhid: newId,
      registeredDate: new Date().toISOString().split('T')[0]
    };

    set((s) => ({ patients: [newPatient, ...s.patients] }));

    get().addAuditLog(state.demoRole, `Registered patient ${newPatient.name}`, 'Patient', newId);
    get().addNotification(
      'New Patient Registered',
      `Patient ${newPatient.name} (UHID ${newId}) registered successfully.`,
      'success'
    );

    return newPatient;
  },

  bookAppointment: (aptData) => {
    const state = get();
    const count = state.appointments.length + 1;
    const newId = `APT-2026-${String(count).padStart(3, '0')}`;
    const tokenNum = state.appointments.filter((a) => a.appointmentDate === aptData.appointmentDate).length + 1;

    const newAppointment: DemoAppointment = {
      ...aptData,
      id: newId,
      status: 'Confirmed',
      tokenNumber: tokenNum
    };

    set((s) => ({ appointments: [newAppointment, ...s.appointments] }));

    get().addAuditLog(state.demoRole, `Booked appointment ${newId} for ${aptData.patientName}`, 'Appointment', newId);
    get().addNotification(
      'Appointment Confirmed',
      `Appointment ${newId} booked for ${aptData.patientName} with ${aptData.doctorName}. Token #${tokenNum}.`,
      'info'
    );

    return newAppointment;
  },

  checkInAppointment: (appointmentId) => {
    const state = get();
    set((s) => ({
      appointments: s.appointments.map((a) => (a.id === appointmentId ? { ...a, status: 'Checked In' } : a))
    }));
    const apt = state.appointments.find((a) => a.id === appointmentId);
    if (apt) {
      get().addAuditLog(state.demoRole, `Checked in patient ${apt.patientName}`, 'Appointment', appointmentId);
      get().addNotification(
        'Patient Checked In',
        `Patient ${apt.patientName} checked in. Token #${apt.tokenNumber} in queue.`,
        'info'
      );
    }
  },

  updateAppointmentStatus: (appointmentId, status) => {
    set((s) => ({
      appointments: s.appointments.map((a) => (a.id === appointmentId ? { ...a, status } : a))
    }));
  },

  addLabOrder: (orderData) => {
    const state = get();
    const newId = `LR-2026-${String(state.labOrders.length + 1).padStart(3, '0')}`;
    const newOrder: DemoLabOrder = {
      ...orderData,
      id: newId,
      orderDate: new Date().toLocaleString(),
      status: 'Requested'
    };

    set((s) => ({ labOrders: [newOrder, ...s.labOrders] }));

    get().addAuditLog(state.demoRole, `Requested lab test ${orderData.testName}`, 'LabOrder', newId);
    get().addNotification(
      'New Lab Test Order',
      `Lab test ${orderData.testName} ordered for ${orderData.patientName}.`,
      'info'
    );

    return newOrder;
  },

  updateLabOrderStatus: (orderId, status, result, notes) => {
    const state = get();
    set((s) => ({
      labOrders: s.labOrders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              ...(result ? { result } : {}),
              ...(notes ? { notes } : {})
            }
          : o
      )
    }));

    const order = state.labOrders.find((o) => o.id === orderId);
    if (order) {
      get().addAuditLog(state.demoRole, `Updated lab order ${orderId} state to ${status}`, 'LabOrder', orderId);
      if (status === 'Approved') {
        get().addNotification(
          'Lab Report Approved',
          `Diagnostic lab report ${orderId} (${order.testName}) has been approved by pathologist.`,
          'success'
        );
      }
    }
  },

  addPrescription: (rxData) => {
    const state = get();
    const newId = `RX-2026-${String(state.prescriptions.length + 1).padStart(3, '0')}`;
    const newRx: DemoPrescription = {
      ...rxData,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      status: 'Created'
    };

    set((s) => ({ prescriptions: [newRx, ...s.prescriptions] }));

    get().addAuditLog(state.demoRole, `Created prescription ${newId}`, 'Prescription', newId);
    get().addNotification(
      'Prescription Issued',
      `New digital prescription ${newId} issued for ${rxData.patientName}.`,
      'info'
    );

    return newRx;
  },

  dispensePrescription: (prescriptionId) => {
    const state = get();
    const rx = state.prescriptions.find((r) => r.id === prescriptionId);

    set((s) => ({
      prescriptions: s.prescriptions.map((r) => (r.id === prescriptionId ? { ...r, status: 'Dispensed' } : r))
    }));

    if (rx) {
      rx.medicines.forEach((medItem) => {
        set((s) => ({
          medicines: s.medicines.map((m) =>
            m.name.toLowerCase().includes(medItem.medicineName.toLowerCase())
              ? { ...m, stock: Math.max(0, m.stock - medItem.qty) }
              : m
          )
        }));
      });

      get().addAuditLog(state.demoRole, `Dispensed prescription ${prescriptionId}`, 'Prescription', prescriptionId);
      get().addNotification(
        'Medicines Dispensed',
        `Prescription ${prescriptionId} dispensed to ${rx.patientName}. Inventory stock updated.`,
        'success'
      );
    }
  },

  addAdmission: (admData) => {
    const state = get();
    const newId = `ADM-2026-${String(state.admissions.length + 1).padStart(3, '0')}`;
    const newAdm: DemoAdmission = {
      ...admData,
      id: newId,
      admittedDate: new Date().toLocaleString(),
      status: 'Admitted'
    };

    set((s) => ({ admissions: [newAdm, ...s.admissions] }));

    get().addAuditLog(state.demoRole, `Initiated admission ${newId}`, 'Admission', newId);
    get().addNotification(
      'Inpatient Admission Initiated',
      `Admission ${newId} created for ${admData.patientName} in ${admData.ward}.`,
      'info'
    );

    return newAdm;
  },

  allocateBed: (admissionId, bedId) => {
    const state = get();
    const bed = state.beds.find((b) => b.id === bedId);

    set((s) => ({
      admissions: s.admissions.map((a) =>
        a.id === admissionId ? { ...a, bedNumber: bed ? bed.bedNumber : bedId, status: 'Bed Allocated' } : a
      ),
      beds: s.beds.map((b) => (b.id === bedId ? { ...b, status: 'Occupied' } : b))
    }));

    get().addAuditLog(state.demoRole, `Allocated bed ${bedId} to admission ${admissionId}`, 'Bed', bedId);
    get().addNotification('Bed Allocated', `Bed ${bed ? bed.bedNumber : bedId} allocated for admission ${admissionId}.`, 'success');
  },

  dischargeAdmission: (admissionId) => {
    const state = get();
    const adm = state.admissions.find((a) => a.id === admissionId);

    set((s) => ({
      admissions: s.admissions.map((a) =>
        a.id === admissionId
          ? { ...a, status: 'Discharged', dischargedDate: new Date().toLocaleString() }
          : a
      ),
      beds: s.beds.map((b) => (adm && b.bedNumber === adm.bedNumber ? { ...b, status: 'Available' } : b))
    }));

    if (adm) {
      get().addAuditLog(state.demoRole, `Discharged inpatient ${adm.patientName}`, 'Admission', admissionId);
      get().addNotification(
        'Discharge Complete',
        `Inpatient discharge completed for ${adm.patientName}. Bed ${adm.bedNumber} released.`,
        'success'
      );
    }
  },

  addBill: (billData) => {
    const state = get();
    const newId = `BILL-2026-${String(state.bills.length + 1).padStart(3, '0')}`;
    const newBill: DemoBill = {
      ...billData,
      id: newId,
      billDate: new Date().toISOString().split('T')[0],
      paidAmount: 0,
      status: 'Pending'
    };
    set((s) => ({ bills: [newBill, ...s.bills] }));

    get().addAuditLog(state.demoRole, `Generated bill ${newId} for ₹${newBill.netAmount}`, 'Bill', newId);
    get().addNotification(
      'New Invoice Issued',
      `Bill ${newId} issued for ${newBill.patientName} (Amount: ₹${newBill.netAmount.toLocaleString()}).`,
      'info'
    );
    return newBill;
  },

  processPayment: (billId, amount, method) => {
    const state = get();
    const count = state.payments.length + 1;
    const payId = `PAY-2026-${String(count).padStart(3, '0')}`;
    const txnId = `TXN-${method}-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const bill = state.bills.find((b) => b.id === billId);
    const newPay: DemoPayment = {
      id: payId,
      billId,
      patientId: bill ? bill.patientId : 'P-1001',
      patientName: bill ? bill.patientName : 'Patient',
      amount,
      paymentMethod: method,
      transactionId: txnId,
      paymentDate: new Date().toLocaleString(),
      status: 'Success'
    };

    set((s) => ({
      payments: [newPay, ...s.payments],
      bills: s.bills.map((b) => {
        if (b.id === billId) {
          const newPaid = b.paidAmount + amount;
          const newStatus = newPaid >= b.netAmount ? 'Paid' : 'Partially Paid';
          return { ...b, paidAmount: newPaid, status: newStatus };
        }
        return b;
      })
    }));

    get().addAuditLog(
      state.demoRole,
      `Processed payment of ₹${amount} via ${method} for ${billId}`,
      'Payment',
      payId
    );
    get().addNotification(
      'Payment Received',
      `Payment of ₹${amount.toLocaleString()} received via ${method}. Transaction ID: ${txnId}.`,
      'success'
    );

    return newPay;
  },

  cancelAppointment: (appointmentId) => {
    const state = get();
    const apt = state.appointments.find((a) => a.id === appointmentId);
    set((s) => ({
      appointments: s.appointments.map((a) => (a.id === appointmentId ? { ...a, status: 'Cancelled' } : a))
    }));
    if (apt) {
      get().addAuditLog(state.demoRole, `Cancelled appointment ${appointmentId}`, 'Appointment', appointmentId);
      get().addNotification('Appointment Cancelled', `Appointment ${appointmentId} for ${apt.patientName} was cancelled.`, 'warning');
    }
  },

  addMedicine: (medData) => {
    const state = get();
    const newId = `M-${state.medicines.length + 101}`;
    const newMed: DemoMedicine = {
      ...medData,
      id: newId
    };
    set((s) => ({ medicines: [newMed, ...s.medicines] }));
    get().addAuditLog(state.demoRole, `Added new medicine item ${newMed.name}`, 'Medicine', newId);
    get().addNotification('Inventory Updated', `Medicine ${newMed.name} added to pharmacy inventory.`, 'success');
    return newMed;
  },

  updateMedicineStock: (medicineId, newStock) => {
    const state = get();
    const med = state.medicines.find((m) => m.id === medicineId);
    set((s) => ({
      medicines: s.medicines.map((m) => (m.id === medicineId ? { ...m, stock: newStock } : m))
    }));
    if (med) {
      get().addAuditLog(state.demoRole, `Updated stock for ${med.name} to ${newStock}`, 'Medicine', medicineId);
    }
  },

  updatePrescriptionStatus: (prescriptionId, status) => {
    const state = get();
    set((s) => ({
      prescriptions: s.prescriptions.map((r) => (r.id === prescriptionId ? { ...r, status } : r))
    }));
    get().addAuditLog(state.demoRole, `Updated prescription ${prescriptionId} status to ${status}`, 'Prescription', prescriptionId);
  },

  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    })),

  markAllNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true }))
    })),

  resetDemoState: () =>
    set({
      patients: SEEDED_PATIENTS,
      doctors: SEEDED_DOCTORS,
      appointments: SEEDED_APPOINTMENTS,
      labOrders: SEEDED_LAB_ORDERS,
      prescriptions: SEEDED_PRESCRIPTIONS,
      medicines: SEEDED_MEDICINES,
      admissions: SEEDED_ADMISSIONS,
      beds: SEEDED_BEDS,
      bills: SEEDED_BILLS,
      payments: SEEDED_PAYMENTS,
      notifications: SEEDED_NOTIFICATIONS,
      auditLogs: SEEDED_AUDIT_LOGS
    })
}));
