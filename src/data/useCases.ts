import { UseCase } from '@/types';

export const USE_CASES: UseCase[] = [
  {
    id: 'UC-01',
    name: 'Register Patient Profile (Patient Self-Service)',
    goal: 'Allow a patient to self-register online by creating a demographic health account and obtaining a unique Universal Health Identifier (UHID).',
    primaryActor: 'Patient',
    supportingActors: ['NotificationService'],
    package: 'Patient Management Package',
    module: 'patient-registration',
    preconditions: ['Patient has access to SHMS online web portal.'],
    postconditions: ['Patient profile is saved in Master Patient Index database with active UHID and credentials.'],
    mainFlow: [
      { step: 1, action: 'Patient navigates to portal and selects "New Patient Registration".' },
      { step: 2, action: 'System displays registration form requesting demographic, contact, and emergency details.' },
      { step: 3, action: 'Patient fills required fields (Name, Age, Gender, Phone, Email, Address, Emergency Contact) and submits.' },
      { step: 4, action: 'System validates input fields for completeness and uniqueness of phone/email.' },
      { step: 5, action: 'System generates unique UHID (e.g. P-1004) and securely hashes password.' },
      { step: 6, action: 'System creates Patient entity, sends welcome SMS notification, and displays success receipt.' }
    ],
    alternativeFlows: [
      { name: 'Duplicate Registration', condition: 'Phone number already exists in system.', action: 'System notifies user and offers link to recovery login.' }
    ],
    relatedRequirements: ['FR-01', 'FR-02', 'FR-03'],
    relatedClasses: ['Patient', 'User', 'PatientRegistrationController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-01', 'EXP5-HLSD-01', 'EXP6-DSD-01', 'EXP8-ACT-01']
  },
  {
    id: 'UC-02',
    name: 'Manage Demographic Profile',
    goal: 'Enable patient to view and update personal contact address, emergency numbers, and insurance coverage details.',
    primaryActor: 'Patient',
    supportingActors: [],
    package: 'Patient Management Package',
    module: 'patient-registration',
    preconditions: ['Patient is logged into SHMS session.'],
    postconditions: ['Updated demographic attributes are committed to Patient entity.'],
    mainFlow: [
      { step: 1, action: 'Patient accesses Profile settings.' },
      { step: 2, action: 'System renders current demographic details.' },
      { step: 3, action: 'Patient modifies address or emergency contact details and clicks "Save Changes".' },
      { step: 4, action: 'System updates Patient record and displays confirmation.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-03'],
    relatedClasses: ['Patient'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-01']
  },
  {
    id: 'UC-03',
    name: 'Book Outpatient Appointment',
    goal: 'Allow patient to search available clinical specialties and doctors to schedule an outpatient consultation slot.',
    primaryActor: 'Patient',
    supportingActors: ['NotificationService'],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Patient is registered with active UHID.'],
    postconditions: ['Appointment record is created in "Confirmed" status and doctor slot capacity is updated.'],
    mainFlow: [
      { step: 1, action: 'Patient selects clinical department (e.g., Cardiology).' },
      { step: 2, action: 'System queries active Doctor schedules and displays available date/time slots.' },
      { step: 3, action: 'Patient selects Doctor Arjun Rao and slot 10:30 AM.' },
      { step: 4, action: 'System verifies slot availability and creates Appointment record (APT-2026-004).' },
      { step: 5, action: 'System sends confirmation SMS notification to patient and doctor.' }
    ],
    alternativeFlows: [
      { name: 'Slot Fully Booked', condition: 'Selected slot capacity reached.', action: 'System prompts user to choose next available slot.' }
    ],
    relatedRequirements: ['FR-04', 'FR-05', 'FR-26'],
    relatedClasses: ['Appointment', 'Doctor', 'AppointmentController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-02', 'EXP5-HLSD-02', 'EXP6-DSD-02', 'EXP8-ACT-02', 'EXP8-STM-01']
  },
  {
    id: 'UC-04',
    name: 'Cancel / Reschedule Appointment',
    goal: 'Allow patient or receptionist to modify appointment timing or cancel booking ahead of consultation time.',
    primaryActor: 'Patient',
    supportingActors: ['Receptionist'],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Appointment exists in "Confirmed" state.'],
    postconditions: ['Appointment status updated to "Cancelled" or new slot assigned.'],
    mainFlow: [
      { step: 1, action: 'User views scheduled appointments list.' },
      { step: 2, action: 'User selects target appointment and clicks "Cancel Appointment".' },
      { step: 3, action: 'System updates Appointment state to Cancelled and releases slot capacity.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-04'],
    relatedClasses: ['Appointment', 'AppointmentController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP8-STM-01']
  },
  {
    id: 'UC-05',
    name: 'OP Check-In & Token Self-Service',
    goal: 'Allow arriving patient to confirm presence at hospital desk and receive consultation queue token number.',
    primaryActor: 'Patient',
    supportingActors: ['Receptionist'],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Patient arrives at hospital on appointment date.'],
    postconditions: ['Appointment transitions to "Checked In" state and Queue token is generated.'],
    mainFlow: [
      { step: 1, action: 'Patient inputs UHID or scans booking QR code at check-in desk kiosk.' },
      { step: 2, action: 'System validates today\'s appointment status.' },
      { step: 3, action: 'System generates sequential token (e.g., Token #04).' },
      { step: 4, action: 'System updates Queue state and displays waiting room assignment.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-06', 'FR-07'],
    relatedClasses: ['Appointment', 'Queue'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-03', 'EXP8-ACT-02', 'EXP8-STM-01']
  },
  {
    id: 'UC-06',
    name: 'View Diagnostic Reports',
    goal: 'Allow patient to inspect and download digital laboratory test reports once approved by pathologists.',
    primaryActor: 'Patient',
    supportingActors: [],
    package: 'Laboratory Package',
    module: 'laboratory',
    preconditions: ['Lab report is in "Approved" status.'],
    postconditions: ['Report document rendered/downloaded.'],
    mainFlow: [
      { step: 1, action: 'Patient opens Lab Reports tab.' },
      { step: 2, action: 'System lists completed lab reports.' },
      { step: 3, action: 'Patient clicks "View Report" to inspect parameters and doctor commentary.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-14'],
    relatedClasses: ['LabReport', 'LabTestOrder'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-05']
  },
  {
    id: 'UC-07',
    name: 'View Digital Prescriptions',
    goal: 'Allow patient to review electronic prescriptions issued by doctors during consultation.',
    primaryActor: 'Patient',
    supportingActors: [],
    package: 'Pharmacy Package',
    module: 'pharmacy-inventory',
    preconditions: ['Doctor has saved prescription.'],
    postconditions: ['Prescription details rendered.'],
    mainFlow: [
      { step: 1, action: 'Patient opens Prescriptions tab.' },
      { step: 2, action: 'System displays issued medicines, dosage instructions, and duration.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-10', 'FR-18'],
    relatedClasses: ['Prescription'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-06']
  },
  {
    id: 'UC-08',
    name: 'Settle Medical Bills (Online)',
    goal: 'Allow patient to pay outstanding hospital bills via credit card or UPI gateway adapter.',
    primaryActor: 'Patient',
    supportingActors: ['PaymentGatewayAdapter'],
    package: 'Billing & Payment Package',
    module: 'billing-payment',
    preconditions: ['Bill status is "Pending" or "Partially Paid".'],
    postconditions: ['Bill status transitions to "Paid" and Receipt is generated.'],
    mainFlow: [
      { step: 1, action: 'Patient views outstanding hospital invoice.' },
      { step: 2, action: 'Patient selects payment gateway (UPI/Card) and confirms amount.' },
      { step: 3, action: 'PaymentGatewayAdapter processes transaction and returns success code.' },
      { step: 4, action: 'System records Payment entity, marks Bill as Paid, and issues Receipt.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-20', 'FR-21', 'FR-22'],
    relatedClasses: ['Bill', 'Payment', 'BillingController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-08', 'EXP6-DSD-07', 'EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    id: 'UC-09',
    name: 'Download Payment Receipt',
    goal: 'Allow patient or cashier to print digital payment receipt.',
    primaryActor: 'Patient',
    supportingActors: ['Cashier'],
    package: 'Billing & Payment Package',
    module: 'billing-payment',
    preconditions: ['Payment is completed.'],
    postconditions: ['Receipt PDF generated.'],
    mainFlow: [
      { step: 1, action: 'User selects paid invoice and clicks "Download Receipt".' },
      { step: 2, action: 'System renders formatted official receipt.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-22'],
    relatedClasses: ['Receipt', 'Payment'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-08']
  },
  {
    id: 'UC-10',
    name: 'Request Follow-Up Appointment',
    goal: 'Allow patient to request a follow-up review slot recommended by doctor.',
    primaryActor: 'Patient',
    supportingActors: ['Doctor'],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Prior consultation exists.'],
    postconditions: ['Follow-up appointment booked.'],
    mainFlow: [
      { step: 1, action: 'Patient selects completed consultation and clicks "Book Follow-up".' },
      { step: 2, action: 'System pre-fills doctor and department, suggesting review dates.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-24'],
    relatedClasses: ['Appointment', 'Consultation'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP8-ACT-03']
  },
  {
    id: 'UC-11',
    name: 'Register Walk-In Patient',
    goal: 'Enable desk receptionist to quickly register walk-in patients arriving without prior account.',
    primaryActor: 'Receptionist',
    supportingActors: [],
    package: 'Patient Management Package',
    module: 'patient-registration',
    preconditions: ['Receptionist is logged into desk workstation.'],
    postconditions: ['New Patient record created with UHID.'],
    mainFlow: [
      { step: 1, action: 'Receptionist collects patient details at front desk.' },
      { step: 2, action: 'Receptionist enters details into registration screen and submits.' },
      { step: 3, action: 'System generates UHID and prints physical registration card.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-01'],
    relatedClasses: ['Patient', 'PatientRegistrationController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-01', 'EXP6-DSD-01', 'EXP8-ACT-01']
  },
  {
    id: 'UC-12',
    name: 'Search Master Patient Index',
    goal: 'Enable receptionist to lookup patient records using UHID or phone number.',
    primaryActor: 'Receptionist',
    supportingActors: [],
    package: 'Patient Management Package',
    module: 'patient-registration',
    preconditions: ['Receptionist logged in.'],
    postconditions: ['Matching patient records displayed.'],
    mainFlow: [
      { step: 1, action: 'Receptionist enters search criteria.' },
      { step: 2, action: 'System queries database and lists matches.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-02'],
    relatedClasses: ['Patient', 'PatientRegistrationController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-01']
  },
  {
    id: 'UC-13',
    name: 'Manage Doctor Schedules & Slots',
    goal: 'Enable receptionist/admin to configure consulting hours and slot limits.',
    primaryActor: 'Receptionist',
    supportingActors: ['Admin'],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Doctor account exists.'],
    postconditions: ['Schedule matrix updated.'],
    mainFlow: [
      { step: 1, action: 'User selects doctor and defines working shift hours.' },
      { step: 2, action: 'System creates time slots.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-05'],
    relatedClasses: ['Doctor', 'Department'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-02']
  },
  {
    id: 'UC-14',
    name: 'Process Desk Check-In',
    goal: 'Process arriving patient check-in at front desk.',
    primaryActor: 'Receptionist',
    supportingActors: [],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Appointment exists.'],
    postconditions: ['Appointment marked Checked In.'],
    mainFlow: [
      { step: 1, action: 'Receptionist locates patient appointment and confirms arrival.' },
      { step: 2, action: 'System issues token number.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-06'],
    relatedClasses: ['Appointment', 'Queue'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-03']
  },
  {
    id: 'UC-15',
    name: 'Manage Outpatient Queue',
    goal: 'Call active token numbers to consultation rooms.',
    primaryActor: 'Receptionist',
    supportingActors: ['Doctor'],
    package: 'Appointment & OP Package',
    module: 'appointment-op',
    preconditions: ['Queue active.'],
    postconditions: ['Token called.'],
    mainFlow: [
      { step: 1, action: 'User updates active token status to "In Consultation".' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-07'],
    relatedClasses: ['Queue'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-03']
  },
  {
    id: 'UC-16',
    name: 'Initiate Inpatient Admission',
    goal: 'Process hospital admission paperwork upon doctor order.',
    primaryActor: 'Receptionist',
    supportingActors: ['Doctor'],
    package: 'Inpatient Package',
    module: 'ip-management',
    preconditions: ['Admission order exists.'],
    postconditions: ['Admission entity created.'],
    mainFlow: [
      { step: 1, action: 'Receptionist opens admission portal and selects patient.' },
      { step: 2, action: 'System creates Admission record.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-15'],
    relatedClasses: ['Admission', 'AdmissionController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-07', 'EXP6-DSD-06', 'EXP8-ACT-06', 'EXP8-STM-03']
  },
  {
    id: 'UC-17',
    name: 'Allocate Ward Bed',
    goal: 'Assign an available ward/ICU bed to admitted patient.',
    primaryActor: 'Receptionist',
    supportingActors: [],
    package: 'Inpatient Package',
    module: 'ip-management',
    preconditions: ['Admission active, vacant beds exist.'],
    postconditions: ['Bed assigned and status marked Occupied.'],
    mainFlow: [
      { step: 1, action: 'Receptionist selects Ward (e.g. ICU) and Bed B-102.' },
      { step: 2, action: 'System binds Bed to Admission entity.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-16'],
    relatedClasses: ['Bed', 'Ward', 'Admission'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-07', 'EXP6-DSD-06', 'EXP8-ACT-06']
  },
  {
    id: 'UC-18',
    name: 'Process Inpatient Discharge',
    goal: 'Execute inpatient discharge workflow upon clinical and financial clearance.',
    primaryActor: 'Receptionist',
    supportingActors: ['Doctor', 'Cashier'],
    package: 'Inpatient Package',
    module: 'ip-management',
    preconditions: ['Bill settled, doctor discharge summary signed.'],
    postconditions: ['Bed released and Admission closed.'],
    mainFlow: [
      { step: 1, action: 'Receptionist clicks "Complete Discharge".' },
      { step: 2, action: 'System verifies payment clearance and marks Bed Available.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-23'],
    relatedClasses: ['Admission', 'Bed', 'Bill'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-09', 'EXP6-DSD-08', 'EXP8-ACT-08', 'EXP8-STM-03']
  },
  {
    id: 'UC-19',
    name: 'Issue Visitor Pass',
    goal: 'Generate temporary visitor pass for inpatient family members.',
    primaryActor: 'Receptionist',
    supportingActors: [],
    package: 'Inpatient Package',
    module: 'ip-management',
    preconditions: ['Patient admitted.'],
    postconditions: ['Visitor pass issued.'],
    mainFlow: [
      { step: 1, action: 'Receptionist prints visitor badge with bed details.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-15'],
    relatedClasses: ['Admission'],
    relatedDiagrams: ['EXP3-UC-01']
  },
  {
    id: 'UC-20',
    name: 'Conduct Doctor Consultation',
    goal: 'Record chief complaints, clinical examination, and consultation notes.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'appointment-op',
    preconditions: ['Patient token active in room.'],
    postconditions: ['Consultation entity updated.'],
    mainFlow: [
      { step: 1, action: 'Doctor selects active token and opens patient chart.' },
      { step: 2, action: 'Doctor inputs vitals, symptoms, and examination notes.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-08'],
    relatedClasses: ['Consultation', 'MedicalRecord', 'ConsultationController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-04', 'EXP6-DSD-03', 'EXP8-ACT-03']
  },
  {
    id: 'UC-21',
    name: 'Record Clinical Diagnosis',
    goal: 'Assign ICD-10 diagnosis codes to patient consultation.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'appointment-op',
    preconditions: ['Consultation in progress.'],
    postconditions: ['Diagnosis linked to Consultation.'],
    mainFlow: [
      { step: 1, action: 'Doctor searches diagnosis catalog and attaches code.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-09'],
    relatedClasses: ['Diagnosis', 'Consultation'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-04']
  },
  {
    id: 'UC-22',
    name: 'Create Electronic Prescription',
    goal: 'Prescribe medications with dosage parameters during consultation.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'appointment-op',
    preconditions: ['Consultation in progress.'],
    postconditions: ['Prescription sent to Pharmacy module.'],
    mainFlow: [
      { step: 1, action: 'Doctor selects medicines, specifies dosage/duration, and saves prescription.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-10'],
    relatedClasses: ['Prescription', 'PrescriptionItem', 'ConsultationController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-04', 'EXP6-DSD-03', 'EXP8-ACT-03', 'EXP8-STM-05']
  },
  {
    id: 'UC-23',
    name: 'Request Diagnostic Lab Tests',
    goal: 'Order laboratory diagnostic panels for patient.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'laboratory',
    preconditions: ['Consultation in progress.'],
    postconditions: ['LabTestOrder created.'],
    mainFlow: [
      { step: 1, action: 'Doctor selects test panels (CBC, Lipid Profile) and submits order.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-11'],
    relatedClasses: ['LabTestOrder', 'LabTest'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-05', 'EXP6-DSD-04', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    id: 'UC-24',
    name: 'Review Completed Lab Reports',
    goal: 'Inspect completed diagnostic reports to formulate treatment.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'laboratory',
    preconditions: ['Lab report approved.'],
    postconditions: ['Doctor reviews findings.'],
    mainFlow: [
      { step: 1, action: 'Doctor opens lab notification and inspects test results.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-14'],
    relatedClasses: ['LabReport'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-05']
  },
  {
    id: 'UC-25',
    name: 'Recommend Inpatient Admission',
    goal: 'Issue admission order for severe cases requiring hospitalization.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'ip-management',
    preconditions: ['Patient requires IP care.'],
    postconditions: ['Admission recommendation created.'],
    mainFlow: [
      { step: 1, action: 'Doctor clicks "Recommend Admission" and specifies ward category.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-15'],
    relatedClasses: ['Admission'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-07']
  },
  {
    id: 'UC-26',
    name: 'Formulate Treatment Plan',
    goal: 'Document daily clinical round notes and treatment instructions.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Inpatient Package',
    module: 'ip-management',
    preconditions: ['Patient admitted.'],
    postconditions: ['TreatmentPlan updated.'],
    mainFlow: [
      { step: 1, action: 'Doctor adds daily progress notes and medication adjustments.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-17'],
    relatedClasses: ['TreatmentPlan'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-07']
  },
  {
    id: 'UC-27',
    name: 'Schedule Doctor Follow-Up',
    goal: 'Set follow-up date for patient review.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Clinical Package',
    module: 'appointment-op',
    preconditions: ['Consultation closing.'],
    postconditions: ['Follow-up slot registered.'],
    mainFlow: [
      { step: 1, action: 'Doctor sets follow-up timeframe (e.g. 7 days).' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-24'],
    relatedClasses: ['Appointment'],
    relatedDiagrams: ['EXP3-UC-01']
  },
  {
    id: 'UC-28',
    name: 'Authorize Discharge Summary',
    goal: 'Sign off medical discharge summary with advice on discharge.',
    primaryActor: 'Doctor',
    supportingActors: [],
    package: 'Inpatient Package',
    module: 'ip-management',
    preconditions: ['Patient ready for discharge.'],
    postconditions: ['Discharge summary finalized.'],
    mainFlow: [
      { step: 1, action: 'Doctor signs discharge note.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-23'],
    relatedClasses: ['Admission'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-09', 'EXP6-DSD-08']
  },
  {
    id: 'UC-29',
    name: 'Collect Diagnostic Sample',
    goal: 'Log specimen collection and attach barcode label.',
    primaryActor: 'Lab Technician',
    supportingActors: [],
    package: 'Laboratory Package',
    module: 'laboratory',
    preconditions: ['Lab order active.'],
    postconditions: ['Sample status "Sample Collected".'],
    mainFlow: [
      { step: 1, action: 'Lab Tech collects sample, scans barcode, and logs arrival in lab.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-12'],
    relatedClasses: ['Sample', 'LabTestOrder', 'LaboratoryController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-05', 'EXP6-DSD-04', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    id: 'UC-30',
    name: 'Process Test & Enter Results',
    goal: 'Run lab test analyzer and enter measured parameter values.',
    primaryActor: 'Lab Technician',
    supportingActors: [],
    package: 'Laboratory Package',
    module: 'laboratory',
    preconditions: ['Sample collected.'],
    postconditions: ['Results recorded.'],
    mainFlow: [
      { step: 1, action: 'Lab Tech inputs numeric parameter values and saves draft report.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-13'],
    relatedClasses: ['LabTestOrder', 'LaboratoryController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-05', 'EXP6-DSD-04', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    id: 'UC-31',
    name: 'Approve & Release Lab Report',
    goal: 'Validate results against normal reference ranges and publish official report.',
    primaryActor: 'Lab Technician',
    supportingActors: ['Doctor'],
    package: 'Laboratory Package',
    module: 'laboratory',
    preconditions: ['Results entered.'],
    postconditions: ['LabReport status marked "Approved".'],
    mainFlow: [
      { step: 1, action: 'Pathologist/Tech approves report and releases to patient portal.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-14'],
    relatedClasses: ['LabReport', 'LaboratoryController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-05', 'EXP5-HLSD-04', 'EXP6-DSD-04', 'EXP8-ACT-04', 'EXP8-STM-02']
  },
  {
    id: 'UC-32',
    name: 'Dispense Prescribed Medicines',
    goal: 'Verify prescription, check inventory, dispense drugs, and update stock.',
    primaryActor: 'Pharmacist',
    supportingActors: [],
    package: 'Pharmacy Package',
    module: 'pharmacy-inventory',
    preconditions: ['Prescription active.'],
    postconditions: ['Medicines dispensed, stock decremented.'],
    mainFlow: [
      { step: 1, action: 'Pharmacist opens prescription, selects items, and clicks "Dispense".' },
      { step: 2, action: 'System updates InventoryItem stock and adds bill item.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-18', 'FR-19'],
    relatedClasses: ['Prescription', 'Medicine', 'PharmacyController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-06', 'EXP6-DSD-05', 'EXP8-ACT-05', 'EXP8-STM-05']
  },
  {
    id: 'UC-32a',
    name: 'Manage Stock & Reorder Alerts',
    goal: 'Track stock quantities and trigger low-stock alerts when threshold breached.',
    primaryActor: 'Pharmacist',
    supportingActors: ['Admin'],
    package: 'Pharmacy Package',
    module: 'pharmacy-inventory',
    preconditions: ['Stock item exists.'],
    postconditions: ['Low-stock alert generated if quantity < reorder level.'],
    mainFlow: [
      { step: 1, action: 'System checks inventory after dispensing and flags low stock items.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-19'],
    relatedClasses: ['InventoryItem', 'PharmacyController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-06', 'EXP8-ACT-05']
  },
  {
    id: 'UC-33',
    name: 'Generate Consolidated Bill',
    goal: 'Aggregate consultation, lab, pharmacy, and ward charges into single invoice.',
    primaryActor: 'Cashier',
    supportingActors: [],
    package: 'Billing & Payment Package',
    module: 'billing-payment',
    preconditions: ['Services rendered.'],
    postconditions: ['Bill entity created.'],
    mainFlow: [
      { step: 1, action: 'Cashier searches Patient UHID and clicks "Generate Bill".' },
      { step: 2, action: 'System calculates subtotal, discounts, and total net amount.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-20'],
    relatedClasses: ['Bill', 'BillItem', 'BillingController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-08', 'EXP6-DSD-07', 'EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    id: 'UC-33a',
    name: 'Apply Concession / Insurance Claim',
    goal: 'Adjust bill amount based on corporate insurance coverage or senior discount.',
    primaryActor: 'Cashier',
    supportingActors: [],
    package: 'Billing & Payment Package',
    module: 'billing-payment',
    preconditions: ['Bill open.'],
    postconditions: ['Discount applied.'],
    mainFlow: [
      { step: 1, action: 'Cashier applies 10% senior concession or insurance claim deduction.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-20'],
    relatedClasses: ['Bill', 'BillingController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-08']
  },
  {
    id: 'UC-33b',
    name: 'Process Desk Payment',
    goal: 'Receive cash/card payment at desk and record transaction.',
    primaryActor: 'Cashier',
    supportingActors: [],
    package: 'Billing & Payment Package',
    module: 'billing-payment',
    preconditions: ['Bill generated.'],
    postconditions: ['Payment completed, Receipt printed.'],
    mainFlow: [
      { step: 1, action: 'Cashier collects cash/card, inputs amount, and clicks "Process Payment".' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-21', 'FR-22'],
    relatedClasses: ['Payment', 'Receipt', 'BillingController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP5-SSD-08', 'EXP6-DSD-07', 'EXP8-ACT-07', 'EXP8-STM-04']
  },
  {
    id: 'UC-34',
    name: 'Configure RBAC & System Users',
    goal: 'Create user credentials, assign roles (Doctor, Receptionist), and manage permissions.',
    primaryActor: 'Admin',
    supportingActors: [],
    package: 'Security & Admin Package',
    module: 'security-admin',
    preconditions: ['Admin authenticated.'],
    postconditions: ['User/Role configuration updated.'],
    mainFlow: [
      { step: 1, action: 'Admin manages user accounts and assigns security roles.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-27', 'FR-28', 'FR-30'],
    relatedClasses: ['User', 'Role', 'Admin', 'SecurityController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP6-BCE-01', 'EXP7-DCD-01']
  },
  {
    id: 'UC-35',
    name: 'Audit Security & System Logs',
    goal: 'Review append-only audit trail and generate administrative operational reports.',
    primaryActor: 'Admin',
    supportingActors: [],
    package: 'Security & Admin Package',
    module: 'security-admin',
    preconditions: ['Admin authenticated.'],
    postconditions: ['Audit log view rendered.'],
    mainFlow: [
      { step: 1, action: 'Admin filters audit trail by user role, timestamp, or entity.' }
    ],
    alternativeFlows: [],
    relatedRequirements: ['FR-25', 'FR-29'],
    relatedClasses: ['AuditLog', 'SecurityController', 'ReportController'],
    relatedDiagrams: ['EXP3-UC-01', 'EXP6-BCE-01', 'EXP7-DCD-01']
  }
];
