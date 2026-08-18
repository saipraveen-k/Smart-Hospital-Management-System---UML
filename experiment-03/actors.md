# System Actor Catalog — SHMS

This document lists and describes all primary and supporting actors involved in SHMS.

---

## 1. Actor Taxonomy

```text
                                     User (Abstract)
                                        │
     ┌───────────┬───────────┬──────────┼───────────┬───────────┬───────────┐
     ▼           ▼           ▼          ▼           ▼           ▼           ▼
  Patient   Receptionist   Doctor   Pharmacist   LabTech     Cashier      Admin
```

---

## 2. Actor Profiles

### 2.1 Patient (Primary Actor)
* **Description**: Healthcare receiver accessing SHMS via patient portal or mobile terminal.
* **Responsibilities**:
  - Provide personal demographic and medical history details.
  - Search doctor availability and book appointment slots.
  - Perform arrival OP check-in.
  - Access digital medical records, prescriptions, and lab test reports.
  - Settle medical bills and download official receipts.

### 2.2 Receptionist (Primary Actor)
* **Description**: Front-desk hospital staff managing patient intake and bed allocation.
* **Responsibilities**:
  - Register walk-in patients and update demographic profiles.
  - Verify appointment bookings and issue queue tokens during check-in.
  - Manage daily outpatient queues.
  - Process inpatient admission requests and allocate ward beds.
  - Finalize discharge paperwork upon bill clearance.

### 2.3 Doctor (Primary Actor)
* **Description**: Licensed medical practitioner conducting patient consultations and managing care plans.
* **Responsibilities**:
  - Review patient medical history and previous consultation notes.
  - Conduct physical examinations and record clinical diagnoses.
  - Issue electronic prescriptions and define dosage schedules.
  - Order diagnostic laboratory tests and review uploaded lab reports.
  - Manage inpatient treatment plans and approve discharge summaries.

### 2.4 Pharmacist (Supporting Actor)
* **Description**: Certified pharmacy staff managing drug dispensing and inventory counts.
* **Responsibilities**:
  - Search and verify doctor prescriptions.
  - Check medicine stock availability.
  - Dispense prescribed medications and log pharmacy charges.
  - Update stock quantities and manage inventory alerts.

### 2.5 Lab Technician (Supporting Actor)
* **Description**: Diagnostic laboratory processing technician.
* **Responsibilities**:
  - Receive diagnostic test orders.
  - Verify order details and collect specimen samples.
  - Perform lab testing procedures and record raw values.
  - Enter test results, upload digital PDF reports, and approve release.

### 2.6 Cashier (Supporting Actor)
* **Description**: Hospital financial settlement staff.
* **Responsibilities**:
  - Compile itemized bills across departments.
  - Apply authorized discounts or subsidy adjustments.
  - Process payments via Cash, Card, or UPI online gateway.
  - Issue official payment receipts.

### 2.7 Admin (Managerial Actor)
* **Description**: System Administrator and Security Manager.
* **Responsibilities**:
  - Manage user accounts (create, edit, suspend, reset).
  - Configure Role-Based Access Control (RBAC) privileges.
  - Configure master tables (departments, doctors, wards, fee structures).
  - Monitor security logs and review audit entries.
