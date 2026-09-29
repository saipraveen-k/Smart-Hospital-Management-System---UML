import { SystemModule } from '@/types';

export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: 'patient-registration',
    name: 'Patient Registration Module',
    code: 'MOD-01',
    description: 'Handles master patient index management, registration of new walk-in and online patients, issuing Universal Health Identifiers (UHID), demographic management, and emergency contacts.',
    icon: 'UserPlus',
    responsibilities: [
      'Register new walk-in and online patients',
      'Generate unique Universal Health Identifier (UHID P-XXXX)',
      'Manage patient demographic details & emergency contacts',
      'Maintain Master Patient Index (MPI)',
      'Search existing patient records'
    ],
    actors: ['Patient', 'Receptionist', 'Admin'],
    requirements: ['FR-01', 'FR-02', 'FR-03'],
    useCases: ['UC-01', 'UC-02', 'UC-11', 'UC-12'],
    diagrams: ['EXP5-SSD-01', 'EXP5-HLSD-01', 'EXP6-DSD-01', 'EXP6-COM-01', 'EXP8-ACT-01']
  },
  {
    id: 'appointment-op',
    name: 'Appointment & Outpatient Module',
    code: 'MOD-02',
    description: 'Manages doctor slot schedules, online and desk appointment bookings, outpatient check-ins, real-time token queue generation, and clinical consultations.',
    icon: 'Calendar',
    responsibilities: [
      'Manage doctor availability schedules and department slots',
      'Book, reschedule, or cancel outpatient appointments',
      'Process OP check-ins upon patient arrival',
      'Generate sequential token numbers for consultation queue',
      'Record consultation notes, vitals, and diagnoses'
    ],
    actors: ['Patient', 'Receptionist', 'Doctor'],
    requirements: ['FR-04', 'FR-05', 'FR-06', 'FR-07', 'FR-08', 'FR-09', 'FR-24'],
    useCases: ['UC-03', 'UC-04', 'UC-05', 'UC-13', 'UC-14', 'UC-15', 'UC-20', 'UC-21', 'UC-27'],
    diagrams: ['EXP5-SSD-02', 'EXP5-SSD-03', 'EXP5-SSD-04', 'EXP6-DSD-02', 'EXP6-DSD-03', 'EXP8-ACT-02', 'EXP8-ACT-03', 'EXP8-STM-01']
  },
  {
    id: 'ip-management',
    name: 'Inpatient Management Module',
    code: 'MOD-03',
    description: 'Orchestrates emergency and elective inpatient admissions, ward and bed allocation, daily clinical round documentation, treatment plans, and discharge clearance.',
    icon: 'Bed',
    responsibilities: [
      'Process inpatient admission requests from emergency or doctor recommendations',
      'Allocate available ward beds (ICU, General Ward, Private Suite)',
      'Maintain real-time bed status (Available, Occupied, Under Maintenance)',
      'Document daily treatment plans and clinical progress notes',
      'Execute discharge clearance workflow'
    ],
    actors: ['Doctor', 'Receptionist', 'Admin'],
    requirements: ['FR-15', 'FR-16', 'FR-17', 'FR-23'],
    useCases: ['UC-16', 'UC-17', 'UC-18', 'UC-25', 'UC-26', 'UC-28'],
    diagrams: ['EXP5-SSD-07', 'EXP5-SSD-09', 'EXP6-DSD-06', 'EXP6-DSD-08', 'EXP8-ACT-06', 'EXP8-ACT-08', 'EXP8-STM-03']
  },
  {
    id: 'laboratory',
    name: 'Laboratory Module',
    code: 'MOD-04',
    description: 'Manages pathology and radiology diagnostic test requisitions, specimen barcode tracking, automated sample collection, analyzer processing, result verification, and lab report publishing.',
    icon: 'FlaskConical',
    responsibilities: [
      'Log diagnostic lab test requisitions from consultation orders',
      'Collect biological samples and attach barcode identifiers',
      'Process diagnostic panels and capture parameter test values',
      'Validate test results against standard physiological reference ranges',
      'Publish authorized digital lab reports accessible to doctors and patients'
    ],
    actors: ['Doctor', 'Lab Technician', 'Patient'],
    requirements: ['FR-11', 'FR-12', 'FR-13', 'FR-14'],
    useCases: ['UC-06', 'UC-23', 'UC-24', 'UC-29', 'UC-30', 'UC-31'],
    diagrams: ['EXP5-SSD-05', 'EXP5-HLSD-04', 'EXP6-DSD-04', 'EXP6-COM-04', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    id: 'pharmacy-inventory',
    name: 'Pharmacy & Inventory Module',
    code: 'MOD-05',
    description: 'Handles electronic prescription verification, medicine dispensing, batch tracking, stock level monitoring, reorder level alerting, and supplier procurement.',
    icon: 'Pill',
    responsibilities: [
      'Fetch digital doctor prescriptions linked to Patient UHID',
      'Verify medicine dosages, frequency, and drug interaction warnings',
      'Dispense medicines and issue pharmacy billing items',
      'Track stock quantities, batch numbers, and expiry dates',
      'Trigger automated low-stock alerts when inventory crosses reorder thresholds'
    ],
    actors: ['Doctor', 'Pharmacist', 'Patient'],
    requirements: ['FR-10', 'FR-18', 'FR-19'],
    useCases: ['UC-07', 'UC-22', 'UC-32', 'UC-32a'],
    diagrams: ['EXP5-SSD-06', 'EXP6-DSD-05', 'EXP6-COM-05', 'EXP8-ACT-05', 'EXP8-STM-05']
  },
  {
    id: 'billing-payment',
    name: 'Billing & Payment Module',
    code: 'MOD-06',
    description: 'Consolidates charges across OP consultation, lab tests, pharmacy items, and IP room stays into unified medical bills, supporting multi-channel payments and receipt generation.',
    icon: 'CreditCard',
    responsibilities: [
      'Consolidate multi-departmental charges into unified itemized bills',
      'Apply statutory taxes, insurance claims, or discount adjustments',
      'Process payments via Cash, Credit/Debit Card, or digital UPI adapter',
      'Generate official computerized payment receipts',
      'Validate bill clearance before inpatient discharge release'
    ],
    actors: ['Patient', 'Cashier', 'Admin'],
    requirements: ['FR-20', 'FR-21', 'FR-22', 'FR-23'],
    useCases: ['UC-08', 'UC-09', 'UC-33', 'UC-33a', 'UC-33b'],
    diagrams: ['EXP5-SSD-08', 'EXP5-HLSD-05', 'EXP6-DSD-07', 'EXP6-COM-07', 'EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    id: 'reports-analytics',
    name: 'Reports & Analytics Module',
    code: 'MOD-07',
    description: 'Provides executive business intelligence dashboards, patient volume statistics, revenue collection breakdown, bed occupancy trends, and lab test statistics.',
    icon: 'BarChart3',
    responsibilities: [
      'Generate daily, monthly, and annual financial revenue reports',
      'Calculate bed occupancy rates across hospital wards',
      'Track consultation throughput and average patient wait times',
      'Export operational reports in PDF and Excel formats'
    ],
    actors: ['Admin'],
    requirements: ['FR-25'],
    useCases: ['UC-35'],
    diagrams: ['EXP7-DCD-01', 'EXP6-BCE-01']
  },
  {
    id: 'security-admin',
    name: 'Security & Administration Module',
    code: 'MOD-08',
    description: 'Enforces Role-Based Access Control (RBAC), manages user credentials, maintains immutable audit trails, and provisions hospital master configurations.',
    icon: 'ShieldCheck',
    responsibilities: [
      'Manage system user accounts, passwords, and security roles',
      'Enforce granular permission policies across all system APIs',
      'Maintain unalterable audit log capturing all clinical/financial mutations',
      'Configure hospital master data (Departments, Wards, Lab Tests)'
    ],
    actors: ['Admin'],
    requirements: ['FR-26', 'FR-27', 'FR-28', 'FR-29', 'FR-30'],
    useCases: ['UC-34', 'UC-35'],
    diagrams: ['EXP6-BCE-01', 'EXP7-DCD-01', 'EXP7-INT-01']
  }
];
