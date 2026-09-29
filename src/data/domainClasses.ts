import { DomainClass } from '@/types';

export const DOMAIN_CLASSES: DomainClass[] = [
  {
    name: 'Patient',
    purpose: 'Represents a healthcare recipient registered in the Master Patient Index with demographic details and medical history.',
    attributes: [
      { name: 'patientId', type: 'String', description: 'Unique Universal Health Identifier (UHID e.g., P-1001)' },
      { name: 'name', type: 'String', description: 'Full legal name of the patient' },
      { name: 'age', type: 'Integer', description: 'Age in years' },
      { name: 'gender', type: 'String', description: 'Gender identity (Male/Female/Other)' },
      { name: 'phone', type: 'String', description: 'Primary contact phone number' },
      { name: 'email', type: 'String', description: 'Email address for digital communications' },
      { name: 'address', type: 'String', description: 'Residential street address' },
      { name: 'emergencyContact', type: 'String', description: 'Emergency contact name and phone' },
      { name: 'bloodGroup', type: 'String', description: 'Blood group classification' }
    ],
    relationships: [
      { target: 'Appointment', type: 'Association', multiplicity: '1 to 0..*', description: 'Schedules multiple outpatient appointments' },
      { target: 'MedicalRecord', type: 'Composition', multiplicity: '1 to 1', description: 'Owns lifetime medical record container' },
      { target: 'Admission', type: 'Association', multiplicity: '1 to 0..*', description: 'Undergoes inpatient admissions' },
      { target: 'Bill', type: 'Association', multiplicity: '1 to 0..*', description: 'Billed for hospital services' }
    ],
    multiplicity: '1 to 0..*',
    constraints: ['patientId must be non-empty and unique', 'phone must be valid 10-digit number'],
    relatedRequirements: ['FR-01', 'FR-02', 'FR-03'],
    relatedUseCases: ['UC-01', 'UC-02', 'UC-11', 'UC-12'],
    relatedSequenceDiagrams: ['EXP5-SSD-01', 'EXP6-DSD-01']
  },
  {
    name: 'Doctor',
    purpose: 'Represents a licensed clinical practitioner who conducts consultations, orders tests, prescribes medication, and manages admissions.',
    attributes: [
      { name: 'doctorId', type: 'String', description: 'Unique doctor employee identifier (e.g., DR-101)' },
      { name: 'name', type: 'String', description: 'Full medical practitioner name' },
      { name: 'specialization', type: 'String', description: 'Clinical specialty (e.g., Cardiology)' },
      { name: 'licenseNumber', type: 'String', description: 'State medical council registration' },
      { name: 'phone', type: 'String', description: 'Duty phone contact' },
      { name: 'consultationFee', type: 'Double', description: 'Standard outpatient consultation fee' }
    ],
    relationships: [
      { target: 'Department', type: 'Aggregation', multiplicity: '* to 1', description: 'Belongs to a clinical department' },
      { target: 'Appointment', type: 'Association', multiplicity: '1 to 0..*', description: 'Conducts scheduled consultations' },
      { target: 'Consultation', type: 'Association', multiplicity: '1 to 0..*', description: 'Authors clinical consultation notes' }
    ],
    multiplicity: '1 to 0..*',
    constraints: ['licenseNumber must be valid medical registration'],
    relatedRequirements: ['FR-04', 'FR-05', 'FR-08'],
    relatedUseCases: ['UC-03', 'UC-13', 'UC-20'],
    relatedSequenceDiagrams: ['EXP5-SSD-02', 'EXP5-SSD-04', 'EXP6-DSD-03']
  },
  {
    name: 'Appointment',
    purpose: 'Represents a scheduled time slot for an outpatient clinical consultation between a patient and a doctor.',
    attributes: [
      { name: 'appointmentId', type: 'String', description: 'Unique booking code (e.g., APT-2026-001)' },
      { name: 'appointmentDate', type: 'Date', description: 'Scheduled consultation date' },
      { name: 'appointmentTime', type: 'Time', description: 'Scheduled slot time' },
      { name: 'status', type: 'String', description: 'State: Confirmed, Checked In, In Consultation, Completed, Cancelled' },
      { name: 'tokenNumber', type: 'Integer', description: 'Sequential daily queue token' }
    ],
    relationships: [
      { target: 'Patient', type: 'Association', multiplicity: '* to 1', description: 'Booked by patient' },
      { target: 'Doctor', type: 'Association', multiplicity: '* to 1', description: 'Assigned to doctor' },
      { target: 'Queue', type: 'Association', multiplicity: '0..1 to 1', description: 'Enqueued in outpatient queue' }
    ],
    multiplicity: '0..* to 1',
    constraints: ['appointmentDate cannot be in the past at creation time'],
    relatedRequirements: ['FR-04', 'FR-06'],
    relatedUseCases: ['UC-03', 'UC-04', 'UC-05', 'UC-14'],
    relatedSequenceDiagrams: ['EXP5-SSD-02', 'EXP5-SSD-03', 'EXP6-DSD-02']
  },
  {
    name: 'Consultation',
    purpose: 'Represents the clinical encounter where a doctor examines a patient, records vitals, diagnoses conditions, and prescribes orders.',
    attributes: [
      { name: 'consultationId', type: 'String', description: 'Unique encounter identifier' },
      { name: 'consultationDate', type: 'DateTime', description: 'Timestamp of clinical examination' },
      { name: 'symptoms', type: 'String', description: 'Chief clinical complaints expressed by patient' },
      { name: 'vitals', type: 'String', description: 'Blood pressure, pulse, temperature, SpO2 readings' },
      { name: 'clinicalNotes', type: 'String', description: 'Physician notes and examination findings' }
    ],
    relationships: [
      { target: 'Patient', type: 'Association', multiplicity: '* to 1', description: 'Examined patient' },
      { target: 'Doctor', type: 'Association', multiplicity: '* to 1', description: 'Attending physician' },
      { target: 'Prescription', type: 'Composition', multiplicity: '1 to 0..1', description: 'Generates electronic prescription' },
      { target: 'LabTestOrder', type: 'Composition', multiplicity: '1 to 0..*', description: 'Requisitions diagnostic lab test panels' }
    ],
    multiplicity: '0..* to 1',
    constraints: ['Must link to valid Patient and Doctor'],
    relatedRequirements: ['FR-08', 'FR-09', 'FR-10', 'FR-11'],
    relatedUseCases: ['UC-20', 'UC-21', 'UC-22', 'UC-23'],
    relatedSequenceDiagrams: ['EXP5-SSD-04', 'EXP6-DSD-03']
  },
  {
    name: 'Prescription',
    purpose: 'Represents a digital medication order issued by a doctor containing itemized drugs, dosages, and administration instructions.',
    attributes: [
      { name: 'prescriptionId', type: 'String', description: 'Unique prescription tracking code' },
      { name: 'issueDate', type: 'DateTime', description: 'Timestamp of prescription creation' },
      { name: 'status', type: 'String', description: 'State: Created, Verified, Dispensed, Cancelled' },
      { name: 'specialInstructions', type: 'String', description: 'Dietary or precautionary instructions' }
    ],
    relationships: [
      { target: 'Consultation', type: 'Association', multiplicity: '1 to 1', description: 'Issued during consultation' },
      { target: 'PrescriptionItem', type: 'Composition', multiplicity: '1 to 1..*', description: 'Contains individual drug line items' }
    ],
    multiplicity: '0..1 to 1',
    constraints: ['Must contain at least 1 PrescriptionItem'],
    relatedRequirements: ['FR-10', 'FR-18'],
    relatedUseCases: ['UC-22', 'UC-32'],
    relatedSequenceDiagrams: ['EXP5-SSD-04', 'EXP5-SSD-06', 'EXP6-DSD-05']
  },
  {
    name: 'PrescriptionItem',
    purpose: 'Represents an individual medicine line item in a prescription detailing dosage, frequency, and duration.',
    attributes: [
      { name: 'itemId', type: 'String', description: 'Line item identifier' },
      { name: 'medicineName', type: 'String', description: 'Name of prescribed drug' },
      { name: 'dosage', type: 'String', description: 'Strength (e.g., 500mg)' },
      { name: 'frequency', type: 'String', description: 'Daily frequency (e.g., 1-0-1 after meals)' },
      { name: 'duration', type: 'String', description: 'Duration of course (e.g., 5 days)' },
      { name: 'quantity', type: 'Integer', description: 'Total units to dispense' }
    ],
    relationships: [
      { target: 'Prescription', type: 'Association', multiplicity: '* to 1', description: 'Part of parent prescription' },
      { target: 'Medicine', type: 'Association', multiplicity: '* to 1', description: 'References catalog drug' }
    ],
    multiplicity: '1..* to 1',
    constraints: ['quantity must be > 0'],
    relatedRequirements: ['FR-10', 'FR-18'],
    relatedUseCases: ['UC-22', 'UC-32'],
    relatedSequenceDiagrams: ['EXP6-DSD-03', 'EXP6-DSD-05']
  },
  {
    name: 'LabTestOrder',
    purpose: 'Represents a formal diagnostic test requisition ordered by a clinician for pathology or radiology processing.',
    attributes: [
      { name: 'orderId', type: 'String', description: 'Unique requisition code (e.g., LR-2026-014)' },
      { name: 'orderDate', type: 'DateTime', description: 'Order creation timestamp' },
      { name: 'testName', type: 'String', description: 'Name of diagnostic panel (e.g. Complete Blood Count)' },
      { name: 'status', type: 'String', description: 'State: Requested, Sample Collected, Processing, Result Entered, Approved' }
    ],
    relationships: [
      { target: 'Consultation', type: 'Association', multiplicity: '* to 1', description: 'Requisitioned from consultation' },
      { target: 'Sample', type: 'Composition', multiplicity: '1 to 0..*', description: 'Requires biological sample collection' },
      { target: 'LabReport', type: 'Composition', multiplicity: '1 to 0..1', description: 'Generates verified lab report' }
    ],
    multiplicity: '0..* to 1',
    constraints: ['Status transitions strictly according to STM-02 state machine'],
    relatedRequirements: ['FR-11', 'FR-12', 'FR-13', 'FR-14'],
    relatedUseCases: ['UC-23', 'UC-29', 'UC-30', 'UC-31'],
    relatedSequenceDiagrams: ['EXP5-SSD-05', 'EXP6-DSD-04']
  },
  {
    name: 'LabReport',
    purpose: 'Represents the finalized, verified diagnostic lab result containing parameter measurements and pathologist sign-off.',
    attributes: [
      { name: 'reportId', type: 'String', description: 'Unique diagnostic report code' },
      { name: 'approvalDate', type: 'DateTime', description: 'Pathologist authorization timestamp' },
      { name: 'findings', type: 'String', description: 'Measured lab parameter values and reference limits' },
      { name: 'pathologistNotes', type: 'String', description: 'Diagnostic interpretation notes' },
      { name: 'isAbnormal', type: 'Boolean', description: 'Flag indicating critical out-of-range value' }
    ],
    relationships: [
      { target: 'LabTestOrder', type: 'Association', multiplicity: '1 to 1', description: 'Derived from test order' }
    ],
    multiplicity: '0..1 to 1',
    constraints: ['Must be signed off by authorized pathologist before release'],
    relatedRequirements: ['FR-14'],
    relatedUseCases: ['UC-06', 'UC-24', 'UC-31'],
    relatedSequenceDiagrams: ['EXP5-SSD-05', 'EXP6-DSD-04']
  },
  {
    name: 'Admission',
    purpose: 'Represents an inpatient hospitalization record capturing room stay, attending physician, and discharge clearance.',
    attributes: [
      { name: 'admissionId', type: 'String', description: 'Unique admission code (e.g., ADM-2026-003)' },
      { name: 'admissionDate', type: 'DateTime', description: 'Hospital entry timestamp' },
      { name: 'dischargeDate', type: 'DateTime', description: 'Hospital discharge timestamp' },
      { name: 'diagnosis', type: 'String', description: 'Reason for hospitalization' },
      { name: 'status', type: 'String', description: 'State: Requested, Admitted, Bed Allocated, Under Treatment, Discharge Initiated, Discharged' }
    ],
    relationships: [
      { target: 'Patient', type: 'Association', multiplicity: '* to 1', description: 'Admitted patient' },
      { target: 'Bed', type: 'Association', multiplicity: '1 to 0..1', description: 'Allocated ward bed' },
      { target: 'TreatmentPlan', type: 'Composition', multiplicity: '1 to 1', description: 'Inpatient treatment protocol' }
    ],
    multiplicity: '0..* to 1',
    constraints: ['Discharge requires zero outstanding bill balance (BR-07)'],
    relatedRequirements: ['FR-15', 'FR-16', 'FR-17', 'FR-23'],
    relatedUseCases: ['UC-16', 'UC-17', 'UC-18', 'UC-25', 'UC-28'],
    relatedSequenceDiagrams: ['EXP5-SSD-07', 'EXP5-SSD-09', 'EXP6-DSD-06', 'EXP6-DSD-08']
  },
  {
    name: 'Ward',
    purpose: 'Represents a physical inpatient section of the hospital containing bed units of a specific category.',
    attributes: [
      { name: 'wardId', type: 'String', description: 'Unique ward identifier (e.g., WARD-ICU)' },
      { name: 'wardName', type: 'String', description: 'Name (e.g., Intensive Care Unit)' },
      { name: 'category', type: 'String', description: 'Category: ICU, General Male, General Female, Private Suite' },
      { name: 'dailyTariff', type: 'Double', description: 'Daily room charge tariff' }
    ],
    relationships: [
      { target: 'Bed', type: 'Composition', multiplicity: '1 to 1..*', description: 'Contains physical bed units' }
    ],
    multiplicity: '1 to 1..*',
    constraints: ['dailyTariff must be >= 0'],
    relatedRequirements: ['FR-16', 'FR-30'],
    relatedUseCases: ['UC-17'],
    relatedSequenceDiagrams: ['EXP5-SSD-07']
  },
  {
    name: 'Bed',
    purpose: 'Represents a specific physical bed in a ward allocated to an admitted patient.',
    attributes: [
      { name: 'bedId', type: 'String', description: 'Unique bed code (e.g., BED-ICU-04)' },
      { name: 'bedNumber', type: 'String', description: 'Display bed number' },
      { name: 'status', type: 'String', description: 'State: Available, Occupied, Under Maintenance' }
    ],
    relationships: [
      { target: 'Ward', type: 'Association', multiplicity: '* to 1', description: 'Located inside Ward' },
      { target: 'Admission', type: 'Association', multiplicity: '0..1 to 1', description: 'Occupied by active admission' }
    ],
    multiplicity: '1 to 0..1',
    constraints: ['Occupied bed cannot be assigned to another admission'],
    relatedRequirements: ['FR-16', 'FR-23'],
    relatedUseCases: ['UC-17', 'UC-18'],
    relatedSequenceDiagrams: ['EXP5-SSD-07', 'EXP5-SSD-09']
  },
  {
    name: 'Bill',
    purpose: 'Represents a consolidated financial invoice aggregating consultation, lab, pharmacy, and inpatient room charges.',
    attributes: [
      { name: 'billId', type: 'String', description: 'Unique invoice code (e.g. BILL-2026-018)' },
      { name: 'billDate', type: 'DateTime', description: 'Invoice generation timestamp' },
      { name: 'totalAmount', type: 'Double', description: 'Subtotal sum of line items' },
      { name: 'discount', type: 'Double', description: 'Applied discount or insurance concession' },
      { name: 'netAmount', type: 'Double', description: 'Final net bill balance payable' },
      { name: 'status', type: 'String', description: 'State: Pending, Partially Paid, Paid' }
    ],
    relationships: [
      { target: 'Patient', type: 'Association', multiplicity: '* to 1', description: 'Billed patient' },
      { target: 'BillItem', type: 'Composition', multiplicity: '1 to 1..*', description: 'Itemized charge details' },
      { target: 'Payment', type: 'Composition', multiplicity: '1 to 0..*', description: 'Associated payment transactions' }
    ],
    multiplicity: '1 to 1..*',
    constraints: ['netAmount = totalAmount - discount'],
    relatedRequirements: ['FR-20', 'FR-21', 'FR-23'],
    relatedUseCases: ['UC-08', 'UC-33', 'UC-33a', 'UC-33b'],
    relatedSequenceDiagrams: ['EXP5-SSD-08', 'EXP6-DSD-07']
  },
  {
    name: 'Payment',
    purpose: 'Represents a financial transaction settling all or part of an invoice.',
    attributes: [
      { name: 'paymentId', type: 'String', description: 'Unique payment transaction code' },
      { name: 'amount', type: 'Double', description: 'Transaction amount paid' },
      { name: 'paymentMethod', type: 'String', description: 'Method: Cash, Card, UPI' },
      { name: 'transactionId', type: 'String', description: 'Gateway transaction reference' },
      { name: 'paymentDate', type: 'DateTime', description: 'Timestamp of payment settlement' },
      { name: 'status', type: 'String', description: 'State: Success, Failed, Refunded' }
    ],
    relationships: [
      { target: 'Bill', type: 'Association', multiplicity: '* to 1', description: 'Settles target Bill' },
      { target: 'Receipt', type: 'Composition', multiplicity: '1 to 1', description: 'Generates official receipt' }
    ],
    multiplicity: '1 to 1',
    constraints: ['amount must be > 0'],
    relatedRequirements: ['FR-21', 'FR-22'],
    relatedUseCases: ['UC-08', 'UC-33b'],
    relatedSequenceDiagrams: ['EXP5-SSD-08', 'EXP6-DSD-07']
  },
  {
    name: 'Medicine',
    purpose: 'Represents a pharmaceutical drug product in the hospital pharmacy catalog.',
    attributes: [
      { name: 'medicineId', type: 'String', description: 'Unique drug catalog code (e.g. M-101)' },
      { name: 'name', type: 'String', description: 'Brand and generic drug name' },
      { name: 'category', type: 'String', description: 'Therapeutic classification (e.g. Antibiotic)' },
      { name: 'unitPrice', type: 'Double', description: 'Retail unit price per tablet/vial' },
      { name: 'dosageForm', type: 'String', description: 'Form: Tablet, Syrup, Injection' }
    ],
    relationships: [
      { target: 'InventoryItem', type: 'Composition', multiplicity: '1 to 1', description: 'Links to inventory stock' }
    ],
    multiplicity: '1 to 1',
    constraints: ['unitPrice must be > 0'],
    relatedRequirements: ['FR-18', 'FR-19'],
    relatedUseCases: ['UC-32', 'UC-32a'],
    relatedSequenceDiagrams: ['EXP5-SSD-06', 'EXP6-DSD-05']
  },
  {
    name: 'InventoryItem',
    purpose: 'Represents physical stock quantities, batch numbers, and reorder levels of a medicine.',
    attributes: [
      { name: 'inventoryId', type: 'String', description: 'Unique inventory record identifier' },
      { name: 'stockQuantity', type: 'Integer', description: 'Current available stock count' },
      { name: 'reorderLevel', type: 'Integer', description: 'Minimum stock threshold triggering low-stock alert' },
      { name: 'batchNumber', type: 'String', description: 'Manufacturer batch code' },
      { name: 'expiryDate', type: 'Date', description: 'Batch expiration date' }
    ],
    relationships: [
      { target: 'Medicine', type: 'Association', multiplicity: '1 to 1', description: 'Tracks inventory for Medicine' }
    ],
    multiplicity: '1 to 1',
    constraints: ['stockQuantity cannot be negative'],
    relatedRequirements: ['FR-19'],
    relatedUseCases: ['UC-32a'],
    relatedSequenceDiagrams: ['EXP5-SSD-06', 'EXP6-DSD-05']
  },
  {
    name: 'User',
    purpose: 'Abstract superclass representing any authenticated system user with credentials and assigned role.',
    attributes: [
      { name: 'userId', type: 'String', description: 'Unique user system ID' },
      { name: 'username', type: 'String', description: 'Login handle' },
      { name: 'passwordHash', type: 'String', description: 'Encrypted credential hash' },
      { name: 'email', type: 'String', description: 'User contact email' },
      { name: 'status', type: 'String', description: 'Account state: Active, Inactive, Locked' }
    ],
    relationships: [
      { target: 'Role', type: 'Association', multiplicity: '* to 1', description: 'Assigned RBAC role' }
    ],
    multiplicity: '1 to 1',
    constraints: ['username must be unique'],
    relatedRequirements: ['FR-27', 'FR-28'],
    relatedUseCases: ['UC-34'],
    relatedSequenceDiagrams: ['EXP6-BCE-01']
  },
  {
    name: 'Role',
    purpose: 'Represents a Role-Based Access Control (RBAC) permission set (Doctor, Pharmacist, Cashier, Admin).',
    attributes: [
      { name: 'roleId', type: 'String', description: 'Role identifier (e.g. ROLE_DOCTOR)' },
      { name: 'roleName', type: 'String', description: 'Display name' },
      { name: 'permissions', type: 'String', description: 'Comma-separated permission grants' }
    ],
    relationships: [
      { target: 'User', type: 'Association', multiplicity: '1 to 0..*', description: 'Assigned to users' }
    ],
    multiplicity: '1 to 0..*',
    constraints: ['permissions must be valid security tokens'],
    relatedRequirements: ['FR-28'],
    relatedUseCases: ['UC-34'],
    relatedSequenceDiagrams: ['EXP6-BCE-01']
  },
  {
    name: 'AuditLog',
    purpose: 'Represents an append-only security log capturing all clinical and financial system transactions.',
    attributes: [
      { name: 'logId', type: 'String', description: 'Unique log entry identifier' },
      { name: 'timestamp', type: 'DateTime', description: 'Transaction timestamp' },
      { name: 'userRole', type: 'String', description: 'Role executing transaction' },
      { name: 'action', type: 'String', description: 'Action performed (e.g. APPROVE_LAB_REPORT)' },
      { name: 'entity', type: 'String', description: 'Target entity type' },
      { name: 'entityId', type: 'String', description: 'Target record ID' }
    ],
    relationships: [],
    multiplicity: '0..*',
    constraints: ['AuditLog records are strictly append-only and cannot be edited'],
    relatedRequirements: ['FR-29'],
    relatedUseCases: ['UC-35'],
    relatedSequenceDiagrams: ['EXP6-BCE-01']
  },
  {
    name: 'Department',
    purpose: 'Represents a medical or administrative department within the hospital organization.',
    attributes: [
      { name: 'deptId', type: 'String', description: 'Department code (e.g. DEPT-CARD)' },
      { name: 'deptName', type: 'String', description: 'Full name (e.g. Cardiology)' },
      { name: 'headOfDept', type: 'String', description: 'Chief medical officer name' }
    ],
    relationships: [
      { target: 'Doctor', type: 'Aggregation', multiplicity: '1 to 0..*', description: 'Employs doctors' }
    ],
    multiplicity: '1 to 0..*',
    constraints: ['deptName must be unique'],
    relatedRequirements: ['FR-05', 'FR-30'],
    relatedUseCases: ['UC-13', 'UC-34'],
    relatedSequenceDiagrams: ['EXP5-SSD-02']
  }
];
