# Use Case Packaging Architecture — SHMS

This document details the grouping of all 35 use cases into 9 logical subsystem packages.

---

## Subsystem Package Structure

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Smart Hospital System                           │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐ │
│  │ Patient Management    │  │ Appointment & OP      │  │ Clinical Mgmt   │ │
│  │ - UC-01, UC-02, UC-11  │  │ - UC-03..05, 12..15   │  │ - UC-19..22    │ │
│  └───────────────────────┘  └───────────────────────┘  └─────────────────┘ │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐ │
│  │ Laboratory             │  │ Inpatient Management  │  │ Pharmacy        │ │
│  │ - UC-23, 24, 28..31    │  │ - UC-16, 17, 25..27  │  │ - UC-32         │ │
│  └───────────────────────┘  └───────────────────────┘  └─────────────────┘ │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐ │
│  │ Billing & Payment      │  │ Reports & Analytics   │  │ Security & Admin│ │
│  │ - UC-08, 09, 33        │  │ - UC-10, UC-35        │  │ - UC-34         │ │
│  └───────────────────────┘  └───────────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Package Descriptions & Member Use Cases

### 1. Patient Management Package
* **Package Scope**: Handles demographic intake, profile updates, and patient identification.
* **Member Use Cases**: `UC-01 Register Patient`, `UC-02 Update Profile`, `UC-11 Register Walk-In Patient`, `UC-12 Search Patient Record`.

### 2. Appointment & OP Management Package
* **Package Scope**: Manages doctor slot scheduling, booking, OP check-in, and waiting queue tokening.
* **Member Use Cases**: `UC-03 Book Appointment`, `UC-04 View Appointment Status`, `UC-05 Check In Online`, `UC-13 Manage Appointment Schedule`, `UC-14 Check In Patient (Desk)`, `UC-15 Manage OP Queue Tokens`.

### 3. Clinical Management Package
* **Package Scope**: Facilitates electronic consultation work, diagnoses recording, and clinical advise notes.
* **Member Use Cases**: `UC-19 View Patient History`, `UC-20 Conduct Patient Consultation`, `UC-21 Record Clinical Diagnosis`, `UC-22 Create Electronic Prescription`.

### 4. Laboratory Package
* **Package Scope**: Manages test ordering, specimen collection, test execution, and report upload/approval.
* **Member Use Cases**: `UC-23 Request Laboratory Test`, `UC-24 Review Laboratory Report`, `UC-28 Receive Lab Test Request`, `UC-29 Collect Specimen Sample`, `UC-30 Process Diagnostic Test`, `UC-31 Enter Test Result & Upload Report`.

### 5. Inpatient Management Package
* **Package Scope**: Manages IP admission requests, ward bed allocation, IP treatment tracking, and discharge summary approval.
* **Member Use Cases**: `UC-16 Create Admission Record`, `UC-17 Allocate Ward Bed`, `UC-18 Process Discharge Formalities`, `UC-25 Recommend Inpatient Admission`, `UC-26 Update IP Treatment Plan`, `UC-27 Prepare Discharge Summary`.

### 6. Pharmacy Package
* **Package Scope**: Handles prescription verification, drug dispensing, inventory decrementing, and low stock alerts.
* **Member Use Cases**: `UC-07 View Electronic Prescription`, `UC-32 Verify Prescription & Dispense Medicine`.

### 7. Billing & Payment Package
* **Package Scope**: Consolidates charges, applies discounts, processes cash/card/UPI payments, and generates official receipts.
* **Member Use Cases**: `UC-08 Pay Bill Online`, `UC-09 View Payment Receipt`, `UC-33 Generate Bill & Process Payment`.

### 8. Reports & Analytics Package
* **Package Scope**: Provides operational reports, revenue analytics, and follow-up scheduling.
* **Member Use Cases**: `UC-10 View Follow-Up Schedule`, `UC-35 View Security Audit Logs & Reports`.

### 9. Security & Administration Package
* **Package Scope**: Manages user accounts, RBAC policies, master data configuration, and security monitoring.
* **Member Use Cases**: `UC-34 Manage Users & Roles`.
