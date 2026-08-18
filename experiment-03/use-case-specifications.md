# Detailed Use Case Specifications (12 Core Use Cases)

This document contains 12 formal use case specifications detailing goals, triggers, preconditions, postconditions, main flows, alternative flows, and exception scenarios.

---

## Specification 1: Register Patient (UC-01)
* **Use Case ID**: UC-01
* **Use Case Name**: Register Patient
* **Goal**: Capture patient demographic information and create a unique Patient record (UHID).
* **Primary Actor**: Receptionist / Patient
* **Supporting Actors**: System
* **Trigger**: A new patient requests registration at the hospital reception or via online portal.
* **Preconditions**: Patient does not possess an existing registered profile.
* **Postconditions**: Patient entity is saved, UHID is assigned, and profile is active.
* **Main Success Scenario**:
  1. Actor submits patient demographic details (Name, DOB, Gender, Phone, Email, Address, Emergency Contact).
  2. System validates input fields for completeness and format correctness.
  3. System checks for duplicate registration matching phone number or national ID.
  4. System generates a unique UHID (e.g. `P-9042`).
  5. System persists the new `Patient` entity in database.
  6. System issues registration confirmation card / digital UHID receipt.
* **Alternative Flows**:
  - *Alt 3a (Duplicate Found)*: System notifies actor that an existing patient record exists with the same phone/ID, displays existing UHID, and halts registration.
* **Exception Flows**:
  - *Exc 2a (Invalid Input Data)*: System displays field error messages (e.g. "Invalid Phone Number format") and prompts re-entry.
* **Business Rules**: `BR-01 Unique Patient Identification`.
* **Related Requirements**: `FR-01 Patient Registration`.

---

## Specification 2: Book Appointment (UC-03)
* **Use Case ID**: UC-03
* **Use Case Name**: Book Appointment
* **Goal**: Schedule an outpatient consultation with a specific doctor for a chosen date and time slot.
* **Primary Actor**: Patient / Receptionist
* **Supporting Actors**: System
* **Trigger**: Patient or Receptionist requests to reserve a consultation slot.
* **Preconditions**: Patient is registered in SHMS (possesses valid UHID).
* **Postconditions**: `Appointment` record is created in status `Confirmed`.
* **Main Success Scenario**:
  1. Actor selects desired Department and Doctor.
  2. System queries and displays available consultation dates and time slots for the selected doctor (`<<include>> Check Doctor Availability`).
  3. Actor selects an open time slot.
  4. System validates slot availability.
  5. System creates `Appointment` record with status `Confirmed` and issues an Appointment ID (`<<include>> Generate Appointment`).
  6. System dispatches SMS/Email appointment confirmation to patient.
* **Alternative Flows**:
  - *Alt 4a (Slot Filled Simultaneously)*: If another user reserves the slot before submission, system prompts actor to select an alternate slot.
* **Exception Flows**:
  - *Exc 2a (Doctor On Leave)*: System displays notice that doctor is unavailable on selected date and presents list of alternate doctors in department.
* **Business Rules**: Valid UHID required.
* **Related Requirements**: `FR-04 Appointment Booking`, `FR-05 Doctor Availability`.

---

## Specification 3: OP Check-In (UC-06 / UC-14)
* **Use Case ID**: UC-06 / UC-14
* **Use Case Name**: OP Check-In
* **Goal**: Register patient physical arrival at hospital reception and issue sequential queue token.
* **Primary Actor**: Receptionist / Patient
* **Supporting Actors**: System
* **Trigger**: Patient arrives at reception on the day of appointment.
* **Preconditions**: Patient has an appointment in status `Confirmed` for the current date.
* **Postconditions**: Appointment status transitions to `CheckedIn` and queue token is issued.
* **Main Success Scenario**:
  1. Receptionist inputs Patient UHID or Appointment ID.
  2. System verifies appointment details and confirms current date match.
  3. System updates `Appointment` status from `Confirmed` to `CheckedIn`.
  4. System calculates next sequential token number for the doctor's daily queue.
  5. System generates and prints OP Queue Token ticket.
  6. System updates real-time queue display monitor.
* **Alternative Flows**:
  - *Alt 1a (Walk-in without prior appointment)*: System routes to `UC-03 Book Appointment` for immediate slot booking prior to check-in.
* **Exception Flows**:
  - *Exc 2a (Appointment Date Mismatch)*: System alerts that appointment is scheduled for a different date.
* **Business Rules**: `BR-08 Queue Tokening`.
* **Related Requirements**: `FR-06 OP Check-In`, `FR-07 Queue Management`.

---

