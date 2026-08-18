# Domain Analysis Specification — SHMS

This document details the domain analysis process and noun-extraction methodology used to identify conceptual domain entities for SHMS.

---

## 1. Noun Extraction Methodology

Domain analysis extracts domain entities by parsing functional requirement statements (`FR-01` to `FR-30`) to identify candidate nouns, filtering out implementation artifacts, UI widgets, and primitive attributes.

### 1.1 Candidate Noun Extraction Table

| Candidate Noun | Status | Reason / Classification | Target Entity |
| :--- | :--- | :--- | :--- |
| **Patient** | Retained | Core domain actor & persistent entity | `Patient` |
| **Doctor** | Retained | Core clinical practitioner entity | `Doctor` |
| **Receptionist** | Retained | Front-desk staff user entity | `Receptionist` |
| **Pharmacist** | Retained | Pharmacy staff user entity | `Pharmacist` |
| **LabTechnician** | Retained | Diagnostics staff user entity | `LabTechnician` |
| **Cashier** | Retained | Finance staff user entity | `Cashier` |
| **Admin** | Retained | Administrator user entity | `Admin` |
| **User** | Retained | Superclass for authentication & RBAC | `User` |
| **Role** | Retained | RBAC authorization entity | `Role` |
| **Department** | Retained | Organizational department entity | `Department` |
| **Appointment** | Retained | Outpatient booking transaction | `Appointment` |
| **QueueToken** | Retained | Outpatient waiting queue token | `Queue` |
| **MedicalRecord** | Retained | Aggregate health history container | `MedicalRecord` |
| **Consultation** | Retained | Clinical interaction record | `Consultation` |
| **Diagnosis** | Retained | ICD diagnosis code entity | `Diagnosis` |
| **Prescription** | Retained | Medication order document | `Prescription` |
| **PrescriptionItem**| Retained | Individual drug dosage line item | `PrescriptionItem` |
| **Medicine** | Retained | Pharmaceutical master item | `Medicine` |
| **InventoryItem** | Retained | Pharmacy stock quantity record | `InventoryItem` |
| **LabTest** | Retained | Diagnostic test master item | `LabTest` |
| **LabTestOrder** | Retained | Diagnostic test order request | `LabTestOrder` |
| **Sample** | Retained | Specimen container record | `Sample` |
| **LabReport** | Retained | Test result PDF & value report | `LabReport` |
| **Admission** | Retained | Inpatient hospitalization stay | `Admission` |
| **Ward** | Retained | Inpatient ward facility | `Ward` |
| **Bed** | Retained | Inpatient bed unit | `Bed` |
| **TreatmentPlan** | Retained | Daily IP care progress log | `TreatmentPlan` |
| **Bill** | Retained | Financial charge consolidation | `Bill` |
| **BillItem** | Retained | Individual financial fee line item | `BillItem` |
| **Payment** | Retained | Payment settlement transaction | `Payment` |
| **Receipt** | Retained | Official payment proof document | `Receipt` |
| **DischargeSummary**| Retained | Clinical discharge document | `DischargeSummary` |
| **Notification** | Retained | System message alert record | `Notification` |
| **AuditLog** | Retained | Security audit log entry | `AuditLog` |
| *Screen Widget* | Rejected | UI Implementation detail | - |
| *Database Connection*| Rejected | Technical infrastructure detail | - |

---

## 2. Identified Subsystem Concept Clusters

1. **User & Security Cluster**: `User`, `Role`, `AuditLog`.
2. **Hospital Infrastructure Cluster**: `Hospital`, `Department`, `Ward`, `Bed`.
3. **Outpatient Cluster**: `Patient`, `Doctor`, `Appointment`, `Queue`.
4. **Clinical & EHR Cluster**: `MedicalRecord`, `Consultation`, `Diagnosis`, `Prescription`, `PrescriptionItem`, `DischargeSummary`.
5. **Diagnostic Lab Cluster**: `LabTest`, `LabTestOrder`, `Sample`, `LabReport`.
6. **Pharmacy & Inventory Cluster**: `Medicine`, `InventoryItem`.
7. **Inpatient Cluster**: `Admission`, `TreatmentPlan`.
8. **Financial Settlement Cluster**: `Bill`, `BillItem`, `Payment`, `Receipt`.
9. **Communication Cluster**: `Notification`.
