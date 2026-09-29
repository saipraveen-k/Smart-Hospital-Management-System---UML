import {
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

export const SEEDED_PATIENTS: DemoPatient[] = [
  {
    id: 'P-1001',
    uhid: 'P-1001',
    name: 'Ananya Rao',
    age: 24,
    gender: 'Female',
    phone: '+91 98765 43210',
    email: 'ananya.rao@example.com',
    address: '42 Jubliee Hills, Road No 10, Hyderabad',
    emergencyContact: 'Ramesh Rao (+91 98765 43211)',
    bloodGroup: 'O+ Positive',
    registeredDate: '2026-09-10',
    department: 'General Medicine'
  },
  {
    id: 'P-1002',
    uhid: 'P-1002',
    name: 'Rahul Kumar',
    age: 46,
    gender: 'Male',
    phone: '+91 98123 45678',
    email: 'rahul.kumar@example.com',
    address: '15 Indiranagar, 10th Main, Bengaluru',
    emergencyContact: 'Sunita Kumar (+91 98123 45679)',
    bloodGroup: 'B+ Positive',
    registeredDate: '2026-09-12',
    department: 'Cardiology'
  },
  {
    id: 'P-1003',
    uhid: 'P-1003',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    phone: '+91 97654 32109',
    email: 'priya.sharma@example.com',
    address: '88 Powai Lake Road, Mumbai',
    emergencyContact: 'Amit Sharma (+91 97654 32110)',
    bloodGroup: 'A+ Positive',
    registeredDate: '2026-09-15',
    department: 'Orthopedics'
  },
  {
    id: 'P-1004',
    uhid: 'P-1004',
    name: 'Vikram Singh',
    age: 58,
    gender: 'Male',
    phone: '+91 96543 21098',
    email: 'vikram.singh@example.com',
    address: '12 Sector 17, Chandigarh',
    emergencyContact: 'Kavita Singh (+91 96543 21099)',
    bloodGroup: 'AB+ Positive',
    registeredDate: '2026-09-18',
    department: 'Neurology'
  },
  {
    id: 'P-1005',
    uhid: 'P-1005',
    name: 'Meera Patel',
    age: 29,
    gender: 'Female',
    phone: '+91 95432 10987',
    email: 'meera.patel@example.com',
    address: '77 Satellite Enclave, Ahmedabad',
    emergencyContact: 'Sanjay Patel (+91 95432 10988)',
    bloodGroup: 'O- Negative',
    registeredDate: '2026-09-20',
    department: 'Gynaecology'
  },
  {
    id: 'P-1006',
    uhid: 'P-1006',
    name: 'Rajesh Iyer',
    age: 62,
    gender: 'Male',
    phone: '+91 94321 09876',
    email: 'rajesh.iyer@example.com',
    address: '34 T Nagar, Chennai',
    emergencyContact: 'Lakshmi Iyer (+91 94321 09877)',
    bloodGroup: 'B- Negative',
    registeredDate: '2026-09-22',
    department: 'Cardiology'
  },
  {
    id: 'P-1007',
    uhid: 'P-1007',
    name: 'Kavita Reddy',
    age: 39,
    gender: 'Female',
    phone: '+91 93210 98765',
    email: 'kavita.reddy@example.com',
    address: '56 Gachibowli, Hyderabad',
    emergencyContact: 'Pradeep Reddy (+91 93210 98766)',
    bloodGroup: 'A- Negative',
    registeredDate: '2026-09-24',
    department: 'General Medicine'
  },
  {
    id: 'P-1008',
    uhid: 'P-1008',
    name: 'Amit Verma',
    age: 51,
    gender: 'Male',
    phone: '+91 92109 87654',
    email: 'amit.verma@example.com',
    address: '90 Vasant Kunj, New Delhi',
    emergencyContact: 'Neha Verma (+91 92109 87655)',
    bloodGroup: 'AB- Negative',
    registeredDate: '2026-09-26',
    department: 'Orthopedics'
  }
];

export const SEEDED_DOCTORS: DemoDoctor[] = [
  {
    id: 'DR-101',
    name: 'Dr. Arjun Rao',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    experience: '15 Years',
    room: 'Consultation Room 102',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Available'
  },
  {
    id: 'DR-102',
    name: 'Dr. Sneha Reddy',
    department: 'General Medicine',
    specialization: 'Internal Medicine & Diabetology',
    experience: '12 Years',
    room: 'Consultation Room 105',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    status: 'Available'
  },
  {
    id: 'DR-103',
    name: 'Dr. Vikram Kumar',
    department: 'Orthopedics',
    specialization: 'Joint Replacement & Trauma',
    experience: '18 Years',
    room: 'Consultation Room 201',
    availableDays: ['Tue', 'Thu', 'Sat'],
    status: 'In Consultation'
  },
  {
    id: 'DR-104',
    name: 'Dr. Ananya Sen',
    department: 'Neurology',
    specialization: 'Neuro-Pathology & Epilepsy',
    experience: '10 Years',
    room: 'Consultation Room 304',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    status: 'Available'
  },
  {
    id: 'DR-105',
    name: 'Dr. Rajesh Deshmukh',
    department: 'Pediatrics',
    specialization: 'Pediatric Care & Neonatology',
    experience: '14 Years',
    room: 'Consultation Room 108',
    availableDays: ['Wed', 'Thu', 'Fri', 'Sat'],
    status: 'Available'
  },
  {
    id: 'DR-106',
    name: 'Dr. Pooja Nair',
    department: 'Gynaecology',
    specialization: 'Obstetrics & Maternal Care',
    experience: '11 Years',
    room: 'Consultation Room 210',
    availableDays: ['Mon', 'Wed', 'Sat'],
    status: 'Available'
  }
];

export const SEEDED_APPOINTMENTS: DemoAppointment[] = [
  {
    id: 'APT-2026-001',
    patientId: 'P-1001',
    patientName: 'Ananya Rao',
    doctorId: 'DR-102',
    doctorName: 'Dr. Sneha Reddy',
    department: 'General Medicine',
    appointmentDate: '2026-09-29',
    appointmentTime: '09:30 AM',
    status: 'Completed',
    tokenNumber: 1,
    symptoms: 'Mild fever, seasonal allergy, body ache',
    notes: 'Prescribed Paracetamol 500mg and Cetirizine.'
  },
  {
    id: 'APT-2026-002',
    patientId: 'P-1002',
    patientName: 'Rahul Kumar',
    doctorId: 'DR-101',
    doctorName: 'Dr. Arjun Rao',
    department: 'Cardiology',
    appointmentDate: '2026-09-29',
    appointmentTime: '10:15 AM',
    status: 'In Consultation',
    tokenNumber: 2,
    symptoms: 'Chest tightness on exertion, mild shortness of breath',
    notes: 'Requested ECG & Lipid Profile diagnostic tests.'
  },
  {
    id: 'APT-2026-003',
    patientId: 'P-1003',
    patientName: 'Priya Sharma',
    doctorId: 'DR-103',
    doctorName: 'Dr. Vikram Kumar',
    department: 'Orthopedics',
    appointmentDate: '2026-09-29',
    appointmentTime: '11:00 AM',
    status: 'Checked In',
    tokenNumber: 3,
    symptoms: 'Right knee pain after sports activity'
  },
  {
    id: 'APT-2026-004',
    patientId: 'P-1004',
    patientName: 'Vikram Singh',
    doctorId: 'DR-104',
    doctorName: 'Dr. Ananya Sen',
    department: 'Neurology',
    appointmentDate: '2026-09-29',
    appointmentTime: '11:45 AM',
    status: 'Confirmed',
    tokenNumber: 4,
    symptoms: 'Recurrent migraine headaches'
  },
  {
    id: 'APT-2026-005',
    patientId: 'P-1005',
    patientName: 'Meera Patel',
    doctorId: 'DR-106',
    doctorName: 'Dr. Pooja Nair',
    department: 'Gynaecology',
    appointmentDate: '2026-09-29',
    appointmentTime: '02:00 PM',
    status: 'Confirmed',
    tokenNumber: 5,
    symptoms: 'Routine trimester antenatal checkup'
  },
  {
    id: 'APT-2026-006',
    patientId: 'P-1006',
    patientName: 'Rajesh Iyer',
    doctorId: 'DR-101',
    doctorName: 'Dr. Arjun Rao',
    department: 'Cardiology',
    appointmentDate: '2026-09-30',
    appointmentTime: '10:00 AM',
    status: 'Confirmed',
    tokenNumber: 1,
    symptoms: 'Post-angioplasty follow-up'
  }
];

export const SEEDED_LAB_ORDERS: DemoLabOrder[] = [
  {
    id: 'LR-2026-001',
    patientId: 'P-1002',
    patientName: 'Rahul Kumar',
    doctorId: 'DR-101',
    doctorName: 'Dr. Arjun Rao',
    testName: 'Lipid Profile & Serum Cholesterol',
    orderDate: '2026-09-29 10:20 AM',
    status: 'Approved',
    result: 'Total Cholesterol: 215 mg/dL (Elevated), HDL: 42 mg/dL, Triglycerides: 180 mg/dL',
    referenceRange: 'Total Cholesterol < 200 mg/dL, HDL > 40 mg/dL',
    notes: 'Slight hyperlipidemia. Dietary modification advised.'
  },
  {
    id: 'LR-2026-002',
    patientId: 'P-1001',
    patientName: 'Ananya Rao',
    doctorId: 'DR-102',
    doctorName: 'Dr. Sneha Reddy',
    testName: 'Complete Blood Count (CBC)',
    orderDate: '2026-09-29 09:40 AM',
    status: 'Approved',
    result: 'WBC: 6,800 /uL, Hemoglobin: 13.5 g/dL, Platelets: 250,000 /uL',
    referenceRange: 'WBC 4,500-11,000 /uL, Hb 12-15 g/dL',
    notes: 'Normal physiological range.'
  },
  {
    id: 'LR-2026-003',
    patientId: 'P-1003',
    patientName: 'Priya Sharma',
    doctorId: 'DR-103',
    doctorName: 'Dr. Vikram Kumar',
    testName: 'Right Knee Digital X-Ray (AP & Lateral)',
    orderDate: '2026-09-29 11:15 AM',
    status: 'Processing',
    notes: 'Radiology imaging under processing.'
  },
  {
    id: 'LR-2026-004',
    patientId: 'P-1004',
    patientName: 'Vikram Singh',
    doctorId: 'DR-104',
    doctorName: 'Dr. Ananya Sen',
    testName: 'Brain MRI Non-Contrast',
    orderDate: '2026-09-29 11:50 AM',
    status: 'Sample Collected',
    notes: 'Patient positioned in MRI suite.'
  },
  {
    id: 'LR-2026-005',
    patientId: 'P-1006',
    patientName: 'Rajesh Iyer',
    doctorId: 'DR-101',
    doctorName: 'Dr. Arjun Rao',
    testName: '12-Lead Electrocardiogram (ECG)',
    orderDate: '2026-09-28 04:30 PM',
    status: 'Approved',
    result: 'Normal sinus rhythm, Rate 72 bpm, No acute ST-T wave changes.',
    referenceRange: 'Rate 60-100 bpm',
    notes: 'Stable post-intervention tracing.'
  }
];

export const SEEDED_PRESCRIPTIONS: DemoPrescription[] = [
  {
    id: 'RX-2026-001',
    patientId: 'P-1001',
    patientName: 'Ananya Rao',
    doctorId: 'DR-102',
    doctorName: 'Dr. Sneha Reddy',
    date: '2026-09-29',
    medicines: [
      { medicineName: 'Paracetamol 500mg', dosage: '500mg', frequency: '1-0-1 after meals', duration: '5 days', qty: 10 },
      { medicineName: 'Cetirizine 10mg', dosage: '10mg', frequency: '0-0-1 at night', duration: '5 days', qty: 5 }
    ],
    status: 'Dispensed',
    instructions: 'Drink plenty of fluids and rest.'
  },
  {
    id: 'RX-2026-002',
    patientId: 'P-1002',
    patientName: 'Rahul Kumar',
    doctorId: 'DR-101',
    doctorName: 'Dr. Arjun Rao',
    date: '2026-09-29',
    medicines: [
      { medicineName: 'Atorvastatin 10mg', dosage: '10mg', frequency: '0-0-1 after dinner', duration: '30 days', qty: 30 },
      { medicineName: 'Amlodipine 5mg', dosage: '5mg', frequency: '1-0-0 morning', duration: '30 days', qty: 30 }
    ],
    status: 'Verified',
    instructions: 'Monitor blood pressure weekly.'
  },
  {
    id: 'RX-2026-003',
    patientId: 'P-1003',
    patientName: 'Priya Sharma',
    doctorId: 'DR-103',
    doctorName: 'Dr. Vikram Kumar',
    date: '2026-09-29',
    medicines: [
      { medicineName: 'Ibuprofen 400mg', dosage: '400mg', frequency: '1-0-1 after meals', duration: '3 days', qty: 6 }
    ],
    status: 'Created',
    instructions: 'Apply cold ice gel pack on knee twice daily.'
  }
];

export const SEEDED_MEDICINES: DemoMedicine[] = [
  {
    id: 'M-101',
    name: 'Paracetamol 500mg',
    category: 'Analgesic & Antipyretic',
    stock: 450,
    unitPrice: 15.0,
    reorderLevel: 100,
    expiryDate: '2028-06-30',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-102',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    stock: 120,
    unitPrice: 45.0,
    reorderLevel: 50,
    expiryDate: '2027-11-15',
    dosageForm: 'Capsule'
  },
  {
    id: 'M-103',
    name: 'Azithromycin 500mg',
    category: 'Macrolide Antibiotic',
    stock: 35,
    unitPrice: 85.0,
    reorderLevel: 50,
    expiryDate: '2027-08-20',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-104',
    name: 'Omeprazole 20mg',
    category: 'Proton Pump Inhibitor',
    stock: 210,
    unitPrice: 30.0,
    reorderLevel: 60,
    expiryDate: '2028-01-10',
    dosageForm: 'Capsule'
  },
  {
    id: 'M-105',
    name: 'Cetirizine 10mg',
    category: 'Antihistamine',
    stock: 320,
    unitPrice: 12.0,
    reorderLevel: 80,
    expiryDate: '2028-04-25',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-106',
    name: 'Atorvastatin 10mg',
    category: 'Lipid Lowering Agent',
    stock: 180,
    unitPrice: 65.0,
    reorderLevel: 40,
    expiryDate: '2027-12-31',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-107',
    name: 'Metformin 500mg',
    category: 'Oral Hypoglycemic',
    stock: 500,
    unitPrice: 20.0,
    reorderLevel: 100,
    expiryDate: '2028-09-30',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-108',
    name: 'Pantoprazole 40mg',
    category: 'Antacid',
    stock: 240,
    unitPrice: 38.0,
    reorderLevel: 50,
    expiryDate: '2028-03-15',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-109',
    name: 'Amlodipine 5mg',
    category: 'Antihypertensive',
    stock: 190,
    unitPrice: 25.0,
    reorderLevel: 40,
    expiryDate: '2028-07-20',
    dosageForm: 'Tablet'
  },
  {
    id: 'M-110',
    name: 'Ibuprofen 400mg',
    category: 'NSAID Painkiller',
    stock: 280,
    unitPrice: 18.0,
    reorderLevel: 60,
    expiryDate: '2027-10-10',
    dosageForm: 'Tablet'
  }
];

export const SEEDED_ADMISSIONS: DemoAdmission[] = [
  {
    id: 'ADM-2026-001',
    patientId: 'P-1006',
    patientName: 'Rajesh Iyer',
    ward: 'Intensive Care Unit (ICU)',
    bedNumber: 'BED-ICU-02',
    admittedDate: '2026-09-25 08:30 AM',
    attendingDoctor: 'Dr. Arjun Rao',
    diagnosis: 'Acute Coronary Syndrome - Post Angioplasty Observation',
    status: 'Under Treatment'
  },
  {
    id: 'ADM-2026-002',
    patientId: 'P-1004',
    patientName: 'Vikram Singh',
    ward: 'Private Suite Ward',
    bedNumber: 'BED-PVT-104',
    admittedDate: '2026-09-27 02:15 PM',
    attendingDoctor: 'Dr. Ananya Sen',
    diagnosis: 'Severe Intractable Migraine & Status Epilepticus Workup',
    status: 'Bed Allocated'
  },
  {
    id: 'ADM-2026-003',
    patientId: 'P-1008',
    patientName: 'Amit Verma',
    ward: 'General Ortho Ward',
    bedNumber: 'BED-GEN-208',
    admittedDate: '2026-09-20 10:00 AM',
    dischargedDate: '2026-09-26 05:00 PM',
    attendingDoctor: 'Dr. Vikram Kumar',
    diagnosis: 'Left Femur Fracture - Post Fixation Surgery',
    status: 'Discharged'
  }
];

export const SEEDED_BEDS: DemoBed[] = [
  { id: 'BED-ICU-01', bedNumber: 'ICU-01', status: 'Available' },
  { id: 'BED-ICU-02', bedNumber: 'ICU-02', status: 'Occupied' },
  { id: 'BED-ICU-03', bedNumber: 'ICU-03', status: 'Available' },
  { id: 'BED-PVT-101', bedNumber: 'PVT-101', status: 'Available' },
  { id: 'BED-PVT-104', bedNumber: 'PVT-104', status: 'Occupied' },
  { id: 'BED-GEN-201', bedNumber: 'GEN-201', status: 'Available' },
  { id: 'BED-GEN-202', bedNumber: 'GEN-202', status: 'Available' },
  { id: 'BED-GEN-208', bedNumber: 'GEN-208', status: 'Under Maintenance' }
];

export const SEEDED_BILLS: DemoBill[] = [
  {
    id: 'BILL-2026-001',
    patientId: 'P-1001',
    patientName: 'Ananya Rao',
    billDate: '2026-09-29',
    items: [
      { description: 'Outpatient Consultation Fee (Dr. Sneha Reddy)', amount: 500, category: 'Consultation' },
      { description: 'Complete Blood Count (CBC)', amount: 450, category: 'Laboratory' },
      { description: 'Pharmacy Dispensing (Paracetamol & Cetirizine)', amount: 120, category: 'Pharmacy' }
    ],
    totalAmount: 1070,
    discount: 70,
    netAmount: 1000,
    paidAmount: 1000,
    status: 'Paid'
  },
  {
    id: 'BILL-2026-002',
    patientId: 'P-1002',
    patientName: 'Rahul Kumar',
    billDate: '2026-09-29',
    items: [
      { description: 'Cardiology Consultation Fee (Dr. Arjun Rao)', amount: 800, category: 'Consultation' },
      { description: 'Lipid Profile & Serum Cholesterol', amount: 950, category: 'Laboratory' },
      { description: 'Pharmacy Items (Atorvastatin & Amlodipine)', amount: 650, category: 'Pharmacy' }
    ],
    totalAmount: 2400,
    discount: 0,
    netAmount: 2400,
    paidAmount: 0,
    status: 'Pending'
  },
  {
    id: 'BILL-2026-003',
    patientId: 'P-1006',
    patientName: 'Rajesh Iyer',
    billDate: '2026-09-28',
    items: [
      { description: 'ICU Bed Charges (4 Days @ Rs. 5000/day)', amount: 20000, category: 'Inpatient' },
      { description: 'Cardiac Diagnostics & Angioplasty Monitoring', amount: 15000, category: 'Laboratory' },
      { description: 'Inpatient Clinical Pharmacy Orders', amount: 3500, category: 'Pharmacy' }
    ],
    totalAmount: 38500,
    discount: 3500,
    netAmount: 35000,
    paidAmount: 20000,
    status: 'Partially Paid'
  }
];

export const SEEDED_PAYMENTS: DemoPayment[] = [
  {
    id: 'PAY-2026-001',
    billId: 'BILL-2026-001',
    patientId: 'P-1001',
    patientName: 'Ananya Rao',
    amount: 1000,
    paymentMethod: 'UPI',
    transactionId: 'TXN-UPI-987654321',
    paymentDate: '2026-09-29 10:15 AM',
    status: 'Success'
  },
  {
    id: 'PAY-2026-002',
    billId: 'BILL-2026-003',
    patientId: 'P-1006',
    patientName: 'Rajesh Iyer',
    amount: 20000,
    paymentMethod: 'Card',
    transactionId: 'TXN-CARD-44556677',
    paymentDate: '2026-09-26 11:30 AM',
    status: 'Success'
  }
];

export const SEEDED_NOTIFICATIONS: DemoNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Appointment Confirmed',
    message: 'Appointment APT-2026-001 for Ananya Rao with Dr. Sneha Reddy is confirmed.',
    timestamp: '10 mins ago',
    read: false,
    type: 'success'
  },
  {
    id: 'NOTIF-02',
    title: 'Lab Report Approved',
    message: 'Diagnostic Lab Report LR-2026-001 (Rahul Kumar - Lipid Profile) has been approved by pathologist.',
    timestamp: '25 mins ago',
    read: false,
    type: 'info'
  },
  {
    id: 'NOTIF-03',
    title: 'Payment Received',
    message: 'Payment of ₹1,000 received for BILL-2026-001 via UPI.',
    timestamp: '1 hour ago',
    read: true,
    type: 'success'
  },
  {
    id: 'NOTIF-04',
    title: 'Low Stock Inventory Alert',
    message: 'Medicine Azithromycin 500mg (M-103) stock (35 units) dropped below reorder threshold (50 units).',
    timestamp: '2 hours ago',
    read: false,
    type: 'warning'
  }
];