## Specification 4: Doctor Consultation (UC-20)
* **Use Case ID**: UC-20
* **Use Case Name**: Doctor Consultation
* **Goal**: Examine patient, record clinical notes, enter diagnoses, issue prescriptions, or order lab tests.
* **Primary Actor**: Doctor
* **Supporting Actors**: Patient, System
* **Trigger**: Doctor calls next patient token from queue dashboard.
* **Preconditions**: Patient appointment status is `CheckedIn`.
* **Postconditions**: Consultation record is saved; optional prescriptions/lab orders generated.
* **Main Success Scenario**:
  1. Doctor calls queue token and selects patient in workstation UI.
  2. System loads patient medical history and previous consultation records (`<<include>> View Patient Record`).
  3. Doctor enters chief complaints, clinical examination findings, and advice notes.
  4. Doctor selects ICD diagnosis codes (`<<include>> Record Diagnosis`).
  5. Doctor creates electronic prescription items (`<<include>> Create Prescription`).
  6. System saves `Consultation` object linked to patient's `MedicalRecord`.
  7. Appointment status updates to `Completed`.
* **Alternative Flows**:
  - *Alt 5a (Lab Test Needed)*: Doctor initiates lab order (`<<extend>> Request Laboratory Test`).
  - *Alt 5b (Hospital Admission Needed)*: Doctor initiates IP admission (`<<extend>> Recommend Inpatient Admission`).
* **Exception Flows**:
  - *Exc 6a (System Timeout/Network Disconnect)*: System auto-saves draft consultation text locally to prevent data loss.
* **Business Rules**: `BR-03 Doctor-Exclusive Prescription Authority`.
* **Related Requirements**: `FR-08 Doctor Consultation`, `FR-09 Diagnosis Recording`, `FR-10 Prescription Creation`.

---

## Specification 5: Request Laboratory Test (UC-23)
* **Use Case ID**: UC-23
* **Use Case Name**: Request Laboratory Test
* **Goal**: Order diagnostic lab tests for a patient during or after consultation.
* **Primary Actor**: Doctor
* **Supporting Actors**: System
* **Trigger**: Doctor identifies diagnostic requirement during patient consultation.
* **Preconditions**: Consultation session is active.
* **Postconditions**: `LabTestOrder` is created in status `Requested` and sent to Laboratory module.
* **Main Success Scenario**:
  1. Doctor selects lab test catalogue items (e.g. Complete Blood Count, Serum Creatinine).
  2. Doctor specifies clinical reason and urgency level (Routine / Urgent).
  3. System calculates total test fee estimation.
  4. System creates `LabTestOrder` object in status `Requested`.
  5. System transmits digital test request to Laboratory workstation queue.
* **Alternative Flows**: None.
* **Exception Flows**:
  - *Exc 1a (Invalid Test Selection)*: System alerts if selected test is currently unavailable due to lab equipment maintenance.
* **Business Rules**: `BR-03 Doctor-Exclusive Prescription Authority`.
* **Related Requirements**: `FR-11 Laboratory Test Request`.

---

## Specification 6: Process Laboratory Test (UC-30 / UC-31)
* **Use Case ID**: UC-30 / UC-31
* **Use Case Name**: Process Laboratory Test
* **Goal**: Collect sample, process lab test, enter results, and upload approved report.
* **Primary Actor**: Lab Technician
* **Supporting Actors**: System
* **Trigger**: Laboratory receives digital test request from doctor.
* **Preconditions**: `LabTestOrder` exists in status `Requested`.
* **Postconditions**: `LabReport` is created in status `Approved` and uploaded.
* **Main Success Scenario**:
  1. Lab Technician receives test order (`<<include>> Verify Test Order`).
  2. Technician collects specimen sample and tags container with generated barcode (`<<include>> Collect Sample`).
  3. Order status updates to `SampleCollected`.
  4. Technician processes test on lab analyzer (`<<include>> Process Test`).
  5. Order status updates to `Processing`.
  6. Technician inputs measured values and uploads digital PDF report (`<<include>> Enter Result`).
  7. Technician verifies values against reference range and approves report (`<<include>> Approve Report`).
  8. Report status becomes `Approved` and notification is sent to ordering doctor.
* **Alternative Flows**:
  - *Alt 2a (Sample Rejected)*: If sample is hemolyzed or insufficient, technician marks sample `Rejected` and requests re-collection.
* **Exception Flows**:
  - *Exc 6a (Panic Result Value)*: System flags extreme abnormal values with red warning indicator and triggers immediate alert to attending doctor.
* **Business Rules**: `BR-04 Lab Report Verification Before Release`.
* **Related Requirements**: `FR-12 Sample Collection`, `FR-13 Test Processing`, `FR-14 Laboratory Report`.

