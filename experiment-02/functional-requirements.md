# Functional Requirements Specification (FR-01 to FR-30)

This document specifies the 30 granular functional requirements governing the Smart Hospital Management System (SHMS).

---

### FR-01: Patient Registration
* **Description**: The system shall capture patient demographic details (Name, DOB, Gender, Phone, Email, Address, Emergency Contact) and generate a unique Patient ID (UHID).
* **Actor**: Receptionist / Patient
* **Preconditions**: Patient is not already registered.
* **Expected Outcome**: Patient record is saved, UHID is assigned, and registration receipt/card is generated.

### FR-02: Patient Search & Lookup
* **Description**: The system shall allow authorized users to search registered patient records by Patient ID, Name, Phone Number, or National Identification.
* **Actor**: Receptionist / Doctor / Cashier
* **Preconditions**: System database is active.
* **Expected Outcome**: Matching patient profiles are displayed with current status.

### FR-03: Patient Profile Management
* **Description**: The system shall permit patients or receptionists to update contact numbers, address, and emergency contact details.
* **Actor**: Patient / Receptionist
* **Preconditions**: Valid patient profile exists.
* **Expected Outcome**: Profile updates are validated and saved to database with modification timestamp.

### FR-04: Appointment Booking
* **Description**: The system shall allow patients or receptionists to schedule outpatient appointments by selecting department, doctor, date, and available time slot.
* **Actor**: Patient / Receptionist
* **Preconditions**: Doctor schedule is configured.
* **Expected Outcome**: Appointment record is created in status `Confirmed` with a unique Appointment ID.

### FR-05: Doctor Availability Management
* **Description**: The system shall allow doctors or administrators to define weekly duty schedules, consultation slots, leave dates, and maximum daily patient quotas.
* **Actor**: Doctor / Admin
* **Preconditions**: Doctor account exists in system.
* **Expected Outcome**: Slot availability is updated real-time for appointment scheduling.

### FR-06: Outpatient (OP) Check-In
* **Description**: The system shall register patient arrival at the hospital reception desk on the day of appointment and issue a queue token.
* **Actor**: Receptionist / Patient
* **Preconditions**: Appointment status is `Confirmed`.
* **Expected Outcome**: Appointment status transitions to `CheckedIn` and sequential queue token is generated.

### FR-07: OP Queue Management
* **Description**: The system shall maintain real-time outpatient waiting queues per doctor, displaying token status on waiting area monitors and doctor dashboards.
* **Actor**: Receptionist / Doctor
* **Preconditions**: Patients have checked in.
* **Expected Outcome**: Queue is updated dynamically as doctors call, consult, or complete patients.

### FR-08: Doctor Consultation
* **Description**: The system shall provide an electronic clinical workstation for doctors to record chief complaints, examination findings, diagnosis notes, and clinical advice.
* **Actor**: Doctor
* **Preconditions**: Patient appointment status is `CheckedIn`.
* **Expected Outcome**: Consultation record is created and linked to patient's `MedicalRecord`.

### FR-09: Clinical Diagnosis Recording
* **Description**: The system shall allow doctors to select standardized ICD/clinical diagnosis codes and assign severity levels to patient records.
* **Actor**: Doctor
* **Preconditions**: Active consultation session.
* **Expected Outcome**: Diagnosis entity is linked to consultation and medical record.

### FR-10: Electronic Prescription Creation
* **Description**: The system shall enable doctors to compile digital prescriptions specifying medicine name, dosage, frequency, duration, and special instructions.
* **Actor**: Doctor
* **Preconditions**: Active consultation session.
* **Expected Outcome**: Prescription record is generated in status `Created` and transmitted to Pharmacy module.

### FR-11: Laboratory Test Ordering
* **Description**: The system shall allow doctors to select diagnostic lab tests (e.g. CBC, Lipid Profile, X-Ray) during consultation and generate lab orders.
* **Actor**: Doctor
* **Preconditions**: Active consultation session.
* **Expected Outcome**: `LabTestOrder` is generated in status `Requested` and sent to Laboratory module.

### FR-12: Lab Sample Collection
* **Description**: The system shall enable lab technicians to verify test orders, barcode specimen containers, and record sample collection timestamps.
* **Actor**: Lab Technician
* **Preconditions**: `LabTestOrder` exists in status `Requested`.
* **Expected Outcome**: `Sample` object is created and test order transitions to `SampleCollected`.

### FR-13: Laboratory Test Processing
* **Description**: The system shall allow lab technicians to log test execution parameters, equipment identifiers, and raw measurement values.
* **Actor**: Lab Technician
* **Preconditions**: Test order status is `SampleCollected`.
* **Expected Outcome**: Order status transitions to `Processing`.

### FR-14: Lab Result Entry & Report Approval
* **Description**: The system shall allow lab technicians to input final test result values, compare against reference ranges, upload digital PDF reports, and mark reports as approved.
* **Actor**: Lab Technician
* **Preconditions**: Test processing is completed.
* **Expected Outcome**: `LabReport` transitions to `Approved` and becomes accessible to the ordering doctor and patient.

### FR-15: Inpatient (IP) Admission Recommendation
* **Description**: The system shall enable doctors to issue an IP admission recommendation specifying department, admitting diagnosis, and ward type preference.
* **Actor**: Doctor
* **Preconditions**: Active consultation or emergency evaluation.
* **Expected Outcome**: `Admission` record is initiated in status `Requested`.

