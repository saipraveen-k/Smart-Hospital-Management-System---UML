# Business Rules Specification — SHMS

This document lists the operational constraints and enterprise business rules (`BR-01` to `BR-10`) enforced across SHMS.

---

### BR-01: Unique Patient Identification
Every registered patient must be assigned a unique system-generated Patient ID (UHID) upon registration, which serves as the primary key for all medical and financial records.

### BR-02: Authorized Medical Record Access
Patient medical records and diagnosis histories are strictly confidential and accessible only to assigned consulting doctors, treating nurses, and authorized medical administrators.

### BR-03: Doctor-Exclusive Prescription Authority
Only licensed users with role `Doctor` are authorized to record clinical diagnoses, issue electronic prescriptions, or order diagnostic lab tests.

### BR-04: Lab Report Verification Before Release
Diagnostic lab test reports must undergo formal verification and approval status (`Approved`) by a qualified Lab Technician or Senior Pathologist before being published to patient portals or consulting doctors.

### BR-05: Synchronous Inventory Deduction
Dispensing medication from the pharmacy module must immediately update and decrement stock counts in `InventoryItem`. If stock falls below designated `reorderLevel`, an automatic `LowStockAlert` must be generated.

### BR-06: Valid Bed Occupancy Mapping
Inpatient bed allocation must assign a bed currently in `Available` status. Allocating a bed automatically transitions its status to `Occupied` and links it to exactly one active `Admission`.

### BR-07: Payment Clearance for Inpatient Discharge
An admitted patient cannot complete official discharge formalities until the associated consolidated `Bill` status is verified as `Paid` by the Cashier module.

### BR-08: Mandatory Security Audit Logging
All critical administrative operations—including user account creation, role privilege changes, bed fee overrides, and medical report edits—must generate an unalterable `AuditLog` entry.

### BR-09: Single Active Admission Invariant
A patient can have at most one active `Admission` record in status `Admitted` or `UnderTreatment` at any point in time.

### BR-10: Non-Negative Financial Charges
All bill item amounts, consultation fees, lab test prices, and medicine costs must be non-negative values. Discounts applied cannot exceed the total bill amount.