---

## Specification 7: Dispense Medicine (UC-32)
* **Use Case ID**: UC-32
* **Use Case Name**: Dispense Medicine
* **Goal**: Verify doctor prescription, check stock, dispense drugs, and update inventory.
* **Primary Actor**: Pharmacist
* **Supporting Actors**: System
* **Trigger**: Patient presents prescription ID or UHID at hospital pharmacy counter.
* **Preconditions**: `Prescription` exists in status `Created` signed by Doctor.
* **Postconditions**: Prescription status updates to `Dispensed`, inventory is decremented, pharmacy charge is generated.
* **Main Success Scenario**:
  1. Pharmacist enters Prescription ID or Patient UHID.
  2. System retrieves pending digital prescription details (`<<include>> Verify Prescription`).
  3. System checks stock availability for all prescribed items (`<<include>> Check Stock Availability`).
  4. Pharmacist picks and verifies medicine items against digital order.
  5. System updates `Prescription` status to `Dispensed`.
  6. System auto-decrements stock quantities in `InventoryItem` (`<<include>> Update Inventory`).
  7. System posts pharmacy item charges to `Billing` module (`<<include>> Generate Pharmacy Bill`).
* **Alternative Flows**:
  - *Alt 3a (Stock Low/Out of Stock)*: System notifies pharmacist of partial stock (`<<extend>> Low Stock Alert`), allows partial dispensing, and marks remaining items as backordered.
* **Exception Flows**:
  - *Exc 2a (Unverified Prescription)*: System blocks dispensing if prescription is missing doctor digital signature.
* **Business Rules**: `BR-05 Synchronous Inventory Deduction`.
* **Related Requirements**: `FR-18 Pharmacy Dispensing`, `FR-19 Inventory Management`.

---

## Specification 8: Admit Patient (UC-16 / UC-25)
* **Use Case ID**: UC-16 / UC-25
* **Use Case Name**: Admit Patient
* **Goal**: Process inpatient admission recommendation and initiate IP lifecycle.
* **Primary Actor**: Receptionist
* **Supporting Actors**: Doctor, System
* **Trigger**: Doctor issues IP admission recommendation during consultation or emergency evaluation.
* **Preconditions**: Doctor has created an `Admission` order in status `Requested`.
* **Postconditions**: Patient IP admission record is activated.
* **Main Success Scenario**:
  1. Receptionist retrieves pending admission request for Patient UHID.
  2. Receptionist verifies admitting diagnosis, attending doctor, and preferred ward type (ICU / General / Semi-Private).
  3. Receptionist captures emergency contact and insurance details.
  4. System validates patient has no existing active IP admission (`BR-09`).
  5. System saves `Admission` record in status `Admitted`.
  6. System routes request to `UC-17 Allocate Bed`.
* **Alternative Flows**: None.
* **Exception Flows**:
  - *Exc 4a (Existing Active Admission)*: System blocks new admission creation if patient is currently marked `Admitted`.
* **Business Rules**: `BR-09 Single Active Admission Invariant`.
* **Related Requirements**: `FR-15 Admission`.

---

## Specification 9: Allocate Bed (UC-17)
* **Use Case ID**: UC-17
* **Use Case Name**: Allocate Bed
* **Goal**: Assign an available hospital ward bed to an admitted inpatient.
* **Primary Actor**: Receptionist
* **Supporting Actors**: System
* **Trigger**: Inpatient admission record is in status `Admitted`.
* **Preconditions**: Valid `Admission` record exists; an available `Bed` exists in selected Ward.
* **Postconditions**: `Bed` status becomes `Occupied` and linked to `Admission`.
* **Main Success Scenario**:
  1. Receptionist selects Ward category and views real-time bed occupancy grid.
  2. System highlights available beds.
  3. Receptionist selects specific Bed ID (e.g. `BED-ICU-04`).
  4. System updates `Bed` status from `Available` to `Occupied`.
  5. System links Bed ID to `Admission` record and sets admission status to `BedAllocated`.
  6. System notifies ward nursing station of new bed assignment.
* **Alternative Flows**:
  - *Alt 2a (No Available Bed in Selected Ward)*: System displays full ward notification and allows receptionist to assign an available bed in an alternate compatible ward.
* **Exception Flows**: None.
* **Business Rules**: `BR-06 Valid Bed Occupancy Mapping`.
* **Related Requirements**: `FR-16 Bed Allocation`.

---

