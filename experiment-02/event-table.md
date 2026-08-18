# Event Table — Smart Hospital Management System (SHMS)

This table details the triggers, sources, system responses, and output deliverables for all key business events in SHMS.

| Event ID | Event | Trigger | Source | System Response | Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **E-01** | Patient Registration | Patient details submitted | Receptionist / Patient | Validate profile, create UHID, save record | Patient Profile, UHID Card |
| **E-02** | Appointment Request | Slot selected & submitted | Patient / Receptionist | Check doctor schedule, reserve slot, confirm booking | Appointment Confirmation |
| **E-03** | OP Arrival Check-In | Patient arrives at desk | Receptionist | Verify booking, update status to `CheckedIn`, issue token | OP Queue Token |
| **E-04** | Consultation Start | Doctor calls token | Doctor | Retrieve medical record, open clinical workstation | Electronic Consultation Form |
| **E-05** | Lab Test Request | Doctor places lab order | Doctor | Create `LabTestOrder`, set status `Requested`, notify lab | Pending Lab Order |
| **E-06** | Sample Collection | Specimen collected | Lab Technician | Barcode container, update status to `SampleCollected` | Barcoded Sample Record |
| **E-07** | Lab Result Entry | Test processing completed | Lab Technician | Input results, compare range, generate report draft | Lab Result Log |
| **E-08** | Lab Report Approval | Technician approves report | Lab Technician | Update status to `Approved`, notify doctor & patient | Approved Lab Report |
| **E-09** | Admission Request | Doctor recommends IP stay | Doctor | Create `Admission` record in status `Requested` | Pending Admission Order |
| **E-10** | Bed Allocation | Receptionist assigns bed | Receptionist | Query available beds, update bed to `Occupied`, admit patient | Bed Allocation Record |
| **E-11** | Prescription Issuance| Doctor saves prescription | Doctor | Create `Prescription` in status `Created`, notify pharmacy | Pending Prescription |
| **E-12** | Medicine Dispensing | Pharmacist dispenses meds | Pharmacist | Verify stock, decrement inventory, generate pharmacy charge | Dispensed Drugs & Charge Item |
| **E-13** | Bill Generation | Cashier requests final bill | Cashier | Aggregate consultation, lab, pharmacy, and bed charges | Consolidated Bill |
| **E-14** | Payment Settlement | Cashier submits payment | Cashier / Patient | Process payment via Cash/Card/UPI, update status to `Paid` | Official Payment Receipt |
| **E-15** | Inpatient Discharge | Discharge form submitted | Doctor / Receptionist | Check bill status `Paid`, release bed to `Available`, close stay | Discharge Summary & Bed Release |
| **E-16** | Stock Level Drop | Stock <= reorder level | System (State Event) | Identify low stock item, dispatch alert to Pharmacist | Low Stock Alert |
| **E-17** | User Provisioning | Admin submits user form | Admin | Encrypt password, assign RBAC role, create credentials | Active User Account |
| **E-18** | Security Violation | Unauthorized API call | System (State Event) | Block request, log user IP/timestamp in security log | Audit Log Entry & 403 Error |