### FR-16: Bed Allocation & Ward Management
* **Description**: The system shall display real-time bed occupancy across wards (General, Semi-Private, ICU) and allow receptionists to assign an available bed to an admitted patient.
* **Actor**: Receptionist
* **Preconditions**: `Admission` is in status `Requested` and an available `Bed` exists.
* **Expected Outcome**: `Bed` status becomes `Occupied` and `Admission` transitions to `BedAllocated` / `Admitted`.

### FR-17: Inpatient Treatment Tracking
* **Description**: The system shall allow doctors and nurses to record daily rounds, medication administration, progress notes, and vital signs during IP stay.
* **Actor**: Doctor
* **Preconditions**: Patient status is `Admitted`.
* **Expected Outcome**: `TreatmentPlan` and daily clinical logs are appended to the patient record.

### FR-18: Prescription Verification & Dispensing
* **Description**: The system shall enable pharmacists to search pending digital prescriptions, verify medicine details, check stock levels, and mark items as dispensed.
* **Actor**: Pharmacist
* **Preconditions**: `Prescription` exists in status `Created`.
* **Expected Outcome**: Prescription status updates to `Dispensed` and pharmacy charges are logged.

### FR-19: Inventory Stock Update & Low Stock Alerting
* **Description**: The system shall automatically decrement medicine stock quantities upon dispensing and generate an alert when stock drops below designated reorder levels.
* **Actor**: System / Pharmacist
* **Preconditions**: Dispensing action executed.
* **Expected Outcome**: `InventoryItem` quantity updated; `LowStockAlert` dispatched if threshold crossed.

### FR-20: Multi-Service Bill Generation
* **Description**: The system shall automatically compile itemized charges from consultation fees, lab test charges, pharmacy items, and daily room charges into a consolidated bill.
* **Actor**: Cashier / System
* **Preconditions**: Patient service delivery completed or discharge initiated.
* **Expected Outcome**: `Bill` record generated with total amount, itemized breakdown, and status `Pending`.

### FR-21: Payment Settlement
* **Description**: The system shall process payments settled via Cash, Credit/Debit Card, or UPI online gateway.
* **Actor**: Cashier / Patient
* **Preconditions**: `Bill` status is `Pending`.
* **Expected Outcome**: `Payment` record created, `Bill` status transitions to `Paid`.

### FR-22: Official Receipt Generation
* **Description**: The system shall generate and print an official itemized payment receipt bearing receipt ID, transaction reference, date, and payment status upon bill settlement.
* **Actor**: Cashier / System
* **Preconditions**: Payment processed successfully (`Paid`).
* **Expected Outcome**: `Receipt` object generated and printed/emailed to patient.

### FR-23: Inpatient Discharge Processing
* **Description**: The system shall guide the discharge process including doctor's discharge summary approval, pharmacy return clearance, final bill payment settlement, and bed release.
* **Actor**: Doctor / Receptionist / Cashier
* **Preconditions**: Doctor has signed `DischargeSummary` and bill status is `Paid`.
* **Expected Outcome**: `Admission` transitions to `Discharged`, `Bed` status reverts to `Available`.

### FR-24: Follow-Up Appointment Scheduling
* **Description**: The system shall allow doctors to schedule follow-up consultation dates during prescription or discharge summary creation.
* **Actor**: Doctor
* **Preconditions**: Consultation or discharge active.
* **Expected Outcome**: Follow-up reminder and tentative slot reservation generated.

### FR-25: Operational & Financial Report Analytics
* **Description**: The system shall provide administrators and hospital management with configurable reports for daily revenue, department patient count, bed occupancy rates, and lab test volume.
* **Actor**: Admin / Hospital Management
* **Preconditions**: System contains logged transaction records.
* **Expected Outcome**: Analytical summary reports displayed as tables and downloadable PDF/Excel files.

### FR-26: Automated Multi-Channel Notifications
* **Description**: The system shall dispatch automated SMS and email notifications for appointment confirmation, queue token alerts, lab report readiness, and billing receipts.
* **Actor**: System
* **Preconditions**: Trigger event occurs (e.g. report approved).
* **Expected Outcome**: Notification payload formatted and dispatched via `NotificationService`.

### FR-27: User Account Lifecycle Management
* **Description**: The system shall enable administrators to create, update, suspend, and reset passwords for all system user accounts.
* **Actor**: Admin
* **Preconditions**: Administrator authenticated.
* **Expected Outcome**: User record saved/updated in database.

### FR-28: Role-Based Access Control (RBAC) Configuration
* **Description**: The system shall enforce fine-grained access control matrix restricting screen access and API execution based on assigned roles (`Doctor`, `Pharmacist`, `Cashier`, etc.).
* **Actor**: Admin / System
* **Preconditions**: User session active.
* **Expected Outcome**: Unauthorized requests rejected with 403 Forbidden status.

### FR-29: Security Audit Trail Logging
* **Description**: The system shall record unalterable audit log entries capturing user ID, timestamp, IP address, action performed, and affected record ID for all critical data edits.
* **Actor**: System / Admin
* **Preconditions**: Data mutation event executed.
* **Expected Outcome**: `AuditLog` entry persisted in database.

### FR-30: System Master Settings Management
* **Description**: The system shall allow administrators to configure hospital master data including departments, wards, bed charges, lab test prices, and tax rates.
* **Actor**: Admin
* **Preconditions**: Administrator authenticated.
* **Expected Outcome**: Master lookup tables updated across all operational modules.
