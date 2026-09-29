import { DesignClass } from '@/types';

export const DESIGN_CLASSES: DesignClass[] = [
  // --- BOUNDARY LAYER ---
  {
    name: 'PatientRegistrationUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Renders patient registration screens, collects demographic inputs, and delegates validation to PatientRegistrationController.',
    attributes: [
      { visibility: '-', name: 'formFields', type: 'Map<String, String>' },
      { visibility: '-', name: 'controller', type: 'PatientRegistrationController' }
    ],
    methods: [
      { visibility: '+', name: 'renderRegistrationForm', parameters: '', returnType: 'void' },
      { visibility: '+', name: 'onFormSubmit', parameters: 'formData: Map', returnType: 'void' },
      { visibility: '+', name: 'displayUHIDReceipt', parameters: 'uhid: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['PatientRegistrationController'],
    relationships: [{ target: 'PatientRegistrationController', type: 'Dependency' }],
    relatedRequirements: ['FR-01', 'FR-02'],
    relatedUseCases: ['UC-01', 'UC-11']
  },
  {
    name: 'AppointmentBookingUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Renders specialty search, doctor schedules, slot selection UI, and handles booking confirmation.',
    attributes: [
      { visibility: '-', name: 'selectedDept', type: 'String' },
      { visibility: '-', name: 'controller', type: 'AppointmentController' }
    ],
    methods: [
      { visibility: '+', name: 'displayDoctorSchedules', parameters: 'deptId: String', returnType: 'void' },
      { visibility: '+', name: 'onSlotSelected', parameters: 'doctorId: String, slotTime: Time', returnType: 'void' },
      { visibility: '+', name: 'showConfirmationModal', parameters: 'bookingId: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['AppointmentController'],
    relationships: [{ target: 'AppointmentController', type: 'Dependency' }],
    relatedRequirements: ['FR-04', 'FR-05'],
    relatedUseCases: ['UC-03', 'UC-13']
  },
  {
    name: 'CheckInUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Front-desk kiosk UI for patient arrival check-in and queue token issuance.',
    attributes: [{ visibility: '-', name: 'controller', type: 'AppointmentController' }],
    methods: [
      { visibility: '+', name: 'scanUHID', parameters: 'uhid: String', returnType: 'void' },
      { visibility: '+', name: 'printTokenTicket', parameters: 'tokenNum: int', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['AppointmentController'],
    relationships: [{ target: 'AppointmentController', type: 'Dependency' }],
    relatedRequirements: ['FR-06', 'FR-07'],
    relatedUseCases: ['UC-05', 'UC-14']
  },
  {
    name: 'ConsultationUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Clinical workspace screen for doctors to inspect vitals, document notes, prescribe drugs, and order lab tests.',
    attributes: [
      { visibility: '-', name: 'activePatientId', type: 'String' },
      { visibility: '-', name: 'controller', type: 'ConsultationController' }
    ],
    methods: [
      { visibility: '+', name: 'renderClinicalWorkspace', parameters: 'patientId: String', returnType: 'void' },
      { visibility: '+', name: 'saveConsultationNotes', parameters: 'notes: String', returnType: 'void' },
      { visibility: '+', name: 'submitLabOrder', parameters: 'testIds: List<String>', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['ConsultationController'],
    relationships: [{ target: 'ConsultationController', type: 'Dependency' }],
    relatedRequirements: ['FR-08', 'FR-09', 'FR-10', 'FR-11'],
    relatedUseCases: ['UC-20', 'UC-21', 'UC-22', 'UC-23']
  },
  {
    name: 'LaboratoryUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Lab technician workspace for logging samples, entering analyzer test results, and routing report approvals.',
    attributes: [{ visibility: '-', name: 'controller', type: 'LaboratoryController' }],
    methods: [
      { visibility: '+', name: 'renderPendingOrders', parameters: '', returnType: 'void' },
      { visibility: '+', name: 'captureSampleBarcode', parameters: 'barcode: String', returnType: 'void' },
      { visibility: '+', name: 'submitParameterResults', parameters: 'orderId: String, results: Map', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['LaboratoryController'],
    relationships: [{ target: 'LaboratoryController', type: 'Dependency' }],
    relatedRequirements: ['FR-12', 'FR-13', 'FR-14'],
    relatedUseCases: ['UC-29', 'UC-30', 'UC-31']
  },
  {
    name: 'PharmacyUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Pharmacy counter UI for prescription verification, dispensing, and inventory stock monitoring.',
    attributes: [{ visibility: '-', name: 'controller', type: 'PharmacyController' }],
    methods: [
      { visibility: '+', name: 'fetchPrescriptionByUHID', parameters: 'uhid: String', returnType: 'void' },
      { visibility: '+', name: 'dispenseMedicines', parameters: 'prescriptionId: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['PharmacyController'],
    relationships: [{ target: 'PharmacyController', type: 'Dependency' }],
    relatedRequirements: ['FR-18', 'FR-19'],
    relatedUseCases: ['UC-32', 'UC-32a']
  },
  {
    name: 'AdmissionUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Inpatient desk screen for admission processing, bed allocation, and discharge clearance.',
    attributes: [{ visibility: '-', name: 'controller', type: 'AdmissionController' }],
    methods: [
      { visibility: '+', name: 'showAvailableBeds', parameters: 'wardCategory: String', returnType: 'void' },
      { visibility: '+', name: 'confirmBedAllocation', parameters: 'admissionId: String, bedId: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['AdmissionController'],
    relationships: [{ target: 'AdmissionController', type: 'Dependency' }],
    relatedRequirements: ['FR-15', 'FR-16', 'FR-23'],
    relatedUseCases: ['UC-16', 'UC-17', 'UC-18']
  },
  {
    name: 'BillingUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Cashier checkout screen for bill consolidation, payment gateway selection, and receipt printing.',
    attributes: [{ visibility: '-', name: 'controller', type: 'BillingController' }],
    methods: [
      { visibility: '+', name: 'generateConsolidatedBill', parameters: 'uhid: String', returnType: 'void' },
      { visibility: '+', name: 'processPaymentCheckout', parameters: 'billId: String, method: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['BillingController'],
    relationships: [{ target: 'BillingController', type: 'Dependency' }],
    relatedRequirements: ['FR-20', 'FR-21', 'FR-22'],
    relatedUseCases: ['UC-08', 'UC-33', 'UC-33b']
  },
  {
    name: 'ReportsUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'Executive reporting dashboard rendering revenue, bed occupancy, and departmental throughput analytics.',
    attributes: [{ visibility: '-', name: 'controller', type: 'ReportController' }],
    methods: [
      { visibility: '+', name: 'renderRevenueAnalytics', parameters: 'period: String', returnType: 'void' },
      { visibility: '+', name: 'exportReportPDF', parameters: 'reportType: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['ReportController'],
    relationships: [{ target: 'ReportController', type: 'Dependency' }],
    relatedRequirements: ['FR-25'],
    relatedUseCases: ['UC-35']
  },
  {
    name: 'AdminSecurityUI',
    layer: 'Boundary',
    package: 'Boundary Package',
    purpose: 'System administration console for RBAC user role configuration and audit log inspection.',
    attributes: [{ visibility: '-', name: 'controller', type: 'SecurityController' }],
    methods: [
      { visibility: '+', name: 'renderUserRoleMatrix', parameters: '', returnType: 'void' },
      { visibility: '+', name: 'displayAuditLogTrail', parameters: 'filter: Map', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['SecurityController'],
    relationships: [{ target: 'SecurityController', type: 'Dependency' }],
    relatedRequirements: ['FR-27', 'FR-28', 'FR-29', 'FR-30'],
    relatedUseCases: ['UC-34', 'UC-35']
  },

  // --- CONTROL LAYER ---
  {
    name: 'PatientRegistrationController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Orchestrates patient registration, UHID generation algorithm, validation rules, and persistence.',
    attributes: [
      { visibility: '-', name: 'patientRepository', type: 'PatientRepository' },
      { visibility: '-', name: 'notificationService', type: 'NotificationService' }
    ],
    methods: [
      { visibility: '+', name: 'registerPatient', parameters: 'patientDto: PatientDTO', returnType: 'String' },
      { visibility: '+', name: 'validateUHIDUniqueness', parameters: 'uhid: String', returnType: 'boolean' },
      { visibility: '+', name: 'generateUHID', parameters: '', returnType: 'String' }
    ],
    interfaces: [],
    dependencies: ['Patient', 'NotificationService'],
    relationships: [{ target: 'Patient', type: 'Association' }, { target: 'NotificationService', type: 'Dependency' }],
    relatedRequirements: ['FR-01', 'FR-02'],
    relatedUseCases: ['UC-01', 'UC-11']
  },
  {
    name: 'AppointmentController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Orchestrates doctor slot reservation, check-in processing, and sequential token queue management.',
    attributes: [
      { visibility: '-', name: 'appointmentRepo', type: 'AppointmentRepository' },
      { visibility: '-', name: 'queueManager', type: 'QueueManager' }
    ],
    methods: [
      { visibility: '+', name: 'bookAppointment', parameters: 'patientId: String, doctorId: String, slot: DateTime', returnType: 'Appointment' },
      { visibility: '+', name: 'processCheckIn', parameters: 'appointmentId: String', returnType: 'int' },
      { visibility: '+', name: 'cancelBooking', parameters: 'appointmentId: String', returnType: 'boolean' }
    ],
    interfaces: [],
    dependencies: ['Appointment', 'Queue'],
    relationships: [{ target: 'Appointment', type: 'Association' }, { target: 'Queue', type: 'Association' }],
    relatedRequirements: ['FR-04', 'FR-05', 'FR-06', 'FR-07'],
    relatedUseCases: ['UC-03', 'UC-05', 'UC-14', 'UC-15']
  },
  {
    name: 'ConsultationController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Manages clinical encounter workflow, saving diagnostic codes, prescriptions, and lab test orders.',
    attributes: [{ visibility: '-', name: 'consultationRepo', type: 'ConsultationRepository' }],
    methods: [
      { visibility: '+', name: 'createConsultation', parameters: 'patientId: String, doctorId: String', returnType: 'Consultation' },
      { visibility: '+', name: 'addPrescription', parameters: 'consultationId: String, items: List<Item>', returnType: 'Prescription' },
      { visibility: '+', name: 'orderLabTest', parameters: 'consultationId: String, testIds: List<String>', returnType: 'LabTestOrder' }
    ],
    interfaces: [],
    dependencies: ['Consultation', 'Prescription', 'LabTestOrder'],
    relationships: [{ target: 'Consultation', type: 'Association' }],
    relatedRequirements: ['FR-08', 'FR-09', 'FR-10', 'FR-11'],
    relatedUseCases: ['UC-20', 'UC-21', 'UC-22', 'UC-23']
  },
  {
    name: 'LaboratoryController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Coordinates lab test execution, sample barcode logging, analyzer result entry, and pathologist approval.',
    attributes: [{ visibility: '-', name: 'labOrderRepo', type: 'LabOrderRepository' }],
    methods: [
      { visibility: '+', name: 'collectSample', parameters: 'orderId: String, barcode: String', returnType: 'Sample' },
      { visibility: '+', name: 'enterTestResults', parameters: 'orderId: String, results: Map', returnType: 'void' },
      { visibility: '+', name: 'approveReport', parameters: 'reportId: String, pathologistId: String', returnType: 'LabReport' }
    ],
    interfaces: [],
    dependencies: ['LabTestOrder', 'Sample', 'LabReport'],
    relationships: [{ target: 'LabTestOrder', type: 'Association' }],
    relatedRequirements: ['FR-12', 'FR-13', 'FR-14'],
    relatedUseCases: ['UC-29', 'UC-30', 'UC-31']
  },
  {
    name: 'PharmacyController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Manages electronic prescription dispensing, stock decrementing, and low-stock alert triggers.',
    attributes: [
      { visibility: '-', name: 'pharmacyRepo', type: 'PharmacyRepository' },
      { visibility: '-', name: 'inventoryService', type: 'InventoryService' }
    ],
    methods: [
      { visibility: '+', name: 'dispensePrescription', parameters: 'prescriptionId: String', returnType: 'boolean' },
      { visibility: '+', name: 'checkStockAvailability', parameters: 'medicineId: String, qty: int', returnType: 'boolean' },
      { visibility: '+', name: 'triggerLowStockAlert', parameters: 'medicineId: String', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['Prescription', 'Medicine', 'InventoryItem'],
    relationships: [{ target: 'Medicine', type: 'Association' }, { target: 'InventoryItem', type: 'Association' }],
    relatedRequirements: ['FR-18', 'FR-19'],
    relatedUseCases: ['UC-32', 'UC-32a']
  },
  {
    name: 'AdmissionController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Orchestrates inpatient admission processing, ward bed assignment, daily rounds, and discharge clearance.',
    attributes: [{ visibility: '-', name: 'admissionRepo', type: 'AdmissionRepository' }],
    methods: [
      { visibility: '+', name: 'admitPatient', parameters: 'patientId: String, wardCategory: String', returnType: 'Admission' },
      { visibility: '+', name: 'allocateBed', parameters: 'admissionId: String, bedId: String', returnType: 'boolean' },
      { visibility: '+', name: 'processDischarge', parameters: 'admissionId: String', returnType: 'boolean' }
    ],
    interfaces: [],
    dependencies: ['Admission', 'Ward', 'Bed'],
    relationships: [{ target: 'Admission', type: 'Association' }, { target: 'Bed', type: 'Association' }],
    relatedRequirements: ['FR-15', 'FR-16', 'FR-23'],
    relatedUseCases: ['UC-16', 'UC-17', 'UC-18']
  },
  {
    name: 'BillingController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Consolidates multi-service hospital charges into invoices, invokes PaymentProcessor, and generates receipts.',
    attributes: [{ visibility: '-', name: 'paymentProcessor', type: 'PaymentProcessor' }],
    methods: [
      { visibility: '+', name: 'generateInvoice', parameters: 'patientId: String', returnType: 'Bill' },
      { visibility: '+', name: 'settlePayment', parameters: 'billId: String, amount: double, mode: String', returnType: 'Receipt' },
      { visibility: '+', name: 'applyDiscount', parameters: 'billId: String, code: String', returnType: 'double' }
    ],
    interfaces: [],
    dependencies: ['Bill', 'Payment', 'PaymentProcessor'],
    relationships: [{ target: 'Bill', type: 'Association' }, { target: 'PaymentProcessor', type: 'Dependency' }],
    relatedRequirements: ['FR-20', 'FR-21', 'FR-22'],
    relatedUseCases: ['UC-08', 'UC-33', 'UC-33b']
  },
  {
    name: 'ReportController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Queries operational metrics to compile executive financial revenue and bed occupancy reports.',
    attributes: [{ visibility: '-', name: 'analyticsRepo', type: 'AnalyticsRepository' }],
    methods: [
      { visibility: '+', name: 'generateRevenueReport', parameters: 'startDate: Date, endDate: Date', returnType: 'Report' },
      { visibility: '+', name: 'calculateBedOccupancyRate', parameters: '', returnType: 'double' }
    ],
    interfaces: [],
    dependencies: ['AuditLog', 'Bill'],
    relationships: [{ target: 'Bill', type: 'Dependency' }],
    relatedRequirements: ['FR-25'],
    relatedUseCases: ['UC-35']
  },
  {
    name: 'SecurityController',
    layer: 'Control',
    package: 'Control Package',
    purpose: 'Enforces Role-Based Access Control (RBAC), user authentication, and immutable audit trail logging.',
    attributes: [{ visibility: '-', name: 'auditLogger', type: 'AuditLogger' }],
    methods: [
      { visibility: '+', name: 'authenticateUser', parameters: 'user: String, pass: String', returnType: 'Session' },
      { visibility: '+', name: 'checkPermission', parameters: 'userRole: Role, permission: String', returnType: 'boolean' },
      { visibility: '+', name: 'logSecurityEvent', parameters: 'event: AuditEvent', returnType: 'void' }
    ],
    interfaces: [],
    dependencies: ['User', 'Role', 'AuditLog'],
    relationships: [{ target: 'User', type: 'Association' }, { target: 'Role', type: 'Association' }],
    relatedRequirements: ['FR-27', 'FR-28', 'FR-29', 'FR-30'],
    relatedUseCases: ['UC-34', 'UC-35']
  },

  // --- INTERFACES & GATEWAYS ---
  {
    name: 'PaymentProcessor',
    layer: 'Interface',
    package: 'Architecture / Gateway Interface',
    purpose: 'Abstract strategy interface defining contract for external payment gateway processing (DIP Realization).',
    attributes: [],
    methods: [
      { visibility: '+', name: 'processPayment', parameters: 'amount: double, payload: PaymentData', returnType: 'PaymentResult' },
      { visibility: '+', name: 'refundTransaction', parameters: 'txnId: String', returnType: 'boolean' }
    ],
    interfaces: [],
    dependencies: [],
    relationships: [],
    relatedRequirements: ['FR-21'],
    relatedUseCases: ['UC-08', 'UC-33b']
  },
  {
    name: 'CardPaymentProcessor',
    layer: 'Interface',
    package: 'Gateway Realization',
    purpose: 'Concrete strategy realizing PaymentProcessor for Credit/Debit card processing via POS/online gateway.',
    attributes: [{ visibility: '-', name: 'merchantKey', type: 'String' }],
    methods: [
      { visibility: '+', name: 'processPayment', parameters: 'amount: double, payload: PaymentData', returnType: 'PaymentResult' },
      { visibility: '+', name: 'refundTransaction', parameters: 'txnId: String', returnType: 'boolean' }
    ],
    interfaces: ['PaymentProcessor'],
    dependencies: ['PaymentProcessor'],
    relationships: [{ target: 'PaymentProcessor', type: 'Realization' }],
    relatedRequirements: ['FR-21'],
    relatedUseCases: ['UC-08', 'UC-33b']
  },
  {
    name: 'UPIPaymentProcessor',
    layer: 'Interface',
    package: 'Gateway Realization',
    purpose: 'Concrete strategy realizing PaymentProcessor for digital UPI QR payments.',
    attributes: [{ visibility: '-', name: 'upiVpa', type: 'String' }],
    methods: [
      { visibility: '+', name: 'processPayment', parameters: 'amount: double, payload: PaymentData', returnType: 'PaymentResult' },
      { visibility: '+', name: 'refundTransaction', parameters: 'txnId: String', returnType: 'boolean' }
    ],
    interfaces: ['PaymentProcessor'],
    dependencies: ['PaymentProcessor'],
    relationships: [{ target: 'PaymentProcessor', type: 'Realization' }],
    relatedRequirements: ['FR-21'],
    relatedUseCases: ['UC-08', 'UC-33b']
  },
  {
    name: 'NotificationService',
    layer: 'Interface',
    package: 'Architecture / Gateway Interface',
    purpose: 'Abstract interface defining multi-channel messaging service contract.',
    attributes: [],
    methods: [
      { visibility: '+', name: 'sendNotification', parameters: 'recipient: String, message: String', returnType: 'boolean' }
    ],
    interfaces: [],
    dependencies: [],
    relationships: [],
    relatedRequirements: ['FR-26'],
    relatedUseCases: ['UC-03', 'UC-31']
  },
  {
    name: 'SMSNotificationAdapter',
    layer: 'Interface',
    package: 'Gateway Realization',
    purpose: 'Concrete adapter delivering SMS alerts via telecom gateway.',
    attributes: [{ visibility: '-', name: 'smsGatewayUrl', type: 'String' }],
    methods: [
      { visibility: '+', name: 'sendNotification', parameters: 'recipient: String, message: String', returnType: 'boolean' }
    ],
    interfaces: ['NotificationService'],
    dependencies: ['NotificationService'],
    relationships: [{ target: 'NotificationService', type: 'Realization' }],
    relatedRequirements: ['FR-26'],
    relatedUseCases: ['UC-03', 'UC-31']
  }
];