## Specification 10: Generate Bill (UC-33a)
* **Use Case ID**: UC-33a
* **Use Case Name**: Generate Bill
* **Goal**: Consolidate all unbilled hospital charges across consultation, lab, pharmacy, and bed stays into a single bill.
* **Primary Actor**: Cashier / System
* **Supporting Actors**: System
* **Trigger**: Cashier initiates billing settlement or patient initiates discharge.
* **Preconditions**: Services have been rendered and logged in system modules.
* **Postconditions**: `Bill` record is generated in status `Pending`.
* **Main Success Scenario**:
  1. Cashier enters Patient UHID or Admission ID.
  2. System queries and aggregates unbilled line items (`<<include>> Calculate Charges`):
     - Consultation Fees
     - Laboratory Test Fees
     - Pharmacy Dispensed Medication Fees
     - Inpatient Daily Bed/Ward Charges
  3. System applies authorized discounts or corporate concessions (`<<include>> Apply Discount`).
  4. System calculates taxes and grand total.
  5. System generates consolidated `Bill` record in status `Pending`.
* **Alternative Flows**: None.
* **Exception Flows**:
  - *Exc 2a (No Unbilled Charges)*: System displays alert that no pending line items exist for selected patient.
* **Business Rules**: `BR-10 Non-Negative Financial Charges`.
* **Related Requirements**: `FR-20 Billing`.

---

## Specification 11: Process Payment (UC-08 / UC-33b)
* **Use Case ID**: UC-08 / UC-33b
* **Use Case Name**: Process Payment
* **Goal**: Settle pending bill balance via Cash, Credit/Debit Card, or UPI gateway and issue receipt.
* **Primary Actor**: Cashier / Patient
* **Supporting Actors**: Payment Gateway System
* **Trigger**: Patient or Cashier submits payment for a pending bill.
* **Preconditions**: `Bill` exists in status `Pending`.
* **Postconditions**: `Payment` record is created, `Bill` status updates to `Paid`, official `Receipt` is issued.
* **Main Success Scenario**:
  1. Actor selects Payment Method (Cash, Credit/Debit Card, UPI / NetBanking).
  2. If electronic payment, system interfaces with `PaymentProcessor` API (`<<include>> Process Payment`).
  3. Gateway validates credentials and approves transaction.
  4. System updates `Payment` record with transaction reference and status `Success`.
  5. System updates `Bill` status to `Paid`.
  6. System generates and prints itemized official `Receipt` (`<<include>> Generate Receipt`).
* **Alternative Flows**:
  - *Alt 1a (Cash Payment)*: Cashier collects physical cash, inputs received amount, system calculates change, and marks bill `Paid`.
* **Exception Flows**:
  - *Exc 3a (Gateway Payment Declined)*: System displays payment failure reason (e.g. "Insufficient Funds"), maintains bill status as `Pending`, and prompts re-attempt.
* **Business Rules**: `BR-07 Payment Clearance for Inpatient Discharge`.
* **Related Requirements**: `FR-21 Payment`, `FR-22 Receipt Generation`.

---

## Specification 12: Discharge Patient (UC-18 / UC-27)
* **Use Case ID**: UC-18 / UC-27
* **Use Case Name**: Discharge Patient
* **Goal**: Finalize inpatient medical treatment, verify bill settlement, release bed, and approve discharge summary.
* **Primary Actor**: Receptionist / Doctor
* **Supporting Actors**: Cashier, System
* **Trigger**: Doctor determines patient is medically fit for discharge.
* **Preconditions**: Patient is currently an admitted inpatient (`BedAllocated`).
* **Postconditions**: `Admission` status becomes `Discharged`, assigned `Bed` reverts to `Available`.
* **Main Success Scenario**:
  1. Doctor prepares and signs digital `DischargeSummary` detailing diagnosis, treatment given, and post-discharge advice (`<<include>> Prepare Discharge Summary`).
  2. System initiates discharge workflow and notifies Cashier desk.
  3. Cashier executes `UC-33 Generate Bill & Process Payment` to settle final IP bill.
  4. Receptionist verifies bill status is `Paid`.
  5. Receptionist submits final discharge approval in system.
  6. System updates `Admission` status to `Discharged`.
  7. System releases allocated `Bed`, updating its status to `Available`.
  8. System prints Discharge Summary folder and gate pass for patient.
* **Alternative Flows**: None.
* **Exception Flows**:
  - *Exc 4a (Unpaid Bill Pending)*: System blocks discharge completion if bill status is `Pending`, alerting receptionist to direct patient to cashier desk.
* **Business Rules**: `BR-06 Valid Bed Occupancy Mapping`, `BR-07 Payment Clearance for Inpatient Discharge`.
* **Related Requirements**: `FR-23 Discharge`, `FR-24 Follow-Up`.
