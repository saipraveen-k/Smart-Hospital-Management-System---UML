import { Actor } from '@/types';

export const ACTORS: Actor[] = [
  {
    id: 'ACT-01',
    name: 'Patient',
    type: 'PRIMARY',
    description: 'An individual seeking healthcare services at the smart hospital, registering profiles, booking outpatient consultations, undergoing lab diagnostics, receiving prescriptions, and settling medical bills.',
    responsibilities: [
      'Provides personal demographic and emergency contact information during registration',
      'Searches available clinical departments and doctor schedules',
      'Books, reschedules, or cancels outpatient appointments',
      'Undergoes outpatient check-in and receives queue token numbers',
      'Attends doctor consultations and provides chief complaints',
      'Submits diagnostic samples at the laboratory',
      'Receives prescribed medications from the hospital pharmacy',
      'Settles medical service invoices via Cash, Credit/Debit Card, or UPI',
      'Accesses digital health records, diagnostic lab reports, and payment receipts'
    ],
    modules: ['patient-registration', 'appointment-op', 'laboratory', 'pharmacy-inventory', 'billing-payment'],
    useCases: ['UC-01', 'UC-02', 'UC-03', 'UC-04', 'UC-05', 'UC-06', 'UC-07', 'UC-08', 'UC-09', 'UC-10'],
    requirements: ['FR-01', 'FR-02', 'FR-03', 'FR-04', 'FR-06', 'FR-21', 'FR-22', 'FR-24'],
    diagrams: ['EXP3-UC-01', 'EXP5-SSD-01', 'EXP5-SSD-02', 'EXP5-SSD-03', 'EXP8-ACT-01', 'EXP8-ACT-02']
  },
  {
    id: 'ACT-02',
    name: 'Receptionist',
    type: 'PRIMARY',
    description: 'Front-desk administrative staff responsible for walk-in patient registration, appointment scheduling, queue management, inpatient bed allocation, and general desk coordination.',
    responsibilities: [
      'Registers new walk-in patients and issues Universal Health Identifiers (UHID)',
      'Manages daily outpatient queue tokens and doctor consultation queues',
      'Schedules walk-in appointments and handles phone booking inquiries',
      'Verifies patient demographic data and updates emergency contacts',
      'Initiates inpatient admission records and coordinates ward bed allocation',
      'Issues patient visitor passes and provides outpatient desk assistance'
    ],
    modules: ['patient-registration', 'appointment-op', 'ip-management'],
    useCases: ['UC-11', 'UC-12', 'UC-13', 'UC-14', 'UC-15', 'UC-16', 'UC-17', 'UC-18', 'UC-19'],
    requirements: ['FR-01', 'FR-02', 'FR-04', 'FR-05', 'FR-06', 'FR-07', 'FR-15', 'FR-16'],
    diagrams: ['EXP3-UC-01', 'EXP5-SSD-01', 'EXP5-SSD-03', 'EXP5-SSD-07', 'EXP8-ACT-01', 'EXP8-ACT-06']
  },
  {
    id: 'ACT-03',
    name: 'Doctor',
    type: 'PRIMARY',
    description: 'Licensed medical clinician responsible for patient consultations, clinical examinations, ordering diagnostic laboratory tests, creating electronic prescriptions, and managing inpatient treatment plans.',
    responsibilities: [
      'Accesses patient queue and reviews medical history',
      'Records consultation notes, chief complaints, vitals, and diagnostic clinical codes',
      'Orders diagnostic laboratory tests (Pathology, Radiology, Biochemistry)',
      'Generates electronic prescriptions with dosage, frequency, and duration',
      'Recommends inpatient admission for severe clinical conditions',
      'Formulates inpatient treatment plans and daily progress notes',
      'Reviews completed laboratory diagnostic reports',
      'Authorizes inpatient discharge summaries'
    ],
    modules: ['appointment-op', 'ip-management', 'laboratory', 'pharmacy-inventory'],
    useCases: ['UC-20', 'UC-21', 'UC-22', 'UC-23', 'UC-24', 'UC-25', 'UC-26', 'UC-27', 'UC-28'],
    requirements: ['FR-08', 'FR-09', 'FR-10', 'FR-11', 'FR-14', 'FR-15', 'FR-17', 'FR-24'],
    diagrams: ['EXP3-UC-01', 'EXP5-SSD-04', 'EXP6-DSD-03', 'EXP8-ACT-03', 'EXP8-STM-05']
  },
  {
    id: 'ACT-04',
    name: 'Lab Technician',
    type: 'PRIMARY',
    description: 'Laboratory clinical specialist responsible for sample collection, specimen barcode tracking, automated/manual lab test processing, result entry, and diagnostic report verification.',
    responsibilities: [
      'Receives physician laboratory test orders and logs specimen requisitions',
      'Collects biological samples (blood, urine, tissue) and attaches barcode labels',
      'Operates laboratory analyzers and processes diagnostic test panels',
      'Enters qualitative and quantitative test parameter results into SHMS',
      'Verifies test results against reference ranges and flags critical values',
      'Submits finalized lab reports for pathologist/doctor approval'
    ],
    modules: ['laboratory'],
    useCases: ['UC-29', 'UC-30', 'UC-31'],
    requirements: ['FR-12', 'FR-13', 'FR-14'],
    diagrams: ['EXP3-UC-01', 'EXP5-SSD-05', 'EXP6-DSD-04', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    id: 'ACT-05',
    name: 'Pharmacist',
    type: 'PRIMARY',
    description: 'Registered hospital pharmacist responsible for verifying electronic prescriptions, checking drug-drug interaction warnings, dispensing medications, and managing pharmacy inventory stock.',
    responsibilities: [
      'Fetches digital prescriptions linked to Patient UHID or Consultation ID',
      'Verifies dosage details, allergies, and drug interaction alerts',
      'Dispenses prescribed medicines and updates inventory quantities',
      'Generates pharmacy dispensing items for consolidated hospital billing',
      'Monitors medicine stock levels and receives low-stock alerts',
      'Manages medicine batch numbers, manufacturing details, and expiry dates'
    ],
    modules: ['pharmacy-inventory'],
    useCases: ['UC-32', 'UC-32a'],
    requirements: ['FR-18', 'FR-19'],
    diagrams: ['EXP3-UC-01', 'EXP5-SSD-06', 'EXP6-DSD-05', 'EXP8-ACT-05', 'EXP8-STM-05']
  },
  {
    id: 'ACT-06',
    name: 'Cashier',
    type: 'PRIMARY',
    description: 'Financial desk staff responsible for consolidating multi-service medical bills, processing payments, issuing official receipts, and managing daily cash drawers.',
    responsibilities: [
      'Generates consolidated bills aggregating consultations, lab tests, medicines, and inpatient bed charges',
      'Applies valid discounts, insurance claims, or promotional concessions',
      'Processes payments via Cash, Credit/Debit Cards, or digital UPI adapters',
      'Issues official computerized payment receipts with unique transaction IDs',
      'Validates bill clearance status before inpatient discharge completion',
      'Maintains daily cash collection reconciliation reports'
    ],
    modules: ['billing-payment'],
    useCases: ['UC-33', 'UC-33a', 'UC-33b'],
    requirements: ['FR-20', 'FR-21', 'FR-22', 'FR-23'],
    diagrams: ['EXP3-UC-01', 'EXP5-SSD-08', 'EXP6-DSD-07', 'EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    id: 'ACT-07',
    name: 'Admin',
    type: 'MANAGERIAL',
    description: 'System Administrator responsible for role-based access control (RBAC), user credential provisioning, system configuration, audit log review, and executive reporting.',
    responsibilities: [
      'Configures hospital master settings (Departments, Wards, Beds, Lab Panels)',
      'Manages user accounts, roles, credentials, and access permissions',
      'Monitors real-time security audit trails and system activity logs',
      'Generates executive operational analytics, revenue reports, and bed occupancy metrics',
      'Oversees automated notification delivery services (SMS/Email)'
    ],
    modules: ['security-admin', 'reports-analytics'],
    useCases: ['UC-34', 'UC-35'],
    requirements: ['FR-25', 'FR-26', 'FR-27', 'FR-28', 'FR-29', 'FR-30'],
    diagrams: ['EXP3-UC-01', 'EXP6-BCE-01', 'EXP7-DCD-01']
  }
];
