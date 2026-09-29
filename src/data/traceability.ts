import { TraceabilityItem } from '@/types';

export const TRACEABILITY_MATRIX: TraceabilityItem[] = [
  {
    reqId: 'FR-01',
    title: 'Patient Registration',
    useCases: ['UC-01', 'UC-11'],
    domainClasses: ['Patient', 'User'],
    ssds: ['EXP5-SSD-01', 'EXP5-HLSD-01'],
    dsds: ['EXP6-DSD-01', 'EXP6-COM-01'],
    designClasses: ['PatientRegistrationUI', 'PatientRegistrationController', 'Patient'],
    activityState: ['EXP8-ACT-01']
  },
  {
    reqId: 'FR-02',
    title: 'Patient Search & Retrieval',
    useCases: ['UC-12'],
    domainClasses: ['Patient', 'User'],
    ssds: ['EXP5-SSD-01'],
    dsds: ['EXP6-DSD-01'],
    designClasses: ['PatientRegistrationUI', 'PatientRegistrationController'],
    activityState: ['EXP8-ACT-01']
  },
  {
    reqId: 'FR-03',
    title: 'Profile Management',
    useCases: ['UC-02'],
    domainClasses: ['Patient'],
    ssds: ['EXP5-SSD-01'],
    dsds: ['EXP6-DSD-01'],
    designClasses: ['PatientRegistrationUI', 'Patient'],
    activityState: ['EXP8-ACT-01']
  },
  {
    reqId: 'FR-04',
    title: 'Appointment Booking',
    useCases: ['UC-03', 'UC-13'],
    domainClasses: ['Appointment', 'Doctor'],
    ssds: ['EXP5-SSD-02', 'EXP5-HLSD-02'],
    dsds: ['EXP6-DSD-02', 'EXP6-COM-02'],
    designClasses: ['AppointmentBookingUI', 'AppointmentController', 'Appointment'],
    activityState: ['EXP8-ACT-02', 'EXP8-STM-01']
  },
  {
    reqId: 'FR-05',
    title: 'Doctor Schedule & Availability',
    useCases: ['UC-13'],
    domainClasses: ['Doctor', 'Department'],
    ssds: ['EXP5-SSD-02'],
    dsds: ['EXP6-DSD-02'],
    designClasses: ['AppointmentBookingUI', 'AppointmentController', 'Doctor'],
    activityState: ['EXP8-ACT-02']
  },
  {
    reqId: 'FR-06',
    title: 'OP Check-In & Token Generation',
    useCases: ['UC-05', 'UC-14'],
    domainClasses: ['Appointment', 'Queue'],
    ssds: ['EXP5-SSD-03'],
    dsds: ['EXP6-DSD-02'],
    designClasses: ['CheckInUI', 'AppointmentController', 'Queue'],
    activityState: ['EXP8-ACT-02', 'EXP8-STM-01']
  },
  {
    reqId: 'FR-07',
    title: 'Outpatient Queue Management',
    useCases: ['UC-15'],
    domainClasses: ['Queue', 'Doctor'],
    ssds: ['EXP5-SSD-03'],
    dsds: ['EXP6-DSD-02'],
    designClasses: ['CheckInUI', 'AppointmentController', 'Queue'],
    activityState: ['EXP8-ACT-02', 'EXP8-STM-01']
  },
  {
    reqId: 'FR-08',
    title: 'Doctor Consultation Documentation',
    useCases: ['UC-20'],
    domainClasses: ['Consultation', 'MedicalRecord'],
    ssds: ['EXP5-SSD-04', 'EXP5-HLSD-03'],
    dsds: ['EXP6-DSD-03', 'EXP6-COM-03'],
    designClasses: ['ConsultationUI', 'ConsultationController', 'Consultation'],
    activityState: ['EXP8-ACT-03']
  },
  {
    reqId: 'FR-09',
    title: 'Diagnosis & Clinical Coding',
    useCases: ['UC-21'],
    domainClasses: ['Diagnosis', 'Consultation'],
    ssds: ['EXP5-SSD-04'],
    dsds: ['EXP6-DSD-03'],
    designClasses: ['ConsultationUI', 'ConsultationController', 'Diagnosis'],
    activityState: ['EXP8-ACT-03']
  },
  {
    reqId: 'FR-10',
    title: 'Electronic Prescription Creation',
    useCases: ['UC-22'],
    domainClasses: ['Prescription', 'PrescriptionItem'],
    ssds: ['EXP5-SSD-04'],
    dsds: ['EXP6-DSD-03'],
    designClasses: ['ConsultationUI', 'ConsultationController', 'Prescription'],
    activityState: ['EXP8-ACT-03', 'EXP8-STM-05']
  },
  {
    reqId: 'FR-11',
    title: 'Laboratory Test Requisition',
    useCases: ['UC-23'],
    domainClasses: ['LabTestOrder', 'LabTest'],
    ssds: ['EXP5-SSD-05'],
    dsds: ['EXP6-DSD-03', 'EXP6-DSD-04'],
    designClasses: ['ConsultationUI', 'ConsultationController', 'LabTestOrder'],
    activityState: ['EXP8-ACT-03', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    reqId: 'FR-12',
    title: 'Specimen & Sample Collection',
    useCases: ['UC-29'],
    domainClasses: ['Sample', 'LabTestOrder'],
    ssds: ['EXP5-SSD-05'],
    dsds: ['EXP6-DSD-04', 'EXP6-COM-04'],
    designClasses: ['LaboratoryUI', 'LaboratoryController', 'Sample'],
    activityState: ['EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    reqId: 'FR-13',
    title: 'Lab Test Processing & Parameter Entry',
    useCases: ['UC-30'],
    domainClasses: ['LabTestOrder', 'Sample'],
    ssds: ['EXP5-SSD-05'],
    dsds: ['EXP6-DSD-04'],
    designClasses: ['LaboratoryUI', 'LaboratoryController'],
    activityState: ['EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    reqId: 'FR-14',
    title: 'Lab Report Verification & Approval',
    useCases: ['UC-24', 'UC-31'],
    domainClasses: ['LabReport', 'LabTestOrder'],
    ssds: ['EXP5-SSD-05', 'EXP5-HLSD-04'],
    dsds: ['EXP6-DSD-04', 'EXP6-COM-04'],
    designClasses: ['LaboratoryUI', 'LaboratoryController', 'LabReport'],
    activityState: ['EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    reqId: 'FR-15',
    title: 'Inpatient Admission Request',
    useCases: ['UC-16', 'UC-25'],
    domainClasses: ['Admission', 'Patient'],
    ssds: ['EXP5-SSD-07'],
    dsds: ['EXP6-DSD-06', 'EXP6-COM-06'],
    designClasses: ['AdmissionUI', 'AdmissionController', 'Admission'],
    activityState: ['EXP8-ACT-06', 'EXP8-STM-03']
  },
  {
    reqId: 'FR-16',
    title: 'Ward & Bed Allocation',
    useCases: ['UC-17'],
    domainClasses: ['Bed', 'Ward', 'Admission'],
    ssds: ['EXP5-SSD-07'],
    dsds: ['EXP6-DSD-06', 'EXP6-COM-06'],
    designClasses: ['AdmissionUI', 'AdmissionController', 'Bed'],
    activityState: ['EXP8-ACT-06', 'EXP8-STM-03']
  },
  {
    reqId: 'FR-17',
    title: 'Inpatient Treatment Plan Management',
    useCases: ['UC-26'],
    domainClasses: ['TreatmentPlan', 'Admission'],
    ssds: ['EXP5-SSD-07'],
    dsds: ['EXP6-DSD-06'],
    designClasses: ['AdmissionUI', 'AdmissionController', 'TreatmentPlan'],
    activityState: ['EXP8-ACT-06', 'EXP8-STM-03']
  },
  {
    reqId: 'FR-18',
    title: 'Pharmacy Medication Dispensing',
    useCases: ['UC-32'],
    domainClasses: ['Prescription', 'Medicine'],
    ssds: ['EXP5-SSD-06'],
    dsds: ['EXP6-DSD-05', 'EXP6-COM-05'],
    designClasses: ['PharmacyUI', 'PharmacyController', 'Medicine'],
    activityState: ['EXP8-ACT-05', 'EXP8-STM-05']
  },
  {
    reqId: 'FR-19',
    title: 'Inventory Alerting & Reorder Level Tracking',
    useCases: ['UC-32a'],
    domainClasses: ['InventoryItem', 'Medicine'],
    ssds: ['EXP5-SSD-06'],
    dsds: ['EXP6-DSD-05'],
    designClasses: ['PharmacyUI', 'PharmacyController', 'InventoryItem'],
    activityState: ['EXP8-ACT-05']
  },
  {
    reqId: 'FR-20',
    title: 'Multi-Service Consolidated Billing',
    useCases: ['UC-33a'],
    domainClasses: ['Bill', 'BillItem'],
    ssds: ['EXP5-SSD-08', 'EXP5-HLSD-05'],
    dsds: ['EXP6-DSD-07', 'EXP6-COM-07'],
    designClasses: ['BillingUI', 'BillingController', 'Bill'],
    activityState: ['EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    reqId: 'FR-21',
    title: 'Multi-Channel Payment Settlement',
    useCases: ['UC-08', 'UC-33b'],
    domainClasses: ['Payment', 'Bill'],
    ssds: ['EXP5-SSD-08', 'EXP5-HLSD-05'],
    dsds: ['EXP6-DSD-07', 'EXP6-COM-07'],
    designClasses: ['BillingUI', 'BillingController', 'PaymentProcessor'],
    activityState: ['EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    reqId: 'FR-22',
    title: 'Receipt Generation',
    useCases: ['UC-09'],
    domainClasses: ['Receipt', 'Payment'],
    ssds: ['EXP5-SSD-08'],
    dsds: ['EXP6-DSD-07'],
    designClasses: ['BillingUI', 'BillingController', 'Receipt'],
    activityState: ['EXP8-ACT-07']
  },
  {
    reqId: 'FR-23',
    title: 'Inpatient Discharge Clearance',
    useCases: ['UC-18'],
    domainClasses: ['Admission', 'Bed', 'Bill'],
    ssds: ['EXP5-SSD-09'],
    dsds: ['EXP6-DSD-08', 'EXP6-COM-08'],
    designClasses: ['AdmissionUI', 'AdmissionController', 'Admission'],
    activityState: ['EXP8-ACT-08', 'EXP8-STM-03']
  },
  {
    reqId: 'FR-24',
    title: 'Follow-Up Appointment Scheduling',
    useCases: ['UC-10', 'UC-27'],
    domainClasses: ['Consultation', 'Appointment'],
    ssds: ['EXP5-SSD-04'],
    dsds: ['EXP6-DSD-08'],
    designClasses: ['ConsultationUI', 'AppointmentController'],
    activityState: ['EXP8-ACT-03', 'EXP8-ACT-08']
  },
  {
    reqId: 'FR-25',
    title: 'Reports & Executive Analytics',
    useCases: ['UC-35'],
    domainClasses: ['AuditLog', 'Bill', 'Patient'],
    ssds: ['EXP5-SSD-08'],
    dsds: ['EXP6-BCE-01'],
    designClasses: ['ReportsUI', 'ReportController'],
    activityState: ['EXP8-ACT-07']
  },
  {
    reqId: 'FR-26',
    title: 'Automated SMS & Email Notifications',
    useCases: ['UC-03', 'UC-31'],
    domainClasses: ['Notification'],
    ssds: ['EXP5-SSD-02'],
    dsds: ['EXP6-DSD-03'],
    designClasses: ['NotificationService', 'SMSNotificationAdapter'],
    activityState: ['EXP8-ACT-02', 'EXP8-ACT-04']
  },
  {
    reqId: 'FR-27',
    title: 'User Management & Authentication',
    useCases: ['UC-34'],
    domainClasses: ['User', 'Admin'],
    ssds: ['EXP5-SSD-01'],
    dsds: ['EXP6-BCE-01'],
    designClasses: ['AdminSecurityUI', 'SecurityController', 'User'],
    activityState: ['EXP8-ACT-01']
  },
  {
    reqId: 'FR-28',
    title: 'Role-Based Access Control (RBAC)',
    useCases: ['UC-34'],
    domainClasses: ['Role', 'User'],
    ssds: ['EXP5-SSD-01'],
    dsds: ['EXP6-BCE-01'],
    designClasses: ['AdminSecurityUI', 'SecurityController', 'Role'],
    activityState: ['EXP8-ACT-01']
  },
  {
    reqId: 'FR-29',
    title: 'Security Audit Logs',
    useCases: ['UC-35'],
    domainClasses: ['AuditLog', 'User'],
    ssds: ['EXP5-SSD-01'],
    dsds: ['EXP6-BCE-01'],
    designClasses: ['AdminSecurityUI', 'SecurityController', 'AuditLog'],
    activityState: ['EXP8-ACT-01']
  },
  {
    reqId: 'FR-30',
    title: 'Master Settings & Configuration',
    useCases: ['UC-34'],
    domainClasses: ['Department', 'Ward', 'LabTest'],
    ssds: ['EXP5-SSD-07'],
    dsds: ['EXP6-DSD-06'],
    designClasses: ['AdminSecurityUI', 'SecurityController', 'Department'],
    activityState: ['EXP8-ACT-06']
  }
];