export const SEEDED_AUDIT_LOGS: DemoAuditLog[] = [
  {
    id: 'LOG-101',
    timestamp: '2026-09-29 09:30:12',
    userRole: 'Receptionist',
    userName: 'Front Desk Operator',
    action: 'REGISTER_PATIENT',
    entity: 'Patient',
    entityId: 'P-1001',
    details: 'Registered new patient profile Ananya Rao (UHID: P-1001)'
  },
  {
    id: 'LOG-102',
    timestamp: '2026-09-29 09:35:44',
    userRole: 'Patient',
    userName: 'Ananya Rao',
    action: 'BOOK_APPOINTMENT',
    entity: 'Appointment',
    entityId: 'APT-2026-001',
    details: 'Booked slot 09:30 AM with Dr. Sneha Reddy'
  },
  {
    id: 'LOG-103',
    timestamp: '2026-09-29 09:45:00',
    userRole: 'Doctor',
    userName: 'Dr. Sneha Reddy',
    action: 'CREATE_PRESCRIPTION',
    entity: 'Prescription',
    entityId: 'RX-2026-001',
    details: 'Issued digital prescription containing Paracetamol and Cetirizine'
  },
  {
    id: 'LOG-104',
    timestamp: '2026-09-29 10:15:30',
    userRole: 'Cashier',
    userName: 'Cashier Desk 1',
    action: 'PROCESS_PAYMENT',
    entity: 'Payment',
    entityId: 'PAY-2026-001',
    details: 'Processed payment of ₹1,000 for BILL-2026-001 via UPI'
  },
  {
    id: 'LOG-105',
    timestamp: '2026-09-29 10:20:15',
    userRole: 'Lab Technician',
    userName: 'Pathology Lab Tech',
    action: 'APPROVE_LAB_REPORT',
    entity: 'LabReport',
    entityId: 'LR-2026-001',
    details: 'Approved diagnostic report for Lipid Profile (Rahul Kumar)'
  }
];
